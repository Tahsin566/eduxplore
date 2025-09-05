import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Linking, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import srhIcon from '../../Images/srh.png';
import { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase.config';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';

export default function AddOverView() {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const [bachelorCheck, setBachelorCheck] = useState(false);
  const [masterCheck, setMasterCheck] = useState(false);
  const [phdCheck, setPhdCheck] = useState(false);

  const [overView, setOverView] = useState('');
  const [requirements, setRequirements] = useState('');
  const [AboutUniversity, setAboutUniversity] = useState('');
  const [person, setPerson] = useState('');
  const [designation, setDesignation] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [ieltsScore, setIeltsScore] = useState('');

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


  const pickImage = async () => {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const newFile = {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].fileName
      }
      setImage(result.assets[0].uri);
      setFile(newFile);
    }
  };


  const uploadToCloudinary = async () => {


    if (!file) return

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'images-expo-app');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dkmdyo7bm/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(data)
      // console.log(JSON.stringify(data, null, 2));
      return data?.secure_url

    } catch (error) {
      console.log('Error uploading image:', error.message);
      return ''
    }
  };


  const addUniversity = async () => {

    try {
      const res = await addDoc(collection(db, "university"), {
        name,
        overview: overView,
        requirements,
        about: AboutUniversity,
        photo: await uploadToCloudinary(),
        person,
        designation,
        address,
        phone,
        email,
        website,
        ieltsScore,
        hasBachelor: bachelorCheck,
        hasMaster: masterCheck,
        hasPhd: phdCheck
      })
      console.log('Inserted document with ID: ', res.id);
      navigation.navigate('UniversityList')
    } catch (error) {
      console.log('Error adding document: ', error);
    }

  }

  useEffect(() => {
    setName('');
    setOverView('');
    setRequirements('');
    setAboutUniversity('');
    setPerson('');
    setDesignation('');
    setAddress('');
    setPhone('');
    setEmail('');
    setWebsite('');
    setIeltsScore('');
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('UniversityList')}>
            <Ionicons name="chevron-back" size={24} color="white" />
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
          onPress={() => {
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter the University Photo</Text>
          {image && <Image source={{ uri: image }} style={{ width: '90%', height: 200, resizeMode: 'cover', top: 0 }} />}
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={{ color: '#000' }}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter the About University</Text>
          <TextInput
            style={styles.input}
            multiline
            onChangeText={setAboutUniversity}
            placeholder={`Enter the About University`}
            placeholderTextColor="#999"
          />
          <Text style={styles.label}>University Degree</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={bachelorCheck}
              onValueChange={setBachelorCheck}
              color={bachelorCheck ? '#1a2d3f' : undefined}
            />
            <Text>Bachelor</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={masterCheck}
              onValueChange={setMasterCheck}
              color={masterCheck ? '#1a2d3f' : undefined}
            />
            <Text>Masters</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={phdCheck}
              onValueChange={setPhdCheck}
              color={phdCheck ? '#1a2d3f' : undefined}
            />
            <Text>PHD</Text>
          </View>
        </View>
        <View style={styles.separator}>
          <Text style={styles.label}>Enter contact information</Text>
          <TextInput
            style={styles.singleInput}
            multiline
            onChangeText={setPerson}
            placeholder={`Name`}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.singleInput}
            multiline
            onChangeText={setDesignation}
            placeholder={`Designation`}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.singleInput}
            multiline
            onChangeText={setPhone}
            placeholder={`Phone number`}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.singleInput}
            multiline
            onChangeText={setEmail}
            placeholder={`Email`}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.singleInput}
            multiline
            onChangeText={setAddress}
            placeholder={`address`}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.singleInput}
            multiline
            onChangeText={setIeltsScore}
            placeholder={`Minimum IELTS Score`}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.singleInput}
            multiline
            onChangeText={setWebsite}
            placeholder={`Official Website link`}
            placeholderTextColor="#999"
          />
        </View>
      </View>}







      {/* .............. 4th part ...............*/}

      <View>
        {/* <View style={styles.contactHeader}>
          <Ionicons name="person-circle" size={50} color="#1abc9c" />
          <Text style={styles.contactTitle}>SRH Universities</Text>
          <Text style={styles.subTitle}>Study Advisor</Text>
        </View> */}

        {/* Contact Information */}
        {/* <Text style={styles.address}>Sonnenallee 221</Text>
        <Text style={styles.address}>12059 Berlin</Text> */}

        {/* Buttons for Phone, Email, and Website */}
        {/* <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText1}>+49 30515650200</Text>
          </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText1}>Email</Text>
          </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.button1} onPress={handleWebsitePress}>
          <Text style={styles.buttonText1}>Course website</Text>
          </TouchableOpacity> */}

        {/* Source */}
        {/* <View style={styles.sourceSection}>
          <Text style={styles.sourceText}>Source</Text>
          <TouchableOpacity onPress={handleSourcePress}>
          <Text style={styles.sourceLink}>https://www2.daad.de/deutschland/studienangebote/internationale-programme/en/detail/7801/#tab_overview</Text>
          </TouchableOpacity>
          </View> */}
      </View>


      <TouchableOpacity onPress={addUniversity} style={styles.button1}>
        <Text style={styles.buttonText1}>Add university</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 400


  },
  uploadButton: {
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#1a2d3f',
    padding: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
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
  separator: {
    gap: 10,
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
    marginVertical: 8,
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
  singleInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
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
    marginHorizontal: 20,
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
