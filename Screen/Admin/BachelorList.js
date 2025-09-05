import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useRole } from '../../auth.context';
import { TextInput } from 'react-native-gesture-handler';

const data = ['University 1', 'University 2', 'University 3', 'University 4'];

export default function BachelorList() {
  const navigation = useNavigation();

  const {role} = useRole()

  const [universities, setUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const getUniversities = async () => {
    try {
      const q = query(collection(db, "university"), where("hasBachelor", "==", true));
      const querySnapshot = await getDocs(q);
      const universitiesData = querySnapshot.docs.map((doc) => { return {...doc.data(), id: doc.id}});
      setUniversities(universitiesData);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const handlePress = (item) => {
    navigation.navigate("UniversityOverview", { universityName: item,path : 'BachelorList' });
  };

  

  useEffect(() => {
    getUniversities();
  }, [universities]);

  return (
    <View style={styles.container}>
      {/* Back Button & Title */}
      <View style={styles.edit}><Text style={styles.title}>Bachelor List</Text></View>
        <TouchableOpacity onPress={() => navigation.navigate('UniversityList')}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
   
    <View style={styles.space}><Text></Text></View>

    <View style={styles.search}>
      <TextInput 
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchinput}
        placeholder="Search"
        placeholderTextColor="#999"
      />
      <TouchableOpacity>
        <Ionicons style={styles.icon} name="search" size={24} color="#000" />
      </TouchableOpacity>
    </View>

    

      {/* List */}
      <View style={styles.listContainer}>
        {universities.map((item, index) => (
          item?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?  <View key={index} style={styles.listItem}>

          <TouchableOpacity key={index} onPress={() => handlePress(item)}>
            <Text style={styles.listItem}>
              {item?.name}
            </Text>
          </TouchableOpacity>
          </View> : item?.name.toLowerCase().includes(searchQuery.toLowerCase()) === false ? <Text style={{color: '#fff'}}>No Universities Found</Text> : null
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
    paddingTop:10,
    backgroundColor: '#1a2d3f',
    paddingHorizontal: 20,
  },
  search:{
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 8,
    marginBottom: 10
    
  },
  searchinput:{
    width: '88%',
  },
  icon:{
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingVertical: 7,
    paddingHorizontal: 10,
    zIndex: 100,
    borderWidth: 1,
    borderColor: 'rgba(43, 37, 37, 0.2)',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
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
    borderRadius: 5,
    gap: 10,
    padding: 12,
  },
  listItem: {
    fontSize: 16,
    backgroundColor: '#ecf0f1',
    padding: 8,
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
