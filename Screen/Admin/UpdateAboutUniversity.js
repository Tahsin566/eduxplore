
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import srhIcon from '../../Images/srh.png';
import srh2Icon from '../../Images/SRH.jpg';

export default function UpdateAboutUniversity() {

  const navigation = useNavigation();

  const fields = [
    'Degree',
    'Course location',
    'Teaching language',
    'Languages',
    'Full-time / part-time',
    'Programme duration',
    'Beginning'
  ];
  
  // Function to handle phone press
  const handlePhonePress = () => {
    Linking.openURL('tel:+493051565020');
  };

  // Function to handle email press
  const handleEmailPress = () => {
    Linking.openURL('mailto:contact@srh-university.com');
  };

  // Function to handle website press
  const handleWebsitePress = () => {
    Linking.openURL('https://www.srh.de/en/');
  };

  // Function to handle source press
  const handleSourcePress = () => {
    Linking.openURL('https://www2.daad.de/deutschland/studienangebote/internationale-programme/en/detail/7801/#tab_overview');
  };
  const handlePress = () => {
    Linking.openURL('https://www.google.com/maps?q=SRH+University+Heidelberg');
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/*........................ First Section ....................*/}
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Update About University</Text>
        </View>

        <View style={styles.body}>
          {/*  <Image source={srhIcon} style={styles.logo} />*/}
        </View>

        <Text style={styles.description}>
          Applied Mechatronic Systems (BEng) {'\n'}SRH Universities. Berlin
        </Text>
      </View>

      {/* .................Second Section ...............*/}
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>OverView</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Requirement</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>About University</Text>
        </TouchableOpacity>
      </View>

        {/* ...............3rd section ...............*/}
    <View>
        <Text style={styles.heading1}>SRH{"\n"}Universities</Text>

       {/* <Image source={srh2Icon} style={styles.logo1} /> */}
      <Text style={styles.caption}>The SRH Universities{"\n"}© SRH Universities</Text>


    {/* Adding TextInput after caption */}
    <View style={styles.details}>
            <TextInput
              style={styles.input}
              placeholder="Enter additional information here"
              placeholderTextColor="#999"
            />
    </View>
      {/*<Image source={require('../assets/srh.png')} style={styles.logo} />*/}
    </View>


    {/* ..............4th section ..............*/}
    <TouchableOpacity style={styles.location} onPress={handlePress}>
      <Ionicons name="location-sharp" size={20} color="#000" style={styles.icon} />
      <Text style={styles.text}>University location</Text>
    </TouchableOpacity>

      <View style={styles.outerContainer}>
          <View style={styles.innerBox}>
            <TextInput
              style={styles.input}
              placeholder="Enter your input........"
              placeholderTextColor="#999"
            />
          </View>
      </View>


    {/*............5th section............... */}
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
        <TouchableOpacity style={styles.button1} onPress={handlePhonePress}>
          <Text style={styles.buttonText1}>+49 30515650200</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={handleEmailPress}>
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
  // Container section
  container: {
    paddingBottom: 20,
    backgroundColor: '#f4f4f4',
    marginLeft: '10',
    marginRight: '10',
  },

  // Card section (Used for the first card and content container)
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
    marginRight: '30',
  },
  body: {
    marginTop: 20,
    alignItems: 'flex-start',
    marginBottom: 20,
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

  // Buttons section (Used for buttons like Overview, Requirement, About University)
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

  // Second card with form details (Used for displaying list of fields)
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

  // 3rd section (SRH University description, image, etc.)
  heading1: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 30,
  },
  logo1: {
    width: 320,
    height: 220,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  caption: {
    fontSize: 12,
    textAlign: 'center',
    color: '#777',
    marginVertical: 8,
  },
  details:{
    margin: 16,
    height: 235,
    backgroundColor: '#d9d9d9',
    borderRadius: 4,
  },
  bodyText: {
    fontSize: 14,
    textAlign: 'justify',
    lineHeight: 22,
    color: '#333',
    paddingHorizontal: 5,
  },

  // 4th section (Big numbers and location)
  box: {
    marginTop: 20,
    width: 220,
    backgroundColor: '#d9d9d9',
    paddingVertical: 30,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
  },
  bigNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginTop: 4,
    lineHeight: 20,
  },
  location: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  outerContainer: {
    backgroundColor: '#2c3e50', // Dark blue-gray
    padding: 12,
    margin: 16,
    borderRadius: 4,
  },
  innerBox: {
    height: 40,
    backgroundColor: '#d9d9d9', // Light gray
    borderRadius: 4,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
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
