import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useEffect, useState } from 'react';
import { useRole } from '../../auth.context';
import Toast from 'react-native-toast-message';

const data = ['University 1', 'University 2', 'University 3', 'University 4'];

export default function MastersList() {
  
  const { role } = useRole()
  const navigation = useNavigation();

  const [universities, setUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const handlePress = (item) => {
    navigation.navigate("UniversityDetails", { universityName: item, path: 'MastersList' });
  };
  
  const filteredUniversities = universities.filter(item => 
    item?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUniversities = async () => {
    try {
      const q = query(collection(db, "university"), where("has_master", "==", true));
      const querySnapshot = await getDocs(q);
      const universitiesData = querySnapshot.docs.map((doc) => { return { ...doc.data(), id: doc.id } });
      setUniversities(universitiesData);
    } catch (error) {
      Toast.show({ text1: 'Error fetching universities', type: 'error', text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
    }
  };

  const deleteUniversityDetails = async (item) => {
      Alert.alert(
        'Delete University',
        'Are you sure you want to delete this university?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              try {
                await deleteDoc(doc(db, "university", item.id));
              } catch (error) {
                Toast.show({ text1: 'Error deleting university', type: 'error', text1Style: { color: 'red', fontSize: 16 }, autoHide: true, visibilityTime: 1000 })
              }
            },
          },
        ],
        { cancelable: false }
      )
    };

  useEffect(() => {
    getUniversities();
  }, [universities]);

  return (
    <View style={styles.container}>
      {/* Back Button & Title */}
      <View><Text style={styles.title}>Master's List</Text></View>
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
                {/* {role === 'admin' && <TouchableOpacity style={styles.update} onPress={() => navigation.navigate("UpdateOVerView", { university : item, path : 'BachelorList' })}><Ionicons name='create-outline' size={20} color='#000'/></TouchableOpacity>} */}
                </TouchableOpacity>
                {role === 'admin' && <View style={styles.buttonContainer}>
      
                  <TouchableOpacity onPress={() => navigation.navigate("UpdateUniDetails", { university : item, path : 'BachelorList' })} style={styles.update}>
                    <Text style={styles.text}>Update</Text>
                  </TouchableOpacity>
      
                  <TouchableOpacity onPress={() => deleteUniversityDetails(item)} style={styles.delete}>
                    <Text style={styles.text}>Delete</Text>
                  </TouchableOpacity>
                </View>}
                </View> : null
              ))}
            </View>

            {filteredUniversities.length === 0 && (
              <Text style={styles.text}>No results found</Text>
            )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2E5C',
    paddingHorizontal: 20,
  },
  search: {
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 8,
    marginBottom: 10

  },
  searchinput: {
    width: '88%',
  },
  icon: {
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
    justifyContent: 'center',
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
    width: '65%',
    color: '#000',
    overflow:"scroll",
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 0,
    marginRight: 10,
    resizeMode: 'contain'
  },

  update: {
    backgroundColor: '#ecf0f1',
    padding: 12,
    position: 'absolute',
    bottom: 30,
    right: 5,
    marginHorizontal: "auto",
    borderRadius: 50,
    borderWidth: 1,
    alignItems: 'center'

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
  },
  update:{
    backgroundColor: '#1C2E5C',
    borderRadius: 20,
    marginBottom: 10,
    padding: 12,
    width: '40%',
    alignItems: 'center'
    
  },
  delete:{
    backgroundColor: 'red',
    borderRadius: 20,
    marginBottom: 10,
    padding: 12,
    width: '40%',
    alignItems: 'center'
  },
  text:{
    color: '#fff',
    fontWeight: 'bold'
  }
});
