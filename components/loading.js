import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRole } from '../auth.context';

const Loading = ({navigation}) => {

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {isLoaded,isSignedIn} = useAuth()
  const {role} = useRole()

  console.log(role)
  

  useEffect(()=>{

    if(!isLoaded) return

    if(!isSignedIn){
      navigation.navigate('SignIn')
    }

  },[isSignedIn,isLoaded])



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#1C2E5C' }}>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})