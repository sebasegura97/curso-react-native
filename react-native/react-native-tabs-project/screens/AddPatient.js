import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Input } from 'react-native-elements'

class AddPatient extends Component {
    render() {
        return (
            <View>
                <Input 
                    leftIcon={{ type: 'ionicon', name: 'md-calendar' }}    
                    label='Fecha'
                /> 
                <Text> textInComponent </Text>
            </View>
        )
    }
}

export default AddPatient
