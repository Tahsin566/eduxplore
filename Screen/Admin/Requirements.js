
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import srhIcon from '../../Images/srh.png';
import  { useState } from 'react';


export default function Requirement() {
  const navigation = useNavigation();
  
  // Function to handle website press
  const handleWebsitePress = () => {
    Linking.openURL('https://www.srh.de/en/');
  };

  // Function to handle source press
  const handleSourcePress = () => {
    Linking.openURL('https://www2.daad.de/deutschland/studienangebote/internationale-programme/en/detail/7801/#tab_overview');
  };


const [admissionRequirements, setAdmissionRequirements] = useState([
    "General higher education entrance qualification (Abitur) or university of applied sciences entrance qualification (Fachhochschulreife)",
    "Please note that applicants with foreign degrees might be eligible for direct entry. This means that applicants who meet the requirements DON'T need to do a foundation year before starting their Bachelor's.",
    "Proof of English language proficiency",
    "Curriculum vitae",
    "Copy of your passport/ID",
  ]);

  const [languageRequirements, setLanguageRequirements] = useState([
    "TOEFL Internet-based: 87",
    "TOEIC listening/reading: 785, speaking: 160, writing: 150",
    "IELTS/IELTS Online (academic): 6.5",
    "CAE (grades A, B, or C)",
    "CPE (grades A, B, or C)",
    "Pearson English Test Academic (PTE-A): 59 points",
    "Linguaskill: 176 to 184 (CES) - all four skills required",
    "B2 First: 173",
    "Duolingo: 110 points",
  ]);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* First Section */}
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Requirement</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('WishList')}>
            <Ionicons name="bookmark-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
           {/* <Image source={srhIcon} style={styles.logo} /> */}
        </View>

        <Text style={styles.description}>
          Applied Mechatronic Systems (BEng) {'\n'}SRH Universities. Berlin
        </Text>
      </View>

      {/* Second Card */}
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.button}>
          <Text style={styles.buttonText}>OverView</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Requirement</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>About University</Text>
        </TouchableOpacity>
      </View>

      {/* Third Part — Form */}
<View style={styles.card2}>
<View style={styles.block}>
        <Text style={styles.label}>Academic admission requirements</Text>
        {admissionRequirements.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.block}>
        <Text style={styles.label}>Language requirements</Text>
        <Text style={styles.text}>
          The following English proficiency tests are accepted:
        </Text>
        {languageRequirements.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}
      </View>
</View>


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
  // second section
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

  // third section
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
  text: {
  flex: 1,
  fontSize: 16,
  color: '#333',
},
listItem: {
  flexDirection: 'row',
  paddingHorizontal: 20,
  paddingVertical: 8,
  fontSize: 16,
  color: '#333',
},
bullet: {
  fontSize: 16,
  color: '#333',
  marginRight: 5,
},

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

