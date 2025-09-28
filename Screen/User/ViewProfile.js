import { StyleSheet, Text, View,Image, TouchableOpacity,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRole } from '../../auth.context'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const ViewProfile = () => {

    const navigation = useNavigation();

    const {profile} = useRole()

    const [userDetails, setUserDetails] = useState();



    useEffect(() => {
        // setUserDetails(null);
    const q = query(collection(db, "profile"), where("email", "==", profile?.email));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const profile = snapshot.docs.map((doc) =>{ return {...doc.data(), id: doc.id}});
        setUserDetails(profile[0]);
      })

      return () => unsubscribe && unsubscribe
    }, [profile?.email]);

  return (
    <>
    <View style={styles.container}>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ProfileButton')} >
            <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={{alignItems:'center'}}>
        <Text style={[{...styles.text},{...styles.header}]}>User Profile</Text>
        <Image style={styles.image} source={{uri: profile?.photo}} />
        <View style={{height: 10}}></View>
        <Text style={styles.text}>{profile?.name?.includes('null') ? profile?.name.split('nullc')[0] : profile?.name}</Text>
        <Text style={styles.text}>{profile?.email}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.text}>Additional Details</Text>
        </View>

        {userDetails ? <View>
        <View style={{height: 10}}></View>
        <Text style={{color: '#fff', padding: 8,fontSize:16}}>Name in Passport : {userDetails?.name}</Text>
        <Text style={{color: '#fff', padding: 8,fontSize:16}}>IELTS Score : {userDetails?.ieltsScore} </Text>
        <Text style={{color: '#fff', padding: 8,fontSize:16}}>Group in SSC : {userDetails?.groupSSC}</Text>
        <Text style={{color: '#fff', padding: 8,fontSize:16}}>Group in HSC : {userDetails?.groupHSC}</Text>
        <Text style={{color: '#fff', padding: 8,fontSize:16}}>Bachelor : {userDetails?.bachelorSubject || 'N/A'}</Text>
        <Text style={{color: '#fff', padding: 8,fontSize:16}}>Master : {userDetails?.mastersSubject || 'N/A'} </Text>
        <Text style={{color: '#fff', padding: 8,fontSize:16}}>VPD : {userDetails?.vpd}</Text>
        </View> : <Text style={{color: '#fff', padding: 8,fontSize:16}}>No Additional Details Available</Text>}
    </View>

    </>
  )
}

export default ViewProfile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,
      paddingHorizontal: 20,
      backgroundColor: '#1C2E5C'
      
    },
    text:{
      color: '#fff',
      padding: 8,
      fontWeight: '600',
      fontSize:18
    },
    header:{
        fontSize:22
    },
    image:{
      width: 100,
      height: 100,
      borderRadius: 50,
    }
})