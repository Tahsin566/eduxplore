import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase.config';

const INPUT_HEIGHT = 48;

export default function AddAdmin() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const [visible, setVisible] = useState(false);

  const roles = ['Moderator (Community)', 'Admin (Full Access)', 'User'];

  const addAdmin = async () => {
    try {
      const res = await addDoc(collection(db, "users"), {
        name: "Admin",
        email: email,
        role: selectedRole.split(' ')[0].toLowerCase()
      })

      setEmail('');
      setPassword('');
      selectedRole('user');
      console.log('added document with ID: ', res?.id);
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.edit}><Text style={styles.title}>Add Admin</Text></View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.space}><Text></Text></View>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        placeholderTextColor="#888"
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
        placeholderTextColor="#888"
      />

      {/* Role */}
      <Text style={styles.label}>Roles</Text>

      {/* Read-only input that mirrors the selection */}
      <View>

      <TextInput
        style={styles.input}
        value={selectedRole || 'Please select'}
        editable={false}
        />
        <TouchableOpacity style={{ position: 'absolute', right: 5,padding:12}} onPress={() => setVisible(!visible)}>
          {visible ? (
            <Ionicons name="chevron-up" size={24} color="#000" />
          ) : (
            <Ionicons name="chevron-down" size={24} color="#000" />
          )}
        </TouchableOpacity>
        </View>

      {/* Options — same height/width as input */}
      {visible && roles.map((role) => (
        <TouchableOpacity
          key={role}
          style={styles.radioRow}
          onPress={() => setSelectedRole(role)}
          activeOpacity={0.8}
        >
          <Text style={styles.radioLabel} numberOfLines={1}>{role}</Text>
          <View style={styles.radioOuter}>
            {selectedRole === role && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      ))}

      {/* Add Button */}
      <TouchableOpacity onPress={addAdmin} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
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
  space: {
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

  // Base input
  input: {
    height: INPUT_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#000',
  },

  // Option rows match the input size and full width
  radioRow: {
    height: INPUT_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',         // full width (same as input)
    backgroundColor: '#EEE',
    paddingHorizontal: 12,
    marginTop: 10,
    borderRadius: 8,
  },
  radioLabel: {
    fontSize: 16,
    color: '#222',
    flexShrink: 1,
    marginRight: 12,
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
