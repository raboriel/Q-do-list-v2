import React from 'react';
import {
  StyleSheet,
	View,
	StatusBar,
	ActivityIndicator,
	ScrollView,
	AsyncStorage,
  Dimensions
} from 'react-native';
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



}
