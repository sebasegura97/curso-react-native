import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Calendar as CalendarComponent, LocaleConfig } from 'react-native-calendars'
import { firestore } from '../firebase/firebase'

LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
}
LocaleConfig.defaultLocale = 'es'

class Calendar extends React.Component{
  state = {
    selected: Date.now(),
    data: [
      {key: '1', hour: '14:30', patientName: 'Sebastian Segura', description: 'Lorem Sunt ad non anim aliquip id. Aliqua labore nulla exercitation officia amet aliqua mollit. Aute anim magna consectetur occaecat nostrud id ut consectetur in adipisicing officia cillum sint velit. Ea eu nulla eu nisi excepteur ipsum dolor occaecat officia enim est fugiat. Non aliquip elit id Lorem ex in in ad voluptate amet est esse.'}
    ]
  }
  onDayPress = (e) => {
    this.setState({selected: e.dateString})
    console.log(firestore)
  }
  
  render(){
    return(
      <View>
        <Text> Aqui ira nuestro calendario </Text>
        <CalendarComponent 
          current={Date.now()}
          onDayPress={this.onDayPress}
          firstDay={1}
          markedDates={{[this.state.selected]: {selected: true}}}
        />
        <FlatList 
          data={this.state.data}
          renderItem={(row) => <Text key={row.index}> {row.item.description} </Text>}
        />
      </View>
    )
  }
}

export default Calendar