import React, { Component } from 'react'
import { Content, Container, View, Fab, Icon } from 'native-base';
import { Text, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native'
import Colors from '../../constants/Colors';
import EditPatient from './EditPatient'
import { firestore } from '../../firebase/firebase'
import { firestore as Firestore } from 'firebase'

const DateCard = (props) => {
    let {date, time} = props;
    let formatDate = new Firestore.Timestamp(date.seconds, date.nanoseconds).toDate();   
    let formatTime = new Firestore.Timestamp(time.seconds, time.nanoseconds).toDate();   
    return(
        <View style={styles.dateContainer}>
            <Text style={styles.day}>{formatDate.getDate()}</Text>
            <Text style={styles.month}>{months[formatDate.getMonth()]}</Text>
            <View style={styles.timeContainer}>
                <Icon type="MaterialCommunityIcons" style={styles.timeIcon} name="clock" />
                <Text style={styles.hour}> {`${formatTime.getHours()}:${formatTime.getMinutes()}`}</Text>
            </View>
        </View>
    )
}

const HistoryCard = (props) => {
    let { date, text } = props
    let formatDate = new Firestore.Timestamp(date.seconds, date.nanoseconds).toDate();   
    return(
        <View style={styles.historyContainer}>
            <Text style={styles.historyDate}>{`${formatDate.getDate()}/${formatDate.getMonth()}/${formatDate.getFullYear()}`}</Text>
            <Text style={styles.historyText}>{text}</Text>
        </View>
    )
}


export default class Patient extends Component {
    state = {
        dates: [],
        clinicalHistory: [],
        editPatient: false
    }
    constructor(props) {
        super(props)
        let patient = this.props.navigation.getParam("patient").item;
        this.state = {
            dates: [],
            clinicalHistory: [],
            editPatient: false,
            patient: patient
        } 
    }
    componentDidMount(){
        let dates = [];
        let clinicalHistory = [];
        const { patient } = this.state
        // Obtener las citas del paciente:
        let datesRef = firestore.collection('dates').where("patient.dni", "==", patient.dni);
        datesRef.get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc)=> {
                    dates.push(doc.data())
                })
            })
            .then(() => this.setState({ dates }))
            .catch((err) => alert("Ha ocurrido un error :/", err))
        // obtener la historia clinica:
        firestore.collection("patients").doc(patient.dni).collection("clinicalHistory").get()
            .then((collection)=>{
                collection.forEach((doc)=>{
                    clinicalHistory.push(doc.data())
                    this.setState({clinicalHistory})
                })
            })
    }
    editPatient = () => {   
        this.setState({ editPatient: true })
    }
    confirmEditPatient = (edits) => {
        const { patient } = this.state
        firestore.collection("patients").doc(patient.dni).update({...edits})
            .then(() => this.setState({ editPatient: false, patient: { ...this.state.patient, ...edits } })) 
            .catch(err => {
                alert("Ha ocurrido un error", err); this.setState({ editPatient: false })
            })
        
        
        console.log("edits:", edits)
    }
    render() {
        let { dates, clinicalHistory, editPatient, patient } = this.state
        let subHeader;
        if (!editPatient) {
           subHeader =  (
                <View style={styles.subHeaderContent}>
                    <TouchableWithoutFeedback onPress={this.editPatient}>
                        <Icon type="MaterialCommunityIcons" name="circle-edit-outline" style={styles.editIcon} />
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>{`${patient.name} ${patient.lastname}`}</Text>
                    <TouchableWithoutFeedback onPress={this.editPatient}>
                        <Text style={styles.subtitle}>Diagnostico: {patient.diagnosis}</Text>
                    </TouchableWithoutFeedback>
               </View>
           ) 
        } else { 
            subHeader = (
                <EditPatient confirmEdit={this.confirmEditPatient} patient={patient}></EditPatient>
            )
        }
        return (
            <Container>
                <Content>
                    <View style={styles.subHeader}>
                        {subHeader}
                    </View>
                    <Text style={styles.listTitle}> Citas </Text>
                    <FlatList 
                        horizontal
                        keyExtractor={(item, index) => item.id = index.toString()}
                        data={dates}
                        renderItem={(row) => <DateCard date={row.item.date} time={row.item.time} />}
                    />
                    <Text style={styles.listTitle}> Historia clínica </Text>
                    <FlatList 
                        keyExtractor={(item, index) => item.id = index.toString()}
                        data={clinicalHistory}
                        renderItem={(row) => <HistoryCard date={row.item.date} text={row.item.text} />}
                    />
                </Content>
                <Fab 
                    position='bottomRight'
                    style={{ backgroundColor: '#32ADF5' }}
                    onPress={() => this.props.navigation.navigate("NewEntry", {patient})}
                >
                    <Text> + </Text>
                </Fab>
            </Container>
        )
    }
}

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const styles = StyleSheet.create({
    subHeader: {
        backgroundColor: Colors.themeLightBlue,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
        flex: 1,
        alignItems: 'center'
    },
    subHeaderContent: {
        width: "100%"
    },
    title: {
        color: Colors.themeBlue,
        fontWeight: "700",
        fontSize: 20,
        marginTop: 0,
        marginBottom: 10,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'left',
    },
    dateContainer: {
        borderWidth: 1,
        borderColor: Colors.themeBlue,
        borderRadius: 3,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    day: {
        textAlign: 'center',
        color: Colors.themeBlue,
        fontWeight: "800",
        fontSize: 36,
        lineHeight: 36
    },
    month: {
        color: Colors.themeBlue,
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 12,
        fontWeight: "600",
        textTransform: "uppercase"
    },
    hour: {
        fontSize: 12,
        lineHeight: 12

    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    timeIcon: {
        fontSize: 12,
        marginRight: 0 ,
    },
    fabIcon: {
        color: "white",
        fontSize: 36,
        lineHeight: 36
    },
    listTitle: {
        color: Colors.themeBlue,
        marginLeft: 10,
        marginTop: 10,
        fontWeight: "700"
    },
    historyContainer:{
        margin: 10,
        borderBottomWidth: 1,
        borderColor: Colors.themeGrey,
    },
    historyDate:{
        textAlign: "center",
        color: Colors.themeBlue,
        fontWeight: "500"
    },
    historyText:{
        margin: 10,
        fontWeight: "200"
    },
    editIcon: {
        color: Colors.themeGrey,
        fontSize: 16,
        alignSelf: "flex-end",
    }
})