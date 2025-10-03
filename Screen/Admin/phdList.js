import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useEffect, useState } from 'react';
import { useRole } from '../../auth.context';
import { Image } from 'react-native';

const data = ['University 1', 'University 2', 'University 3', 'University 4'];

export default function PHDList() {
  const navigation = useNavigation();

  const [universities, setUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {role} = useRole()

  const handlePress = (item) => {
    navigation.navigate("UniversityOverview", { universityName: item,path : 'MastersList' });
  };

  const getUniversities = async () => {
    try {
      const q = query(collection(db, "university"), where("hasPhd", "==", true));
      const querySnapshot = await getDocs(q);
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
      <View style={styles.edit}><Text style={styles.title}>PHD List</Text></View>
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

          <TouchableOpacity key={index} style={styles.listbutton} onPress={() => handlePress(item)}>
            <Image style={styles.image} source={{ uri: item?.photo }} />
            <Text style={styles.listText}>
              {item?.name}
            </Text>
            {role === 'admin' && <TouchableOpacity style={styles.update} onPress={() => navigation.navigate("UpdateOVerView", { university : item, path : 'BachelorList' })}><Ionicons name='create-outline' size={20} color='#000'/></TouchableOpacity>}
          </TouchableOpacity>
          </View> : item?.name.toLowerCase().includes(searchQuery.toLowerCase()) || universities.length > 0 === false ? <Text style={{color: '#fff'}}>No Universities Found</Text> : null
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2E5C',
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

  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
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
    backgroundColor: '#ecf0f1',
    justifyContent:'center',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  listbutton: {
    height: 100,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    // flexWrap: 'wrap',
  },
  listText: {
    fontSize: 20,
    width: '86%',
    color: '#000',
    overflow:"scroll",
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 0,
    marginRight: 10,
    resizeMode:'contain'
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
  update:{
    backgroundColor: '#ecf0f1',
    padding: 12,
    position: 'absolute',
    bottom: 30,
    right: 5,
    marginHorizontal:"auto",
    borderRadius: 50,
    borderWidth: 1,
    alignItems:'center'
  }
});
