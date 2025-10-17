import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { db } from '../../firebase.config';
import { useProfileAndAuth,} from '../../auth.context';
import WishlistItem from './WishlistItem';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../User/Footer';  

function WishList({ navigation }) {

  const { profile, role } = useProfileAndAuth();
  const [wishlist, setWishlist] = useState([]);

  const getWishList = async () => {
    const q = query(
      collection(db, 'wishlist'),
      where('user_email', '==', profile?.email),
      where('is_marked', '==', true)
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
    <View style={styles.Background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.canvas}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() =>
              role === 'admin' ? navigation.replace('HomeScreen') : navigation.replace('Home')
            }
            style={styles.iconBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Wish List</Text>
          <View style={styles.iconBtn} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {wishlist.length !== 0 ? (
            wishlist.map((item,index) => <WishlistItem key={index} item={item} />)
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

      {/* Fixed  */}
      <View style={styles.footerWrap}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

export default WishList;
const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#1C2E5C',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#1C2E5C',
    paddingHorizontal: 14,
    paddingBottom: 16,
  },

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

  scroll: {
    paddingBottom: 110,   
  },
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

  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});


