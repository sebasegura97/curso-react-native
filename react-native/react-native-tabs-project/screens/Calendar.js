import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Content, Container } from 'native-base'
import { Calendar as CalendarComponent, LocaleConfig } from 'react-native-calendars'
import { firestore } from '../firebase/firebase'
import Colors from '../constants/Colors';
import { firestore as Firestore } from 'firebase'


LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
}
LocaleConfig.defaultLocale = 'es'

const DateItem = (props) => {
  const {time, patient } = props.date;
  let formatTime = new Firestore.Timestamp(time.seconds, time.nanoseconds).toDate();
 
  return(
    <View style={styles.dateItemContainer}>
      <View style={styles.dateItemTimeContainer}>
        <Text style={styles.dateItemText}>{formatTime.getHours()}:{formatTime.getMinutes()}</Text>
      </View>
      <View style={styles.dateItemTextContainer}>
        <Text style={styles.dateItemText}>{patient.name} {patient.lastname}</Text>
        <Text style={styles.dateItemDiagnosis}>{patient.diagnosis}</Text>
      </View>
    </View>
  )
}
class Calendar extends React.Component{
  state = {
    selected: Date.now(),
    dayDates: []
  }
  onDayPress = (e) => {
    this.setState({selected: e.dateString})
    let dayDates = [];
    let date = new Date(e.year, e.month-1, e.day, 0, 0, 0, 0)
    console.log("e", e)
    console.log(date)

    let firestoreTimestamp = Firestore.Timestamp.fromDate(date)
    console.log('firestoreTimestamp', firestoreTimestamp)
    const dayDatesRef = firestore.collection("dates").where("date", "==", firestoreTimestamp)
    dayDatesRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {          
          dayDates.push(doc.data())
        })
      })
      .then(() => this.setState({dayDates}))
      .catch((err) => alert("Ha ocurrido un error :/", err))
  }
  renderDay = (row) => {
    
  }
  render(){
    return(
      <Container>
        <CalendarComponent 
          // current={Date.now()}
          onDayPress={this.onDayPress}
          firstDay={0}
          markedDates={{[this.state.selected]: {selected: true}}}
        />
        <FlatList 
          keyExtractor={(item, index) => item.id = index.toString()}
          data={this.state.dayDates}
          scrollEnabled
          renderItem={(row) => {
            if (this.state.dayDates.length > 0) {
              return <DateItem key={row.index} date={row.item} />
            } else {
              return <Text>No hay citas para ese dia</Text>
            } } }
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  dateItemContainer:{
    flexDirection: "row",
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.themeGrey
  },
  dateItemTimeContainer:{
    marginRight: 10
  },
  dateItemTextContainer:{
    flex: 1
  },
  dateItemText:{
    color: Colors.themeBlue,
    fontWeight: "600"
  },
  dateItemDiagnosis:{
    marginTop: 10,
    fontWeight: "200",
    fontSize: 12
  },
})

export default Calendar