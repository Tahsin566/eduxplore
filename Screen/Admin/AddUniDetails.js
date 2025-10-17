import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import srhIcon from '../../Images/srh.png';
import { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase.config';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import Toast from 'react-native-toast-message';

export default function AddUniDetails() {

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
  const [tutionFee, setTutionFee] = useState('');
  const [language, setLanguage] = useState('');
  const [tab, setTab] = useState('overview');

  const [loading, setLoading] = useState(false);

  

  const pickImage = async () => {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Toast.show({
        type: 'error',
        text1: 'Permission to access media library is required!',
        topOffset: -10,
        text1Style: { color: 'red', fontSize: 16 },
        autoHide: true,
        visibilityTime: 1000
      })
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
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
      return data?.secure_url

    } catch (error) {
      Toast.show({ text1: 'Error uploading image', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return ''
    }
  };




  const addUniversity = async () => {

    

    if(!(
      name &&
      overView &&
      requirements &&
      AboutUniversity &&
      person &&
      designation &&
      address &&
      phone &&
      file && 
      email &&
      website &&
      ieltsScore
    )){
      Toast.show({ text1: 'All fields are required', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    const stringRegex = /^[A-Z]{1}[a-zA-Z0-9 .,]*/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const markDown = /[a-zA-Z0-9 -\.,#\*]/;

    if (!stringRegex.test(name) || !stringRegex.test(person) || !stringRegex.test(designation) || !stringRegex.test(address) || !stringRegex.test(language)) {
      Toast.show({ text1: 'Invalid person details', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    if (!emailRegex.test(email)) {
      Toast.show({ text1: 'Invalid email', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    if(!markDown.test(overView) || !markDown.test(requirements) || !markDown.test(AboutUniversity)){
      Toast.show({ text1: 'Invalid details', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    if(!Number(ieltsScore)){
      Toast.show({ text1: 'IELTS score should be a number', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    if(!Number(tutionFee)){
      Toast.show({ text1: 'Tution fee should be a number', type: 'error', topOffset: -10, text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      return
    }

    setLoading(true)

    try {
      await addDoc(collection(db, "university"), {
        name,
        overview: overView,
        requirements,
        about: AboutUniversity,
        photo: await uploadToCloudinary(),
        advisor_name:person,
        advisor_designation:designation,
        address,
        main_language:language,
        tution_fee:tutionFee,
        advisor_phone:phone,
        advisor_mail:email,
        website,
        min_ielts_score:ieltsScore,
        has_bachelor: bachelorCheck,
        has_master: masterCheck,
        has_PhD: phdCheck
      })
      Toast.show({ text1: 'Successfully added', type: 'success', text1Style: { color: 'green', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
      setLoading(false)
      navigation.navigate('UniversityList')
    } catch (error) {
      Toast.show({ text1: 'Error adding document', type: 'error', text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
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
    setLanguage('');
    setTutionFee('');
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
          <Text style={styles.title}>Add University Details</Text>
        </View>

        <View style={styles.body}>
          {/*  <Image source={srhIcon} style={styles.logo} /> */}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.main}>
        <TouchableOpacity onPress={() => setTab('overview')} style={styles.button}>
          <Text style={[{...styles.buttonText}, tab === 'overview' && {color:"indigo"}]}>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setTab('requirement');
          }}
        >
          <Text style={[{...styles.buttonText}, tab === 'requirement' && {color:"indigo"}]}>Requirement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setTab('about');
          }}
        >
          <Text style={[{...styles.buttonText}, tab === 'about' && {color:"indigo"}]}>About University</Text>
        </TouchableOpacity>
      </View>

      {/* Form OverView*/}
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
            value={name}
            placeholder={`Enter the University Name`}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Enter the Overview</Text>
          <TextInput
            style={styles.input}
            multiline
            value={overView}
            onChangeText={setOverView}
            placeholder={`Enter the Overview`}
            placeholderTextColor="#999"
          />
          <Text>Enter main language</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: '#ccc',
              borderWidth: 1,
              marginVertical: 10,
              borderRadius: 8,
              padding: 10
            }}
            onChangeText={setLanguage}
            value={language}
            placeholder={`Main language`}
            placeholderTextColor="#999"
          />
          <Text>Enter the Tution fee</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: '#ccc',
              borderWidth: 1,
              marginVertical: 10,
              borderRadius: 8,
              padding: 10
            }}
            onChangeText={setTutionFee}
            value={tutionFee}
            placeholder={`Tution Fee per semester`}
            placeholderTextColor="#999"
          />
        </View>
      </View>}

            {/* Form OverView*/}
      {tab === 'requirement' && <View style={styles.formSection}>
        {/* {fields.map((label, index) => ( */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter the Requirements</Text>
          <TextInput
            style={styles.input}
            multiline
            value={requirements}
            onChangeText={setRequirements}
            placeholder={`Enter the Requirements`}
            placeholderTextColor="#999"
          />
        </View>
        {/* ))} */}
      </View>}
            {/* Form OverView*/}
      {tab === 'about' && <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter the University Photo</Text>
          {image && <Image source={{ uri: image }} style={{ width: '90%', height: 200, resizeMode: 'cover', top: 0 }} />}
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Ionicons name='cloud-upload-outline' size={24} color='#000' />
            <View style={{ width: 10 }}></View>
            <Text style={{ color: '#000' }}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter the About University</Text>
          <TextInput
            style={styles.input}
            multiline
            value={AboutUniversity}
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
            value={person}
            onChangeText={setPerson}
            placeholder={`Name`}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.singleInput}
            multiline
            value={designation}
            onChangeText={setDesignation}
            placeholder={`Designation`}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.singleInput}
            multiline
            value={phone}
            keyboardType="numeric"
            onChangeText={setPhone}
            placeholder={`Phone number`}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.singleInput}
            multiline
            value={email}
            onChangeText={setEmail}
            placeholder={`Email`}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.singleInput}
            multiline
            value={address}
            onChangeText={setAddress}
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
            value={website}
            onChangeText={setWebsite}
            placeholder={`Official Website link`}
            placeholderTextColor="#999"
          />
        </View>
      </View>}


      <TouchableOpacity onPress={addUniversity} style={styles.button1}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText1}>Add university</Text>}
      </TouchableOpacity>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 350


  },
  uploadButton: {
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#1C2E5C',
    padding: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
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
    marginRight: 'auto',
    marginLeft: 'auto'
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
    backgroundColor: '#fff'
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
});
