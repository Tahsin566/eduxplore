import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccountSettings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ProfileButton')}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Account Settings</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangingEmail')}>
          <Text style={styles.buttonText}>Change Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('forgot')}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 57,
    left: 20,
  },
  backText: {
    fontSize: 22,
    color: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 100, 
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: '#2C3E50',
  },
});
