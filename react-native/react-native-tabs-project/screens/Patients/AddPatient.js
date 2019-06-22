import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { Container, Content, DatePicker } from 'native-base'
import Colors from '../../constants/Colors'
import { firestore } from '../../firebase/firebase'

class AddPatient extends Component {
    constructor(props){
        super(props)
        let date = new Date(1997, 1, 21)
        this.state = {
            dateOfBirth: date,
            name: "",
            lastname: "",
            obraSocial: "",
            nroObraSocial: "",
            dni: "",
            diagnosis: "",
            disabled: false,
        }

    }
    formatDate = (date) => {
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let format = `${day}/${month}/${year}`
        return format
    }
    addPatient = () => {
        this.setState({ disabled: true })
        let { dateOfBirth, name, lastname, obraSocial, nroObraSocial, dni } = this.state;
        let data = { dateOfBirth, name, lastname, obraSocial, nroObraSocial, dni, timeCreated: Date.now() }

        firestore.collection("patients").doc(data.dni).set(data)
            .then(() => this.setState({ disabled: false }))
            .catch( err => console.error(err))
        
    }
    render() {
        let { dateOfBirth, name, lastname, obraSocial, nroObraSocial, dni, disabled, diagnosis } = this.state
        return (
            <Container style={styles.container}>
                    <Content>
                        <Input
                            leftIcon={{
                                type: 'ionicon',
                                name: 'md-person',
                                size: 24,
                                marginRight: 20,
                                color: Colors.tabIconDefault
                            }}
                            label='Nombre'
                            labelStyle={styles.label}
                            inputContainerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            value={name}
                            textContentType="name"
                            onChangeText={text => this.setState({ name: text })}
                            /> 
                        <Input
                            leftIcon={{
                                type: 'ionicon',
                                name: 'md-person',
                                size: 24,
                                marginRight: 20,
                                color: Colors.tabIconDefault
                            }}
                            label='Apellido'
                            labelStyle={styles.label}
                            inputContainerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            containerStyle={styles.inputContentContainer}
                            value={lastname}
                            textContentType="familyName"
                            onChangeText={text => this.setState({ lastname: text })}
                        /> 
                        <Input
                            leftIcon={{
                                type: 'MaterialIcons',
                                name: 'healing',
                                size: 24,
                                marginRight: 20,
                                color: Colors.tabIconDefault
                            }}
                            label='Obra Social'
                            labelStyle={styles.label}
                            inputContainerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            containerStyle={styles.inputContentContainer}
                            value={obraSocial}
                            textContentType="givenName"
                            onChangeText={text => this.setState({obraSocial: text}) }
                        /> 
                        <Input
                            leftIcon={{
                                type: 'MaterialIcon',
                                name: 'credit-card',
                                size: 24,
                                marginRight: 20,
                                color: Colors.tabIconDefault
                            }}
                            label='Número de afiliado'
                            labelStyle={styles.label}
                            inputContainerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            containerStyle={styles.inputContentContainer}
                            value={nroObraSocial}
                            onChangeText={text => this.setState({ nroObraSocial: text })}
                            textContentType="creditCardNumber"
                        /> 
                        <Input
                            leftIcon={{
                                type: 'ionicon',
                                name: 'ios-wallet',
                                size: 24,
                                marginRight: 20,
                                color: Colors.tabIconDefault
                            }}
                            label='Número de documento'
                            labelStyle={styles.label}
                            inputContainerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            containerStyle={styles.inputContentContainer}
                            value={dni}
                            onChangeText={text => this.setState({ dni: text })}
                            textContentType="username"
                        /> 
                        <View style={styles.datePicker}>
                            <Text style={styles.label}> Fecha de nacimiento </Text>
                            <View style={styles.inputDatePicker}>
                                <Icon 
                                    type= 'ionicon'
                                    name= 'md-calendar'
                                    size={24}
                                    marginRight= {20}
                                    color={Colors.tabIconDefault}
                                />
                                <DatePicker 
                                    defaultDate={new Date(1997, 0, 1)}
                                    minimumDate={new Date(1920,0, 1)}
                                    maximumDate={new Date()}
                                    locale={"es"}
                                    ref={this.datePicker}
                                    textStyle={styles.input}
                                    onDateChange={ date => this.setState({ dateOfBirth: date }) }
                                />
                            </View>
                        </View>
                        <Button
                            titleStyle={styles.button}
                            title="Agregar"
                            type="clear"
                            ref={(ref) => this.addButton = ref}
                            onPress={this.addPatient}
                            disabled={disabled}
                        />
                    </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    label: {
        fontWeight: "300",       
        fontSize: 11,
        color: Colors.themeBlue,
    },
    input: {
        fontSize: 16,
        padding: 0,
        margin: 0
    },
    inputContentContainer:{
        marginTop: 10,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: Colors.themeBlue,
        borderRadius: 3,
        marginTop: 5,
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
    button: {
        marginLeft: "auto",
        marginRight: 5,
        color: Colors.themeBlue
    }
})

export default AddPatient
