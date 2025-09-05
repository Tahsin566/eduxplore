
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthProvider } from './auth.context';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase.config';
import { View } from 'react-native';



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

  // useEffect(() => {
  //   onSnapshot(collection(db, "users"), (snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === "added") {
  //         console.log("New user: ", change.doc.data());
  //       }
  //       if (change.type === "modified") {
  //         console.log("Modified user: ", change.doc.data());
  //       }
  //       if (change.type === "removed") {
  //         console.log("Removed user: ", change.doc.data());
  //       }
  //     });
  //   })
  // },[])

  
  return <NavigationContainer>
    <View style={{paddingTop: 10, backgroundColor: '#1a2d3f',flex: 1}}>

    
    <ClerkProvider tokenCache={tokenCache}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ClerkProvider>
    </View>
  </NavigationContainer>;


}
