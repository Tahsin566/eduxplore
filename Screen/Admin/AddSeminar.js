
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRole } from '../../auth.context';
import { db } from '../../firebase.config';
import { addDoc, collection } from 'firebase/firestore';

export default function AddSeminar() {
  const navigation = useNavigation();

  const {role} = useRole()

  const [topic, setTopic] = useState('');
  const [time, setTime] = useState('');
  const [guest, setGuest] = useState('');


  const addSeminar = async () => {
    try {
      const res = await addDoc(collection(db,"seminars"),{
        topic,
        time,
        guest
      })
      console.log('Inserted document with ID: ', res.id);
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Header */}
      <View style={styles.edit}><Text style={styles.title}>Add Seminar</Text></View>
        <TouchableOpacity onPress={() => navigation.navigate('Seminars')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
      <View><Text></Text></View>
      {/* Topic Field */}
      <Text style={styles.label}>Topic</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter topic"
        placeholderTextColor="#888"
        value={topic}
        onChangeText={setTopic}
      />

      {/* Time Field */}
      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter time"
        placeholderTextColor="#888"
        value={time}
        onChangeText={setTime}
      />

      {/* Guest Field */}
      <Text style={styles.label}>Guest Name and Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter guest name and description"
        placeholderTextColor="#888"
        multiline
        numberOfLines={3}
        value={guest}
        onChangeText={setGuest}
      />

      {/* Add Button */}
      {role === 'admin' && <TouchableOpacity onPress={addSeminar} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E3A4F',
    padding: 20,
    paddingTop: 50,
  },
  edit:{
    marginTop: '30',
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    color: '#000',
  },
  dropdownPlaceholder: {
    backgroundColor: '#C0C5CA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    marginTop: 5,
  },
  dropdownText: {
    color: '#888',
    fontSize: 14,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEE',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
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
  addButton: {
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 20,
  },
  addButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
