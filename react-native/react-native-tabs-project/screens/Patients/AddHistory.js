import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Container, Text, DatePicker, Fab } from 'native-base';
import { Icon, Input } from 'react-native-elements'
import Colors from '../../constants/Colors';
import { firestore } from '../../firebase/firebase';

export default class AddHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            text: "",
            disableFab: false
        };
        this.patient = this.props.navigation.getParam('patient');
    }
    
    postHistory = () => {
        this.setState({ disableFab: true })
        const { dni } = this.patient;
        const { date, text } = this.state;
        const data = {date, text};

        firestore.collection('patients').doc(dni.toString()).collection("clinicalHistory").doc().set(data)
            .then(()=>{
                this.setState({ disableFab: false, text: "" });
                alert("Historia clínica registrada correctamente");
                this.props.navigation.goBack();
            })
            .catch(err => alert("Ha ocurrido un error :(", err));
    }
    render() {
        const { name, lastname } = this.patient;
        let { text, disableFab } = this.state;
        let fabColor = disableFab ? Colors.themeGrey : Colors.themeBlue;
        return (
            <Container style={styles.container}>
                <Text style={styles.header}> {`${name} ${lastname}`} </Text>    
                <View style={styles.datePicker}>
                    <Text style={styles.label}>Fecha</Text>
                    <View style={styles.inputDatePicker}>
                        <Icon
                            type='ionicon'
                            name='md-calendar'
                            size={24}
                            marginRight={20}
                            color={Colors.tabIconDefault}
                        />
                        <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date(1920, 0, 1)}
                            maximumDate={new Date(2080, 0, 1)}
                            locale={"es"}
                            textStyle={styles.inputDate}
                            onDateChange={date => this.setState({ date })}
                        />
                    </View>
                </View>
                <Input
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    label='Historia'
                    labelStyle={styles.label}
                    containerStyle={styles.inputContentContainer}
                    value={text}
                    textContentType="none"
                    onChangeText={text => this.setState({ text })}
                    multiline={true}
                /> 
                <Fab
                    position='bottomRight'
                    style={{ backgroundColor: fabColor }}
                    onPress={this.postHistory}
                    disabled={disableFab}
                >
                    <Icon name="check" color="white" size={36} type="Octicons" style={styles.fabIcon} />
                </Fab>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: "500",
        color: Colors.themeGrey,
        marginTop: 10,
        textAlign: 'center',
    },
    container: {
        paddingTop: 20,
    },
    label: {
        fontWeight: "300",
        fontSize: 11,
        color: Colors.themeBlue,
    },
    inputDate: {
        fontSize: 16,
        padding: 0,
        margin: 0,
    },
    input: {
        fontSize: 16,
        padding: 0,
        margin: 0,
        textAlignVertical: "top",
        height: "100%"
    },
    inputContentContainer: {
        marginTop: 5,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: Colors.themeBlue,
        borderRadius: 3,
        marginTop: 5,
        height: "70%",
        padding: 10
    },
    inputDatePicker: {
        borderWidth: 1,
        borderColor: Colors.themeBlue,
        borderRadius: 3,
        marginTop: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        minHeight: 40,
        paddingLeft: 15,
    },
    datePicker: {
        margin: 10,
    },
    fabIcon: {
        color: "white",
        fontSize: 36,
        lineHeight: 36
    }
})