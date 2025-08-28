import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const INPUT_HEIGHT = 48;

export default function AdminRoles({route}) {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState('Please select');

  const roles = ['Moderator (Community)', 'Admin (Full Access)', 'User'];

  const id = route.params.id

  console.log(id)

  const updateUserPrevilege = async () => {
    try {
      const res = await updateDoc(doc(db, "users",id),{
        role: selectedRole.split(' ')[0].toLowerCase()
      })
      console.log('Document updated with ID',id);
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.edit}><Text style={styles.title}>Admin Roles</Text></View>
        <TouchableOpacity onPress={() => navigation.navigate('ManageAccounts')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
      <View style={styles.space}><Text></Text></View>

      {/* Label */}
      <Text style={styles.label}>Roles</Text>

      {/* Readonly "input" showing current selection */}
      <TextInput
        style={styles.input}
        value={selectedRole}
        editable={false}
      />

      {/* Options */}
      {roles.map((role) => (
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

      {/* Save button*/}
      <TouchableOpacity onPress={updateUserPrevilege} style={styles.addButton}>
        <Text style={styles.addButtonText}>Save Change</Text>
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

  // Input and option rows share the same height and full width
  input: {
    height: INPUT_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#000',
    justifyContent: 'center',
  },

  radioRow: {
    height: INPUT_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
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
