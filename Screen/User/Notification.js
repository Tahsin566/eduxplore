

import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useRole } from '../../auth.context';

export default function NotificationScreen() {
  const navigation = useNavigation();

  const { role } = useRole();

  const [notifications, setNotifications] = useState([]);



  useEffect(() => {

    const q = query(collection(db, "notification"), orderBy("time", "desc"),where("recipient","!=","admin"));
    onSnapshot(q ,(snapshot) => {
      const notifications = snapshot.docs.map((doc) => doc.data());
      setNotifications(notifications);
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => role === 'admin' ? navigation.navigate('HomeScreen') : navigation.navigate('Home')} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Empty state */}
      {notifications.length === 0 && <View style={styles.empty}>
        <View style={styles.illustration}>
          <Ionicons name="notifications-outline" size={56} color="#BFC6D3" />
        </View>
        <Text style={styles.title}>You're all caught up</Text>
        <Text style={styles.subtitle}>All notifications will be displayed here</Text>
      </View>}

      {/* List of notifications */}
      {notifications.map((notification, index) => (
        <View key={index} style={styles.notification}>
          <Text>{notification.title}</Text>
          <Text>{notification.message}</Text>
        </View>
      ))}


    </SafeAreaView>
  );
}

const PURPLE = '#2c3e50';
const BG = '#F6F7FB';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1C2E5C' 
  },
  header: {
    backgroundColor: '#1C2E5C',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  backBtn: {
    width: 40, 
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EEF1F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 13,
    color: '#7A808C',
  },
  notification: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 2,
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    
  }
});
