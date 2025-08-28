import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, Image } from 'react-native';
import { db } from '../../firebase.config';
import { useRole } from '../../auth.context';
import WishlistItem from './WishlistItem';

// Import the bookmark image
const bookmarkIconPath = require('../../Images/Bookmark.png');  // Bookmark Image Path

function WishList({ navigation }) {

  const {profile,role} = useRole()
  // States for dynamic data
  const [wishlist, setWishlist] = useState([]);
  const [language, setLanguage] = useState('English');
  const [beginning, setBeginning] = useState('Winter Semester, Summer Semester');
  const [duration, setDuration] = useState('7 Semester');
  const [tuitionFees, setTuitionFees] = useState('EUR 4,800');
  
  // States for the two bookmark icons
  const [bookmarkCountHeader, setBookmarkCountHeader] = useState(0); // Count for the header bookmark icon
  const [isBookmarkedHeader, setIsBookmarkedHeader] = useState(false); // State for the header bookmark icon

  const [bookmarkCountUniversity, setBookmarkCountUniversity] = useState(0); // Count for the university bookmark icon
  const [isBookmarkedUniversity, setIsBookmarkedUniversity] = useState(false); // State for the university bookmark icon

  // Function to increment the bookmark count and toggle the header bookmark icon
  const toggleBookmarkHeader = () => {
    // Always increment the counter
    setBookmarkCountHeader(prevCount => prevCount + 1);
    // Toggle the bookmark state (icon color)
    setIsBookmarkedHeader(prevState => !prevState);
  };

  const toggleBookmarkUniversity = () => {
    // Always increment the counter
    setBookmarkCountUniversity(prevCount => prevCount + 1);
    // Toggle the bookmark state (icon color)
    setIsBookmarkedUniversity(prevState => !prevState);
  };

  const handleMoreClick = () => {
    // Navigate to another screen for "More"
    navigation.navigate('MoreDetails');  // Replace with actual screen path
  };

  const handleWhiteBoundaryClick = () => {
    // Navigate to another screen when clicking on the white boundary
    navigation.navigate('SomeOtherScreen'); // Replace with actual screen path
  };

  const getWishList = async() => {
    const q = query(collection(db, "wishlist"), where("email", "==", profile?.email),where("isMarked", "==", true));
    const querySnapshot = await getDocs(q);
    const wishlist = querySnapshot.docs.map((doc) => doc.data());
    setWishlist(wishlist);
  }

  useEffect(() => {
    getWishList();
  },[wishlist])

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.canvas}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() =>role === 'admin' ? navigation.navigate('HomeScreen') : navigation.navigate('Home')}  // Go back to the Find a University screen
            style={styles.iconBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.iconText}>←</Text>
            {/* <Text style={styles.iconText}>{JSON.stringify(wishlist)}</Text> */}
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Wish List</Text>
          <View style={styles.iconBtn}>
            {/* Header Bookmark Icon with counter */}
            <TouchableOpacity onPress={toggleBookmarkHeader} style={styles.iconWrapper}>
              <View style={styles.iconContainer}>
                <Image 
                  source={bookmarkIconPath} 
                  style={[styles.iconImage, isBookmarkedHeader && styles.iconSelected]} 
                />
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{wishlist.length}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* University Title and Details */}
          {
            wishlist.map((item) => (
              
                <WishlistItem key={item.id} item={item} />
      
            ))
          }
          
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop:25,
    backgroundColor: '#2E3E4A',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#2E3E4A',
    paddingHorizontal: 14,
    paddingBottom: 16,
  },

  // Header
  headerBar: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginTop: 8,
    marginBottom: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#E7EDF3',
    fontSize: 22,
  },
  headerTitle: {
    color: '#E7EDF3',
    fontSize: 18,
    fontWeight: '700',
  },

  // Bookmark Icon styles
  iconImage: {
    width: 30,
    height: 30,
  },
  iconWrapper: {
    position: 'relative',
  },
  iconContainer: {
    position: 'relative',
  },
  countBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // Main content
  scroll: {
    paddingBottom: 24,
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
  bookmarkIcon: {
    width: 30,
    height: 30,
  },
  bookmarkIconSelected: {
    tintColor: '#2E3E4A', // Change to a dark color (or another color) when selected
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

  // More link
  moreLink: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 10,
  },
});

export default WishList;
