import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import srhIcon from '../../Images/srh.png';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useRole } from '../../auth.context';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import Toast from 'react-native-toast-message';

export default function UpdateOverView({ route }) {
  const navigation = useNavigation();

  const university = route.params.university
  const path = route.params.path

  console.log(university.id)

  const [image, setImage] = useState('');
  const [file, setFile] = useState(null);

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
  const [person, setPerson] = useState('');
  const [designation, setDesignation] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [ieltsScore, setIeltsScore] = useState('');
  const [bachelorCheck, setBachelorCheck] = useState(false);
  const [masterCheck, setMasterCheck] = useState(false);
  const [phdCheck, setPhdCheck] = useState(false);

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


  const regexCheck = (input, name, value) => {

    const stringRegex = /^[A-Z]+[a-zA-Z0-9 .,]*/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const markDown = /[a-zA-Z0-9 -\.,#\*]/;

    if(!input) return

    if(input === 'overview' || input === 'requirements' || input === 'about') {
      if (!markDown.test(name)) {
        Toast.show({ text1: 'Invalid details', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
        return
      }
    }

    if(input === 'name' || input === 'person' || input === 'designation' || input === 'address') {
      if (!stringRegex.test(name)) {
        Toast.show({ text1: 'Invalid person details', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
        return
      }
    }

    if(input === 'email') {
      if (!emailRegex.test(name)) {
        Toast.show({ text1: 'Invalid email', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
        return
      }
    }

    if(input === 'ieltsScore') {
      if (!Number(name)) {
        Toast.show({ text1: 'Invalid IELTS score', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
        return
      }
    }

    return name ? name : value

    
  }

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


  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, 'university', university?.id), {

        name:regexCheck('name',name,university?.name),
        overview:regexCheck('overview',overview,university?.overview),
        requirements:regexCheck('requirements',requirements,university?.requirements),
        about:regexCheck('about',about,university?.about),
        photo:image !== '' ? await uploadToCloudinary() : university?.photo,
        person:regexCheck('person',person,university?.person),
        designation:regexCheck('designation',designation,university?.designation),
        address:regexCheck('address',address,university?.address),
        phone:regexCheck('phone',phone,university?.phone),
        email:regexCheck('email',email,university?.email),
        website:regexCheck('website',website,university?.website),
        ieltsScore:regexCheck('ieltsScore',ieltsScore,university?.ieltsScore),
        hasBachelor: bachelorCheck,
        hasMaster: masterCheck,
        hasPhd: phdCheck

      })
      console.log('Document updated');
      navigation.navigate('UniversityList')
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };


  useEffect(() => {

    setFile(null)
    setImage('')

    setName('');
    setOverview('');
    setRequirements('');
    setAbout('');
    setPerson('');
    setDesignation('');
    setAddress('');
    setPhone('');
    setEmail('');
    setWebsite('');

    setTimeout(() => {
      setName(university?.name);
      setOverview(university?.overview);
      setRequirements(university?.requirements);
      setAbout(university?.about);
      setPerson(university?.person);
      setDesignation(university?.designation);
      setAddress(university?.address);
      setPhone(university?.phone);
      setEmail(university?.email);
      setWebsite(university?.website);
      setIeltsScore(university?.ieltsScore);
      setBachelorCheck(university?.hasBachelor);
      setMasterCheck(university?.hasMaster);
      setPhdCheck(university?.hasPhd);
    }, 5);

  }, [university?.id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.card}>
        <View style={styles.header}>
          {path === 'BachelorList' && <TouchableOpacity onPress={() => path === 'BachelorList' && navigation.navigate('BachelorList')}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>}
          {path === 'MastersList' && <TouchableOpacity onPress={() => navigation.navigate('MastersList')}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>}
          {path === 'PhDList' && <TouchableOpacity onPress={() => path === 'WishList' && navigation.navigate('WishList')}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>}
          <Text style={styles.title}>Update Overview</Text>
        </View>

        <View style={styles.body}>
          {/* <Image source={srhIcon} style={styles.logo} />*/}
        </View>


      </View>

      {/* Navigation Tabs */}
      <View style={styles.main}>
        <TouchableOpacity style={styles.button} onPress={() => setTab('overview')}>
          <Text style={[{...styles.buttonText},{color:tab === 'overview' ? 'indigo' : '#000'}]}>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setTab('requirements')}
        >
          <Text style={[{...styles.buttonText},{color:tab === 'requirements' ? 'indigo' : '#000'}]}>Requirement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setTab('about')}
        >
          <Text style={[{...styles.buttonText},{color:tab === 'about' ? 'indigo' : '#000'}]}>About University</Text>
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
          <Text style={styles.label}>Enter the University Photo</Text>
          {image && <Image source={{ uri: image }} style={{ width: '90%', height: 200, resizeMode: 'cover', top: 0 }} />}
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={{ color: '#000' }}>Upload Photo</Text>
          </TouchableOpacity>
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
      <Text style={[{ ...styles.label }, { marginHorizontal: 10 }]}>University Degree</Text>
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
      <View style={styles.separator}>
        <Text style={styles.label}>Enter contact information</Text>
        <TextInput
          style={styles.singleInput}
          onChangeText={setPerson}
          value={person}
          multiline
          placeholder={`Name`}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.singleInput}
          multiline
          onChangeText={setDesignation}
          value={designation}
          placeholder={`Designation`}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.singleInput}
          multiline
          onChangeText={setPhone}
          value={phone}
          placeholder={`Phone number`}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.singleInput}
          multiline
          onChangeText={setEmail}
          value={email}
          placeholder={`Email`}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.singleInput}
          multiline
          onChangeText={setAddress}
          value={address}
          placeholder={`address`}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.singleInput}
          multiline
          value={ieltsScore}
          onChangeText={setIeltsScore}
          placeholder={`Minimum IELTS Score`}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.singleInput}
          multiline
          onChangeText={setWebsite}
          value={website}
          placeholder={`Official Website link`}
          placeholderTextColor="#999"
        />
      </View>

      {/* Contact Info */}
      <TouchableOpacity style={[{ ...styles.button1 }, { margin: 10, marginHorizontal: 20 }]} onPress={handleUpdate}>
        <Text style={styles.buttonText1}>Save changes</Text>
      </TouchableOpacity>
      <View>
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1C2E5C',
    padding: 15,
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
  separator: {
    gap: 10,
    paddingHorizontal: 20,
  },
  singleInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
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
  uploadButton: {
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
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
