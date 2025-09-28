import { Ionicons } from '@expo/vector-icons';
import React, { useLayoutEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, Image, StyleSheet } from 'react-native';

import Footer from '../User/Footer';                 // ⬅️ add footer

const step1Image = require('../../Images/Appointment1.png');
const step2Image = require('../../Images/Appointment2.png'); 
const step3Image = require('../../Images/Appointment3.png');

export default function Appointment({ navigation }) {
  // Hide the native header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const url1 =
    'https://service2.diplo.de/rktermin/extern/choose_category.do?locationCode=dhak&realmId=420&categoryId=2017';

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Appointment</Text>
        <View style={styles.iconPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Step 1 */}
        <Text style={styles.stepText}>
          Step 1 – Click the link below; it is the official website of the German Embassy in Dhaka
          for booking an appointment.
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL(url1)}>
          <Text style={styles.linkText}>{url1}</Text>
        </TouchableOpacity>
        <Text style={styles.stepText}>
          After clicking the link, this window will open. You need to click the New Appointment
          button, which is located in the top right corner, as shown below:
        </Text>
        <Image source={step1Image} style={styles.image} />

        {/* Step 2 */}
        <Text style={styles.stepText}>
          Step 2 – After clicking the New Appointment button, you will be redirected to this window,
          where you need to fill in your personal details to book an appointment.
        </Text>
        <Image source={step2Image} style={styles.image} />
        <Text style={styles.noteLabel}>Note:</Text>
        <Text style={styles.noteText}>
          • Keep the marked section empty if you are not a scholarship applicant.{'\n'}
          • If you are a Bachelor applicant, select Bachelor and leave Master’s fields blank.
        </Text>

        {/* Step 3 */}
        <Text style={styles.stepText}>
          Step 3 – After submitting the application properly, you will receive a confirmation e-mail
          like the one shown:
        </Text>
        <Image source={step3Image} style={styles.image} />
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footerWrap}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1C2E5C' 
  },
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: 20, 
    marginBottom: 20 
  },
  backButton: {
    width: 36,
    height: 36,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPlaceholder: { width: 30 },
  title: { 
    color: '#FFFFFF', 
    fontSize: 24, 
    fontWeight: '600' 
  },

  // Scroll content gets bottom padding so last items aren't under the footer
  content: {
    paddingBottom: 110,
  },

  stepText: { 
    color: '#FFFFFF', 
    fontSize: 14, 
    marginBottom: 12, 
    lineHeight: 20,
    marginLeft:10,
    marginRight:10,
  },
  linkText: { 
    color: '#1E90FF', 
    fontSize: 14, 
    marginBottom: 20,
    marginLeft:10,
    marginRight:10,
  },
  image: { 
    width: '100%', 
    height: 180, 
    borderRadius: 8, 
    marginBottom: 20, 
    resizeMode: 'contain' 
  },
  noteLabel: { 
    color: '#FFFFFF', 
    fontSize: 14, 
    fontWeight: '600', 
    marginTop: 12, 
    marginBottom: 6 
  },
  noteText: { 
    color: '#CCCCCC', 
    fontSize: 12, 
    marginBottom: 20,
    marginLeft:10,
    marginRight:10, 
  },

  // Footer placement
  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
