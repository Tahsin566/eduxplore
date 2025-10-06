import { useSignIn } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-expo';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Toast from 'react-native-toast-message';

const PasswordReset = ({ navigation }) => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const { signOut } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [code, setCode] = React.useState('')
  const [successfulCreation, setSuccessfulCreation] = React.useState(false)
  const [error, setError] = React.useState('')

  const onRequestReset = async () => {
    if (!isLoaded) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Toast.show({ text1: 'Invalid email', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      setSuccessfulCreation(true)
      setError('')
    } catch (err) {
      Toast.show({ text1: 'Error resetting password', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
    }
  }

  const onReset = async () => {
    if (!isLoaded) return

    if(user){
      signOut()
    }

    try {
      const result = await signIn.attemptSecondFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        // router.replace('/')
      } else {
        console.log(result)
      }
    } catch (err) {
      Toast.show({ text1: 'Error resetting password', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
    }
  }

  useEffect(()=>{
    setSuccessfulCreation(false)
  },[])

  if (successfulCreation) {

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Reset your password</Text>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <TextInput
        style={styles.input}
          value={code}
          placeholder="Enter verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TextInput
        style={styles.input}
          value={password}
          placeholder="Enter new password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={onReset}>
          <Text>Reset Password</Text>
        </TouchableOpacity>
      </View>
    )
  }



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

      <TouchableOpacity style={styles.button} onPress={() => onRequestReset()}>
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
    paddingHorizontal: 30
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
