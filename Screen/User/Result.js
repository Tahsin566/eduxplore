import { and, collection, getDocs, or, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, Image } from 'react-native';
import { db } from '../../firebase.config';

const bookmarkIconPath = require('../../Images/Bookmark.png');

function SearchResult({ navigation,route }) {


  const data = route.params;
  console.log(data?.ieltsScore)

  
  const [language, setLanguage] = useState('English');
  const [beginning, setBeginning] = useState('Winter Semester, Summer Semester');
  const [duration, setDuration] = useState('7 Semester');
  const [tuitionFees, setTuitionFees] = useState('EUR 4,800');

  const [university, setUniversity] = useState([]);

  const [bookmarkCountHeader, setBookmarkCountHeader] = useState(0);
  const [isBookmarkedHeader, setIsBookmarkedHeader] = useState(false);

  const [bookmarkCountUniversity, setBookmarkCountUniversity] = useState(0); 
  const [isBookmarkedUniversity, setIsBookmarkedUniversity] = useState(false); 

  const toggleBookmarkHeader = () => {
    // Increment the bookmark count by 1
    setBookmarkCountHeader(prevCount => prevCount + 1);
    setIsBookmarkedHeader(prevState => !prevState);
  };

  const toggleBookmarkUniversity = () => {
    // Increment the bookmark count by 1
    setBookmarkCountUniversity(prevCount => prevCount + 1);
    setIsBookmarkedUniversity(prevState => !prevState);
  };
  
  const getUniversitySearch = async() => {
    setUniversity([])
    try {

      let q = null
      if(data?.search !== ''){
        q = query(collection(db, "university"), where("name", "==", data?.search));
      }
      else if(data?.ieltsScore){
        q = query(collection(db, "university"),where("ieltsScore",">=",Number(data?.ieltsScore)));
      }
      else if(data?.courseType === 'bachelor'){
        q = query(collection(db, "university"),where("hasBachelor", "==", true));
      }
      else if(data?.courseType === 'masters'){
        q = query(collection(db, "university"),where("hasMaster", "==", true));
      }
      else if(data?.courseType === 'phd'){
        q = query(collection(db, "university"),where("hasPhd", "==", true));
      }

      
      // q = query(collection(db,"university"),or(
      //   where("name", "==", data?.search || ''),
      //   where("ieltsScore",">=",Number(data?.ieltsScore || 0))
      // ));
      const res = await getDocs(q);
      if(res.docs.length === 0){
        setUniversity([]);
        return
      }
      const university = res.docs.map((doc) => { return {...doc.data(), id: doc.id}});
      console.log('data is',university) 
      setUniversity(university);
    } catch (error) {
      console.log('')
    }

  }
  useEffect(() => {
    getUniversitySearch();
  }, [data]);


  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.canvas}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => navigation?.navigate('Search',{path:'search'})}
            style={styles.iconBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.iconText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Result</Text>
          <View style={styles.iconBtn}>
            {/* Header Bookmark Icon with counter */}
            {/* <TouchableOpacity onPress={toggleBookmarkHeader} style={styles.iconWrapper}>
              <View style={styles.iconContainer}>
                <Image 
                  source={bookmarkIconPath} 
                  style={[styles.iconImage, isBookmarkedHeader && styles.iconSelected]} 
                />
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{bookmarkCountHeader}</Text>
                </View>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* University Title and Details */}

          {university.map((university) => (<View style={styles.cardContainer} >
            <View style={styles.universityHeader}>
              <Text style={styles.universityTitle}>Bachelor's degree. Applied Mechatronic System(BEng).SRH University.Berline</Text>
              {/* University Bookmark Icon next to the title */}
              <TouchableOpacity onPress={toggleBookmarkUniversity}>
                <Image 
                  source={bookmarkIconPath} 
                  style={[styles.bookmarkIcon, isBookmarkedUniversity && styles.bookmarkIconSelected]} 
                />
              </TouchableOpacity>
            </View>


            <View style={{flexDirection:'row'}}>
              <Text style={styles.detailsLabel}>Language : </Text>
              <Text style={styles.detailsValue}>{university?.name}</Text>
            </View>

            <View style={{flexDirection:'row'}}>
              <Text style={styles.detailsLabel}>Beginning : </Text>
              <Text style={styles.detailsValue}>{university?.beginning}</Text>
            </View>

            <View style={{flexDirection:'row'}}>
              <Text style={styles.detailsLabel}>Duration : </Text>
              <Text style={styles.detailsValue}>{university?.duration}</Text>
            </View>

            <View style={{flexDirection:'row'}}>
              <Text style={styles.detailsLabel}>Tuition fees per semester : </Text>
              <Text style={styles.detailsValue}>{university?.tuitionFees}</Text>
            </View>

            {/* More clickable link */}
            <TouchableOpacity onPress={() => navigation?.navigate('UniversityOverview',{universityName: university,path:'Result'})}>
              <Text style={styles.moreLink}> {"\u2192"} More</Text>  {/* Right arrow with text "More" */}
            </TouchableOpacity>
          </View> ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1a2d3f',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#1a2d3f',
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

export default SearchResult;
