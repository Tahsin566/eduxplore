import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRole } from '../../auth.context';
import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';

export default function Seminars() {
  const navigation = useNavigation();
  const { role, profile } = useRole();
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
          topic: item.topic,
          email: profile?.email,
          isRegistered: true,
          id: item.id,
        });
        setIsRegistered(true);
      } catch (error) {
        console.log('Error adding document: ', error);
      }
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
        <Text style={styles.cardSmallText}>Seminar info</Text>
        <View style={styles.cardRow}>
          <Ionicons name="person-circle-outline" size={42} color="#34495e" />
          <Text style={styles.cardGuest}>{item.guest}</Text>
        </View>
        <Text style={styles.cardTopic}>{item.topic}</Text>
        <Text style={styles.cardTime}>{item.time}</Text>

        <View>

          <TouchableOpacity onPress={handleRegister} style={[styles.registerButton, isRegistered]}>
            <Text style={styles.registerText}>{isRegistered ? 'Registered' : 'Register'}</Text>
          </TouchableOpacity>
            
            {role === 'admin' && (
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('RegisterList', { topic: item?.topic })}
            >
              <Text style={styles.linkText}>Registered List</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Seminar</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2E5C',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 40,
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
});
