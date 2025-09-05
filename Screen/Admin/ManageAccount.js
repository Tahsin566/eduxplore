
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useEffect, useState } from 'react';
import { useRole } from '../../auth.context';

// const admins = ['Admin1', 'Admin2', 'Admin3', 'Admin4', 'Admin5'];

export default function ManageAccountsScreen() {

  const [admins, setAdmins] = useState([]);
  const { role } = useRole();

  const getAdmins = async() => {
    try {
      const q = query(collection(db, "users"));
      const res = await getDocs(q);
      const data = res.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setAdmins(data);
    } catch (error) {
      console.log('')
    }
  }

  const navigation = useNavigation();

  useEffect(() => {
    getAdmins();
  }, [admins]);

  return (
    <View style={styles.container}>
      {/* Header with Drawer */}
        <View style={styles.edit}><Text style={styles.title}>Manage Accounts</Text></View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        
      <View style={styles.space}><Text></Text></View>

      {/* Subheading */}
      <Text style={styles.subheading}>Users</Text>

      {/* List */}
      <View style={styles.listContainer}>
        {admins.map((admin, index) => (
  <TouchableOpacity
    key={index}
    onPress={() => navigation.navigate('AdminRoles', { id : admin.id })}
  >
    <Text style={styles.listItem}>{admin?.name?.includes('null') ? admin?.name?.split('null')[0] : admin?.name}</Text>
  </TouchableOpacity>
))}

      </View>

      {/* Floating Add Button */}
      {role === 'admin' && <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddAdmin')}
      >
        <Ionicons name="add" size={28} color="#2c3e50" />
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2d3f',
    paddingHorizontal: 20,
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
  subheading: {
    color: '#ecf0f1',
    fontSize: 16,
    marginVertical: 10,
  },
  listContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    padding: 12,
  },
  listItem: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
