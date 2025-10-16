import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import UseWeb from '../../hooks/useWeb';
import { useAuth, useSignIn, useSSO, useUser } from '@clerk/clerk-expo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useState } from 'react';
import { addDoc, collection, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { AuthContext, useRole } from '../../auth.context';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

function SignIn({ navigation }) {

  UseWeb();
  const { setActive, signIn } = useSignIn();
  const googleauth = useSSO({ strategy: 'oauth_google' });
  const { isSignedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlegoogleauth = async () => {

    setLoading(true);

    try {
      if (!isSignedIn) {
        const googleAuth = await googleauth.startSSOFlow({ strategy: 'oauth_google' });
        if (googleAuth.createdSessionId) {
          setActive({ session: googleAuth.createdSessionId });
          Toast.show({ text1: 'Signed in successfully', type: 'success', text1Style: { color: 'green', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
        }
      }
      setLoading(false);
    } catch (error) {
      Toast.show({ text1: 'Error signing in', type: 'error', text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      setLoading(false);
    }
  };

  const handleSignIn = async () => {

    if (!email || !password) {
      Toast.show({ text1: 'All fields are required', type: 'error', text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    setLoading(true);

    try {
      const result = await signIn.create({ password, identifier: email });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        Toast.show({ text1: 'Signed in successfully', type: 'success', text1Style: { color: 'green', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if(error?.errors?.[0]?.longMessage?.includes('Identifier is invalid')) Toast.show({ text1: 'Incorrect email or password', type: 'error', text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      else Toast.show({ text1: 'Error signing in', type: 'error', text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
    }
  };
  const Logo = () => (
    <View style={styles.logoCircleOuter}>
      <View style={styles.logoCircleInner}>
        <View style={styles.logoBars}>
          <View style={[styles.logoBar, { height: 10 }]} />
          <View style={[styles.logoBar, { height: 18 }]} />
          <View style={[styles.logoBar, { height: 14 }]} />
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#13294B' }}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Logo / Title */}
        <View style={styles.logoWrap}>
          <Logo />
          <Text style={styles.header}>Sign in</Text>
        </View>

        {/* Card (same layout, colors adjusted) */}
        <View style={styles.card}>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
          />

          {/* Forgot */}
          <TouchableOpacity onPress={() => navigation.replace('forgot')} style={{ alignSelf: 'flex-end' }}>
            <Text style={styles.forgotPassword}>Forgot password</Text>
          </TouchableOpacity>

          {/* Primary Sign In (same size/layout; color changed to white) */}
          <TouchableOpacity style={styles.primaryBtn} onPress={handleSignIn}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.primaryBtnText}>Sign in</Text>}
          </TouchableOpacity>

          {/* Footer */}
          <TouchableOpacity onPress={() => navigation.replace('SignUp')} style={{ marginTop: 18 }}>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>-or-</Text>
            <View style={styles.divider} />
          </View>
          {/* Google */}
          <TouchableOpacity style={styles.googleBtn} onPress={handlegoogleauth}>
            <View style={styles.googleIconBox}>
              <FontAwesome5 name="google" size={18} color="#13294B" />
            </View>
            <Text style={styles.googleText}>Sign in with Google</Text>
          </TouchableOpacity>
            <Text style={styles.footerText}>
              Don't Have an Account?
              <Text style={styles.click} onPress={() => navigation.navigate('SignUp')}>{' '}Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 36,
    paddingHorizontal: 24,
    backgroundColor: '#1C2E5C',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  /* Top */
  logoWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  logoCircleOuter: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
    elevation: 2, shadowColor: '#000',
    shadowOpacity: 0.15, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  logoCircleInner: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#13294B',
    alignItems: 'center', justifyContent: 'center',
  },
  logoBars: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 6 },
  logoBar: { width: 6, borderRadius: 3, backgroundColor: '#FFFFFF' },

  header: { fontSize: 24, color: '#FFFFFF', fontWeight: '700', textAlign: 'center' },

  card: {
    width: '100%',
    backgroundColor: '#1C2E5C',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 0,
  },

  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 48,
    paddingHorizontal: 12,
  },
  googleIconBox: {
    width: 28, height: 28, borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 10,
  },
  googleText: { color: '#0F172A', fontSize: 15, fontWeight: '700' },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  divider: { flex: 1, height: 1, backgroundColor: '#274062' },
  orText: { color: '#FFFFFF', marginHorizontal: 10, fontWeight: '700', fontSize: 12 },

  label: { fontSize: 13, color: '#FFFFFF', marginTop: 6, marginBottom: 6, fontWeight: '700' },
  input: {
    backgroundColor: '#FFFFFF',
    height: 46,
    borderRadius: 10,
    paddingHorizontal: 12,
    color: '#0F172A',
  },

  forgotPassword: { paddingTop: 8, color: '#53A2FF', fontWeight: '700', fontSize: 12 },
  primaryBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  primaryBtnText: { color: '#0F172A', fontSize: 16, fontWeight: '700' },

  click: { color: '#53A2FF', fontSize: 15, fontWeight: '700' },
  footerText: { fontSize: 14, color: '#FFFFFF', textAlign: 'center', fontWeight: '700',marginTop: 16 },
});
