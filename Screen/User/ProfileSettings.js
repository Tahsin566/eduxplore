import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRole } from '../../auth.context';
import { db } from '../../firebase.config';
import { Ionicons } from '@expo/vector-icons';

const ProfileSettings = ({ navigation }) => {
  const { profile } = useRole();

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

  const isFormChanged = () =>
    name || ieltsScore || groupSSC || groupHSC || bachelorSubject || mastersSubject || vpd;

  const handleSave = async () => {
    if (!isFormChanged()) return;

    const q = query(collection(db, 'profile'), where('email', '==', profile?.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length !== 0) {
      await updateDoc(doc(db, 'profile', querySnapshot.docs[0].id), {
        name,
        ieltsScore,
        groupSSC,
        groupHSC,
        bachelorSubject,
        mastersSubject,
        vpd,
      });
      console.log('updated');
      navigation.navigate('ViewProfile');
      return;
    }

    try {
      const res = await addDoc(collection(db, 'profile'), {
        name,
        ieltsScore,
        groupSSC,
        groupHSC,
        bachelorSubject,
        mastersSubject,
        vpd,
        email: profile?.email,
      });
      console.log('Inserted document with ID: ', res.id);
      navigation.navigate('ViewProfile');
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };

  const getProfileData = async () => {
    setName('');
    setIeltsScore('');
    setGroupSSC('');
    setGroupHSC('');
    setBachelorSubject('');
    setMastersSubject('');
    setVpd('');
    const q = query(collection(db, 'profile'), where('email', '==', profile?.email));
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
      {/* App bar with centered title */}
      <View style={styles.appbar}>
        <TouchableOpacity style={styles.appbarSide} onPress={() => navigation.navigate('ViewProfile')}>
          <Ionicons name="chevron-back" size={24} color="#EAF2FA" />
        </TouchableOpacity>
        <Text style={styles.appbarTitle}>Profile Settings</Text>
        {/* spacer to keep the title centered */}
        <View style={styles.appbarSide} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>
          Name in Passport<Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#8AA0B3"
        />

        {/* <Text style={styles.label}>Appointment Date</Text>
        <TextInput
          style={styles.input}
          value={appointmentDate}
          onChangeText={setAppointmentDate}
          placeholder="Enter date"
          placeholderTextColor="#8AA0B3"
        /> */}

        <Text style={styles.label}>IELTS Score</Text>
        <TextInput
          style={styles.input}
          value={ieltsScore}
          onChangeText={setIeltsScore}
          placeholder="Enter score"
          placeholderTextColor="#8AA0B3"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Group in SSC</Text>
        <TouchableOpacity style={styles.input} onPress={() => togglePicker('groupSSC')}>
          <Text style={styles.inputText}>{groupSSC || 'Select Science, Commerce or Arts'}</Text>
        </TouchableOpacity>
        {showGroupSSCPicker && (
          <View style={styles.pickerCardRight}>
            {['Science', 'Commerce', 'Arts'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => {
                  setGroupSSC(option);
                  setShowGroupSSCPicker(false);
                }}
              >
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
          <View style={styles.pickerCardRight}>
            {['Science', 'Commerce', 'Arts'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => {
                  setGroupHSC(option);
                  setShowGroupHSCPicker(false);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Bachelor Subject</Text>
        <TextInput
          style={styles.input}
          value={bachelorSubject}
          onChangeText={setBachelorSubject}
          placeholder="Enter bachelor subject"
          placeholderTextColor="#8AA0B3"
        />

        <Text style={styles.label}>Master’s Subject</Text>
        <TextInput
          style={styles.input}
          value={mastersSubject}
          onChangeText={setMastersSubject}
          placeholder="Enter master’s subject"
          placeholderTextColor="#8AA0B3"
        />

        <Text style={styles.label}>VPD</Text>
        <TextInput
          style={styles.input}
          value={vpd}
          onChangeText={setVpd}
          placeholder="Example 1-5"
          placeholderTextColor="#8AA0B3"
        />

        <TouchableOpacity
          style={[styles.saveBtn, { opacity: isFormChanged() ? 1 : 0.45 }]}
          disabled={!isFormChanged()}
          onPress={handleSave}
        >
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileSettings;


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1C2E5C',
    paddingBottom: 24
  },

  /* App bar (dark navy, centered title) */
  appbar: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  appbarSide: { width: 28, alignItems: 'center', justifyContent: 'center' },
  appbarTitle: { color: '#EAF2FA', fontSize: 20, fontWeight: '700' },

  form: {
    width: '86%',
    alignSelf: 'center',
    marginTop: 8,
  },

  label: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#FFFFFF',
    height: 38,
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  inputText: { color: '#1F2937' },

  /* right-aligned compact picker card (like the screenshot) */
  pickerCardRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    width: 110,
    marginTop: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  option: { paddingVertical: 8, paddingHorizontal: 10 },
  optionText: { color: '#1F2937', fontSize: 12 },

  /* Save button full width like the mock */
  saveBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 24,
    width: '100%',
  },
  saveBtnText: { color: '#0F172A', fontWeight: '700', fontSize: 12 },
});
