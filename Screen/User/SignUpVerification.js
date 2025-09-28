import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

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
      <StatusBar barStyle="light-content" />

      {/* Top row: chevron + centered title */}
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.backHit}
          onPress={() => navigation.navigate('SignUp')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Verification</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.label}>Enter Your OTP</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
        />

        {/* Small centered white button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PersonalInformation')}
        >
          <Text style={styles.buttonText}>Click to Verify</Text>
        </TouchableOpacity>

        {/* Helper text block */}
        <View style={styles.infoWrap}>
          <Text style={styles.infoText}>
            The verification code has been sent to the{'\n'}
            email you provided.{'\n'}
            If you don't receive the code?
          </Text>
          <TouchableOpacity onPress={() => alert('Resend code clicked')}>
            <Text style={styles.resendText}>Resend code.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const NAVY = '#1C2E5C';       // deep navy like your screenshot
const INPUT_BG = '#E9EEF4';   // light input background
const INFO = '#98A7B8';
const LINK = '#4DA3FF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
  },

  topRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backHit: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  backIcon: { color: '#E8EEF5', fontSize: 20, lineHeight: 20 }, // chevron
  title: { color: '#E8EEF5', fontSize: 18, fontWeight: '700' , },

  body: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },

  // Light background restored to match the image
  input: {
    width: '100%',
    backgroundColor: INPUT_BG,
    height: 42,
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  button: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 14,
  },
  buttonText: { color: '#0F172A', fontWeight: '700', fontSize: 12 },

  infoWrap: {
    marginTop: 14,
    width: '75%',
    marginLeft: 6,
  },
  infoText: { color: INFO, fontSize: 11.5, lineHeight: 16 },
  resendText: { color: LINK, fontSize: 11.5, marginTop: 6, fontWeight: '700' },
});
