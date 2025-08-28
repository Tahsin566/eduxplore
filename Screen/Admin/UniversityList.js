
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function UniversityList() {

  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with drawer toggle */}
      <View>
          <Text style={styles.title}>University Program</Text>
      </View>
      
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>

      <View style={styles.space}><Text></Text></View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BachelorList')}
      >
        <Text style={styles.buttonText}>Bachelor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MastersList')}
      >
        <Text style={styles.buttonText}>Master’s</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingHorizontal: 20,
    paddingTop: 80,
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
  button: {
    backgroundColor: '#ecf0f1',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
