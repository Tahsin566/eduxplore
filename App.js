
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthProvider } from './auth.context';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';



const tokenCache = {
  async getToken(key) {
    const token = await SecureStore.getItemAsync(key)
    return token
  },
  async saveToken(key, value) {
    await SecureStore.setItemAsync(key, value)
  }
}

export default function App() {

  return <NavigationContainer>
    <View style={{ height: 50, backgroundColor: '#1C2E5C' }}>
      <StatusBar backgroundColor="#1C2E5C" style='light' />
    </View>
    <View style={{ flex: 1, backgroundColor: '#1C2E5C' }}>


      <ClerkProvider tokenCache={tokenCache}>
        <AuthProvider>
          <AppNavigator />
          <Toast />
        </AuthProvider>
      </ClerkProvider>
    </View>
  </NavigationContainer>;

}
