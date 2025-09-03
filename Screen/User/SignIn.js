import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, StatusBar, ActivityIndicator, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import UseWeb from '../../hooks/useWeb';
import { useAuth, useSignIn, useSSO, useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { addDoc, collection, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { AuthContext, useRole } from '../../auth.context';
import { FontAwesome5 } from '@expo/vector-icons';

function SignIn({ navigation }) {


  UseWeb()

  const googleauth = useSSO({ strategy: 'oauth_google' })

  const { isSignedIn, signOut } = useAuth()
  const {role} = useRole()

  const { user } = useUser()

  const { setActive } = useSignIn()

  const [loading, setLoading] = useState(true)

  const handlegoogleauth = async () => {

    try {

        if (!isSignedIn) {

            const googleAuth = await googleauth.startSSOFlow({ strategy: 'oauth_google' })

            if (googleAuth.createdSessionId) {
                setActive({ session: googleAuth.createdSessionId })
            }
            
        }


    } catch (error) {

        console.log(error.errors[0].message)

    }
}





  return (
    <ScrollView  endFillColor={'#2C3E50'}>

      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.header}>Sign in</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry
          />

          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>

          <Text style={styles.or}>- or -</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handlegoogleauth}
          >
            <FontAwesome5 name="google" size={24} color="#203a43" brand />
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
            <Text style={styles.footerText}>
              Don't Have an Account?
              <Text style={styles.click}> Sign Up</Text>
            </Text>
          </TouchableOpacity>



          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>

  )
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 80,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  forgotPassword: {
    paddingTop: 10,
    color: '#8080FF',
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
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  or: { 
    color: '#fff', 
    textAlign: 'center', 
    marginVertical: 8 
  },
  click: {
    color: '#8080FF',
    fontSize: 18,
  },
  footerText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 30,
  },
})
