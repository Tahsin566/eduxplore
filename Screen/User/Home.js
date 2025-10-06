// Home.js
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRole } from '../../auth.context';
import { useEffect } from 'react';
import Footer from '../User/Footer';

function Home({ navigation }) {
  const { role, profile } = useRole();


  const name = profile?.name?.includes('null') ? profile?.name?.replace('null', '') : profile?.name;

  return (
    <View style={styles.container}>
      <StatusBar />

      {/* Header bar with centered title + previous notification icon */}
      <View style={styles.headerBar}>
        {/* centered title (absolute so it's always centered) */}
        <Text style={styles.headerTitle}>Eduexplore</Text>

        {/* previous notification icon (white) on the right */}
        <TouchableOpacity
          style={styles.notifBtn}
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

      {/* Grid */}
      <View style={styles.grid}>
        <Feature
          icon={<MaterialCommunityIcons name="calendar-clock" size={26} color="#fff" />}
          title="Appointment"
          subtitle="Schedule meeting"
          onPress={() => navigation.navigate('Appointment')}
        />
        <Feature
          icon={<MaterialCommunityIcons name="school" size={26} color="#fff" />}
          title="University List"
          subtitle="Explore programs"
          onPress={() => navigation.navigate('UniversityList')}
        />
        <Feature
          icon={<MaterialCommunityIcons name="office-building" size={26} color="#fff" />}
          title="Find University"
          subtitle="Search & Compare"
          onPress={() => navigation.navigate('Search')}
        />
        <Feature
          icon={<MaterialIcons name="calculate" size={26} color="#fff" />}
          title="Grade Converter"
          subtitle="Calculator CGPA"
          onPress={() => navigation.navigate('GradeConverter')}
        />
        <Feature
          icon={<MaterialCommunityIcons name="file-check" size={26} color="#fff" />}
          title="LOM Checker"
          subtitle="Review your letter"
          onPress={() => navigation.navigate('LOM')}
        />
        <Feature
          icon={<MaterialCommunityIcons name="presentation-play" size={26} color="#fff" />}
          title="Webinars"
          subtitle="Events & Workshops"
          onPress={() => navigation.navigate('Seminars')}
        />
      </View>

      {/* Footer */}
      <View style={styles.footerWrap}>
        <Footer />
      </View>
    </View>
  );
}

export default Home;

/* ---------- helper ---------- */
function Feature({ icon, title, subtitle, onPress }) {
  return (
    <TouchableOpacity style={styles.feature} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.featureCircle}>{icon}</View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C2E5C' },

  // header: centered title + white bell
  headerBar: {
    height: 60,
    backgroundColor: '#234B6C',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 2,
    width: '87%',
    marginHorizontal:'auto',
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
  notifBtn: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },

  // welcome card
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

  // grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 18,
    marginTop: 18,
    paddingBottom: 90, // room for footer
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

  // footer
  footerWrap: { position: 'absolute', left: 0, right: 0, bottom: 0 },
});
