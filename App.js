import React from 'react';
import Main from './app/Main';
import NotDo from './app/Notdo';
// import navigation from react-navigation
// $ yarn add react-navigation
import {
 createBottomTabNavigator,
 createStackNavigator,
 createAppContainer
} from 'react-navigation';
// import icon for navigation menu
import { Ionicons } from '@expo/vector-icons';


// Stack Navigation
const TodoStack = createStackNavigator({
  Todo: Main,
})

const DiaryStack = createStackNavigator({
  NotDo: NotDo
})

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Todo') {
    iconName = `md-checkbox${focused ? '' : '-outline'}`;
  } else if (routeName === 'NotDo') {
    iconName = `md-close${focused ? '' : ''}`;
  }
  return <IconComponent name={iconName} size={22} color={tintColor} />;
};

// Tab Navigation
const TabNavigator = createBottomTabNavigator({
  Todo: Main,
  NotDo: NotDo,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    activeTintColor: '#278AB0',
    inactiveTintColor: 'gray',
  },
});

export default createAppContainer(TabNavigator);
