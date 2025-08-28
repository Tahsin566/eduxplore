import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function EmailVerification({ navigation }) {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    if (otp.length === 6) {
      navigation.navigate('AccountSettings');
    } else {
      alert('Please enter OTP.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ChangingEmail')}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Verification</Text>

      {/* OTP Input */}
      <View style={styles.form}>
        <Text style={styles.label}>Enter Your OTP</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
        />

        {/* Verify Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AccountSettings')}>
            <Text style={styles.buttonText}>Click to Verify</Text>
        </TouchableOpacity>


        {/* Info Text */}
        <Text style={styles.infoText}>
          The verification code has been sent to the email you provided.{"\n"}
          If you don't receive the code?
        </Text>

        {/* Resend */}
        <TouchableOpacity onPress={() => alert('Resend code clicked')}>
          <Text style={styles.resendText}>Resend code.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    paddingTop: 60,
    alignItems: 'center',
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
    marginBottom: 30,
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginTop: 80
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 20,
    marginTop: 20
  },
  buttonText: {
    fontWeight: '600',
    color: '#000000',
  },
  infoText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 13,
  },
  resendText: {
    color: '#1E90FF',
    marginTop: 10,
    fontSize: 13,
  },
});
