import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useRole } from '../../auth.context';
import * as Linking from 'expo-linking';

export default function NotificationScreen() {

  const { role } = useRole();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let q = null

    if(role === 'moderator'){
      q = query(collection(db, "notification"), orderBy("date", "desc"),where('recipient', '==', 'moderator'));
    } 
    else if(role === 'user'){
      q = query(collection(db, "notification"), orderBy("date", "desc"),where('recipient', '==', 'user'));
    }

    onSnapshot(q ,(snapshot) => {
      const notifications = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setNotifications(notifications);
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => role === 'admin' ? navigation.replace('HomeScreen') : navigation.replace('Home')} style={styles.backBtn}>
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
      <ScrollView>
      {notifications.map((notification, index) => (
        <View key={index} style={styles.notification}>
          <Text>{notification.title}</Text>
          <Text>{notification.message?.split('https')[0]}</Text>
          <TouchableOpacity onPress={()=>Linking.openURL(notification.message?.replace('https', 'linkhttps')?.split('link')[1])}>
            <Text style={{ color: 'blue' }}>{notification.message?.replace('https', 'linkhttps')?.split('link')[1]}</Text>
          </TouchableOpacity>
          <Text style={{ width: '80%', marginTop: 15 }}>{notification.date} at {notification.time}</Text>
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
}

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
    padding: 15,
    marginTop: 10,
    marginBottom: 2,
    borderWidth: 1,
    marginHorizontal: 10,
    
  }
});
