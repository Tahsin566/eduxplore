import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRole } from '../../auth.context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';

export default function RegisteredListScreen({ route }) {
  const navigation = useNavigation();
  const [link, setLink] = useState('');

  const topic = route.params.topic

  console.log('topic',topic)
  

  const {role} = useRole()
  
  // Example emails list
  // const registeredEmails = ['Email1@example.com', 'Email2@example.com', 'Email3@example.com', 'Email4@example.com'];

  const handleSend = () => {
    if (link.trim()) {
      // Handle sending logic
      console.log(`Sending meet link: ${link}`);
      setLink('');
    }
  };


  const [registeredEmails, setRegisteredEmails] = useState([]);

  const getRegisteredEmails = async () => {
    setRegisteredEmails([]);
    try {
      const q = query(collection(db,"seminars_reg"), where("isRegistered", "==", true), where("topic", "==", topic ));
      const querySnapshot = await getDocs(q);
      const emails = querySnapshot.docs.map((doc) => doc.data().email);
      setRegisteredEmails(emails);
    } catch (error) {
      console.log('Error getting registered emails: ', error);
    }
  };

  useEffect(()=>{
    getRegisteredEmails();
  },[topic])

  return (
    <ScrollView contentContainerStyle={{ flex : 1}} endFillColor={'#2c3e50'}>

    <View style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.edit}><Text style={styles.title}>Registered List</Text></View>
        <TouchableOpacity onPress={() => role === 'admin' ? navigation.navigate('Seminars') : navigation.navigate('Seminars')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      {/* Subheading */}
      <Text style={styles.subheading}>Registered Emails</Text>

      {/* Emails List */}
      {registeredEmails.length > 0 ? <View style={styles.listContainer}>
        {registeredEmails.map((email, index) => (
          <Text key={index} style={styles.listItem}>
            {email}
          </Text>
        ))}
      </View>: <Text style={{color: '#fff', fontSize: 16,marginTop: 15}}>No registered emails</Text>}

      {/* Link Input & Send Button */}
      <View style={styles.linkRow}>
        <TextInput
          style={styles.linkInput}
          placeholder="Paste Meet Link Here"
          placeholderTextColor="#999"
          value={link}
          onChangeText={setLink}
          />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#1a2d3f', 
    paddingTop: 40, 
    paddingHorizontal: 20 
  },
  edit:{
    marginTop: 30,
  },
  backButton: {
    marginRight: 15,
  },
  title: { 
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subheading: { 
    marginTop: 30,
    color: '#fff', 
    fontSize: 16,
  },
  listContainer: {
    marginTop: 15,
    backgroundColor: '#ecf0f1', 
    borderRadius: 5, 
    padding: 12, 

  },
  listItem: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  linkRow: { 
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: 'row', 
    alignItems: 'center',
    
  },
  linkInput: { 
    flex: 1, 
    backgroundColor: '#ecf0f1', 
    borderRadius: 5, 
    paddingHorizontal: 10, 
    height: 40, 
    fontSize: 14,
  },
  sendBtn: {
    backgroundColor: '#1abc9c',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  sendText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
});
