import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDoc} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useNavigation } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import { Ionicons } from '@expo/vector-icons';

const WishlistItem = ({ item }) => {

    const navigation = useNavigation();

    const [university, setUniversity] = useState();

    const getData = async () => {
        try {
            setUniversity(null);
            const universitiesRef = collection(db, 'university');
            const querySnapshot = await getDoc(doc(universitiesRef, item.id));
            const univerityData = { ...querySnapshot.data(), id: querySnapshot.id };
            console.log('univerityData', univerityData);
            setUniversity(univerityData);

        } catch (error) {
            console.error('Error fetching universities:', error);
        }
    }

    const deleteFromWishlist = async (item) => {
        try {
            await deleteDoc(doc(db, "wishlist", item.docid));
            console.log('deleted');
        } catch (error) {
            console.log('Error adding document: ', error);
        }
    }


    useEffect(() => {
        getData();
    }, []);

    return (

        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('UniversityOverview', { universityName: university, path: 'WishList' })}>


                <View>
                    {/* <Text style={styles.universityTitle}>{item.id}</Text> */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{university?.name}</Text>
                    <Markdown>{university?.about}</Markdown>
                    <Markdown>
                        <Text numberOfLines={2}>{university?.overview}</Text>
                    </Markdown>
                    
                </View>

                <TouchableOpacity onPress={() => deleteFromWishlist(item)} style={{ position: 'absolute', top: 0, right: 1}}>
                    <Ionicons name="trash" size={24} color="black" />
                </TouchableOpacity>
                
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
    }
})