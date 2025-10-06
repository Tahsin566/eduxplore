import { useSignUp, useUser } from '@clerk/clerk-expo';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { useRole } from '../../auth.context';
import { db } from '../../firebase.config';
import { collection, getDocs, query } from 'firebase/firestore';


function SignUp({ navigation }) {

  const { role } = useRole()
  const {user,isSignedIn} = useUser()
  const {setActive} = useSignUp()

  const { signUp } = useSignUp();

  let usernameError = ''
  let emailError = ''
  let passwordError = ''
  let confirmPasswordError = '';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');


  const EnterUserToDb = async () => {

    if (!isSignedIn) return

    const q = query(collection(db, "users"), where("email", "==", user?.emailAddresses[0]?.emailAddress));
    const querySnapshot = await getDocs(q);


    if (querySnapshot.docs.length !== 0) {
      console.log('User already exists');
      return;
    }



    const data = {
      name: user.firstName + ' ' + user.lastName || '',
      email: user?.emailAddresses[0]?.emailAddress,
      role: 'user',
      photo: user.imageUrl,
    }

    try {
      const res = await addDoc(collection(db, "users"), data)
      console.log('Inserted document with ID: ', res.id);
    } catch (error) {
      console.log('Error adding document: ', error);
    }


  }

  const handleSignUp = async () => {

    if (!(username && email && password && confirmPassword)) {
      Toast.show({ text1: 'All fields are required', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    if (password !== confirmPassword) {

      Toast.show({ text1: 'Passwords do not match', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return


    }

    try {
      const res = await signUp.create({
        firstName: username,
        lastName: '',
        emailAddress: email,
        password,
      });

      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
        await EnterUserToDb()
        if (role === 'admin') {
          navigation.navigate('HomeScreen')
        } else if (role === 'user') {
          navigation.navigate('Home')
        }
      }


    } catch (error) {
      Toast.show({ text1: error.message, type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 13 }, autoHide: true, visibilityTime: 1000 })

      if (error.message.includes('Password has been found in an online data breach')) {
        Toast.show({ text1: 'Password is weak, use a strong password', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 12 }, autoHide: true, visibilityTime: 1000 })
      }
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return
    try {

      const res = await signUp.attemptEmailAddressVerification({
        code,
      })

      console.log(res)


      if (res.status === 'complete') {
        await setActive({ session: res.createdSessionId })
        navigation.replace('Home')
      } else {

        console.error(JSON.stringify(res, null, 2))
      }
    } catch (err) {

      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flexGrow: 1, backgroundColor: '#1C2E5C' }}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.header}>REGISTER</Text>
        <Text style={styles.subtitle}>IT'S COMPLETELY FREE</Text>

        <View style={styles.form}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            placeholder="Enter your Name"
            placeholderTextColor="#94A3B8"
          />

          <Text style={{ color: 'red' }}>{usernameError}</Text>

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={{ color: 'red' }}>{emailError}</Text>

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            onChangeText={setPassword}
          />

          <Text style={{ color: 'red' }}>{passwordError}</Text>

          <Text style={styles.label}>CONFIRM PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            onChangeText={setConfirmPassword}
          />

          <Text style={{ color: 'red' }}>{confirmPasswordError}</Text>

          <View style={styles.checkbox}>
            <Text style={styles.checkboxLabel}>
              I accept the Terms of Service and Privacy Policy
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.footerText}>
              Already have an account?
              <Text style={styles.click}>  Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1C2E5C',
    alignItems: 'center',
    paddingTop: 50,
  },

  header: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#2ED573',
    marginTop: 4,
    fontWeight: '700',
  },

  form: {
    width: '80%',
    marginTop: 40,
  },

  label: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#FFFFFF',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#0F172A',
  },

  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  checkboxLabel: {
    color: '#7FA3B9',
    marginLeft: 8,
    fontSize: 12,
    flex: 1,
  },

  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 80,
    alignSelf: 'center',
    marginTop: 10,
    minWidth: 120,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },

  footerText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 18,
    fontWeight: '700',
  },
  click: {
    color: '#53A2FF',
    fontSize: 14,
    fontWeight: '800',
  },
});
