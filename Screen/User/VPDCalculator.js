import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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
    // Modified Bavarian Formula: x = 1 + 3*(max - actual)/(max - min)
    const x = 1 + (3 * (mx - c)) / (mx - mn);
    setVpd(x.toFixed(1));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('GradeConverter')}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>VPD Calculator</Text>

      {/* Level picker */}
      <Text style={styles.label}>Calculating VPD For</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.dropdownText}>{level}</Text>
        <Text style={styles.dropdownIcon}>▾</Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.options}>
          {['Bachelor', 'Master'].map(opt => (
            <TouchableOpacity key={opt} style={styles.option} onPress={() => { setLevel(opt); setShowDropdown(false); }}>
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

      {/* Calculate button */}
      <TouchableOpacity style={styles.calcButton} onPress={calculateVPD}>
        <Text style={styles.calcButtonText}>Calculate VPD</Text>
      </TouchableOpacity>

      {/* Result */}
      <Text style={styles.resultLabel}>Your VPD score is:</Text>
      <TextInput style={styles.input} value={vpd} editable={false}/>

      {/* Reference table */}
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>German Grade</Text>
          <Text style={[styles.cell, styles.headerCell]}>Percentage</Text>
          <Text style={[styles.cell, styles.headerCell]}>Description</Text>
        </View>
        {[
          ['1.0 - 1.5','90 - 100','Very Good'],
          ['1.6 - 2.5','80 - 89','Good'],
          ['2.6 - 3.5','65 - 79','Satisfactory'],
          ['3.6 - 4.0','50 - 64','Sufficient'],
          ['5','0 - 49','Deficient'],
        ].map((row,i)=>(
          <View style={styles.row} key={i}>
            {row.map((cell,j)=>(<Text style={styles.cell} key={j}>{cell}</Text>))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2C3E50',
    padding: 20,
    paddingTop: 60,
  },
  backButton: { 
    position:'absolute', 
    top:57, 
    left:20
  },
  backText: { 
    color:'#fff', 
    fontSize:30 
  },
  title: { 
    color:'#fff', 
    fontSize:20, 
    fontWeight:'600', 
    textAlign:'center', 
    marginBottom:20
  },
  label: { 
    color:'#fff', 
    fontSize:14, 
    marginTop:12, 
    marginBottom:6
  },
  dropdown: { 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center', 
    backgroundColor:'#fff', 
    borderRadius:8, 
    height:45, 
    paddingHorizontal:12
  },
  dropdownText:{ 
    color:'#333'
  },
  dropdownIcon:{ 
    color:'#333', 
    fontSize:18 
  },
  options:{ 
    backgroundColor:'#fff', 
    borderRadius:8, 
    marginTop:4
  },
  option:{ 
    padding:10
  },
  optionText:{
    color:'#333'
  },
  input:{ 
    backgroundColor:'#fff', 
    borderRadius:8, 
    height:45, 
    paddingHorizontal:12, 
    color:'#000'
  },
  calcButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 45,
    width: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  calcButtonText:{ 
    color:'#000', 
    fontSize:16, 
    fontWeight:'600'
  },
  resultLabel:{ 
    color:'#fff', 
    fontSize:14, 
    marginTop:20, 
    marginBottom:6

  },
  table:{ 
    marginTop:20, 
    borderWidth:1, 
    borderColor:'#ccc', 
    borderRadius:4, 
    overflow:'hidden' 
  },
  row:{ 
    flexDirection:'row'
  },
  headerRow:{ 
    backgroundColor:'#33475B'
  },
  cell:{ 
    flex:1, 
    padding:8, 
    borderRightWidth:1, 
    borderRightColor:'#ccc', 
    color:'#000', 
    backgroundColor:'#fff'
  },
  headerCell:{ 
    color:'#fff', 
    fontWeight:'600', 
    backgroundColor:'#33475B'
  },
});
