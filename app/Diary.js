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
// For gradient background color
import { LinearGradient } from 'expo';
import uuid from 'uuid/v1';

// import from components
import Header from './components/Header';
import List from './components/List';

// set devise's width
const { width } = Dimensions.get('window');
const headerTitle = 'Q Do List';

export default class Completed extends React.Component {
  state = {
    comLists: {},
  };

  componentDidMount = () => {
    this.loadingLists();
  };

  // get lists from AsyncStorage
  loadingLists = async () => {
   try {
     const allLists = await AsyncStorage.getItem('Completed');
     this.setState({
       loadingLists: true,
       comLists: JSON.parse(comLists) || {}
     });
   } catch (err) {
     console.log(err);
   }
 };

  deleteList = id => {
		this.setState(prevState => {
			const allLists = prevState.allLists;
			delete allLists[id];
			const newState = {
				...prevState,
				...allLists
			};
			this.saveLists(newState.allLists);
			return { ...newState };
		});
	};

  saveLists = newList => {
   const saveList = AsyncStorage.setItem('Completed', JSON.stringify(newList));
  };

  render() {
    const { loadingLists, allLists } = this.state;
    return (
      <LinearGradient
        colors={['#1C4670', '#2c4660']}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        <Header title={headerTitle} />
        <View style={styles.listContainer}>
        <View style={styles.list}>
        		{loadingLists ? (
        			   <ScrollView contentContainerStyle={styles.scrollableList}>
        						{Object.values(allLists)
        							.reverse()
        							.map(list => (
        							<List
        								key={list.id}
        								{...list}
        							/>
        							))}
        						</ScrollView>
        					) : (
        				 <ActivityIndicator size="large" color="white" />
        			)}
        	</View>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  listContainer: {
    backgroundColor: '#EBF5F7',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,

  },
  list: {
    alignItems: 'center',
    flex: 1,
    padding: 15,
  },
});
