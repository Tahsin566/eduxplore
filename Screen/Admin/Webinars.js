import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRole } from '../../auth.context';
import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import Footer from '../User/Footer';
import AdminFooter from './adminFooter';

export default function Seminars() {
  
  const { role, profile } = useRole();
  const navigation = useNavigation();
  const [seminars, setSeminars] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "seminars"), (snapshot) => {
      const seminarsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSeminars(seminarsData);
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  const RenderItem = ({ item }) => {


    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegister = async () => {
      const q = query(collection(db, "seminars_reg"), where("email", "==", profile?.email), where("id", "==", item.id));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length !== 0) {
        setIsRegistered(!isRegistered);
        await deleteDoc(doc(db, "seminars_reg", querySnapshot.docs[0].id));
        return;
      }
      try {
        const res = await addDoc(collection(db, "seminars_reg"), {
          email: profile?.email,
          isRegistered: true,
          id: item.id,
        });
        setIsRegistered(true);
      } catch (error) {
        console.log('Error adding document: ', error);
      }
    };

    const handleMarkAsCompleted = async () => {

      try {
        await updateDoc(doc(db, "seminars", item.id), {
          registration_status: item?.registration_status === 'open' ? 'close' : 'open'
        })

      }
      catch (error) {
        console.log('Error adding document: ', error);
      }

    }

    const handleDelete = async () => {
      
      Alert.alert(
        'Delete Seminar',
        'Are you sure you want to delete this seminar?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              try {
                await deleteDoc(doc(db, "seminars", item.id));
                console.log('deleted');
              } catch (error) {
                console.log('Error adding document: ', error);
              }
            },
            style: 'default',
          },
        ],
        { cancelable: false }
      )
    
    };

    useEffect(() => {
      const q = query(collection(db, "seminars_reg"), where("email", "==", profile?.email), where("id", "==", item.id));
      getDocs(q).then((snapshot) => {
        if (snapshot.docs.length !== 0) {
          setIsRegistered(snapshot.docs[0].data().isRegistered);
        }
      });
    }, []);

    return (
      <View style={styles.card}>

        
        <View>

          {role === 'admin' && <TouchableOpacity style={{marginLeft: 'auto'}}>
            <MaterialCommunityIcons name="pencil-box" size={24} color='#34495e' onPress={() => navigation.navigate('EditSeminar', { id: item.id,webinar : item })} />
          </TouchableOpacity>}

          <Text style={styles.cardSmallText}>Webinar info</Text>

          <View>
            <View style={styles.cardRow}>
              <Ionicons name="person-circle-outline" size={42} color="#34495e" />
              <Text style={styles.cardGuest}>{item.guest}</Text>
            </View>
            <Text style={styles.cardTopic}>{item.topic}</Text>
          </View>

        </View>


        <Text style={styles.cardTime}>{item.date}</Text>
        <Text style={styles.cardTime}>{item.time}</Text>

        <View style={{ gap: 10 }}>

          {/* <Text>{item?.status === 'upcoming' ? 'Upcoming' : 'Completed'}</Text> */}

          {item?.registration_status === 'open' ? <TouchableOpacity onPress={handleRegister} style={[styles.registerButton, isRegistered]}>
            <Text style={styles.registerText}>{isRegistered ? 'Registered' : 'Register'}</Text>
          </TouchableOpacity> : <Text>Registration closed</Text>}

          {role === 'admin' && <TouchableOpacity onPress={() => handleMarkAsCompleted(item)} style={[styles.registerButton, isRegistered]}>
            <Text style={styles.registerText}>{item?.registration_status === 'open' ? 'Close Registration' : 'Open Registration'}</Text>
          </TouchableOpacity>}


          {/* <TouchableOpacity onPress={() => setIsRegisterOpen(!isRegisterOpen)} style={[styles.registerButton, isRegistered]}>
            <Text style={styles.registerText}>Open</Text>
          </TouchableOpacity> */}

          {role === 'admin' && (
            <>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate('RegisterList', { id: item?.id, topic: item?.topic })}
              >
                <Text style={styles.linkText}>Registered List</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
                <Text style={styles.deleteText}>Delete Webinar</Text>
              </TouchableOpacity>
            </>
          )}


        </View>
      </View>
    );
  };

  return (

    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => role === 'admin' ? navigation.navigate('HomeScreen') : navigation.navigate('Home')}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Webinar</Text>
          <View style={{ width: 28 }} />
        </View>

        <FlatList
          data={seminars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RenderItem item={item} />}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 140, paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
        />


        {role === 'admin' && (
          <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddSeminar')}>
            <Ionicons name="add" size={28} color="#2c3e50" />
          </TouchableOpacity>
        )}
      </View>
      {role === "admin" ? <AdminFooter /> : <Footer />}
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2E5C',
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    width: '48%',
  },
  cardSmallText: {
    fontSize: 12,
    color: '#34495e',
    marginBottom: 6,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardGuest: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 8,
  },
  cardTopic: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c3e50',
  },
  cardTime: {
    color: '#7f8c8d',
    marginBottom: 12,
    fontSize: 14,
  },

  linkButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  linkText: {
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#34495e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  registerText: {
    color: '#ecf0f1',
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
  deleteButton: {
    backgroundColor: '#ecf0f1',
    padding: 12,
    borderRadius: 28,
    elevation: 4,
  },
  deleteText: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
