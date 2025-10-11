import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRole } from '../../auth.context';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../../firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function AddSeminar() {

  
  const { role } = useRole();
  const navigation = useNavigation();

  const [topic, setTopic] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [guest, setGuest] = useState('');
  const [description, setDescription] = useState('');

  const onChange = (_, selectedDate) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const addSeminar = async () => {

    if (!topic || !date || !guest || !description) {
      Toast.show({ text1: 'All fields are required', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    const stringRegex = /^[A-Z]+[a-zA-Z0-9 .,]*/;

    if (!stringRegex.test(topic) || !stringRegex.test(guest) || !stringRegex.test(description)) {
      Toast.show({ text1: 'Invalid details', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    try {
      const res = await addDoc(collection(db, "seminars"), {
        topic,
        time: date.getHours() >= 12 ? date.getHours() - 12 + ':' + date.getMinutes() + ' ' + (date.getHours() >= 12 ? 'PM' : 'AM') : date.getHours() + ':' + date.getMinutes() + ' ' + (date.getHours() >= 12 ? 'PM' : 'AM'),
        date: date.toDateString(),
        guest,
        registration_status: 'open',
        status: 'upcoming',
        description
      })
      console.log('Inserted document with ID: ', res.id);

      const notification = await addDoc(collection(db, "notification"), {
        message : `A new webinar has been added titled : ${topic}\nVisit the webinar page for more details`,
        recipient : 'user',
        time : new Date()
      })

      navigation.navigate('Seminars')
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };
  return (
    <ScrollView enabled contentContainerStyle={{ flexGrow: 1 }}>

      <View style={styles.container}>
        {/* Header row */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Seminars')}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Webinar</Text>
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

        <TouchableOpacity style={[{ ...styles.input }, { width: '100%', paddingVertical: 12 }]} onPress={() => showMode('date')}>
          {date ? <Text>{date.toDateString()}</Text> : <Text>Select the date</Text>}
        </TouchableOpacity>

        {show && (
          <RNDateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            onChange={onChange}
          />
        )}

        {/* <Text>{date.toDateString()}</Text> */}


        {/* Time input */}
        <Text style={styles.label}>Time</Text>

        <TouchableOpacity style={[{ ...styles.input }, { width: '100%', paddingVertical: 12 }]} onPress={() => showMode('time')}>
          {date ? <Text>{date.getHours() >= 12 ? date.getHours() - 12 + ':' + date.getMinutes() + ' ' + 'PM' : date.getHours() + ':' + date.getMinutes() + ' ' + (date.getHours() >= 12 ? 'PM' : 'AM')}</Text> : <Text>Select the time</Text>}
        </TouchableOpacity>


        {/* Guest Name input */}
        <Text style={styles.label}>Guest Name</Text>
        <TextInput style={styles.input} onChangeText={setGuest} placeholder="Guest name" />

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
          <TouchableOpacity style={styles.addButton} onPress={() => { addSeminar() }}>
            <Text style={styles.addButtonText}>Add Webinar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22305e',
    paddingHorizontal: 20,
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
    padding: 4,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f2f4f7',
    borderRadius: 8,
    paddingVertical: 18,
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