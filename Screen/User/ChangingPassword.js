import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ChangingPassword = ({ navigation }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('AccountSettings')}
      >
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Changing Password</Text>

      {/* Current Password */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          placeholderTextColor="#000"
          secureTextEntry={!showCurrent}
        />
        <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
          <Text style={styles.eyeIcon}>{showCurrent ? '🙈' : '👁'}</Text>
        </TouchableOpacity>
      </View>

      {/* New Password */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#000"
          secureTextEntry={!showNew}
        />
        <TouchableOpacity onPress={() => setShowNew(!showNew)}>
          <Text style={styles.eyeIcon}>{showNew ? '🙈' : '👁'}</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#000"
          secureTextEntry={!showConfirm}
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Text style={styles.eyeIcon}>{showConfirm ? '🙈' : '👁'}</Text>
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <View style={styles.forgotSection}>
        <Text style={styles.infoText}>
          If you Forget Password,{'\n'}Click forgot password to recover account
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.forgotLink}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.navigate('ProfileButton')}
      >
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangingPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13294B',
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#000',
  },
  eyeIcon: {
    fontSize: 18,
    marginLeft: 10,
  },
  forgotSection: {
    marginBottom: 30,
  },
  infoText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  forgotLink: {
    color: '#1E90FF',
    fontSize: 13,
    fontWeight: '500',
  },
  saveButton: {
    alignSelf: 'center',
    backgroundColor: '#ECF0F1',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  saveText: {
    fontWeight: '600',
    color: '#000',
  },
});
