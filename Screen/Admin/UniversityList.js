import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function UniversityList() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with drawer toggle */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>University Program</Text>
        {/* Placeholder to balance header */}
        <View style={{ width: 28 }} />
      </View>

      {/* Title and subtitle */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>University List</Text>
        <Text style={styles.subtitle}>Explore Programs by Degree Level</Text>
      </View>

      {/* Buttons */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('BachelorList')}
        >
          <FontAwesome5 name="graduation-cap" size={54} color="#203a43" />
          <Text style={styles.cardText}>Undergraduate Programs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('MastersList')}
        >
          <FontAwesome5 name="brain" size={54} color="#008080" />
          <Text style={styles.cardText}>Graduate Programs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('phdList')}
        >
          <FontAwesome5 name="microscope" size={54} color="#800080" />
          <Text style={styles.cardText}>PHD Programs</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2d3f',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    color: '#fff',
    fontSize: 38,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
  },
  cardContainer: {
    marginBottom: 90,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 30,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardText: {
    fontSize: 21,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#34495e',
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
