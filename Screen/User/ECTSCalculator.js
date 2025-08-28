import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function FindUniversity({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [search, setSearch] = useState('');
  const [courseType, setCourseType] = useState(null);
  const [courseLanguage, setCourseLanguage] = useState(null);
  const [intake, setIntake] = useState(null);
  const [fieldOfStudy, setFieldOfStudy] = useState(null);
  const [ieltsScore, setIeltsScore] = useState('');

  const [openDropdown, setOpenDropdown] = useState(null);  // Track which dropdown is open

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
    { label: 'Law, Economics and Social Sciences', value: 'law_economics' },
    { label: 'Languages and Cultural Studies', value: 'languages' },
    { label: 'Mathematics, Natural Sciences', value: 'mathematics' },
    { label: 'Medicine', value: 'medicine' }, // This will show now
  ];

  const handleSearch = () => {
    if (!courseType || !courseLanguage || !intake || !fieldOfStudy) {
      Alert.alert('Required', 'All fields must be selected (except Search and IELTS).');
      return;
    }
    Alert.alert('Searching', 'Your filters are set. Running search…');
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Find a University</Text>
      </View>

      {/* Form */}
      <ScrollView style={styles.form}>
        {/* Search Field */}
        <Text style={styles.label}>Search</Text>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />

        {/* Course Type Dropdown */}
        <Dropdown
          label="Course Type"
          options={courseTypeOptions}
          value={courseType}
          onChange={setCourseType}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />

        {/* Course Language Dropdown */}
        <Dropdown
          label="Course Language"
          options={courseLanguageOptions}
          value={courseLanguage}
          onChange={setCourseLanguage}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />

        {/* Intake Dropdown */}
        <Dropdown
          label="Intake"
          options={intakeOptions}
          value={intake}
          onChange={setIntake}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />

        {/* Field of Study Dropdown */}
        <Dropdown
          label="Field of Study"
          options={fieldOfStudyOptions}
          value={fieldOfStudy}
          onChange={setFieldOfStudy}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />

        {/* IELTS Score Input */}
        <Text style={styles.label}>IELTS Score (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="IELTS Score"
          value={ieltsScore}
          onChangeText={setIeltsScore}
        />

        {/* Search Button */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Dropdown({ label, options, value, onChange, openDropdown, setOpenDropdown }) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(openDropdown === label ? null : label);  // Toggle only one dropdown at a time
  };

  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        onPress={toggleDropdown}
        style={styles.input}
      >
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {value ? options.find(o => o.value === value)?.label : 'Select'}
        </Text>
      </TouchableOpacity>

      {openDropdown === label && (  // Show dropdown if it's the active one
        <View style={styles.dropdown}>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              onPress={() => {
                onChange(option.value);
                setOpenDropdown(null);  // Close the dropdown after selection
              }}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    paddingTop: 60,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  headerBar: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 50,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  form: {
    width: '90%',
    marginTop: 40,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 12,
    color: '#000000',
    marginBottom: 20,
  },
  inputText: {
    fontSize: 16,
  },
  placeholderText: {
    color: '#B0B0B0',
  },
  dropdown: {
    position: 'absolute',
    top: 100, // Ensures dropdown appears below input
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000000',
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
