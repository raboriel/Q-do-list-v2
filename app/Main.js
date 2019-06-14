import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';


export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text>hello</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5D6C89',
  }
});
