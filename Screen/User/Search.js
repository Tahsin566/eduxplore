import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, Image } from 'react-native';

// Import the bookmark image
const bookmarkIconPath = require('../../Images/Bookmark.png');  // Bookmark Image Path

function Dropdown({ label, placeholder, options, value, onChange, radio = false, openDropdown, setOpenDropdown }) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    if (openDropdown === label) {
      setOpenDropdown(null); 
    } else {
      setOpenDropdown(label); 
    }
    setOpen(!open);
  };

  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>

      {/* Trigger (no arrow icon) */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={toggleDropdown}
        style={styles.input}
      >
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {value ? options.find(o => o.value === value)?.label : (placeholder || 'Select')}
        </Text>
      </TouchableOpacity>

      {openDropdown === label && (  // Show dropdown if it matches the open dropdown
        <View style={[styles.dropdown, open && { zIndex: 10 }]}>
          {/* Scrollable options */}
          <ScrollView style={{ maxHeight: 220 }} keyboardShouldPersistTaps="handled">
            {options.map((option) => {
              const selected = value === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => {
                    onChange(option.value);
                    setOpenDropdown(null); // Close dropdown after selection
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{option.label}</Text>
                  {radio ? (
                    <View style={[styles.radio, selected && styles.radioSelected]} />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default function FindUniversity({ navigation }) {
  const [search, setSearch] = useState('');
  const [courseType, setCourseType] = useState(null);
  const [courseLanguage, setCourseLanguage] = useState(null);
  const [intake, setIntake] = useState(null);
  const [fieldOfStudy, setFieldOfStudy] = useState(null);
  const [ieltsScore, setIeltsScore] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null); // State for tracking the open dropdown

  // State for the bookmark count
  const [bookmarkCount, setBookmarkCount] = useState(0); // Counter for the bookmark icon

  const courseTypeOptions = [
    { label: 'Bachelor', value: 'bachelor' },
    { label: "Master's", value: 'masters' },
  ];

  const courseLanguageOptions = [
    { label: 'English only', value: 'english' },
    { label: 'German & English', value: 'german_english' },
  ];

  const intakeOptions = [
    { label: 'Winter', value: 'winter' },
    { label: 'Summer', value: 'summer' },
  ];

  const fieldOfStudyOptions = [
    { label: 'Agriculture, Forestry and Nutritional Sciences', value: 'agriculture' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Law, Economics and Social Sciences', value: 'law' },
    { label: 'Languages and Cultural Studies', value: 'languages' },
    { label: 'Mathematics, Natural Sciences', value: 'mathematics' },
    { label: 'Medicine', value: 'medicine' },
  ];

  const handleSearchClick = () => {
    // navigation.navigate('Result'); // Replace 'YourNextScreen' with the actual screen name
    navigation.navigate('Result', { search, courseType, courseLanguage, intake, fieldOfStudy, ieltsScore });
  };

  // Function to increment the bookmark count
  const incrementBookmarkCount = () => {
    setBookmarkCount(prevCount => prevCount + 1); // Increment the count by 1
  };

  // Function to navigate to the bookmark screen when the bookmark icon is clicked
  const handleBookmarkClick = () => {
    navigation.navigate('Wishlist'); // Replace 'BookmarkScreen' with the actual path
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.canvas}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => navigation?.navigate('Home')}
            style={styles.iconBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.iconText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Find a University</Text>
          <View style={styles.iconBtn}>
            {/* Bookmark Icon with counter */}
            <TouchableOpacity onPress={() => { incrementBookmarkCount(); handleBookmarkClick(); }} style={styles.iconWrapper}>
              <View style={styles.iconContainer}>
                <Image source={bookmarkIconPath} style={styles.iconImage} />
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{bookmarkCount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Search (optional) */}
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#9BA8B5"
            value={search}
            onChangeText={setSearch}
          />

          <Dropdown
            label="Course Type"
            options={courseTypeOptions}
            value={courseType}
            onChange={setCourseType}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          <Dropdown
            label="Course Language"
            options={courseLanguageOptions}
            value={courseLanguage}
            onChange={setCourseLanguage}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          <Dropdown
            label="Intake"
            options={intakeOptions}
            value={intake}
            onChange={setIntake}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          <Dropdown
            label="Field of study"
            placeholder="Please select"
            options={fieldOfStudyOptions}
            value={fieldOfStudy}
            onChange={setFieldOfStudy}
            radio
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          {/* IELTS (optional) */}
          <Text style={styles.fieldLabel}>IELTS Score</Text>
          <TextInput
            style={styles.input}
            placeholder="IELTS Score"
            placeholderTextColor="#9BA8B5"
            value={ieltsScore}
            onChangeText={setIeltsScore}
            keyboardType="decimal-pad"
          />

          {/* Search button styled like the screenshot */}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchClick} activeOpacity={0.85}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
    backgroundColor: '#007AFF', // Badge color
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

  scroll: {
    paddingBottom: 24,
  },
  fieldBlock: {
    marginBottom: 18,
    position: 'relative',
  },
  fieldLabel: {
    color: '#E7EDF3',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BCC6CF',
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  inputText: {
    color: '#1F2933',
    fontSize: 15,
  },
  placeholderText: {
    color: '#9BA8B5',
  },

  dropdown: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CDD6DE',
    borderRadius: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 15,
    color: '#1F2933',
    flex: 1,
    paddingRight: 12,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#A2B0BF',
  },
  radioSelected: {
    borderColor: '#2E3E4A',
    backgroundColor: '#2E3E4A',
  },

  searchButton: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#DADDE1',   
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  searchButtonText: {
    color: '#1F2933',
    fontWeight: '700',
    fontSize: 15,
  },
});

