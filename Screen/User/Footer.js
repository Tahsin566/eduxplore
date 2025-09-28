// Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
  const navigation = useNavigation();

  const goHome = () => navigation.navigate('Home');
  const goWishlist = () => navigation.navigate('WishList');
  const goCommunity = () => navigation.navigate('Community');
  const goProfile = () => navigation.navigate('ProfileButton');

  return (
    <View style={styles.container}>
      <NavItem
        label="Home"
        circleBg="#90A4AE"
        icon={<FontAwesome5 name="home" size={20} color="#3A5166" />}
        onPress={goHome}
      />
      <NavItem
        label="Wishlist"
        circleBg="#FFFFFF"
        circleBorder="#111"
        icon={<FontAwesome5 name="bookmark" size={19} color="#111" />}
        badge="1"
        onPress={goWishlist}
      />
      <NavItem
        label="Community"
        circleBg="#4C6EF5"
        icon={<MaterialIcons name="groups" size={22} color="#FFD54F" />}
        onPress={goCommunity}
      />
      <NavItem
        label="Profile"
        circleBg="#3F51B5"
        icon={<MaterialIcons name="person" size={22} color="#EDEFF8" />}
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
          circleBorder ? { borderWidth: 1.5, borderColor: circleBorder } : null,
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
    // border removed
    paddingVertical: 8,         // reduced height
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: { alignItems: 'center', minWidth: 62 },
  iconCircle: {
    width: 40,                  // smaller
    height: 40,
    borderRadius: 20,
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
    borderWidth: 1.2,
    borderColor: '#fff',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  label: {
    marginTop: 4,               // tighter spacing
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,               // smaller text
  },
});
