import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Content, Container, Icon, DatePicker } from 'native-base';
import Colors from '../../constants/Colors';



export default class NewEntry extends Component {
    onRegisterDate = () => this.props.navigation.navigate("AddDate", { patient: this.props.navigation.getParam("patient")})
    onRegisterHistory = () => this.props.navigation.navigate("AddHistory", { patient: this.props.navigation.getParam("patient")})
    render() {
        const item = this.props.navigation.getParam("patient")
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <Text style={styles.header}> {`${item.name} ${item.lastname}`} </Text>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectTitle}>¿Qué desea registrar?</Text>
                        <View style={styles.circlesContainer}>
                            <TouchableOpacity onPress={this.onRegisterDate} >
                                <View style={styles.selectCircle}>
                                    <Icon style={styles.selectIcon} name="calendar-range" type="MaterialCommunityIcons" />
                                    <Text style={styles.selectText}> Agendar cita </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onRegisterHistory}>
                                <View style={styles.selectCircle}>
                                    <Icon style={styles.selectIcon} name="library-books" type="MaterialCommunityIcons" />
                                    <Text style={styles.selectText}> Historia clinica </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    content:{
        flex: 1,
        width: "100%",
    },
    header: {
        fontSize: 22,
        fontWeight: "500",
        color: Colors.themeGrey,
        marginTop: 10,
        textAlign: 'center',
    },
    selectContainer:{
        marginTop: 20
    },
    circlesContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-evenly"
    },
    selectTitle:{
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 20
    },
    selectCircle:{
        backgroundColor: Colors.themeBlue,
        borderRadius: 120,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: -1,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.5,
        elevation: 3,
    },
    selectIcon:{
        color: "white"
    },
    selectText:{
        color: "white"
    },
})