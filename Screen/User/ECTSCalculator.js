import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ECTSCalculatorScreen({ navigation }) {
  const [bdCredit, setBdCredit] = useState('');
  const [ects, setEcts] = useState('');

  const onCalculate = () => {
    if (bdCredit === '') {
      setEcts('');
    } else {
      const r = bdCredit * 1.5;
      if (isNaN(r)) {
        setEcts('');
      } else {
        setEcts((Math.round(r * 100) / 100).toString());
      }
    }
  };

  return (
    <View style={styles.screen}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('GradeConverter')}
          style={styles.backBtn}
        >
          <Text style={styles.backTxt}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ECTS Calculator</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Body */}
      <Text style={styles.label}>Enter Your Total Credit*</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={bdCredit}
        onChangeText={setBdCredit}
      />

      <TouchableOpacity style={styles.button} onPress={onCalculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      <Text style={[styles.label, { marginTop: 12 }]}>Equivalent ECTS is :</Text>
      <TextInput style={styles.input} editable={false} value={ects} />

      <Text style={styles.note}>
        Most European universities consider 1 Bangladeshi credit = 1.5 ECTS
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#283645',
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  topBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTxt: {
    color: '#C7D2DA',
    fontSize: 18,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  label: {
    color: '#fff',
    fontSize: 12,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#E9EEF2',
    height: 36,
    borderRadius: 4,
    paddingHorizontal: 10,
    color: '#1F2A36',
  },
  button: {
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 16,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#243444',
    fontSize: 12,
    fontWeight: '700',
  },
  note: {
    color: '#B9C6CF',
    fontSize: 10,
    marginTop: 6,
  },
});