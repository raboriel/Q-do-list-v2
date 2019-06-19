import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Header = ({ title }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{title.toUpperCase()}</Text>
  </View>
);
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 30
  },
  headerText: {
    color: 'white',
    fontSize: 35,
    fontWeight: '500'
  }
});
export default Header;
