import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Footer from '../User/Footer';

export default function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header with back chevron and centered title */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Grade Converter</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* VPD Card */}
        <View style={styles.card}>
          <View style={styles.iconTile}>
            <Ionicons name="calculator" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.cardTitle}>VPD Calculator</Text>
          <Text style={styles.cardSub}>
            Calculate your  VPD{'\n'}
            (Vorprüfungsdokumentation) for{'\n'}
            German university
          </Text>
          <TouchableOpacity
            style={styles.cta}
            onPress={() => navigation.navigate('VPDCalculator')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>Calculate VPD</Text>
          </TouchableOpacity>
        </View>

        {/* ECTS Card */}
        <View style={styles.card}>
          <View style={styles.iconTile}>
            <Ionicons name="pie-chart" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.cardTitle}>ECTS Calculator</Text>
          <Text style={styles.cardSub}>
            Calculate your  VPD{'\n'}
            (Vorprüfungsdokumentation) for{'\n'}
            German university
          </Text>
          <TouchableOpacity
            style={styles.cta}
            onPress={() => navigation.navigate('ECTSCalculator')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>Calculate ECTS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer nav */}
      <View style={styles.footerWrap}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const NAVY = '#1C2E5C';
const CARD_BG = '#E9EEF3';
const TILE_BG = '#6C5CE7';
const CTA_BG = '#4C6EF5';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: NAVY },
  headerBar: {
    marginBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  backTxt: { color: '#FFFFFF', fontSize: 26, lineHeight: 26, marginTop: -2 },
  headerText: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },

  scroll: { paddingHorizontal: 16, paddingBottom: 20 },

  card: {
    backgroundColor: CARD_BG,
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  iconTile: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: TILE_BG,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#0F172A',
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'left',
    marginTop: 4,
  },
  cardSub: {
    color: '#5B6B7A',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 16,
  },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: CTA_BG,
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  ctaText: { color: '#FFFFFF', fontWeight: '700' },

  footerWrap: {
    borderTopWidth: 0,
  },
});
