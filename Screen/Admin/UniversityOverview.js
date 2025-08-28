
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import srhIcon from '../../Images/srh.png';
import { use, useEffect, useState } from 'react';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useRole } from '../../auth.context';


export default function UniversityOverview({ route }) {

  const navigation = useNavigation();

  const universityName = route.params.universityName;


  const path = route.params.path;
  const [universityData, setUniversityData] = useState();

  const { profile,role } = useRole()

  // console.log(universityName)

  const [tab, setTab] = useState('overview');
  const [isMarked, setIsMarked] = useState(null);

  const [degree, setDegree] = useState('Bachelor of Engineering');
  const [courseLocation, setCourseLocation] = useState('Berlin');
  const [teachingLanguage, setTeachingLanguage] = useState('English');
  const [languages, setLanguages] = useState('The programme is taught in English.');
  const [fullTimePartTime, setFullTimePartTime] = useState('full-time');
  const [programmeDuration, setProgrammeDuration] = useState('7 semesters');
  const [beginning, setBeginning] = useState('Winter and summer semester');

  const [additionalInfo, setAdditionalInfo] = useState('Intake: April & October');

  const [applicationDeadlines, setApplicationDeadlines] = useState([
    "Non-EU/EEA applicants: Please apply by 1 February (April intake) or 15 August (October intake). We also recommend that you apply early (at least four months before the start of your programme).",
    "EU/EEA applicants: Please apply by 1 April (April intake) or 1 October (October intake)."
  ]);

  const [tuitionFee, setTuitionFee] = useState('4,800 EUR');

  const [additionalTuitionInfo, setAdditionalTuitionInfo] = useState([
    'Non-EU/EEA tuition fees: 4,800 EUR per semester',
    'EU/EEA (including Switzerland, Western Balkans and Ukraine) tuition fees: 690 EUR per month',
    'Please note: The monthly/semester tuition fees remain the same for the entire duration of the study programme.'
  ]);
  const [jointDegree, setjointDegree] = useState([
    'No'
  ]);
  const [DescriptionContent, setDescriptionContent] = useState([
    'Our BEng Applied Mechatronic Systems programme combines mechanical engineering',
    'electrical engineering and computer science. Strengthen your technical expertise,',
    'design solutions for electromechanical systems and hone your soft skills',
    'The Bachelors programme in Applied Mechatronic Systems at SRH will allow you to gain',
    'a clear understanding of the relevant disciplines of mechatronics, including mechanical',
    'engineering, electrical engineering and computer science. Apart from brushing up necessary',
    'skills in mathematics, physics, and statistics, you will get to deepen your programming',
    'intercultural and communication skills.'
  ]);

  // Function to handle website press
  const handleWebsitePress = () => {
    Linking.openURL('https://www.srh.de/en/');
  };

  // Function to handle source press
  const handleSourcePress = () => {
    Linking.openURL('https://www2.daad.de/deutschland/studienangebote/internationale-programme/en/detail/7801/#tab_overview');
  };

  const addToWishlist = async () => {

    const q = query(collection(db, "wishlist"), where("id", "==", universityName.id), where("email", "==", profile?.email));
    const querySnapshot = await getDocs(q);
    setIsMarked(!isMarked)
    if (querySnapshot.docs.length !== 0) {
      await updateDoc(doc(db, "wishlist", querySnapshot.docs[0].id), { isMarked: !isMarked });
      console.log('updated');
      return;
    }

    try {
      const res = await addDoc(collection(db, "wishlist"), {
        id: universityName.id,
        isMarked: true,
        email: profile?.email
      })
      console.log('Inserted document with ID: ', res.id);
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  }

  const getMarked = async () => {
    const q = query(collection(db, "wishlist"), where("id", "==", universityName.id), where("email", "==", profile?.email));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.docs.length !== 0){
      console.log('single data', querySnapshot.docs[0].data().isMarked)
      setIsMarked(querySnapshot.docs[0].data().isMarked)
    }

    if(querySnapshot.docs.length === 0){
      setIsMarked(false)
    }
  }

  const getUniversity = async () => {
    setUniversityData(null);
    const q = query(collection(db, "university"), where("name", "==", universityName?.name));
    const querySnapshot = await getDocs(q);
    setUniversityData(querySnapshot.docs[0].data())
  }

  useEffect(() => {
    getUniversity()
  },[universityName.name])

  useEffect(() => {
    getMarked()
  },[universityName.id])


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* First Section */}
      <View style={styles.card}>
        <View style={styles.header}>
          {path === 'BachelorList' && <TouchableOpacity onPress={() => path === 'BachelorList' && navigation.navigate('BachelorList')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>}
          {path === 'MastersList' && <TouchableOpacity onPress={() => navigation.navigate('MastersList')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>}
          {path === 'WishList' && <TouchableOpacity onPress={() => path === 'WishList' && navigation.navigate('WishList')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>}
          {path === 'Result' && <TouchableOpacity onPress={() => path === 'Result' && navigation.navigate('Result')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>}
          {/* <Text style={styles.title}>Overview {isMarked ? 'Marked' : 'Not Marked'}</Text> */}
          <TouchableOpacity onPress={addToWishlist}>
            {isMarked === true ? <Ionicons name="bookmark" size={24} color="white" /> : <Ionicons name="bookmark-outline" size={24} color="white" />}
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Image source={srhIcon} style={styles.logo} />
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
          <Text style={styles.buttonText}>OverView</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setTab('requirement')}
        >
          <Text style={styles.buttonText}>Requirement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setTab('about')}
        >
          <Text style={styles.buttonText}>About University</Text>
        </TouchableOpacity>
      </View>



      {/* Third Part — Form */}
      <View style={{ gap: 10 }}>

        {tab === 'overview' && <View style={styles.card2}>
          <Text style={styles.paragraph}>{universityData?.overview}</Text>
        </View>}

        {tab === 'requirement' && <View style={styles.card2}>
          <Text style={styles.paragraph}>{universityData?.requirements} 2</Text>
        </View>}

        {tab === 'about' && <View style={styles.card2}>
          <Text style={styles.paragraph}>{universityData?.about} 3</Text>
        </View>}
      </View>

      {/* Additional information */}
      {/* <View>
        <View style={styles.block}>
          <Text style={styles.label}>Additional information on beginning, duration and mode of study</Text>
          <Text style={styles.value}>{additionalInfo}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Application deadline</Text>
          {applicationDeadlines.map((item, index) => (
            <Text key={index} style={styles.paragraph}>{item}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Tuition fees per semester in EUR</Text>
          <Text style={styles.paragraph}>{tuitionFee}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Additional information on tuition fees</Text>
          {additionalTuitionInfo.map((item, index) => (
            <Text key={index} style={styles.bullet}>• {item}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>jointDegree / DoubleDegree programme</Text>
          {jointDegree.map((item, index) => (
            <Text key={index} style={styles.bullet}>• {item}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Description / Content</Text>
          {DescriptionContent.map((item, index) => (
            <Text key={index} style={styles.bullet}>• {item}</Text>
          ))}
        </View>

      </View> */}




      {/* 4th section */}
      <View>
        <View style={styles.contactHeader}>
          <Ionicons name="person-circle" size={50} color="#1abc9c" />
          <Text style={styles.contactTitle}>SRH Universities</Text>
          <Text style={styles.subTitle}>Study Advisor</Text>
        </View>

        {/* Contact Information */}
        <Text style={styles.address}>Sonnenallee 221</Text>
        <Text style={styles.address}>12059 Berlin</Text>

        {/* Buttons for Phone, Email, and Website */}
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText1}>+49 30515650200</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText1}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={handleWebsitePress}>
          <Text style={styles.buttonText1}>Course website</Text>
        </TouchableOpacity>

        {role === 'admin' && <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('UpdateOVerView', { university: universityName })}>
          <Text style={styles.buttonText1}>Update</Text>
        </TouchableOpacity>}

        {/* Source */}
        <View style={styles.sourceSection}>
          <Text style={styles.sourceText}>Source</Text>
          <TouchableOpacity onPress={handleSourcePress}>
            <Text style={styles.sourceLink}>https://www2.daad.de/deutschland/studienangebote/internationale-programme/en/detail/7801/#tab_overview</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: '#f4f4f4',
    marginLeft: '10',
    marginRight: '10',
  },
  card: {
    backgroundColor: '#1a2d3f',
    padding: 15,
  },
  header: {
    marginTop: 30,
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
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },

  /*Third part */
  card2: {
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
    marginVertical: 5,
  },

  // Buttons for Phone, Email, and Website
  button1: {
    backgroundColor: '#1abc9c',
    marginBottom: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText1: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
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
