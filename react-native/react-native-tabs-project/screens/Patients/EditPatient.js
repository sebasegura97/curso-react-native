import React, { Component } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'native-base'
import { Input } from 'react-native-elements'
import { Content} from 'native-base'
import Colors from '../../constants/Colors'
import { firestore } from '../../firebase/firebase'

export default class EditPatient extends Component {
    constructor(props){
        super(props)
        const { name, lastname, diagnosis } = this.props.patient;
        this.state = {
            name: name ? name : "",
            lastname: lastname ? lastname : "",
            diagnosis: diagnosis ? diagnosis : ""
        }
    }

    render() {
        let { name, lastname, diagnosis } = this.state;

        return (
            <View style={styles.container} >
                <TouchableWithoutFeedback onPress={() => this.props.confirmEdit(this.state)}>
                    <Icon type="MaterialCommunityIcons" name="checkbox-marked-circle-outline" style={styles.editIcon} />
                </TouchableWithoutFeedback>
                <View style={styles.nameContainer}>
                    <Input
                        inputStyle={styles.input}
                        containerStyle={styles.containerFullInput}                    
                        value={name}
                        textContentType="name"
                        onChangeText={text => this.setState({name: text })}
                    />
                    <Input
                        containerStyle={styles.containerFullInput}
                        inputStyle={styles.input}
                        value={lastname}
                        textContentType="familyName"
                        onChangeText={text => this.setState({lastname: text })}

                    />
                </View>
                <View style={styles.nameContainer}>
                    <Input
                        containerStyle={styles.containerFullInput}
                        inputStyle={styles.input}
                        value={diagnosis}
                        textContentType="familyName"
                        onChangeText={text => this.setState({diagnosis: text })}
                        multiline
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    nameContainer: {
        flexDirection: "row",
        marginBottom: 10
    },
    containerFullInput:{
        flex: 1,
    },
    input: {
        fontSize: 16,
        padding: 0,
        margin: 0,
        color: Colors.themeGrey
    },
    inputContentContainer: {
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
    editIcon: {
        color: Colors.themeGrey,
        fontSize: 16,
        alignSelf: "flex-end",
    }
})