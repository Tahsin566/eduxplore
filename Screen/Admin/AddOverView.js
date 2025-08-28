import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import srhIcon from '../../Images/srh.png';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase.config';

export default function AddOverView() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [overView, setOverView] = useState('');
  const [requirements, setRequirements] = useState('');
  const [AboutUniversity, setAboutUniversity] = useState('');

  const [tab, setTab] = useState('overview');

  const fields = [
    'Enter the Overview',
  ];

  const handleWebsitePress = () => {
    Linking.openURL('https://www.srh.de/en/');
  };

  const handleSourcePress = () => {
    Linking.openURL('https://www2.daad.de/deutschland/studienangebote/internationale-programme/en/detail/7801/#tab_overview');
  };

  const add = async() => {
    
    try {
      const res = await addDoc(collection(db,"university"),{
        name,
        overview:overView,
        requirements,
        about:AboutUniversity,
        url:'',
        photo
      })
      console.log('Inserted document with ID: ', res.id);
    } catch (error) {
      console.log('Error adding document: ', error);
    }

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('UniversityList')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Add Overview</Text>
        </View>

        <View style={styles.body}>
          {/*  <Image source={srhIcon} style={styles.logo} /> */}
        </View>

        <Text style={styles.description}>
          Applied Mechatronic Systems (BEng) {'\n'}SRH Universities. Berlin
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.main}>
        <TouchableOpacity onPress={() => setTab('overview')} style={styles.button}>
          <Text style={styles.buttonText}>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setTab('requirement');
          }}
        >
          <Text style={styles.buttonText}>Requirement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>{
            setTab('about');
          }}
        >
          <Text style={styles.buttonText}>About University</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      {tab === 'overview' && <View style={styles.formSection}>
        
          <View style={styles.inputGroup}>
            <Text>Enter the University Name</Text>
            <TextInput
              style={{
                height: 40,
                borderColor: '#ccc',
                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 8,
                padding: 10
              }}
              onChangeText={setName}
              placeholder={`Enter the University Name`}
              placeholderTextColor="#999"
            />
          
            <Text style={styles.label}>Enter the Overview</Text>
            <TextInput
              style={styles.input}
              multiline
              onChangeText={setOverView}
              placeholder={`Enter the Overview`}
              placeholderTextColor="#999"
            />
          </View>
      </View>}

      {tab === 'requirement' && <View style={styles.formSection}>
        {/* {fields.map((label, index) => ( */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter the Requirements</Text>
            <TextInput
              style={styles.input}
              multiline
              onChangeText={setRequirements}
              placeholder={`Enter the Requirements`}
              placeholderTextColor="#999"
            />
          </View>
        {/* ))} */}
      </View>}

      {tab === 'about' && <View style={styles.formSection}>
        {/* {fields.map((label, index) => ( */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter the About University</Text>
            <TextInput
              style={styles.input}
              multiline
              onChangeText={setAboutUniversity}
              placeholder={`Enter the About University`}
              placeholderTextColor="#999"
            />
          </View>
        {/* ))} */}
      </View>}


        <TouchableOpacity onPress={add} style={styles.button1}>
          <Text style={styles.buttonText1}>Add university</Text>
        </TouchableOpacity>


      


      {/* .............. 4th part ...............*/}

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
    marginRight: '88',
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
    height: 250,
    fontSize: 16,
    textAlignVertical: 'top',
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
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
