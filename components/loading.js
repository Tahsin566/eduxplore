import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#2C3E50' }}>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})