import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Footer from '../User/Footer'; // ⬅️ footer

/* Small chip button */
function Chip({ label, selected, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.chip,
        selected ? styles.chipSelected : styles.chipUnselected,
        style,
      ]}
    >
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : styles.chipTextUnselected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function FindUniversity({ navigation }) {

  
  const [search, setSearch] = useState('');

  // single-select per section
  const [courseType, setCourseType] = useState(null);
  const [courseLanguage, setCourseLanguage] = useState(null);
  const [intake, setIntake] = useState(null);
  const [ieltsScore, setIeltsScore] = useState(0);

  const handleSearchClick = () => {
    navigation.navigate('Result', {
      path: 'search',
      search,
      courseType: courseType || 'Bachelor',
      courseLanguage,
      intake,
      ieltsScore,
    });
  };

  const toggle = (current, value, setter) => {
    setter(current === value ? null : value);
  };


  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.canvas}>
          {/* Header */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              onPress={() => navigation?.navigate('Home')}
              style={styles.iconBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Find a University</Text>
            <View style={styles.iconBtn} />
          </View>

          <ScrollView
            contentContainerStyle={[styles.scroll, { paddingBottom: 110 }]} // space for footer
            keyboardShouldPersistTaps="handled"
          >
            {/* Search bar */}
            <View style={styles.searchWrap}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search university or programs"
                placeholderTextColor="#131415ff"
                value={search}
                onChangeText={setSearch}
                returnKeyType="search"
              />
              <View style={styles.searchIcon}>
                <Ionicons name="search" size={18} color="#123456" />
              </View>
            </View>

            {/* Course Type */}
            <View className="section" style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="albums" size={16} color="#9CC3FF" />
                <Text style={styles.sectionTitle}>Course Type</Text>
              </View>
              <View style={styles.rowWrap}>
                <Chip label="Bachelor"  selected={courseType === 'bachelor'} onPress={() => toggle(courseType, 'bachelor', setCourseType)} />
                <Chip label="Master’s"  selected={courseType === 'master'}  onPress={() => toggle(courseType, 'master', setCourseType)} />
                <Chip label="Diploma"   selected={courseType === 'diploma'}  onPress={() => toggle(courseType, 'diploma', setCourseType)} />
                <Chip label="PhD"       selected={courseType === 'phd'}      onPress={() => toggle(courseType, 'phd', setCourseType)} />
              </View>
            </View>

            {/* Course Language */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="language" size={16} color="#9CC3FF" />
                <Text style={styles.sectionTitle}>Course Language</Text>
              </View>
              <View style={styles.rowWrap}>
                <Chip label="English only" selected={courseLanguage === 'english'} onPress={() => toggle(courseLanguage, 'english', setCourseLanguage)} />
                <Chip label="German"       selected={courseLanguage === 'german'}  onPress={() => toggle(courseLanguage, 'german', setCourseLanguage)} />
                <Chip label="French"       selected={courseLanguage === 'french'}  onPress={() => toggle(courseLanguage, 'french', setCourseLanguage)} />
              </View>
            </View>

            {/* Intake */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="calendar" size={16} color="#9CC3FF" />
                <Text style={styles.sectionTitle}>Intake</Text>
              </View>
              <View style={styles.rowWrap}>
                <Chip label="Winter" selected={intake === 'winter'} onPress={() => toggle(intake, 'winter', setIntake)} />
                <Chip label="Summer" selected={intake === 'summer'} onPress={() => toggle(intake, 'summer', setIntake)} />
                <Chip label="Fall"   selected={intake === 'fall'}   onPress={() => toggle(intake, 'fall', setIntake)} />
                <Chip label="Spring" selected={intake === 'spring'} onPress={() => toggle(intake, 'spring', setIntake)} />
              </View>
            </View>

            {/* IELTS Score */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="image" size={16} color="#9CC3FF" />
                <Text style={styles.sectionTitle}>IELTS Score</Text>
              </View>

              <View style={styles.sliderRow}>
                <Text style={styles.sliderEdge}>0</Text>
                <Slider
                  style={{ flex: 1 }}
                  minimumValue={0}
                  maximumValue={9}
                  step={0.5}
                  value={ieltsScore}
                  minimumTrackTintColor="#6BA0FF"
                  maximumTrackTintColor="#B3C6DD"
                  thumbTintColor="#5C86E5"
                  onValueChange={setIeltsScore}
                />
                <Text style={styles.sliderEdge}>9.0</Text>
              </View>
              <Text style={styles.sliderValue}>Selected: {ieltsScore.toFixed(1)}</Text>
            </View>

            {/* CTA */}
            <TouchableOpacity style={styles.searchButton} onPress={handleSearchClick} activeOpacity={0.85}>
              <Text style={styles.searchButtonText}>Search University</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Footer (fixed) */}
        <View style={styles.footerWrap}>
          <Footer navigation={navigation} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const NAVY = '#1C2E5C';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: NAVY },
  canvas: { flex: 1, backgroundColor: NAVY, paddingHorizontal: 14, paddingBottom: 16 },

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#E7EDF3', fontSize: 18, fontWeight: '700' },

  scroll: { paddingBottom: 24 },

  /* Search */
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9EEF5',
    borderRadius: 20,
    paddingLeft: 14,
    paddingRight: 10,
    height: 40,
    marginBottom: 18,
  },
  searchInput: { flex: 1, color: '#0F172A', fontSize: 14 },
  searchIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#BFD3F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  section: { marginBottom: 14 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  sectionTitle: { color: '#E7EDF3', fontSize: 14, fontWeight: '700' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  chip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, borderWidth: 1 },
  chipUnselected: { backgroundColor: '#E9EEF5', borderColor: '#CDD6DE' },
  chipSelected: { backgroundColor: '#4F6DE6', borderColor: '#4F6DE6' },
  chipText: { fontSize: 13 },
  chipTextUnselected: { color: '#0F172A', fontWeight: '600' },
  chipTextSelected: { color: '#FFFFFF', fontWeight: '700' },

  sliderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sliderEdge: { color: '#DDE7F2', width: 20, textAlign: 'center', fontSize: 12 },
  sliderValue: { color: '#C4D3E3', fontSize: 12, marginTop: 6 },

  searchButton: {
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#5A7CF0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 22,
    minWidth: 180,
  },
  searchButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15, textAlign: 'center' },

  /* Footer holder */
  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
