import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const PatientItem = () => {
  return(
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}> Sebastian Segura </Text>
      <Text style={styles.itemDescription}> 
        <Text style={styles.itemDate}> 20/09/18 </Text>      
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.  </Text>
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PatientItem />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroudColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  itemContainer: {
    borderBottomColor: 'rgb(233, 233, 233)',
    borderBottomWidth: 2,
  },
  itemTitle: {
    color: '#32ADF5',
    fontSize: 18,
    fontWeight: '100'
  },
  itemDescription: {
    marginBottom: 20,
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    fontWeight: '100'
  },
  itemDate: {
    fontWeight: '600'
  }

})





