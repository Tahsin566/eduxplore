import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRole } from '../../auth.context';

export default function AddSeminar() {
  const navigation = useNavigation();
  const { role } = useRole();

  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guest, setGuest] = useState('');
  const [description, setDescription] = useState('');

const addSeminar = async () => {
    try {
      const res = await addDoc(collection(db,"seminars"),{
        topic,
        time,
        guest
      })
      console.log('Inserted document with ID: ', res.id);
      navigation.navigate('Seminars')
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Seminars')}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Seminar</Text>
      </View>

      {/* Topic input */}
      <Text style={styles.label}>Topic</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your Topic here..."
        placeholderTextColor="#aaa"
        value={topic}
        onChangeText={setTopic}
      />

      {/* Date input */}
      <Text style={styles.label}>Date</Text>
      <TouchableOpacity style={styles.inputWithIcon}>
        <Text style={[styles.input, !date && { color: '#888' }]}>{date || 'Date'}</Text>
        <Ionicons name="calendar" size={20} color="#888" />
      </TouchableOpacity>

      {/* Time input */}
      <Text style={styles.label}>Time</Text>
      <TouchableOpacity style={styles.inputWithIcon}>
        <Text style={[styles.input, !time && { color: '#888' }]}>{time || 'Seminar Time'}</Text>
        <Ionicons name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

      {/* Guest Name input */}
      <Text style={styles.label}>Guest Name</Text>
      <TouchableOpacity style={styles.inputWithIcon}>
        <Text style={[styles.input, !guest && { color: '#888' }]}>{guest || 'Guest Name'}</Text>
        <Ionicons name="time-outline" size={20} color="#888" />
      </TouchableOpacity>

      {/* Description input */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Description"
        placeholderTextColor="#aaa"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      {/* Add Seminar button */}
      {role === 'admin' && (
        <TouchableOpacity style={styles.addButton} onPress={() => {addSeminar}}>
          <Text style={styles.addButtonText}>Add Seminar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22305e',
    paddingHorizontal: 20,
    paddingTop: 44,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    flex: 1,
    color: '#ccc',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 24, // to balance space because of back icon
  },
  label: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f2f4f7',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#333',
  },
  inputWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f4f7',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 22,
  },
  description: {
    height: 88,
    textAlignVertical: 'top',
    marginBottom: 32,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#5776cc',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 44,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
