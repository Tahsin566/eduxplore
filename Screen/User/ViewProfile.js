import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRole } from '../../auth.context'
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';


const ViewProfile = () => {

  const navigation = useNavigation();
  const { signOut } = useAuth()
  const { user } = useUser()

  const { profile, role, userId } = useRole()

  const [userDetails, setUserDetails] = useState();
  const [image, setImage] = useState(profile?.photo);
  const [file, setFile] = useState();

  const pickImage = async () => {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
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


    if (!file) return

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
      setFile()
      console.log('Document updated');
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  }


  useEffect(() => {
    setImage(profile?.photo)
  }, [profile?.photo])

  useEffect(() => {

    const q = query(collection(db, "profile"), where("email", "==", profile?.email));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const profile = snapshot.docs.map((doc) => { return { ...doc.data(), id: doc.id } });
      setUserDetails(profile[0]);
    })

    return () => unsubscribe && unsubscribe
  }, [profile?.email]);

  return (
    <>
      <View style={styles.container}>
        <Text style={[{ ...styles.text }, { ...styles.header }]}>User Profile</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => role === 'admin' ? navigation.navigate('HomeScreen') : navigation.navigate('Home')} >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>

          <Image style={styles.image} source={{ uri: image }} />

        </TouchableOpacity>
        {file && <TouchableOpacity onPress={uploadProfilePic} style={styles.imageContainer}>
          <Ionicons name="cloud-upload" size={24} color="#fff" />
        </TouchableOpacity>}
        <View style={{ alignItems: 'center' }}>
          <View style={{ height: 10 }}></View>
          <Text style={styles.text}>{profile?.name?.includes('null') ? profile?.name.replace('null', '') : profile?.name}</Text>
          <Text style={styles.text}>{profile?.email}</Text>
          <View style={{ height: 10 }}></View>
          <Text style={styles.additional}>Additional Details</Text>
        </View>

        {userDetails ? <View>
          <Text style={{ color: '#fff', padding: 8, fontSize: 16 }}>Name in Passport : {userDetails?.name}</Text>
          <Text style={{ color: '#fff', padding: 8, fontSize: 16 }}>IELTS Score : {userDetails?.ieltsScore} </Text>
          <Text style={{ color: '#fff', padding: 8, fontSize: 16 }}>Group in SSC : {userDetails?.groupSSC}</Text>
          <Text style={{ color: '#fff', padding: 8, fontSize: 16 }}>Group in HSC : {userDetails?.groupHSC}</Text>
          <Text style={{ color: '#fff', padding: 8, fontSize: 16 }}>Bachelor : {userDetails?.bachelorSubject || 'N/A'}</Text>
          <Text style={{ color: '#fff', padding: 8, fontSize: 16 }}>Master : {userDetails?.mastersSubject || 'N/A'} </Text>
          <Text style={{ color: '#fff', padding: 8, fontSize: 16 }}>VPD : {userDetails?.vpd}</Text>
        </View> : <Text style={{ color: '#fff', padding: 8, fontSize: 16 }}>No Additional Details Available</Text>}

        <View style={styles.buttonContainer}>



          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileSettings')}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* Account Settings Button */}
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={[{ ...styles.buttonText }, { color: 'red' }]}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>

    </>
  )
}

export default ViewProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#1C2E5C'

  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 20,
  },

  additional: {
    color: '#ECF0F1',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
  },
  text: {
    color: '#ecf0f1',
    paddingHorizontal: 8,
    fontWeight: '600',
    fontSize: 18
  },
  header: {
    fontSize: 22,
    paddingBottom: 20,
    textAlign: 'center',
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#1C2E5C',
    fontSize: 16,
    fontWeight: '600',
  },
})