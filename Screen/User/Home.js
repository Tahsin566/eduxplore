import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image, Pressable} from 'react-native';

import profileIcon from '../../Images/Profile.png';
import communityIcon from '../../Images/Community.png';
import { Ionicons } from '@expo/vector-icons';
import { useRole } from '../../auth.context';

function Home({ navigation }) {

  const {role,profile} = useRole()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top-right: Profile Icon */}
      <View style={styles.topIcons}>
      <Pressable onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#fff" />
        </Pressable>
        <Text style={styles.header}>Home</Text>
        <View>
      

        <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={() => role === 'admin' ? navigation.navigate('AdminNotification')  : navigation.navigate('Notification')}>
            <Ionicons name="notifications" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ProfileButton')}>
            <Image source={{uri: profile?.photo}} style={styles.profileIcon} />
          </TouchableOpacity>
            </View>



          </View>
      </View>

      {/* Header Title */}

      {/* Main Buttons */}
      <View style={styles.form}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Appointment')}>
          <Text style={styles.buttonText}>Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.buttonText}>Find a University</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GradeConverter')}>
          <Text style={styles.buttonText}>Grade Converter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Seminars')}>
          <Text style={styles.buttonText}>Seminars</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LOM')}>
          <Text style={styles.buttonText}>LOM Checker</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom-left: Community Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Community')} // Leave blank for now
        style={styles.communityIconWrapper}
      >
        <Image source={communityIcon} style={styles.communityImage} />
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    paddingTop: 80,
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  iconWrapper: {
    marginLeft: 10,
  },
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  profileIcon: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 40
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    width: '80%',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 15,
    minWidth: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  communityIconWrapper: {
    position: 'absolute',
    bottom: 60,
    right: 30,
  },
  communityImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
});
