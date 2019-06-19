import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native';
import { Container, Fab } from 'native-base'

const data = [
  {
  key: 'firebase_id_1',
  name: 'Sebastian Segura',
  date: '20/09/18',
  description: 'Non eu reprehenderit ex magna aute aliqua. Ad ea ea dolore incididunt nulla. Eu fugiat aliqua tempor aliqua.'
  },
  {
  key: 'firebase_id_2',
  name: 'Matias Martinez',
  date: '20/11/18',
  description: 'Non eu reprehenderit ex magna aute aliqua. Ad ea ea dolore incididunt nulla. Eu fugiat aliqua tempor aliqua.'
  },
  {
  key: 'firebase_id_3',
  name: 'Nare Luna',
  date: '24/10/18',
  description: 'Non eu reprehenderit ex magna aute aliqua. Ad ea ea dolore incididunt nulla. Eu fugiat aliqua tempor aliqua.'
  },
]

const PatientItem = (props) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}> {props.item.name} </Text>
      <Text style={styles.itemDescription}>
        <Text style={styles.itemDate}> {props.item.date} </Text>
        {props.item.description}
      </Text>
    </View>
  )
}

export default class Patients extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <FlatList 
          data={ data }
          renderItem = { (row) => <PatientItem item={row.item} /> }
        />
        <Fab 
          position='bottomRight' 
          style={{ backgroundColor: '#32ADF5' }} 
          onPress={() => this.props.navigation.navigate('AddPatient') }
          >
          <Text>
            +
          </Text>
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  itemContainer: {
    borderBottomColor: 'rgb(233, 233, 233)',
    borderBottomWidth: 2,
    paddingTop: 20
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





