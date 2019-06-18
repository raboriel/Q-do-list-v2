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
import { LinearGradient } from 'expo';
import uuid from 'uuid/v1';

// import from components
import Header from './components/Header';
import Input from './components/Input';
import List from './components/List';
const { width } = Dimensions.get('window');

const headerTitle = 'Q Do List';

export default class Main extends React.Component {
  state = {
    inputValue: '',
    loadingLists: false,
    allLists: {},
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
			delete allLists[id];
			const newState = {
				...prevState,
				...allLists
			};
			this.saveLists(newState.allLists);
			return { ...newState };
		});
	};

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
        colors={['#55637d', '#4b576e']}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.centered}>
          <Header title={headerTitle} />
        </View>
        <View style={styles.listContainer}>
        <View style={styles.inputContainer}>
          <Input
          inputValue={inputValue}
          onChangeText={this.newInputValue}
          onDoneAddList={this.onDoneAddList}
          />
        </View>
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
    backgroundColor: '#fff',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  centered: {
    alignItems: 'center',
    fontWeight: '300',
  },
  inputContainer: {
     padding: 10,
     borderBottomColor: '#bbb',
     borderBottomWidth: 1,
     fontSize: 24
  },
  list: {
    alignItems: 'center',
    flex: 1,
    padding: 15,
  },
  scrollableList: {
    marginTop: 15
  },

});
