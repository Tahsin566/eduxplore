import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../User/Footer';

export default function ECTSCalculatorScreen({ navigation }) {
  const [bdCredit, setBdCredit] = useState('');
  const [ects, setEcts] = useState('');

  const onCalculate = () => {
    if (bdCredit === '') {
      setEcts('');
    } else {
      const r = bdCredit * 1.5;
      if (isNaN(r)) setEcts('');
      else setEcts((Math.round(r * 100) / 100).toString());
    }
  };

  return (
    <View style={styles.screen}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('GradeConverter')} style={styles.backBtn}>
          <Text style={styles.backTxt}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ECTS Calculator</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Card */}
        <View style={styles.card}>
          <View style={styles.iconTile}>
            <Ionicons name="calculator" size={26} color="#FFFFFF" />
          </View>

          <Text style={styles.cardTitle}>ECTS Calculator</Text>
          <Text style={styles.cardSub}>Convert your credits to European{'\n'}Credit Transfer System</Text>

          {/* Total Credit */}
          <Text style={styles.fieldLabel}>Total Credit*</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              placeholder="Enter your hours"
              placeholderTextColor="#8898A6"
              value={bdCredit}
              onChangeText={setBdCredit}
            />
            <Ionicons name="calculator-outline" size={18} color="#4C5A67" />
          </View>

          <TouchableOpacity style={styles.calcBtn} onPress={onCalculate} activeOpacity={0.85}>
            <Ionicons name="calculator" size={16} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.calcBtnText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {/* Result */}
        <Text style={styles.resultLabel}>Equivalent ECTS is :</Text>
        <TextInput style={styles.resultInput} editable={false} value={ects} />

        {/* Info box */}
        <View style={styles.infoBox}>
          <View style={styles.infoTitleRow}>
            <Ionicons name="alert-circle" size={16} color="#F59E0B" />
            <Text style={styles.infoTitle}>Conversion Information</Text>
          </View>
          <Text style={styles.infoText}>
            Most European universities consider 1 Bangladeshi credit = 1.5 ECTS. This conversion may vary slightly
            between institutions.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerWrap}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const NAVY = '#1a2d3f';
const CARD_BG = '#E9EEF3';
const TILE_BG = '#6C5CE7';
const CTA_BG = '#4C6EF5';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: NAVY,
  },

  topBar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    justifyContent: 'space-between',
  },
  backBtn: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  backTxt: { color: '#E7EDF3', fontSize: 26, lineHeight: 26, marginTop: -2 },
  title: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  card: {
    backgroundColor: CARD_BG,
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
    backgroundColor: TILE_BG,
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
  cardSub: {
    color: '#607389',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },

  fieldLabel: { color: '#0F172A', fontSize: 12, fontWeight: '700', marginTop: 16, marginBottom: 6 },
  inputRow: {
    height: 38,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: { flex: 1, color: '#0F172A', marginRight: 8 },

  calcBtn: {
    alignSelf: 'center',
    marginTop: 12,
    backgroundColor: CTA_BG,
    borderRadius: 6,
    height: 36,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  calcBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },

  resultLabel: { color: '#E7EDF3', fontSize: 12, marginTop: 16, marginBottom: 6, paddingHorizontal: 2 },
  resultInput: {
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
  infoTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  infoTitle: { color: '#B45309', fontWeight: '800', fontSize: 12 },
  infoText: { color: '#6B7280', fontSize: 12, lineHeight: 16 },

  footerWrap: {
    borderTopWidth: 0,
  },
});
