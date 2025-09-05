
import{View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { useRole } from '../auth.context';
import { useNavigation } from '@react-navigation/native';

export const MenuScreen = ({ navigation}) => {

  const {role} = useRole()

  const menuItems = [
    { label : 'Home', route: 'Home' },
    { label : 'University List', route: 'UniversityList' },
    { label: 'Community', route: 'Community' },
    { label: 'Seminars', route: 'Seminars' },
    { label: 'Wishlist', route: 'WishList' }
  ];

  const adminRoutes = [
    { label : 'Home', route: 'HomeScreen' },
    { label : 'University List', route: 'UniversityList' },
    { label : 'Manage Accounts', route: 'ManageAccounts' },
    { label: 'Send Notification', route: 'CoustomSend' },
    { label: 'Community', route: 'Community' },
    { label: 'Seminars', route: 'Seminars' }
  ];

  return (
    role === 'admin' ? <DrawerContentScrollView style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      {adminRoutes.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.route) }
          style={styles.item}
        >
          <MaterialIcons name="arrow-right" size={20} color="#1abc9c" />
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </DrawerContentScrollView>:
    <DrawerContentScrollView style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.route) }
          style={styles.item}
        >
          <MaterialIcons name="arrow-right" size={20} color="#1abc9c" />
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2d3f',
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  title: {
    color: '#ecf0f1',
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  text: {
    color: '#ecf0f1',
    fontSize: 16,
    marginLeft: 10,
  },
});
