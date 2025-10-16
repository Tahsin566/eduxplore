// Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function AdminFooter() {
  
  const navigation = useNavigation();

  const goHome = () => navigation.replace('HomeScreen');     
  const goCommunity = () => navigation.navigate('Community');
  const goProfile = () => navigation.navigate('ViewProfile');  

  return (
    <View style={styles.container}>
      <NavItem
        label="Home"
        circleBg="#90A4AE"
        icon={<FontAwesome5 name="home" size={24} color="#3A5166" />}
        onPress={goHome}
      />

      <NavItem
        label="Community"
        circleBg="#4C6EF5"
        icon={<MaterialIcons name="groups" size={26} color="#FFD54F" />}
        onPress={goCommunity}
      />

      <NavItem
        label="Profile"
        circleBg="#3F51B5"
        icon={<MaterialIcons name="person" size={26} color="#EDEFF8" />}
        onPress={goProfile}
      />
    </View>
  );
}

function NavItem({ label, icon, onPress, circleBg, circleBorder, badge }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.8}>
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: circleBg || '#90A4AE' },
          circleBorder ? { borderWidth: 2, borderColor: circleBorder } : null,
        ]}
      >
        {icon}
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5C7898',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: { alignItems: 'center', minWidth: 70 },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#2962FF',
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  label: {
    marginTop: 6,
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
