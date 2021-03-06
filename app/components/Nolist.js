import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');



class List extends Component {
  // toggle for checkbox
  onToggleCircle = () => {
    const { isCompleted, id, completeList, incompleteList } = this.props;
    console.log(id);
    if (isCompleted) {
      incompleteList(id);
    } else {
      completeList(id);
    }
   };
  render() {
    const { text, deleteList, id, isCompleted } = this.props;
    return (
      <View style={styles.container}>
             <View style={styles.column}>
               <TouchableOpacity onPress={this.onToggleCircle}>
                 <MaterialIcons
                   name="cancel"
                   size={30}
                   style={styles.icon}
                   color={
                     isCompleted
                       ? '#D43790'
                       : '#58061f'
                     }
                 />
               </TouchableOpacity>
               <Text
                 style={[
                   styles.text,
                   isCompleted
                     ? {
                         color: '#58061f',
                         textDecorationLine: 'line-through'
                       }
                     : { color: '#555555' }
                 ]}
               >
                 {text}
               </Text>
             </View>
             {isCompleted ? (
               <View style={styles.button}>
                 <TouchableOpacity onPressOut={() => deleteList(id)}>
                   <MaterialIcons
                     name="delete"
                     size={24}
                     color={'#58061f'}
                   />
                 </TouchableOpacity>
               </View>
             ) : null}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		justifyContent: 'space-between',
    width: width - 50,
    height: 54,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
	},
	column: {
    flexDirection: 'row',
    alignItems: 'center',
	},
  icon: {
    margin: 10
  },
	text: {
		fontWeight: '500',
		fontSize: 16,
		marginVertical: 15,
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 3,
		margin: 10
	},
	button: {
		marginRight: 10
	}
});

export default List;
