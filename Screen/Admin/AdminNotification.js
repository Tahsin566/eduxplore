import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { ScrollView } from 'react-native-gesture-handler';
import { useRole } from '../../auth.context';
import Toast from 'react-native-toast-message';

export default function AdminNotification() {

  const navigation = useNavigation();

  const [notifications, setNotifications] = useState([]);


  const handleDelete = async(id) => {
    try {
      await deleteDoc(doc(db, "notification", id));
    } catch (error) {
      Toast.show({ text1: 'Error deleting notification', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
    }
  }

  useEffect(() => {

    const q = query(collection(db, "notification"), orderBy("time", "desc"),where('recipient', '==', 'admin'));
    const unsubscribe = onSnapshot(q ,(snapshot) => {
      const notifications = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setNotifications(notifications);
    })

    return () => unsubscribe && unsubscribe
  }, []);

  return (
    <View style={styles.container}>

      <TouchableOpacity 
        onPress={() => navigation.replace('HomeScreen')} 
        style={{ 
          backgroundColor: '#1C2E5C',  
          flexDirection: 'row', 
          alignItems: 'center', 
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255, 255, 255, 0.1)',
          paddingBottom: 25
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
          <Text style={{width:'80%'}}>{notification.title}</Text>
          <Text styleq={{width:'80%'}}>{notification.message}</Text>
          <TouchableOpacity onPress={() => handleDelete(notification.id)} style={styles.deleteBtn}><Ionicons name='trash' size={24} color="red" /></TouchableOpacity>
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
    backgroundColor: '#1C2E5C'
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
    marginTop: 5,
    
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
    padding: 15,
    marginTop: 10,
    marginBottom: 2,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  deleteBtn:{
    padding:5,
    backgroundColor:'#fff',
    position:'absolute',
    top:-8,
    right:5,
    alignItems:'center',
    elevation:5,
    borderRadius:10,
    marginTop:10,
    marginHorizontal:'auto'
  }
});