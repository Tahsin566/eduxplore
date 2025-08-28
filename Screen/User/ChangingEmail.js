import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ChangingEmail = ({ navigation }) => {


  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Screen Title */}
      <Text style={styles.header}>Change Email</Text>

      {/* Form Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Current Email</Text>
        <TextInput style={styles.input} placeholder="" placeholderTextColor="#999" />

        <Text style={styles.label}>New Email</Text>
        <TextInput style={styles.input} placeholder="" placeholderTextColor="#999" />

        <Text style={styles.label}>Confirm new Email</Text>
        <TextInput style={styles.input} placeholder="" placeholderTextColor="#999" />

        <Text style={styles.label}>Current Password</Text>
        <TextInput style={styles.input} placeholder="" placeholderTextColor="#999" secureTextEntry />
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EmailVerification')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangingEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  backButton: {
    position: 'absolute',
    zIndex: 100,
    width: 50,
    top: 57,
    left: 20,
  },
  backText: {
    fontSize: 24,
    color: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    gap: 10,
    marginBottom: 30,
  },
  label: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignSelf: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: '600',
    color: '#000',
  },
});
