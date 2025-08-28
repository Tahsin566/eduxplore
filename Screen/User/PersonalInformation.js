import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native';

function PersonalInformation({ navigation }) {
  // Separate states for each field
  const [selectedApplyingFor, setSelectedApplyingFor] = useState('');
  const [selectedGroupSSC, setSelectedGroupSSC] = useState('');
  const [selectedGroupHSC, setSelectedGroupHSC] = useState('');

  // To show picker options for each field
  const [showApplyingForPicker, setShowApplyingForPicker] = useState(false);
  const [showGroupSSCPicker, setShowGroupSSCPicker] = useState(false);
  const [showGroupHSCPicker, setShowGroupHSCPicker] = useState(false);

  const handlePickerSelect = (value, field) => {
    if (field === 'applyingFor') {
      setSelectedApplyingFor(value);
      setShowApplyingForPicker(false); // Close the picker
    } else if (field === 'groupSSC') {
      setSelectedGroupSSC(value);
      setShowGroupSSCPicker(false); // Close the picker
    } else if (field === 'groupHSC') {
      setSelectedGroupHSC(value);
      setShowGroupHSCPicker(false); // Close the picker
    }
  };

  const showOptions = (field) => {
    // Open the picker for the selected field
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
      <Text style={styles.header}>Personal information</Text>

      <View style={styles.form}>
        {/* Applying For Field */}
        <Text style={styles.label}>Applying For</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => showOptions('applyingFor')}
        >
          <Text style={styles.inputText}>{selectedApplyingFor || 'Select Bachelor or Master’s'}</Text>
        </TouchableOpacity>
        {showApplyingForPicker && (
          <View style={styles.pickerContainer}>
            {['Bachelor', 'Master\'s'].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handlePickerSelect(option, 'applyingFor')}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Group in SSC Field */}
        <Text style={styles.label}>Group in SSC</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => showOptions('groupSSC')}
        >
          <Text style={styles.inputText}>{selectedGroupSSC || 'Select Science, Commerce or Arts'}</Text>
        </TouchableOpacity>
        {showGroupSSCPicker && (
          <View style={styles.pickerContainer}>
            {['Science', 'Commerce', 'Arts'].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handlePickerSelect(option, 'groupSSC')}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Group in HSC Field */}
        <Text style={styles.label}>Group in HSC</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => showOptions('groupHSC')}
        >
          <Text style={styles.inputText}>{selectedGroupHSC || 'Select Science, Commerce or Arts'}</Text>
        </TouchableOpacity>
        {showGroupHSCPicker && (
          <View style={styles.pickerContainer}>
            {['Science', 'Commerce', 'Arts'].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handlePickerSelect(option, 'groupHSC')}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Other Fields */}
        <Text style={styles.label}>Name in Passport</Text>
        <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="#999" />

        <Text style={styles.label}>Appointment Date</Text>
        <TextInput style={styles.input} placeholder="Enter date" placeholderTextColor="#999" />

        <Text style={styles.label}>IELTS Score</Text>
        <TextInput style={styles.input} placeholder="Enter score" placeholderTextColor="#999" />

        <Text style={styles.label}>Bachelor Subject</Text>
        <TextInput style={styles.input} placeholder="Enter bachelor subject" placeholderTextColor="#999" />

        <Text style={styles.label}>Master’s Subject</Text>
        <TextInput style={styles.input} placeholder="Enter master’s subject" placeholderTextColor="#999" />

        <Text style={styles.label}>VPD</Text>
        <TextInput style={styles.input} placeholder="Enter VPD" placeholderTextColor="#999" />

        {/* Calculate Button */}
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={() => navigation.navigate(' ')} // You can update navigation later
        >
          <Text style={styles.calculateButtonText}>I don't know your VPD click Calculate VPD</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    paddingTop: 80,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    
  },
  form: {
    width: '80%',
    marginTop: 40,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputText: {
    color: '#333',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 25,
    minWidth: 120,
    marginBottom: 50
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  calculateButton: {
    marginTop: 15,
    alignSelf: 'center',
  },
  calculateButtonText: {
    fontSize: 14,
    color: '#1E90FF',
    textAlign: 'center',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    width: '80%',
    marginTop: 10,  // Adjusting spacing to place the picker options just below the selected field
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
});
