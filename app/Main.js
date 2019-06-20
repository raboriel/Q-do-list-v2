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
// drag and drop sort

// import from components
import Header from './components/Header';
import Input from './components/Input';
import List from './components/List';


// set devise's width
const { width } = Dimensions.get('window');
const headerTitle = 'Q Do List';

export default class Main extends React.Component {
  state = {
    inputValue: '',
    loadingLists: false,
    allLists: {},
    comLists: {},
    isCompleted: false
  };

  componentDidMount = () => {
    this.loadingLists();
  };

  newInputValue = value => {
    this.setState({
      inputValue: value
    });
  };

  // get lists from AsyncStorage
  loadingLists = async () => {
   try {
     const allLists = await AsyncStorage.getItem('Todos');
     this.setState({
       loadingLists: true,
       allLists: JSON.parse(allLists) || {}
     });
   } catch (err) {
     console.log(err);
   }
 };

 onDoneAddList = () => {
    const { inputValue } = this.state;
    if (inputValue !== '') {
      this.setState(prevState => {
        const id = uuid();
        const newListObject = {
          [id]: {
            id,
            isCompleted: false,
            text: inputValue,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          inputValue: '',
          allLists: {
            ...prevState.allLists,
            ...newListObject
          }
        };
        this.saveLists(newState.allLists);
        return { ...newState };
      });
    }
  };

  deleteList = id => {
		this.setState(prevState => {
			const allLists = prevState.allLists;
      const comLists = allLists[id]
			delete allLists[id];
			const newState = {
				...prevState,
				...allLists,
			};
      const newStateCom = {
        ...comLists,
      };

			this.saveLists(newState.allLists);
      this.saveLists(newStateCom.comLists);
      console.log('this.state', this.state.comLists);
      console.log('comlists', comLists);

      // this.clearAsyncStorage()
			return { ...newState };
		});
	};

  // clearAsyncStorage = async() => {
  //   AsyncStorage.clear();
  // }

  completeList = id => {
  this.setState(prevState => {
    const newState = {
      ...prevState,
      allLists: {
        ...prevState.allLists,
        [id]: {
          ...prevState.allLists[id],
          isCompleted: true
        }
      }
    };
    this.saveLists(newState.allLists);
    return { ...newState };
    });
  };

  incompleteList = id => {
  this.setState(prevState => {
    const newState = {
      ...prevState,
      allLists: {
        ...prevState.allLists,
        [id]: {
          ...prevState.allLists[id],
          isCompleted: false
        }
      }
    };
    this.saveLists(newState.allLists);
    return { ...newState };
    });
  };

  saveLists = newList => {
   const saveList = AsyncStorage.setItem('Todos', JSON.stringify(newList));
  };
  render() {
    const { inputValue, loadingLists, allLists } = this.state;
    return (
      <LinearGradient
        colors={['#1C4670', '#2c4660']}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        <Header title={headerTitle} />
        <View style={styles.inputContainer}>
          <Input
          inputValue={inputValue}
          onChangeText={this.newInputValue}
          onDoneAddList={this.onDoneAddList}
          />
        </View>
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
                        deleteList={this.deleteList}
                        completeList={this.completeList}
                        incompleteList={this.incompleteList}
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
  inputContainer: {
     backgroundColor: 'white',
     width: width - 25,
     marginTop: 10,
     borderRadius: 10,
     fontSize: 24
  },
  list: {
    alignItems: 'center',
    flex: 1,
    padding: 15,
  },
});
