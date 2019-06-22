import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native';
import { Container, Fab } from 'native-base'
import { firestore } from '../../firebase/firebase'

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
  let { name, lastname } = props.item
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}> {`${name} ${lastname}`}  </Text>
        <Text style={styles.itemDescription}>
          <Text style={styles.itemDate}> {props.item.date} </Text>
          {props.item.diagnosis}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

export default class Patients extends React.Component {
  state = {
    patients: [],
  }
  async componentDidMount(){
    let collection = await firestore.collection('patients').get();
    let patients = [];
    collection.docs.forEach(
      doc => {
        patients.push(doc.data());
      }
    )
    this.setState({ patients })
  }
  onPressPatient = (row) => {
    this.props.navigation.navigate("Patient", { patient: row })
  }
  render() {
    return (
      <Container style={styles.container}>
        <FlatList 
          data={ this.state.patients }
          keyExtractor = {(item, index) => item.id = index.toString()}
          renderItem = { (row) => <PatientItem  onPress={ () => this.onPressPatient(row) } item={row.item} /> }
        />
        <Fab 
          position='bottomRight' 
          style={{ backgroundColor: '#32ADF5' }} 
          onPress={() => this.props.navigation.navigate("AddPatient") }
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
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20,
  },
  itemContainer: {
    borderBottomColor: 'rgb(233, 233, 233)',
    borderBottomWidth: 2,
    paddingTop: 20,
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





