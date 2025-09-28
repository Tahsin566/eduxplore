import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { ScrollView } from 'react-native-gesture-handler';

export default function AdminNotification() {
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState([]);



  useEffect(() => {

    const q = query(collection(db, "notification"), orderBy("time", "desc"),where("recipient","!=","user"));
    const unsubscribe = onSnapshot(q ,(snapshot) => {
      const notifications = snapshot.docs.map((doc) => doc.data());
      setNotifications(notifications);
    })

    return () => unsubscribe && unsubscribe
  }, []);

  return (
    <View style={styles.container}>

      <TouchableOpacity 
        onPress={() => navigation.navigate('HomeScreen')} 
        style={{ 
          backgroundColor: '#1C2E5C', 
          height: 42, 
          flexDirection: 'row', 
          alignItems: 'center', 
          paddingHorizontal: 16,
        }}
      >
        <Ionicons name="chevron-back" size={24} color="#fff" />
        <Text style={styles.headertitle}>
          Notification
        </Text>
      </TouchableOpacity>


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
          <Text>{notification.message}</Text>
        </View>
      ))}
    </ScrollView>


    </View>
  );
}

const PURPLE = '#1C2E5C';
const BG = '#F6F7FB';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: BG,
    marginTop: 35,
  },
  backBtn: {
    width: 40, 
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  headertitle:{ 
    color: '#fff', 
    fontSize: 21, 
    fontWeight: '600', 
    marginLeft: 102, 
    marginTop: 5
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
    color: '#2B2F38',
  },
  subtitle: {
    fontSize: 13,
    color: '#7A808C',
  },
  notification: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 2,
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 5,
  }
});