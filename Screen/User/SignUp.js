import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

function SignUp({ navigation }) {

  const {signUp} = useSignUp()

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async() => {

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await signUp.create({
        firstName: username,
        lastName: '',
        emailAddress: email,
        password
      })
      console.log('Sign up successful');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" endFillColor={'#2C3E50'}>
      <View style={styles.container}>

      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Sign up</Text>

      <View style={styles.form}>

        <Text style={styles.label}>User Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          placeholder="Enter your Name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
      

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          
          >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
          >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
          </View>
    </ScrollView>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50', // Dark blue background
    alignItems: 'center',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
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
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 25,
    minWidth: 120,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 30,
  },
})
