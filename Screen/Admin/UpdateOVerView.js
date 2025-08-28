import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import srhIcon from '../../Images/srh.png';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useRole } from '../../auth.context';

export default function UpdateOverView({ route }) {
  const navigation = useNavigation();

  const university = route.params.university

  console.log(university.id)

  const fields = [
    'Degree',
    'Course location',
    'Teaching language',
    'Languages',
    'Full-time / part-time',
    'Programme duration',
    'Beginning',
    'Additional information on beginning, duration and mode of study',
    'Application deadline',
    'Tuition fees per semester in EUR',
    'Additional information on tuition fees',
    'Joint degree / double degree programme',
    'Description/content'
  ];

  const [tab, setTab] = useState('overview');
  const [name, setName] = useState('');
  const [overview, setOverview] = useState('');
  const [requirements, setRequirements] = useState('');
  const [about, setAbout] = useState('');

  // Contact handlers
  const handlePhonePress = () => {
    Linking.openURL('tel:+493051565020');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:contact@srh-university.com');
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://www.srh.de/en/');
  };

  const handleSourcePress = () => {
    Linking.openURL('https://www2.daad.de/deutschland/studienangebote/internationale-programme/en/detail/7801/#tab_overview');
  };

  const handleUpdate = async() => {
    try {
      await updateDoc(doc(db,'university',university?.id),{
        name: name ? name : university?.name,
        overview: overview ? overview : university?.overview,
        requirements: requirements ? requirements : university?.requirements,
        about: about ? about : university?.about
      })
      console.log('Document updated');
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };

  // const getData = async()=>{
  //   const q = query(collection(db,'university'),where('name','==',university?.name));
  //   const res = await getDocs(q);

  //   res.docs.map((doc)=>{
  //     console.log(doc.data());
  //     setName(doc.data().name);
  //     setOverview(doc.data().overview);
  //     setRequirements(doc.data().requirements);
  //     setAbout(doc.data().about);
  //   })
  // }

  useEffect(() => {

    setName('');
    setOverview('');
    setRequirements('');
    setAbout('');

    setTimeout(() => {
      setName(university?.name);
      setOverview(university?.overview);
      setRequirements(university?.requirements);
      setAbout(university?.about);
    },0);

  }, [university]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('UniversityList')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Update Overview</Text>
        </View>

        <View style={styles.body}>
          {/* <Image source={srhIcon} style={styles.logo} />*/}
        </View>

        <Text style={styles.description}>
          Applied Mechatronic Systems (BEng) {'\n'}SRH Universities. Berlin
        </Text>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.main}>
        <TouchableOpacity style={styles.button} onPress={() => setTab('overview')}>
          <Text style={styles.buttonText}>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setTab('requirements')}
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

      {/* Form */}
      {tab === 'overview' && <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Update University</Text>
          <TextInput
            style={[{ ...styles.input }]}
            multiline
            value={name}
            onChangeText={setName}
            placeholder={`update university name here...`}
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Update Overview</Text>
          <TextInput
            style={[{ ...styles.input }, { height: 200 }]}
            multiline
            onChangeText={setOverview}
            value={overview}
            placeholder={`update overview here...`}
            placeholderTextColor="#999"
          />
        </View>
      </View>}


      {tab === 'requirements' && <View style={styles.formSection}>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Update Requirements</Text>
          <TextInput
            style={[{ ...styles.input }, { height: 200 }]}
            multiline
            onChangeText={setRequirements}
            value={requirements}
            placeholder={`update requirements here...`}
            placeholderTextColor="#999"
          />
        </View>
      </View>}


      {tab === 'about' && <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Update About</Text>
          <TextInput
            style={[{ ...styles.input }, { height: 200 }]}
            multiline
            onChangeText={setAbout}
            value={about}
            placeholder={`update about university here...`}
            placeholderTextColor="#999"
          />
        </View>
      </View>}

      {/* Contact Info */}
      <TouchableOpacity style={[{...styles.button1},{marginHorizontal:10}]} onPress={handleUpdate}>
          <Text style={styles.buttonText1}>Save changes</Text>
        </TouchableOpacity>
      <View>
        <View style={styles.contactHeader}>
          <Ionicons name="person-circle" size={50} color="#1abc9c" />
          <Text style={styles.contactTitle}>SRH Universities</Text>
          <Text style={styles.subTitle}>Study Advisor</Text>
        </View>

        

        <Text style={styles.address}>Sonnenallee 221</Text>
        <Text style={styles.address}>12059 Berlin</Text>

        <TouchableOpacity style={styles.button1} onPress={handlePhonePress}>
          <Text style={styles.buttonText1}>+49 30515650200</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={handleEmailPress}>
          <Text style={styles.buttonText1}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={handleWebsitePress}>
          <Text style={styles.buttonText1}>Course website</Text>
        </TouchableOpacity>

        <View style={styles.sourceSection}>
          <Text style={styles.sourceText}>Source</Text>
          <TouchableOpacity onPress={handleSourcePress}>
            <Text style={styles.sourceLink}>
              https://www2.daad.de/deutschland/studienangebote/internationale-programme/en/detail/7801/#tab_overview
            </Text>
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
    marginRight: '65',
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
  formSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a2d3f',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },

  /*
  placeholderBox: {
    width: 350,
    height: 40,
    backgroundColor: '#d9d9d9',
    borderRadius: 4,
    alignSelf: 'center',
  },
  placeholderSmall: {
    width: 350,
    height: 40,
    backgroundColor: '#d9d9d9',
    borderRadius: 4,
    marginBottom: 20,
    alignSelf: 'center',
  },
  placeholderLarge: {
    width: 350,
    height: 200,
    backgroundColor: '#d9d9d9',
    borderRadius: 4,
    marginBottom: 20,
    alignSelf: 'center',
  }, */



  // 5th section (Contact information and buttons)
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
  address: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 5,
  },
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

  // Source Section (For displaying source link)
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
