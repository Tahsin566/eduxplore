import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import { useRole } from '../../auth.context';
import Toast from 'react-native-toast-message';

const INPUT_HEIGHT = 48;

export default function SendNotification() {

  const {role} = useRole()
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const SendNotification = async() => {

    const stringRegex = /^[A-Z]+[a-zA-Z0-9 .,]*/;

    if(!(message && recipient)) {
      Toast.show({ text1: 'All fields are required', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    if (!stringRegex.test(message)) {
      Toast.show({ text1: 'Invalid message', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    setLoading(true)

    try {
      await addDoc(collection(db,"notification"),{
        message,
        recipient:recipient?.toLowerCase(),
        time: new Date()  
      })
      Toast.show({ text1: 'Notification sent successfully', type: 'success', text1Style: { color: 'green', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      setLoading(false)
      navigation.navigate('AdminNotification')
    } catch (error) {
      Toast.show({ text1: 'Error sending notification', type: 'error', text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
    }
  };

  return (
    <View style={styles.container}>
      <View><Text style={styles.header}>Send Notification</Text></View>
      
        <TouchableOpacity onPress={() => role === 'admin' ? navigation.replace('HomeScreen') : navigation.replace('Home') }>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      
      <View style={styles.space}><Text></Text></View>

      <Text style={styles.label}>Massage</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Type your message..."
        multiline
        numberOfLines={10}
        value={message}
        onChangeText={setMessage}
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Whom to Send</Text>

      <View>

      <TextInput
      value={recipient}
      editable={false}
      placeholder='Select Recipient'
      style={styles.input}
      
      />

      <TouchableOpacity
        style={[{...styles.toggleButton},{position: 'absolute',right: 0,top: 0,padding:10}]}
        onPress={() => setIsVisible(!isVisible)}
        >
        <Text style={styles.toggleButtonText}>{isVisible ? <Ionicons name="chevron-up" size={24} color="#000" /> :  <Ionicons name="chevron-down" size={24} color="#00" />}</Text>
      </TouchableOpacity>
        </View>

      {isVisible && ['Admin', 'Moderator', 'User'].map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.radioRow}
          onPress={() => setRecipient(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.radioLabel}>{item}</Text>
          <View style={styles.radioOuter}>
            {recipient === item && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
        
      ))}

      <TouchableOpacity onPress={SendNotification} style={styles.sendButton}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.sendButtonText}>Send Notification</Text>}
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2E5C',
    paddingHorizontal: 20,
  },
  space: {
    marginTop: 30,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },

  input: {
    height: INPUT_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#000',
    width: '100%',
    marginBottom: 10,
  },

  textarea: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    minHeight: 41,
    marginBottom: 20,
    color: '#000',
  },
  radioRow: {
    height: INPUT_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEE',
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  radioLabel: {
    fontSize: 16,
    color: '#222',
  },
  radioOuter: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  sendButton: {
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 70,
    backgroundColor: '#638ECC'
  },
  sendButtonText: {
    fontWeight: 'bold',
    color: '#FFF',
    
  },
});
 