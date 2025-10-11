
import { View, Text, TouchableOpacity,ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useEffect, useState } from 'react';
import { useRole } from '../../auth.context';

// const admins = ['Admin1', 'Admin2', 'Admin3', 'Admin4', 'Admin5'];

export default function ManageAccountsScreen() {

  
  const { role } = useRole();

  const [admins, setAdmins] = useState([]);
  const [roletype, setRoleType] = useState('All');

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

  const setAll = () => {
    setRoleType('All');
    getAdmins();
  }
  const setAdmin = async() => {
    setRoleType('Admin');
    try {
      const q = query(collection(db, "users"), where("role", "==", "admin"));
      const res = await getDocs(q);
      const data = res.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setAdmins(data);
    } catch (error) {
      console.log(error)
    }
  }

  const setModerator = async() => {
    setRoleType('Moderator');
    try {
      const q = query(collection(db, "users"), where("role", "==", "moderator"));
      const res = await getDocs(q);
      const data = res.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setAdmins(data);
    } catch (error) {
      console.log(error)
    }
    
  }
  const setUser = async() => {
    setRoleType('User');
    try {
      const q = query(collection(db, "users"), where("role", "==", "user"));
      const res = await getDocs(q);
      const data = res.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setAdmins(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with Drawer */}
        <View style={styles.edit}><Text style={styles.title}>Manage Accounts</Text></View>
        <TouchableOpacity onPress={() => role === 'admin' ? navigation.navigate('HomeScreen') : navigation.navigate('Home')}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        
      <View style={styles.space}><Text></Text></View>

      {/* Subheading */}
      <Text style={styles.subheading}>Admins and user</Text>

      <View style={styles.roleTextContainer}>
        <TouchableOpacity onPress={setAll} style={[{...styles.button},{backgroundColor: roletype === 'All' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'}]}>
          <Text style={styles.text}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={setAdmin} style={[{...styles.button},{backgroundColor: roletype === 'Admin' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'}]}>
          <Text style={styles.text}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={setModerator} style={[{...styles.button},{backgroundColor: roletype === 'Moderator' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'}]}>
          <Text style={styles.text}>Moderator</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={setUser} style={[{...styles.button},{backgroundColor: roletype === 'User' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'}]}>
          <Text style={styles.text}>User</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {admins.map((admin, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('AdminRoles', { id: admin.id })}
          style={styles.row}
        >
          <View style={styles.avatar}>
            <Image source={{uri: admin?.photo}} style={styles.avatarImage} />
          
          </View>
          <View style={styles.labelBar}>
            <Text style={styles.listItem}>
              {admin?.name?.includes('null') ? admin?.name?.split('null')[0] : admin?.name}
            </Text>
          <Text style={styles.listText}>{admin?.role}</Text> 
          </View>
        </TouchableOpacity>

))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2E5C',
    paddingHorizontal: 20
  },
  space: {
    marginTop: 3,
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
  subheading: {
    color: '#ecf0f1',
    fontSize: 16,
    marginVertical: 10,
  },
  listContainer: {
    // backgroundColor: '#ecf0f1',
    borderRadius: 5,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    backgroundColor: '#3d4d6a',
    borderRadius: 30,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25, 
  },
  labelBar: {
    backgroundColor: '#3d4d6a',
    borderRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 8,
    width:'80%',
    justifyContent: 'center',
  },
  listItem: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  listText: {
    color: '#fff',
    fontSize: 15,
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
  roleTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  text:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13.1,
  },
  button:{
    backgroundColor: '#1abc9c',
    marginBottom: 10,
    padding: 12,
    width: '24%',
    alignItems: 'center',
    borderRadius: 5,
  }
});
