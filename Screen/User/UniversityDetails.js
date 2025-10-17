
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import srhIcon from '../../Images/srh.png';
import { use, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useProfileAndAuth, useRole } from '../../auth.context';
import * as Linking from 'expo-linking';
import Markdown from 'react-native-markdown-display';
import Toast from 'react-native-toast-message';


export default function UniversityDetails({ route }) {

  const { profile, role } = useProfileAndAuth()
  const navigation = useNavigation();


  const universityName = route.params.universityName;
  const path = route.params.path;


  const [universityData, setUniversityData] = useState();
  const [tab, setTab] = useState('overview');
  const [isMarked, setIsMarked] = useState(false);

  const addToWishlist = async () => {

    const q = query(collection(db, "wishlist"), where("uni_id", "==", universityName.id), where("user_email", "==", profile?.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length !== 0) {
      setIsMarked(!isMarked);
      await deleteDoc(doc(db, "wishlist", querySnapshot.docs[0].id));
      console.log('deleted');
      return;
    }
    else {
      setIsMarked(true)
    }

    try {
      const res = await addDoc(collection(db, "wishlist"), {
        uni_id: universityName.id,
        is_marked: true,
        user_email: profile?.email
      })
      Toast.show({ text1: 'Added successfully', type: 'success', text1Style: { color: 'green', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
    } catch (error) {
      Toast.show({ text1: 'Error adding to wishlist', type: 'error', text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
    }
  }

  const getMarked = async () => {
    setIsMarked(false)
    const q = query(collection(db, "wishlist"), where("uni_id", "==", universityName.id), where("user_email", "==", profile?.email));

    onSnapshot(q, (querySnapshot) => {

      if (querySnapshot.docs.length !== 0) {
        console.log('single data', querySnapshot.docs[0].data().is_marked)
        setIsMarked(querySnapshot.docs[0].data().is_marked)
      }

      if (querySnapshot.docs.length === 0) {
        setIsMarked(false)
      }

    })

  }

  const getUniversity = async () => {
    setUniversityData(null);
    const q = query(collection(db, "university"), where("name", "==", universityName?.name));
    const querySnapshot = await getDocs(q);
    setUniversityData(querySnapshot.docs[0].data())
  }

  const handleWebsitePress = (url) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    setUniversityData(null);
    getUniversity()
  }, [universityName])

  useEffect(() => {
    getMarked()
  }, [universityName.id])


  return (
    <ScrollView contentContainerStyle={styles.container}>


      {/* First Section */}
      <View style={styles.card}>
        <View style={styles.header}>
          {path === 'BachelorList' && <TouchableOpacity onPress={() => path === 'BachelorList' && navigation.navigate('BachelorList')}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>}
          {path === 'MastersList' && <TouchableOpacity onPress={() => navigation.navigate('MastersList')}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>}
          {path === 'WishList' && <TouchableOpacity onPress={() => path === 'WishList' && navigation.navigate('WishList')}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>}
          {path === 'Result' && <TouchableOpacity onPress={() => path === 'Result' && navigation.navigate('Search')}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>}
          {(role === 'user' || role === 'moderator') && <TouchableOpacity onPress={addToWishlist}>
            {isMarked === true ? <Ionicons name="bookmark" size={24} color="white" /> : <Ionicons name="bookmark-outline" size={24} color="white" />}
          </TouchableOpacity>}
        </View>



        <View style={styles.body}>
        </View>

        <Text style={styles.description}>
          {universityData?.name}
        </Text>
      </View>

      {/* Second Card */}
      <View style={styles.main}>


        <TouchableOpacity
          style={styles.button}
          onPress={() => setTab('overview')}
        >
          <Text style={[{ ...styles.buttonText }, { color: tab === 'overview' ? 'indigo' : '#000' }]}>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setTab('requirement')}
        >
          <Text style={[{ ...styles.buttonText }, { color: tab === 'requirement' ? 'indigo' : '#000' }]}>Requirement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setTab('about')}
        >
          <Text style={[{ ...styles.buttonText }, { color: tab === 'about' ? 'indigo' : '#000' }]}>About University</Text>
        </TouchableOpacity>


      </View>



      {/* Third Part — Form */}
      <View style={{ justifyContent: 'space-between',minHeight:680 }}>


        <View>

          {tab === 'overview' && <View style={styles.card2}>
            <Markdown>{universityData?.overview}</Markdown>
          </View>}

          {tab === 'requirement' && <View style={styles.card2}>
            <Markdown>{universityData?.requirements}</Markdown>
          </View>}

          {tab === 'about' && <View style={styles.card2}>
            <Image source={{ uri: universityData?.photo }} style={styles.image} />
            <Markdown>{universityData?.about}</Markdown>
          </View>}
        </View>

        <View>

          <View style={styles.contactHeader}>
            <Text style={styles.contactTitle}>{universityData?.name}</Text>
          <Text style={styles.address}>{universityData?.address}</Text>
          </View>

          {/* Contact Information */}
            <Ionicons name="person-circle" style={{marginHorizontal:'auto'}} size={50} color="#1abc9c" />
          <Text style={styles.address}>{universityData?.advisor_name}</Text>

          {/* Buttons for Phone, Email, and Website */}
          <Text style={styles.buttonText1}>Phone : {universityData?.advisor_phone}</Text>



          <Text style={styles.buttonText1}>Email : {universityData?.advisor_mail}</Text>


          <TouchableOpacity style={styles.button1} onPress={() => handleWebsitePress(universityData?.website)}>
            <Text style={styles.websiteBtnText}>Course website</Text>
          </TouchableOpacity>

          {role === 'admin' && <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('UpdateUniDetails', { university: universityName,path:path })}>
            <Text style={[{ ...styles.buttonText1 }, { fontWeight: 'bold', color: 'white' }]}>Update</Text>
          </TouchableOpacity>}
        </View>
      </View>
      {/* 4th section */}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: '#1C2E5C',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  body: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    height: 227,
    resizeMode: 'contain',
    top: 0,
    marginTop: 5,

  },
  description: {
    color: 'white',
    fontSize: 19,
    textAlign: 'left',
    marginTop: 20,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#d9d9d9',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
    paddingVertical: 12,
  },
  websiteBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },

  /*Third part */
  card2: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  block: {
    marginBottom: 15,
  },
  label: {
    fontSize: 17,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    padding: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  bullet: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  /* 4th section */

  /* 5th section */
  title1: {
    fontSize: 17,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    padding: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  contentTitle: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },

  paragraph: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#040a0bff',
    marginBottom: 15,
    lineHeight: 22,
  },
  /* six th code */
  // Contact Header
  contactHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  contactTitle: {
    color: '#1abc9c',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#888',
  },

  // Contact Information
  address: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },

  // Buttons for Phone, Email, and Website
  button1: {
    backgroundColor: '#1abc9c',
    marginBottom: 10,
    marginHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText1: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },

  // Source Section
  sourceSection: {
    backgroundColor: '#1a2d3f',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sourceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sourceLink: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },


});
