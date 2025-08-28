import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRole } from '../../auth.context';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

export default function ProfileUpload({ navigation }) {

  const { profile, userId,role } = useRole()

  const { user } = useUser();

  const [image, setImage] = useState(profile?.photo);
  const [file, setFile] = useState();

  const { signOut, isSignedIn } = useAuth()

  const pickImage = async () => {
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1,1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const newFile = {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].fileName
      }
      setImage(result.assets[0].uri);
      setFile(newFile);
    }
  };

  const uploadToCloudinary = async () => {

    // if(profile?.photo?.toString()?.includes('https://res.cloudinary.com')) {


    //   const res = await fetch('https://api.cloudinary.com/v1_1/dkmdyo7bm/image/destroy', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       public_id: [profile?.photo],
    //       api_key: '258347628372499',
    //       signature:false,
    //       timestamp:false
    //     }),
        
    //   })
    //   const data = await res.json()
    //   console.log(data)
    // }

    if(!file) return

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'images-expo-app');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dkmdyo7bm/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(data)
      // console.log(JSON.stringify(data, null, 2));
      return data?.secure_url

    } catch (error) {
      console.log('Error uploading image:', error.message);
      return profile?.photo
    }
  };


  const uploadProfilePic = async () => {
    const imageUrl = await uploadToCloudinary();

    if (!imageUrl) return

    try {
      await updateDoc(doc(db, "users", userId), {
        photo: imageUrl
      })
      console.log('Document updated');
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  }


  useEffect(()  => {
    setImage(profile?.photo)
  },[profile?.photo])


  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => role === 'admin' ? navigation.navigate('HomeScreen')  : navigation.navigate('Home') }>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Profile Picture (Center) */}
      <TouchableOpacity style={styles.profilePicContainer} onPress={pickImage}>
        <Image
          source={profile.photo ? { uri: image} : require('../../Images/Profile.png')}
          style={styles.profilePic}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{profile?.name}</Text>
      <Text style={styles.email}>{profile?.email}</Text>
      {file && <TouchableOpacity style={{backgroundColor: '#ECF0F1',marginBottom: 10,padding: 12,borderRadius: 6}} onPress={uploadProfilePic}>
        <Text style={{color: '#000'}}>Upload Profile Picture</Text>
      </TouchableOpacity>}

      {/* Profile Settings Button */}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewProfile')}>
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileSettings')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Account Settings Button */}
      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AccountSettings')}>
        <Text style={styles.buttonText}>Account Settings</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={[{ ...styles.buttonText }, { color: 'red' }]}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  profilePicContainer: {
    marginTop: 20,
    marginBottom: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    backgroundColor: '#ECF0F1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
  },
});
