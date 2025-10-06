import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AdminFooter from './adminFooter';
import Footer from '../User/Footer';
import { useRole } from '../../auth.context';

export default function UniversityList() {
  const navigation = useNavigation();

  const {role} = useRole();

  return (
    <>
    <View style={styles.container}>
      
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity> */}
        {/* <Text style={styles.headerTitle}>University Program</Text> */}
        {/* Placeholder to balance header */}
        
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
          <FontAwesome5 name="graduation-cap" size={50} color="#203a43" />
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

      {role === 'admin' && <TouchableOpacity style={styles.fab}
      onPress={() => navigation.navigate('AddOverView')}
      >
        <Ionicons name="add" size={28} color="#2c3e50" />
      </TouchableOpacity>}

    </View>
    {/* Footer Navigation */}
    {role === 'admin' ? <AdminFooter /> : <Footer />}
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2E5C',
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
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
    shadowColor: 'white',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
  cardText: {
    fontSize: 21,
    fontWeight: '600',
    color: '#333',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#ecf0f1',
    padding: 12,
    borderRadius: 28,
    elevation: 4,
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
    fontSize: 12
  },
});
