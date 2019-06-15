import React from 'react';
import Main from './app/Main';
// import navigation from react-navigation
// $ yarn add react-navigation
import {
 createBottomTabNavigator,
 createStackNavigator,
 createAppContainer
} from 'react-navigation';
// import icon for navigation menu
import { Ionicons } from '@expo/vector-icons';



export default class App extends React.Component {
  render() {
    return <Main />;
  }
}
