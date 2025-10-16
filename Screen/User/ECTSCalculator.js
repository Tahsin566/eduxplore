import React, { useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../User/Footer';

export default function ECTSCalculatorScreen({ navigation }) {

  const [Credit, setCredit] = useState('');
  const [ects, setEcts] = useState('');

  const onCalculate = () => {
    if (Credit === '') {
      setEcts('');
    } 
    else {
      const r = Credit * 1.5;
      if (isNaN(r)) setEcts('');
      else setEcts((r).toString());
    }
  };
 

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('GradeConverter')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ECTS Calculator</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.page}>
        {/* Card */}
        <View style={styles.card}>
          <View style={styles.iconTile}>
            <Ionicons name="calculator" size={26} color="#FFFFFF" />
          </View>

          <Text style={styles.cardTitle}>ECTS Calculator</Text>
          <Text style={styles.cardSubInfo}>Convert your credits to European{'\n'}Credit Transfer System</Text>

          {/* Total Credit */}
          <Text style={styles.inputFieldTitle}>Total Credit*</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              placeholder="Enter your Credit"
              placeholderTextColor="#8898A6"
              value={Credit}
              onChangeText={setCredit}
            />
          </View>

          <TouchableOpacity style={styles.calculateButton} onPress={onCalculate} activeOpacity={0.85}>
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {/* Result */}
        <Text style={styles.resultFieldTitle}>Equivalent ECTS is :</Text>
        <TextInput style={styles.resultField} editable={false} value={ects} />

        {/* Info box */}
        <View style={styles.infoBox}>
          <View style={styles.infoBoxTitleIcon}>
            <Ionicons name="alert-circle" size={16} color="#F59E0B" />
            <Text style={styles.infoBoxTitle}>Conversion Information</Text>
          </View>
          <Text style={styles.infoBoxText}>
            Most European universities consider 1 credit = 1.5 ECTS. This conversion may vary slightly
            between institutions.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1C2E5C',
  },

  headerContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop:-5,
    justifyContent: 'space-between',
  },
  backButton: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  page: { paddingHorizontal: 20 },

  card: {
    backgroundColor: '#E9EEF3',
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  iconTile: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#0F172A',
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 4,
  },
  cardSubInfo: {
    color: '#607389',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },

  inputFieldTitle: { color: '#0F172A', fontSize: 12, fontWeight: '700', marginTop: 16, marginBottom: 6 },
  inputField: {
    height: 38,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: { flex: 1, color: '#0F172A', marginRight: 8 },

  calculateButton: {
    alignSelf: 'center',
    marginTop: 12,
    backgroundColor: '#4C6EF5',
    borderRadius: 6,
    height: 36,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  calculateButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },

  resultFieldTitle: { color: '#E7EDF3', fontSize: 12, marginTop: 16, marginBottom: 6, paddingHorizontal: 2 },
  resultField: {
    height: 38,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    color: '#0F172A',
  },

  infoBox: {
    backgroundColor: '#EDE7F6',
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
  },
  infoBoxTitleIcon: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  infoBoxTitle: { color: '#B45309', fontWeight: '800', fontSize: 12 },
  infoBoxText: { color: '#6B7280', fontSize: 12, lineHeight: 16 },

  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
