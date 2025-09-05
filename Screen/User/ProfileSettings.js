import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRole } from '../../auth.context';
import { db } from '../../firebase.config';
import { Ionicons } from '@expo/vector-icons';

const ProfileSettings = ({ navigation }) => {

  const {profile} = useRole()

  const [name, setName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [ieltsScore, setIeltsScore] = useState('');
  const [groupSSC, setGroupSSC] = useState('');
  const [groupHSC, setGroupHSC] = useState('');
  const [bachelorSubject, setBachelorSubject] = useState('');
  const [mastersSubject, setMastersSubject] = useState('');
  const [vpd, setVpd] = useState('');

  const [showGroupSSCPicker, setShowGroupSSCPicker] = useState(false);
  const [showGroupHSCPicker, setShowGroupHSCPicker] = useState(false);

  const togglePicker = (field) => {
    setShowGroupSSCPicker(field === 'groupSSC');
    setShowGroupHSCPicker(field === 'groupHSC');
  };

  const isFormChanged = () => {
    return (
      name ||
      appointmentDate ||
      ieltsScore ||
      groupSSC ||
      groupHSC ||
      bachelorSubject ||
      mastersSubject ||
      vpd
    );
  };

  const handleSave = async() => {
    if (!isFormChanged()) {

      return
      
    }

    const q = query(collection(db, "profile"), where("email", "==", profile?.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length !== 0) {
      await updateDoc(doc(db, "profile", querySnapshot.docs[0].id), {
        name,
        appointmentDate,
        ieltsScore,
        groupSSC,
        groupHSC,
        bachelorSubject,
        mastersSubject,
        vpd,
      });
      console.log('updated');
      return;
    }

    try {
      const res = await addDoc(collection(db, "profile"), {
        name,
        appointmentDate,
        ieltsScore,
        groupSSC,
        groupHSC,
        bachelorSubject,
        mastersSubject,
        vpd,
        email: profile?.email
      })
      console.log('Inserted document with ID: ', res.id);
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };


  const getProfileData = async () => {
    setName('');
    setAppointmentDate('');
    setIeltsScore('');
    setGroupSSC('');
    setGroupHSC('');
    setBachelorSubject('');
    setMastersSubject('');
    setVpd('');
    const q = query(collection(db, "profile"), where("email", "==", profile?.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length !== 0) {
      setName(querySnapshot.docs[0].data().name);
      setAppointmentDate(querySnapshot.docs[0].data().appointmentDate);
      setIeltsScore(querySnapshot.docs[0].data().ieltsScore);
      setGroupSSC(querySnapshot.docs[0].data().groupSSC);
      setGroupHSC(querySnapshot.docs[0].data().groupHSC);
      setBachelorSubject(querySnapshot.docs[0].data().bachelorSubject);
      setMastersSubject(querySnapshot.docs[0].data().mastersSubject);
      setVpd(querySnapshot.docs[0].data().vpd);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [profile?.email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ProfileButton')}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.header}>Profile Details</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Name in Passport<Text style={{ color: 'red' }}>*</Text></Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" placeholderTextColor="#999" />

        <Text style={styles.label}>Appointment Date</Text>
        <TextInput style={styles.input} value={appointmentDate} onChangeText={setAppointmentDate} placeholder="Enter date" placeholderTextColor="#999" />

        <Text style={styles.label}>IELTS Score</Text>
        <TextInput style={styles.input} value={ieltsScore} onChangeText={setIeltsScore} placeholder="Enter score" placeholderTextColor="#999" keyboardType="numeric" />

        <Text style={styles.label}>Group in SSC</Text>
        <TouchableOpacity style={styles.input} onPress={() => togglePicker('groupSSC')}>
          <Text style={styles.inputText}>{groupSSC || 'Select Science, Commerce or Arts'}</Text>
        </TouchableOpacity>
        {showGroupSSCPicker && (
          <View style={styles.pickerContainer}>
            {['Science', 'Commerce', 'Arts'].map((option, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={() => { setGroupSSC(option); setShowGroupSSCPicker(false); }}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Group in HSC</Text>
        <TouchableOpacity style={styles.input} onPress={() => togglePicker('groupHSC')}>
          <Text style={styles.inputText}>{groupHSC || 'Select Science, Commerce or Arts'}</Text>
        </TouchableOpacity>
        {showGroupHSCPicker && (
          <View style={styles.pickerContainer}>
            {['Science', 'Commerce', 'Arts'].map((option, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={() => { setGroupHSC(option); setShowGroupHSCPicker(false); }}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Bachelor Subject</Text>
        <TextInput style={styles.input} value={bachelorSubject} onChangeText={setBachelorSubject} placeholder="Enter bachelor subject" placeholderTextColor="#999" />

        <Text style={styles.label}>Master’s Subject</Text>
        <TextInput style={styles.input} value={mastersSubject} onChangeText={setMastersSubject} placeholder="Enter master’s subject" placeholderTextColor="#999" />

        <Text style={styles.label}>VPD</Text>
        <TextInput style={styles.input} value={vpd} onChangeText={setVpd} placeholder="Example 1-5" placeholderTextColor="#999" />

        <TouchableOpacity style={[styles.saveButton, { opacity: isFormChanged() ? 1 : 0.4 }]} disabled={!isFormChanged()} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a2d3f',
    paddingTop: 60,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    paddingHorizontal: 20,
    left: 20,
  },
  backText: {
    fontSize: 22,
    color: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  form: {
    width: '80%',
  },
  label: {
    fontSize: 13,
    color: '#fff',
    marginTop: 20,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputText: {
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
    width: 160,
  },
  saveButtonText: {
    color: '#2C3E50',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
