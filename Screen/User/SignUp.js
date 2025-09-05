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
   const [termsAccepted, setTermsAccepted] = useState(false);

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
      navigation.navigate('SignIn')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" endFillColor={'#1a2d3f'}>
      <View style={styles.container}>

      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>REGISTER</Text>
      <Text style={styles.subtitle}>IT'S COMPLETELY FREE</Text>
      <View style={styles.form}>

        <Text style={styles.label}>NAME</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          placeholder="Enter your Name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
        />

        <Text style={styles.label}>CONFIRM PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
      
      <View style={styles.checkbox}>
        <Text style={styles.checkboxLabel}>
          I accept the Terms of Service and Privacy Policy
        </Text>
      </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          
          >
          <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          >
          <Text style={styles.footerText}>Already have an account?
              <Text style={styles.click}>  Sign In </Text>
          </Text>
          
        </TouchableOpacity>
      </View>
          </View>
    </ScrollView>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a2d3f',
    alignItems: 'center',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  backButtonText: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: '#79e9e5',
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
    checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  checkboxLabel: {
    color: '#7fa3b9',
    marginLeft: 8,
    fontSize: 12,
    flex: 1,
  },
  condition: {
    color: '#fff',
    fontSize: 16,
    marginTop: 25,
  },
  button: {
    backgroundColor: '#008080',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 80,
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
  click: {
    color: '#8080FF',
    fontSize: 18,
  }
})
