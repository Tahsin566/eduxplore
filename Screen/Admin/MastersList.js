import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useEffect, useState } from 'react';
import { useRole } from '../../auth.context';

const data = ['University 1', 'University 2', 'University 3', 'University 4'];

export default function BachelorList() {
  const navigation = useNavigation();

  const [universities, setUniversities] = useState([]);

  const {role} = useRole()

  const handlePress = (item) => {
    navigation.navigate("UniversityOverview", { universityName: item,path : 'MastersList' });
  };

  const getUniversities = async () => {
    try {
      const universitiesRef = collection(db, 'university');
      const querySnapshot = await getDocs(universitiesRef);
      const universitiesData = querySnapshot.docs.map((doc) =>{ return {...doc.data(), id: doc.id}});
      setUniversities(universitiesData);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  useEffect(() => {
    getUniversities();
  }, [universities]);

  return (
    <View style={styles.container}>
      {/* Back Button & Title */}
      <View style={styles.edit}><Text style={styles.title}>Master's List</Text></View>
        <TouchableOpacity onPress={() => navigation.navigate('UniversityList')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.space}><Text></Text></View>
      {/* List */}
      <View style={styles.listContainer}>
        {universities.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(item)}>
            <Text style={styles.listItem}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add Floating Button */}
      {role === 'admin' && <TouchableOpacity style={styles.fab}
      onPress={() => navigation.navigate('AddOverView')}
      >
        <Ionicons name="add" size={28} color="#2c3e50" />
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  edit:{
    marginTop: '30',
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
    space: {
    marginTop: '30',
  },
  listContainer: {
    gap: 10,
    borderRadius: 5,
    padding: 12,
  },
  listItem: {
    fontSize: 16,
    backgroundColor: '#ecf0f1',
    padding: 20,
    borderRadius: 5,
    fontWeight: 'bold',
    marginBottom: 8,
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
});
