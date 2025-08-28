import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { getDocumentAsync } from 'expo-document-picker';
import { db } from '../../firebase.config';
import { useNavigation } from '@react-navigation/native';

const WishlistItem = ({item}) => {

    const navigation = useNavigation();

    const [university, setUniversity] = useState();

    const getData =async()=>{
        try{
            const universitiesRef = collection(db, 'university');
            const querySnapshot = await getDoc(doc(universitiesRef, item.id));
            const univerityData = {...querySnapshot.data(), id: querySnapshot.id};
            console.log('univerityData',univerityData);
            setUniversity(univerityData);
        }catch(error){
            console.error('Error fetching universities:', error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (

        <View style={styles.cardContainer}>
                <TouchableOpacity  onPress={() => navigation.navigate('UniversityOverview', { universityName : university,path:'WishList' })}>


        <View>
            {/* <Text style={styles.universityTitle}>{item.id}</Text> */}
            <Text style={{color:'black',fontSize:18,fontWeight:'bold'}}>{university?.name}</Text>
            <Text>{university?.about}</Text>
            <Text>{university?.overview}</Text>
            {/* University Bookmark Icon next to the title */}
            {/* <TouchableOpacity onPress={toggleBookmarkUniversity}>
                        <Image 
                        source={bookmarkIconPath} 
                        style={[styles.bookmarkIcon, isBookmarkedUniversity && styles.bookmarkIconSelected]} 
                        />
                        </TouchableOpacity> */}
        </View>
                        </TouchableOpacity>
        </View>
    )
}

export default WishlistItem

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#BCC6CF',
        // borderWidth: 1,
      }
})