import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Footer from '../User/Footer';

export default function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Grade Converter</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* VPD */}
        <View style={styles.card}>
          <View style={styles.iconTile}>
            <Ionicons name="calculator" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.cardTitle}>VPD Calculator</Text>
          <Text style={styles.cardContent}>
            Calculate your  VPD{'\n'}
            (Vorprüfungsdokumentation) for{'\n'}
            German university
          </Text>
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={() => navigation.navigate('VPDCalculator')}
            activeOpacity={0.85}
          >
            <Text style={styles.calculateButtonText}>Calculate VPD</Text>
          </TouchableOpacity>
        </View>

        {/* ECTS  */}
        <View style={styles.card}>
          <View style={styles.iconTile}>
            <Ionicons name="pie-chart" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.cardTitle}>ECTS Calculator</Text>
          <Text style={styles.cardContent}>
            Calculate your  ECTS{'\n'}
          </Text>
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={() => navigation.navigate('ECTSCalculator')}
            activeOpacity={0.85}
          >
            <Text style={styles.calculateButtonText}>Calculate ECTS</Text>
          </TouchableOpacity>
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
  container: { flex: 1, backgroundColor: '#1C2E5C' },
  headerBar: {
    marginBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  headerText: { color: '#FFFFFF', fontSize: 20, fontWeight: '700',marginLeft: -1 },

  scroll: { paddingHorizontal: 16, paddingBottom: 20 },

  card: {
    backgroundColor: '#E9EEF3',
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
    backgroundColor: '#6C5CE7',
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
  cardContent: {
    color: '#5B6B7A',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 16,
  },
  calculateButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#4C6EF5',
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  calculateButtonText: { color: '#FFFFFF', fontWeight: '700' },

    footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
