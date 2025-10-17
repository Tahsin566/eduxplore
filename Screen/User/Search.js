import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import Footer from '../User/Footer';

function SelectButton({ label, selected, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.SelectButton,
        selected ? styles.SelectButtonSelected : styles.SelectButtonUnselected,
        style,
      ]}
    >
      <Text style={[styles.SelectButtonText, selected ? styles.SelectButtonTextSelected : styles.SelectButtonTextUnselected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function FindUniversity({ navigation }) {

  const [search, setSearch] = useState('');
  const [courseType, setCourseType] = useState('bachelor');
  const [courseLanguage, setCourseLanguage] = useState('german');
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
    <View style={styles.Background}>
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
              onPress={() => navigation?.replace('Home')}
              style={styles.iconBtn}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Find a University</Text>
            <View style={styles.iconBtn} />
          </View>

          <ScrollView
            contentContainerStyle={[styles.scroll, { paddingBottom: 110 }]} 
            keyboardShouldPersistTaps="handled"
          >
            {/* Search bar */}
            <View style={styles.searchBar}>
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
            <View className="Piker" style={styles.Piker}>
              <View style={styles.PikerTitleRow}>
                <Ionicons name="albums" size={16} color="#9CC3FF" />
                <Text style={styles.PikerTitle}>Course Type</Text>
              </View>
              <View style={styles.rowSpace}>
                <SelectButton label="Bachelor"  selected={courseType === 'bachelor'} onPress={() => toggle(courseType, 'bachelor', setCourseType)} />
                <SelectButton label="Master’s"  selected={courseType === 'master'}  onPress={() => toggle(courseType, 'master', setCourseType)} />
                <SelectButton label="PhD"       selected={courseType === 'PhD'}      onPress={() => toggle(courseType, 'PhD', setCourseType)} />
              </View>
            </View>

            {/* Course Language */}
            <View style={styles.Piker}>
              <View style={styles.PikerTitleRow}>
                <Ionicons name="language" size={16} color="#9CC3FF" />
                <Text style={styles.PikerTitle}>Course Language</Text>
              </View>
              <View style={styles.rowSpace}>
                <SelectButton label="English only" selected={courseLanguage === 'english'} onPress={() => toggle(courseLanguage, 'english', setCourseLanguage)} />
                <SelectButton label="German"       selected={courseLanguage === 'german'}  onPress={() => toggle(courseLanguage, 'german', setCourseLanguage)} />
                <SelectButton label="French"       selected={courseLanguage === 'french'}  onPress={() => toggle(courseLanguage, 'french', setCourseLanguage)} />
              </View>
            </View>

            {/* IELTS Score */}
            <View style={styles.Piker}>
              <View style={styles.PikerTitleRow}>
                <Ionicons name="image" size={16} color="#9CC3FF" />
                <Text style={styles.PikerTitle}>IELTS Score</Text>
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

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton} onPress={handleSearchClick} activeOpacity={0.85}>
              <Text style={styles.searchButtonText}>Search University</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Footer (fixed) */}
        <View style={styles.footerContainer}>
          <Footer navigation={navigation} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  Background: { flex: 1, backgroundColor: '#1C2E5C' },
  canvas: { flex: 1, backgroundColor: '#1C2E5C', paddingHorizontal: 14, paddingBottom: 16 },

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  iconBtn: { height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#E7EDF3', fontSize: 18, fontWeight: '700',marginLeft: '25%',marginRight: 'auto' },

  scroll: { paddingBottom: 24 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9EEF5',
    borderRadius: 15,
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

  Piker: { marginBottom: 14 },
  PikerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  PikerTitle: { color: '#E7EDF3', fontSize: 14, fontWeight: '700' },
  rowSpace: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  SelectButton: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, borderWidth: 1 },
  SelectButtonUnselected: { backgroundColor: '#E9EEF5', borderColor: '#CDD6DE' },
  SelectButtonSelected: { backgroundColor: '#4F6DE6', borderColor: '#4F6DE6' },
  SelectButtonText: { fontSize: 13 },
  SelectButtonTextUnselected: { color: '#0F172A', fontWeight: '600' },
  SelectButtonTextSelected: { color: '#FFFFFF', fontWeight: '700' },

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
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
