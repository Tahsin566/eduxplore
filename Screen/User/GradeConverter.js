import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, Dimensions, Image, Text, ScrollView, StyleSheet} from 'react-native';

const { width } = Dimensions.get('window');

export default function Menu({ navigation }) {
  const [visible, setVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-width * 0.75))[0];

  const toggleMenu = () => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: -width * 0.75,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    } else {
      setVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const menuItems = [
    { label: 'Home', route: 'Home' },
    { label: 'Appointment', route: 'Appointment' },
    { label: 'Find a University', route: 'FindUniversity' },
    { label: 'Enrollment', route: 'Enrollment' },
    { label: 'Document Submission', route: 'DocumentSubmission' },
    { label: 'VPD Calculator', route: 'VPDCalculator' },
    { label: 'Seminars', route: 'Seminars' },
    { label: 'LOM Checker', route: 'LOMChecker' },
    { label: 'ECTS Calculator', route: 'ECTSCalculator' },
  ];

  return (
    <View style={styles.container}>
      {/* Hamburger Icon */}
      {/* <TouchableOpacity style={styles.hamburger} onPress={toggleMenu}>
        <Image
          source={require('../../Images/Menu.png')}
          style={styles.icon}
        />
      </TouchableOpacity> */}

      {/* Drawer Panel (overlaid when visible) */}
      {/* {visible && (
        <Animated.View
        style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
        >
        <ScrollView contentContainerStyle={styles.items}>
        {menuItems.map((item, i) => (
          <TouchableOpacity
          key={i}
          style={styles.item}
          onPress={() => {
            toggleMenu();
            navigation.navigate(item.route);
            }}
            >
            <Text style={styles.arrow}>➜</Text>
            <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
            ))}
            </ScrollView>
            </Animated.View>
            )} */}

      {/* Screen Header */}
      <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" style={styles.icon} size={28} color="#fff" />
            </TouchableOpacity>
        <Text style={styles.headerText}>Grade Converter</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('VPDCalculator')} // VPD route
        >
          <Text style={styles.buttonText}>VPD Calculator</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ECTSCalculator')} // ECTS route
        >
          <Text style={styles.buttonText}>ECTS Calculator</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2d3f',
  },
  hamburger: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 100,
  },
  icon: {
    width: 30,
    height: 30,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.75,
    height: '100%',
    backgroundColor: '#2C3E50',
    paddingTop: 120,
    paddingHorizontal: 20,
    zIndex: 99,
  },
 
  items: {
    paddingBottom: 40,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  arrow: {
    fontSize: 22,
    color: '#00E5A1',
    marginRight: 10,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  headerBar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30, // aligns under status bar and icon
    zIndex: 1,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: '20%',
  },
  buttonsContainer: {
    marginTop: 100, // gap below header
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#ECF0F1',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});
