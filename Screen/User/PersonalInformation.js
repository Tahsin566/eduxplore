import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native';

function PersonalInformation({ navigation }) {
  // --- your existing state ---
  const [selectedApplyingFor, setSelectedApplyingFor] = useState('');
  const [selectedGroupSSC, setSelectedGroupSSC] = useState('');
  const [selectedGroupHSC, setSelectedGroupHSC] = useState('');

  const [showApplyingForPicker, setShowApplyingForPicker] = useState(false);
  const [showGroupSSCPicker, setShowGroupSSCPicker] = useState(false);
  const [showGroupHSCPicker, setShowGroupHSCPicker] = useState(false);

  const handlePickerSelect = (value, field) => {
    if (field === 'applyingFor') {
      setSelectedApplyingFor(value);
      setShowApplyingForPicker(false);
    } else if (field === 'groupSSC') {
      setSelectedGroupSSC(value);
      setShowGroupSSCPicker(false);
    } else if (field === 'groupHSC') {
      setSelectedGroupHSC(value);
      setShowGroupHSCPicker(false);
    }
  };

  const showOptions = (field) => {
    if (field === 'applyingFor') {
      setShowApplyingForPicker(true);
      setShowGroupSSCPicker(false);
      setShowGroupHSCPicker(false);
    } else if (field === 'groupSSC') {
      setShowGroupSSCPicker(true);
      setShowApplyingForPicker(false);
      setShowGroupHSCPicker(false);
    } else if (field === 'groupHSC') {
      setShowGroupHSCPicker(true);
      setShowApplyingForPicker(false);
      setShowGroupSSCPicker(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top bar */}
      <View style={styles.appbar}>
        <Text style={styles.header}>Personal information</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.form}>
        {/* Applying For */}
        <Text style={styles.label}>Applying For</Text>
        <View style={styles.selectWrap}>
          <TouchableOpacity style={styles.selectBtn} onPress={() => showOptions('applyingFor')}>
            <Text style={styles.selectText}>
              {selectedApplyingFor || 'Select Program'}
            </Text>
          </TouchableOpacity>
          {showApplyingForPicker && (
            <View style={styles.pickerCard}>
              {['Bachelor', "Master's"].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={styles.option}
                  onPress={() => handlePickerSelect(opt, 'applyingFor')}
                >
                  <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Name in Passport + helper */}
        <Text style={styles.label}>Name in Passport:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name as in passport"
          placeholderTextColor="#8AA0B3"
        />
        <Text style={styles.helper}>Must match exactly with your passport.</Text>

        {/* Appointment Date */}
        <Text style={styles.label}>Appointment Date</Text>
        <TextInput style={styles.input} placeholder="" placeholderTextColor="#8AA0B3" />

        {/* IELTS */}
        <Text style={styles.label}>IELTS Score</Text>
        <TextInput style={styles.input} placeholder="" placeholderTextColor="#8AA0B3" />

        {/* Group in SSC */}
        <Text style={styles.label}>Group in SSC</Text>
        <View style={styles.selectWrap}>
          <TouchableOpacity style={styles.selectBtn} onPress={() => showOptions('groupSSC')}>
            <Text style={styles.selectText}>{selectedGroupSSC || 'Select  Group'}</Text>
            <Text style={styles.chev}></Text>
          </TouchableOpacity>
          {showGroupSSCPicker && (
            <View style={styles.pickerCardRight}>
              {['Science', 'Commerce', 'Arts'].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={styles.option}
                  onPress={() => handlePickerSelect(opt, 'groupSSC')}
                >
                  <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Group in HSC */}
        <Text style={styles.label}>Group in HSC</Text>
        <View style={styles.selectWrap}>
          <TouchableOpacity style={styles.selectBtn} onPress={() => showOptions('groupHSC')}>
            <Text style={styles.selectText}>{selectedGroupHSC || 'Select  Group'}</Text>
            <Text style={styles.chev}></Text>
          </TouchableOpacity>
          {showGroupHSCPicker && (
            <View style={styles.pickerCardRight}>
              {['Science', 'Commerce', 'Arts'].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={styles.option}
                  onPress={() => handlePickerSelect(opt, 'groupHSC')}
                >
                  <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Bachelor Subject */}
        <Text style={styles.label}>Bachelor Subject</Text>
        <TextInput style={styles.input} placeholder="Select subject" placeholderTextColor="#8AA0B3" />

        {/* Master's Subject */}
        <Text style={styles.label}>Master’s Subject</Text>
        <TextInput style={styles.input} placeholder="Select subject" placeholderTextColor="#8AA0B3" />

        {/* VPD */}
        <Text style={styles.label}>VPD Calculation</Text>
        <TextInput style={styles.input} placeholder="Example 1-5" placeholderTextColor="#8AA0B3" />

        {/* 'If you don't know...' line + Calculate button */}
        <Text style={styles.smallLead}>If you don't know your VPD click</Text>
        <TouchableOpacity style={styles.calcBtn} onPress={() => navigation.navigate('VPDCalculator')}>
          <Text style={styles.calcBtnText}>Calculate VPD</Text>
        </TouchableOpacity>

        {/* Save and Continue */}
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.saveBtnText}>Save and Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default PersonalInformation;

const NAVY = '#13294B';
const INPUT_BG = '#FFFFFF';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: NAVY,
    paddingBottom: 40,
  },

  /* centered header bar */
  appbar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',   // <-- center the header
    paddingHorizontal: 12,
    marginTop: 10,
  },
  header: {
    color: '#EAF2FA',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',        // <-- ensure centered text
  },

  form: {
    width: '86%',
    alignSelf: 'center',
    marginTop: 8,
  },

  label: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 6,
  },

  input: {
    backgroundColor: INPUT_BG,
    height: 38,
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  helper: {
    fontSize: 10,
    color: '#9DB2C4',
    marginTop: 6,
  },

  selectWrap: { position: 'relative' },
  selectBtn: {
    backgroundColor: INPUT_BG,
    height: 38,
    borderRadius: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: { color: '#1F2A37', flex: 1 },
  chev: { color: '#1F2A37', fontSize: 16, marginLeft: 8 },

  pickerCard: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    marginTop: 6,
    width: 140,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 4,
  },
  pickerCardRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    marginTop: 6,
    width: 140,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 4,
  },
  option: { paddingVertical: 8, paddingHorizontal: 10 },
  optionText: { color: '#1F2A37', fontSize: 13 },

  smallLead: {
    color: '#CFE0EF',
    fontSize: 11,
    marginTop: 10,
    marginBottom: 6,
    textAlign: 'center',            // <-- center the line above the button
  },

  /* centered buttons */
  calcBtn: {
    backgroundColor: '#1F4D7A',
    borderRadius: 4,
    height: 34,
    alignSelf: 'center',            // <-- center button
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  calcBtnText: { color: '#EAF2FA', fontWeight: '700', fontSize: 12 },

  saveBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    height: 34,
    alignSelf: 'center',            // <-- center button
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 26,
  },
  saveBtnText: { color: '#0F172A', fontWeight: '700', fontSize: 12 },
});
