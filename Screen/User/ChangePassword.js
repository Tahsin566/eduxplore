import React from 'react'
import { useAuth, useSignIn } from '@clerk/clerk-expo'
import { Text, TextInput, Button, View , StyleSheet, TouchableOpacity} from 'react-native'

const ChangePasswordFinal = ({ navigation }) => {

  const { signIn, setActive, isLoaded } = useSignIn()
  const { signOut } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [code, setCode] = React.useState('')
  const [successfulCreation, setSuccessfulCreation] = React.useState(false)
  const [error, setError] = React.useState('')

  const onRequestReset = async () => {
    if (!isLoaded) return

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      setSuccessfulCreation(true)
      setError('')
    } catch (err) {
      console.error('error', err.errors[0].longMessage)
      setError(err.errors[0].longMessage)
    }
  }

  const onReset = async () => {
    if (!isLoaded) return

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
      console.error('error', err.errors[0].longMessage)
      setError(err.errors[0].longMessage)
    }
  }


  if (successfulCreation) {

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Reset your password</Text>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <TextInput
        style={styles.inputWrapper}
          value={code}
          placeholder="Enter verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TextInput
        style={styles.inputWrapper}
          value={password}
          placeholder="Enter new password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.saveButton} onPress={onReset}>
          <Text>Reset Password</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    // <View style={styles.container}>
    //   {/* Back Arrow */}
    //   <TouchableOpacity
    //     style={styles.backButton}
    //     onPress={() => navigation.navigate('ResetPassword')}
    //   >
    //     <Text style={styles.backText}>←</Text>
    //   </TouchableOpacity>

    //   {/* Header */}
    //   <Text style={styles.header}>Change Password</Text>

    //   {/* New Password */}
    //   <View style={styles.inputWrapper}>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="New Password"
    //       placeholderTextColor="#000"
    //       secureTextEntry={!showNew}
    //     />
    //     <TouchableOpacity onPress={() => setShowNew(!showNew)}>
    //       <Text style={styles.eyeEmoji}>{showNew ? '🔐' : '👁️'}</Text>
    //     </TouchableOpacity>
    //   </View>

    //   {/* Confirm Password */}
    //   <View style={styles.inputWrapper}>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Confirm Password"
    //       placeholderTextColor="#000"
    //       secureTextEntry={!showConfirm}
    //     />
    //     <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
    //       <Text style={styles.eyeEmoji}>{showConfirm ? '🙈' : '👁️'}</Text>
    //     </TouchableOpacity>
    //   </View>

    //   {/* Save Button */}
    //   <TouchableOpacity
    //     style={styles.saveButton}
    //     onPress={() => navigation.navigate('AccountSettings')}
    //   >
    //     <Text style={styles.saveText}>Save</Text>
    //   </TouchableOpacity>
    // </View>
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Change your password</Text>
      
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <TextInput
      style={styles.inputWrapper}
        value={email}
        placeholderTextColor={'#000'}
        placeholder="Enter your email"
        onChangeText={(email) => setEmail(email)}
      />
      <TouchableOpacity style={styles.saveButton} onPress={onRequestReset}>
        <Text style={styles.saveText}>Send code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordFinal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:"#fff",
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    color: '#000',
  },
  eyeEmoji: {
    fontSize: 18,
    paddingLeft: 10,
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
