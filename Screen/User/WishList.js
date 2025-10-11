import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native';
import { db } from '../../firebase.config';
import { useRole } from '../../auth.context';
import WishlistItem from './WishlistItem';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../User/Footer';            // ⬅️ add footer import

function WishList({ navigation }) {

  const { profile, role } = useRole();
  const [wishlist, setWishlist] = useState([]);

  const getWishList = async () => {
    const q = query(
      collection(db, 'wishlist'),
      where('email', '==', profile?.email),
      where('isMarked', '==', true)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        setWishlist([]);
        return;
      }
      const wishlist = querySnapshot.docs.map((doc) => ({ ...doc.data(), docid: doc.id }));
      setWishlist(wishlist);
    });

    return () => unsubscribe && unsubscribe;
  };

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.canvas}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() =>
              role === 'admin' ? navigation.navigate('HomeScreen') : navigation.navigate('Home')
            }
            style={styles.iconBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Wish List</Text>

          {/* spacer to keep title centered */}
          <View style={styles.iconBtn} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {wishlist.length !== 0 ? (
            wishlist.map((item) => <WishlistItem key={item.id} item={item} />)
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
                No wishlisted universities yet
              </Text>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                  padding: 10,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }}
                onPress={() => navigation.navigate('UniversityList')}
              >
                <Text style={{ color: '#000', fontSize: 16 }}>Find a University</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Fixed footer */}
      <View style={styles.footerWrap}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1C2E5C',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#1C2E5C',
    paddingHorizontal: 14,
    paddingBottom: 16,
  },

  // Header
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#E7EDF3',
    fontSize: 18,
    fontWeight: '700',
  },

  // Main content
  scroll: {
    paddingBottom: 110,   // ⬅️ room for footer so content isn't covered
  },

  // (kept original card styles in case they're used in WishlistItem)
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    borderColor: '#BCC6CF',
    borderWidth: 1,
  },
  universityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E3E4A',
    marginBottom: 10,
    flex: 1,
  },
  universityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsLabel: {
    fontSize: 14,
    color: '#1F2933',
    marginBottom: 6,
  },
  detailsValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  moreLink: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 10,
  },

  // Footer placement
  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default WishList;
