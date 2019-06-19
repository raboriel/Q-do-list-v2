import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({ inputValue, onChangeText, onDoneAddList }) => (
  <TextInput
    style={styles.input}
    value={inputValue}
    onChangeText={onChangeText}
    placeholder="Add a list!"
    placeholderTextColor={'#bbb'}
    multiline={true}
    autoCapitalize="sentences"
    selectionColor={'#FBF6F3'}
    maxLength={30}
    returnKeyType="done"
    autoCorrect={false}
    blurOnSubmit={true}
    onSubmitEditing={onDoneAddList}
  />
);
const styles = StyleSheet.create({
  input: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 15,
    fontSize: 28,
    color: 'gray',
    fontWeight: '500'
  }
});

export default Input;
