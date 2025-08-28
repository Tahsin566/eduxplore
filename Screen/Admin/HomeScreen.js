
import {  DrawerActions, useNavigation } from '@react-navigation/native';
import { View, Text,StyleSheet, TouchableOpacity,Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import communityIcon from '../../Images/Community.png';
import profileIcon from '../../Images/Profile.png';
import { useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { addDoc, collection, getDoc, getDocs, query, where } from 'firebase/firestore';

import { db } from '../../firebase.config';
import { AuthContext, useAuth, useRole } from '../../auth.context';


const HomeScreen = () => {

  const { user } = useUser();

  const navigation = useNavigation();

  const {role,profile} = useRole()

  const [image, setImage] = useState(profile?.photo);

  useEffect(() => {
    setImage(profile?.photo)
  },[user])


  return(
    <View style={styles.container}>

      <View style={styles.header}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Home</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => role === 'admin' ? navigation.navigate('AdminNotification')  : navigation.navigate('Notification')}>
            <Ionicons name="notifications" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileButton')}>
            <Image source={{uri: profile?.photo}} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
      </View>


      {/* Navigation Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UniversityList')}
      >
        <Text style={styles.buttonText}>University List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManageAccounts')}
      >
        <Text style={styles.buttonText}>Manage Accounts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CoustomSend')}
      >
        <Text style={styles.buttonText}>Send Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Seminars')}
      >
        <Text style={styles.buttonText}>Seminars</Text>
      </TouchableOpacity>



      {/* Bottom Icon */}
      <View style={styles.bottomIcon}>
        <TouchableOpacity
                onPress={() => navigation.navigate('Community')} // Leave blank for now
                style={styles.communityIcon}
              >
                <Image source={communityIcon} style={styles.communityImage} />
              </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 76,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
    borderRadius: 40
  },
  button: {
    backgroundColor: '#ecf0f1',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomIcon: {
    position: 'absolute',
    bottom: 60,
    right: 30,
  },
  communityIcon: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  
});

export default HomeScreen;
