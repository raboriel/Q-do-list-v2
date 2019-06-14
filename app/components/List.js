import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

class List extends Component {
  // toggle for checkbox
  onToggleCircle = () => {
    const { isCompleted, id, completeItem, incompleteList } = this.props;
    console.log(id);
    if (isCompleted) {
      incompleteItem(id);
    } else {
      completeItme(id);
    }
   };
  render() {
    const { text, deleteList, id, isCompleted }
    return (
      <View style={styles.container}>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
  },

});


export default List;
