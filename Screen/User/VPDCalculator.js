import { Ionicons } from '@expo/vector-icons';
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Footer from '../User/Footer';

export default function VPDCalculator({ navigation }) {
  // Hide default header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [level, setLevel] = useState('Bachelor');
  const [showDropdown, setShowDropdown] = useState(false);
  const [cgpa, setCgpa] = useState('');
  const [hsc, setHsc] = useState('');
  const [maxCgpa, setMaxCgpa] = useState('');
  const [minCgpa, setMinCgpa] = useState('');
  const [vpd, setVpd] = useState('');

  const calculateVPD = () => {
    const c = parseFloat(cgpa);
    const mx = parseFloat(maxCgpa);
    const mn = parseFloat(minCgpa);
    if (isNaN(c) || isNaN(mx) || isNaN(mn) || mx <= mn) {
      setVpd('');
      return;
    }
    const x = 1 + (3 * (mx - c)) / (mx - mn);
    setVpd(x.toFixed(1));
  };

  return (
    <View style={styles.screen}>
      {/* Top bar like mock: back on left, centered title */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('GradeConverter')}>
          <Text style={styles.backTxt}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>VPD Calculator</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Level picker */}
        <Text style={styles.label}>Calculating VPD For</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowDropdown(!showDropdown)}>
          <Text style={styles.dropdownText}>{level}</Text>
        </TouchableOpacity>
        {showDropdown && (
          <View style={styles.options}>
            {['Bachelor', 'Master'].map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.option}
                onPress={() => {
                  setLevel(opt);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Inputs */}
        <Text style={styles.label}>Current CGPA</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={cgpa}
          onChangeText={setCgpa}
        />

        {level === 'Bachelor' && (
          <>
            <Text style={styles.label}>HSC Grade</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={hsc}
              onChangeText={setHsc}
            />
          </>
        )}

        <Text style={styles.label}>Maximum Possible CGPA</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={maxCgpa}
          onChangeText={setMaxCgpa}
        />

        <Text style={styles.label}>Minimum Possible CGPA</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={minCgpa}
          onChangeText={setMinCgpa}
        />

        {/* Calculate button (blue, with icon) */}
        <TouchableOpacity style={styles.calcBtn} onPress={calculateVPD} activeOpacity={0.85}>
          <Ionicons name="calculator" size={16} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.calcBtnText}>Calculate VPD</Text>
        </TouchableOpacity>

        {/* Result */}
        <Text style={styles.resultLabel}>Your VPD score is</Text>
        <TextInput style={styles.input} value={vpd} editable={false} />

        {/* Reference table */}
        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell]}>German Grade</Text>
            <Text style={[styles.cell, styles.headerCell]}>Percentage</Text>
            <Text style={[styles.cell, styles.headerCell]}>Description</Text>
          </View>
          {[
            ['1.0 - 1.5', '90 - 100', 'Very Good'],
            ['1.6 - 2.5', '80 - 89', 'Good'],
            ['2.6 - 3.5', '65 - 79', 'Satisfactory'],
            ['3.6 - 4.0', '50 - 64', 'Sufficient'],
            ['5', '0 - 49', 'Deficient'],
          ].map((row, i) => (
            <View style={styles.row} key={i}>
              {row.map((cell, j) => (
                <Text style={styles.cell} key={j}>
                  {cell}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* bottom padding so content isn't hidden by footer */}
        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerWrap}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const NAVY = '#1C2E5C';

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: NAVY },
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

  content: { paddingHorizontal: 16, paddingBottom: 8 },

  label: { color: '#FFFFFF', fontSize: 14, marginTop: 12, marginBottom: 6 },

  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 12,
  },
  dropdownText: { color: '#333' },
  dropdownIcon: { color: '#333', fontSize: 18 },
  options: { backgroundColor: '#FFFFFF', borderRadius: 8, marginTop: 4 },
  option: { padding: 10 },
  optionText: { color: '#333' },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 12,
    color: '#000',
  },

  calcBtn: {
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#4C6EF5',
    borderRadius: 8,
    height: 42,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  calcBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },

  resultLabel: { color: '#FFFFFF', fontSize: 14, marginTop: 18, marginBottom: 6 },

  table: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#BCC6CF',
    borderRadius: 6,
    overflow: 'hidden',
  },
  row: { flexDirection: 'row' },
  headerRow: { backgroundColor: '#33475B' },
  cell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#D8DFE6',
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    fontSize: 12,
  },
  headerCell: { color: '#FFFFFF', fontWeight: '700', backgroundColor: NAVY },

  footerWrap: {
    borderTopWidth: 0,
  },
});
