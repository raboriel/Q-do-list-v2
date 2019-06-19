import React, { Component } from 'react';
import {
  StyleSheet,
	View,
  Text,
	StatusBar,
	ActivityIndicator,
  TouchableOpacity,
	ScrollView,
	AsyncStorage,
  Action
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import uuid from 'uuid/v1';

export default class Diary extends Component {
  constructor(props){
      super(props);
      this.state = {
          user:{
              noteArr: [],
          },
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Diary</Text>
        <TouchableOpacity onPress={this.newDiary.bind(this)} style={styles.addButton}
        >
        <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    )

  }
  newDiary() {
      Actions.newDiary({title: 'New Diary', noteText: '', location: '', check: Math.random()});
  }

}



const styles = StyleSheet.create({
    container: {

    }
});
