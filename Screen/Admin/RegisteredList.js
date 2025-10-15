import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRole } from '../../auth.context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import * as MailComposer from 'expo-mail-composer';
import Toast from 'react-native-toast-message';

const AVATAR_COLORS = ['#1C2E5C', '#964b00', '#444cff', '#dedc34', '#3be3da', '#adadff'];

export default function RegisteredListScreen({ route }) {

  const navigation = useNavigation();

  const id = route.params.id;
  const topic = route.params.topic;

  
  const [link, setLink] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [registeredEmails, setRegisteredEmails] = useState([]);



const getRegisteredEmails = async () => {
    setRegisteredEmails([]);
    try {
      const q = query(collection(db,"seminars_reg"), where("is_registered", "==", true), where("webinar_id", "==", id ));
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


const sendEmail = async () => {
  const result = await MailComposer.composeAsync({
    recipients: registeredEmails,
    subject: `Link for attending Webinar :${topic}`,
    body: `Hello user, please click on the link below to join the webinar ${link}`
  });
  if(result.status === 'sent'){
    Toast.show({ text1: 'Email sent successfully', type: 'success', topOffset: -10, text1Style: { color: 'green', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
  }
};   

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -300}>
      <View style={styles.container}>

        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Seminars')} style={styles.headerIcon}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Registered List</Text>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6447e6" style={{marginLeft:6, marginRight:4}} />
          <TextInput
            value={searchTerm}
            style={styles.searchInput}
            placeholder="Search register email"
            placeholderTextColor="#6447e6"
            onChangeText={setSearchTerm}
          />
        </View>

        <Text style={styles.subheading}>Registered Emails</Text>

        <FlatList
          data={registeredEmails}
          keyExtractor={(item, index) => item+index}
          renderItem={({item, index}) => (
              item.toLowerCase().includes(searchTerm.toLowerCase()) && <View style={styles.emailRow}>
              <View style={[styles.avatar, {backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length]}]}>
                <Ionicons name="person" size={17} color="#fff" />
              </View>
              <Text style={styles.emailText}>{item}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noEmail}>No registered emails</Text>}
          contentContainerStyle={{ paddingBottom: 85 }}
        />

        <View style={styles.linkRow}>
          <TextInput
            style={styles.linkInput}
            placeholder="Paste Meet Link Here"
            placeholderTextColor="#999"
            value={link}
            onChangeText={setLink}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendEmail}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22325a',
    paddingHorizontal: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
  },
  headerIcon: {
    marginRight: 8,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginRight: 32
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4fa',
    borderRadius: 8,
    height: 44,
    paddingRight: 12,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#22325a',
    paddingLeft: 6,
  },
  subheading: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 12,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 6,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginBottom: 9,
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emailText: {
    fontSize: 15,
    color: '#283a6a',
    fontWeight: 'bold',
  },
  noEmail: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 12,
    textAlign: 'center',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0, right: 0,
    bottom: 17,
    paddingHorizontal: 16,
  },
  linkInput: {
    flex: 1,
    backgroundColor: '#e6e6ea',
    borderRadius: 6,
    height: 38,
    paddingHorizontal: 12,
    fontSize: 15,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 6,
    alignItems: 'center',
  },
  sendText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
