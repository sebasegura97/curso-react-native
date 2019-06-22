import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Icon, Fab, Container} from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import Colors from '../../constants/Colors';
import { firestore } from '../../firebase/firebase'

export default class AddDate extends Component {
    state = {
        isDatePickerVisible: false,
        isTimePickerVisible: false,
        date: new Date(),
        time: new Date(),
        disableFab: false,
    }
    // Date picker methods:
    showDatePicker = () => this.setState({ isDatePickerVisible: true })
    hideDatePicker = () => this.setState({ isDatePickerVisible: false })
    handleDatePicked = (date) => {
        // const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        // console.log('formattedDate', formattedDate)
        this.setState({ isDatePickerVisible: false, date: new Date(date.getFullYear(), date.getMonth(), date.getDate()) })
    }
    // Time picker methods:
    showTimePicker = () => this.setState({ isTimePickerVisible: true })
    hideTimePicker = () => this.setState({ isTimePickerVisible: false })
    handleTimePicked = (time) => {
        console.log('time', time)
        this.setState({ isTimePickerVisible: false, time })
    }
    // Other Methods:
    postDate = () => {
        this.setState({ disableFab: true })
        const { date, time } = this.state;
        const patient = this.props.navigation.getParam('patient');
        const data = { date, time, patient }
        
        firestore.collection("dates").doc().set(data)
            .then(() => {
                this.setState({ disableFab: false });
                alert("Cita registrada!");
                this.props.navigation.goBack();
            })
            .catch((err) => alert("Ha ocurrido un error :(", err))
        console.log(data)
    }
    render() {
        const item = this.props.navigation.getParam("patient");
        let { date, time, disableFab } = this.state;
        let fabColor = disableFab ? Colors.themeGrey : Colors.themeBlue;
        return (
            <Container style={styles.container}>
                <Text style={styles.header}> {`${item.name} ${item.lastname}`} </Text>                
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={this.showDatePicker}>
                        <Text style={styles.day}>{date.getDate()}</Text>
                        <Text style={styles.month}>{months[date.getMonth()]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showTimePicker}>
                        <View style={styles.timeContainer}>
                            <Icon type="MaterialCommunityIcons" style={styles.timeIcon} name="clock" />
                            <Text style={styles.hour}>{`${time.getHours()}:${time.getMinutes()}`}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Need two DateTimePicker, one for time and other for date */}
                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDatePicker}
                    mode="date"
                />
                <DateTimePicker
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this.handleTimePicked}
                    onCancel={this.hideTimePicker}
                    mode="time"
                />
                <Fab
                    position='bottomRight'
                    style={{ backgroundColor: fabColor }}
                    onPress={this.postDate}
                    disabled={disableFab}
                >
                    <Icon  name="check" type="Octicons" style={styles.fabIcon} />
                </Fab>
            </Container>
        )
    }
}

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: "500",
        color: Colors.themeGrey,
        marginTop: 10,
        textAlign: 'center',
    },
    dateContainer: {
        borderWidth: 1,
        borderColor: Colors.themeBlue,
        borderRadius: 3,
        width: 175,
        height: 175,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    day: {
        textAlign: 'center',
        color: Colors.themeBlue,
        fontWeight: "800",
        fontSize: 72,
        lineHeight: 72
    },
    month: {
        color: Colors.themeBlue,
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 24,
        fontWeight: "600",
        textTransform: "uppercase"
    },
    hour: {
        fontSize: 24,
        lineHeight: 24

    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    timeIcon: {
        fontSize: 20,
        marginRight: 5,
    },
    fabIcon: {
        color: "white",
        fontSize: 36,
        lineHeight: 36
    }
})