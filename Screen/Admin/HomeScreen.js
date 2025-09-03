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

      <Text style={styles.greeting}><Text style={styles.wave}>👋</Text> Hi Najibur,</Text>
      <Text style={styles.subtitle}>Here's your dashboard for today</Text>


    



      {/* Navigation Buttons styled as cards */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('UniversityList')}
      >
        <View style={styles.iconUniversity}>
          <Ionicons name="school" size={32} color="#2e6bf6" />
        </View>
        <View>
          <Text style={styles.cardTitle}>University List</Text>
          <Text style={styles.cardSubtitle}>Bachelor's & master's programs</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#babec6" style={styles.chevron} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ManageAccounts')}
      >
        <View style={styles.iconManage}>
          <Ionicons name="person" size={32} color="#4CAF50" />
        </View>
        <View>
          <Text style={styles.cardTitle}>Manage Accounts</Text>
          <Text style={styles.cardSubtitle}>Add or update user roles</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#babec6" style={styles.chevron} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CoustomSend')}
      >
        <View style={styles.iconNotification}>
          <Ionicons name="notifications" size={32} color="#FFB946" />
        </View>
        <View>
          <Text style={styles.cardTitle}>Send Notification</Text>
          <Text style={styles.cardSubtitle}>Reach all users instantly</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#babec6" style={styles.chevron} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Seminars')}
      >
        <View style={styles.iconSeminar}>
          <Ionicons name="calendar" size={32} color="#886cff" />
        </View>
        <View>
          <Text style={styles.cardTitle}>Seminars</Text>
          <Text style={styles.cardSubtitle}>View and manage events</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#babec6" style={styles.chevron} />
      </TouchableOpacity>

      {/* Bottom Icon */}
      <View style={styles.bottomIcon}>
        <TouchableOpacity
                onPress={() => navigation.navigate('Community')}
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
    padding: 24,
    justifyContent: 'flex-start',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 2,
  },
  wave: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 17,
    color: '#6c757d',
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 60,
  },
  title: {
    color: '#1e1e1e',
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
    borderRadius: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 18,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  iconUniversity: {
    marginRight: 20,
  },
  iconManage: {
    marginRight: 20,
  },
  iconNotification: {
    marginRight: 20,
  },
  iconSeminar: {
    marginRight: 20,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1e293b',
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#616e87',
    marginTop: 3,
  },
  chevron: {
    marginLeft: 'auto',
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
  communityImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
});

export default HomeScreen;
