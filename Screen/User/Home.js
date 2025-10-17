import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useProfileAndAuth } from '../../auth.context';
import Footer from '../User/Footer';

function Home({ navigation }) {
  const { role, profile } = useProfileAndAuth();

  const rawName = profile?.name || '';
  const name = rawName.includes('null') ? rawName.replace('null', '') : rawName;

  return (
    <View style={styles.container}>
      <StatusBar />

      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Eduexplore</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() =>
            role && role === 'admin'
              ? navigation.navigate('AdminNotification')
              : navigation.navigate('Notification')
          }
        >
          <Ionicons name="notifications" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome back, {name}!</Text>
        <Text style={styles.welcomeBody}>
          Track your applications, find universities, and manage your academic journey.
        </Text>
      </View>

      {/* Features Button */}
      <View style={styles.FeaturesButton}>
        <TouchableOpacity
          style={styles.feature}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Appointment')}
        >
          <View style={styles.featureCircle}>
            <MaterialCommunityIcons name="calendar-clock" size={26} color="#fff" />
          </View>
          <Text style={styles.featureTitle}>Appointment</Text>
          <Text style={styles.featureSubtitle}>Schedule meeting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.feature}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('UniversityList')}
        >
          <View style={styles.featureCircle}>
            <MaterialCommunityIcons name="school" size={26} color="#fff" />
          </View>
          <Text style={styles.featureTitle}>University List</Text>
          <Text style={styles.featureSubtitle}>Explore programs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.feature}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Search')}
        >
          <View style={styles.featureCircle}>
            <MaterialCommunityIcons name="office-building" size={26} color="#fff" />
          </View>
          <Text style={styles.featureTitle}>Find University</Text>
          <Text style={styles.featureSubtitle}>Search & Compare</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.feature}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('GradeConverter')}
        >
          <View style={styles.featureCircle}>
            <MaterialIcons name="calculate" size={26} color="#fff" />
          </View>
          <Text style={styles.featureTitle}>Grade Converter</Text>
          <Text style={styles.featureSubtitle}>Convert your CGPA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.feature}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('LOM')}
        >
          <View style={styles.featureCircle}>
            <MaterialCommunityIcons name="file-check" size={26} color="#fff" />
          </View>
          <Text style={styles.featureTitle}>LOM Checker</Text>
          <Text style={styles.featureSubtitle}>Review your letter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.feature}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Webinars')}
        >
          <View style={styles.featureCircle}>
            <MaterialCommunityIcons name="presentation-play" size={26} color="#fff" />
          </View>
          <Text style={styles.featureTitle}>Webinars</Text>
          <Text style={styles.featureSubtitle}>Events & Workshops</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C2E5C' },

  headerBar: {
    height: 60,
    backgroundColor: '#234B6C',
    marginTop: 16,
    width: '87%',
    alignSelf: 'center',          
    borderRadius: 2,
    justifyContent: 'center',
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#EAF2FF',
    fontWeight: '800',
    fontSize: 18,
  },
  notificationButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },

  welcomeCard: {
    backgroundColor: '#3867E7',
    marginTop: 18,
    marginHorizontal: 28,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  welcomeTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', marginBottom: 6 },
  welcomeBody: { color: '#E7EEFF', fontSize: 12, lineHeight: 18 },

  FeaturesButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 18,
    marginTop: 18,
    paddingBottom: 90,
  },
  feature: { width: '50%', paddingVertical: 14, alignItems: 'center' },
  featureCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6C88B9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureTitle: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  featureSubtitle: { color: '#BFD1E6', fontSize: 10, marginTop: 2, textAlign: 'center' },

    footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
