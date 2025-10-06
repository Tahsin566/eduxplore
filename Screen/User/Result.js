import { and, collection, getDocs, or, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { db } from '../../firebase.config';
import Footer from '../User/Footer';
import { Ionicons } from '@expo/vector-icons';

function SearchResult({ navigation, route }) {
  const data = route.params;

  const [language, setLanguage] = useState('English');
  const [beginning, setBeginning] = useState('Winter Semester, Summer Semester');
  const [duration, setDuration] = useState('7 Semester');
  const [tuitionFees, setTuitionFees] = useState('EUR 4,800');

  const [university, setUniversity] = useState([]);

  console.log(data)

  const getUniversitySearch = async () => {

    setUniversity([]);

    try {
      let q = null;

      if(data.courseType){
        q = query(collection(db, 'university'),
          or(
            where(
              `has${data.courseType?.charAt(0)?.toUpperCase() + data.courseType?.slice(1)}`, '==', true
            ),
            where('language', '==', data.courseLanguage),
            where('Intake', '==', data.intake)
          )
        
        );
      }


      const res = await getDocs(q);
      if (res.docs.length === 0) {
        setUniversity([]);
        return;
      }
      let uni = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const filteredUni = uni.filter((u) => {
        return data.search ? u.ieltsScore <= parseFloat(data.ieltsScore) && u?.name?.toLowerCase()?.includes(data.search?.toLowerCase()): u.ieltsScore <= parseFloat(data.ieltsScore);
        
      })
      console.log(uni)
      setUniversity(filteredUni);
      console.log(filteredUni)
    } catch (error) {
      console.log('');
    }
  };

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
            onPress={() => navigation?.navigate('Search', { path: 'search' })}
            style={styles.iconBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name='chevron-back' size={24} color='white' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Result</Text>
          <View style={styles.iconBtn} />
        </View>

        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: 110 }]} // space for footer
          keyboardShouldPersistTaps="handled"
        >
          {university.length > 0 ?university.map((u) => (
            <View key={u.id} style={styles.cardContainer}>
              <View style={styles.universityHeader}>
                <Text style={styles.universityTitle}>
                  {u?.name}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.detailsLabel}>Name : </Text>
                <Text style={styles.detailsValue}>{u?.name}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.detailsLabel}>Language : </Text>
                <Text style={styles.detailsValue}>{u?.language}Germany</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.detailsLabel}>Duration : 3 years</Text>
                <Text style={styles.detailsValue}>{u?.duration}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.detailsLabel}>Tuition fees per semester : 107.00 </Text>
                <Text style={styles.detailsValue}>{u?.tuitionFees}</Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation?.navigate('UniversityOverview', { universityName: u, path: 'Result' })}
              >
                <Text style={styles.moreLink}>{'\u2192'} More</Text>
              </TouchableOpacity>
            </View>
          )):<Text style={{ color: 'white', fontSize: 20, textAlign: 'center', marginTop: 50 }}>No University Found</Text>}
        </ScrollView>
      </View>

      {/* Footer (fixed) */}
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
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginTop: 20,
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
    fontSize: 30,
  },
  headerTitle: {
    color: '#E7EDF3',
    fontSize: 24,
    fontWeight: '700',
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

  // Footer holder
  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default SearchResult;
