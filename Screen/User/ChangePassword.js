import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const PasswordReset = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleNext = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    navigation.navigate('PasswordResetVerification');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Password Reset</Text>

      <Text style={styles.label}>Enter Your Email</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordReset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2E5C',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 57,
    left: 20,
  },
  backText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 100,
    
  },
  label: {
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ECF0F1',
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 40,
    color: '#000',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#ECF0F1',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center'
  },
});
