import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRole } from '../../auth.context';
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase.config';

const dummyData = [
  { id: '1', topic: 'Topic:', time: 'Time:', guest: 'Guest:' },
  { id: '2', topic: 'Topic:', time: 'Time:', guest: 'Guest:' },
  { id: '3', topic: 'Topic:', time: 'Time:', guest: 'Guest:' },
];

export default function Seminars() {
  const navigation = useNavigation();

  const {role,profile} = useRole()

  const [seminars, setSeminars] = useState([]);

  useEffect(()=>{
    onSnapshot(collection(db, "seminars"), (snapshot) => {
      const seminars = snapshot.docs.map((doc) =>{ return {...doc.data(), id: doc.id}});
      setSeminars(seminars);
    })
  },[])

  const RenderItem = ({ item }) => {

    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegister = async() => {

      const q = query(collection(db,"seminars_reg"), where("email", "==", profile?.email), where("id", "==", item.id));
      const querySnapshot = await getDocs(q);
      if(querySnapshot.docs.length !== 0){
        setIsRegistered(!isRegistered)
        await updateDoc(doc(db, "seminars_reg", querySnapshot.docs[0].id), { isRegistered: !isRegistered });
        console.log('already registered');
        return;
      }

      try {
        const res = await addDoc(collection(db,"seminars_reg"),{
          topic: item.topic,
          email: profile?.email,
          isRegistered: true,
          id: item.id
        })
        setIsRegistered(true)
        console.log('Inserted document with ID: ', res.id);
      } catch (error) {
        console.log('Error adding document: ', error);
      }
    };

    useEffect(()=>{
      const q = query(collection(db,"seminars_reg"), where("email", "==", profile?.email), where("id", "==", item.id));
      const querySnapshot = getDocs(q);
      querySnapshot.then((snapshot)=>{
        if(snapshot.docs.length !== 0){
          setIsRegistered(snapshot.docs[0].data().isRegistered)
        }
      })
    },[])
    
    return <View style={styles.card}>
      <Text style={styles.cardText}>Topic : {item.topic}</Text>
      <Text style={styles.cardText}>Time : {item.time}</Text>
      <Text style={styles.cardText}>Speaker : {item.guest}</Text>

      <View style={styles.buttonRow}>
        {role === 'admin' && <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('RegisterList',{ topic : item?.topic})}
        >
          <Text style={styles.linkText}>Registered List</Text>
        </TouchableOpacity>}

        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerText}>{isRegistered ? 'Registered' : 'Register'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  };

  return (
    <View style={styles.container}>
      {/* Header */}
        <View style={styles.edit}><Text style={styles.title}>Seminar</Text></View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.space}><Text></Text></View>

      <FlatList
        data={seminars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RenderItem item={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* FAB */}
      {role === 'admin' && <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddSeminar')}
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
    paddingHorizontal: 16,
  },
  edit:{
    marginTop: '30',
  },
  space: {
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
  card: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  linkButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  linkText: {
    color: 'blue',
  },
  registerButton: {
    backgroundColor: '#7f8c8d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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
