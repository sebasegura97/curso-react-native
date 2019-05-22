import React, { Component } from 'react'
import PatientList from '../components/PatientsList'
import Header from '../../SharedComponents/Header/Header'

const exampleList = [
    {
        name: "Sebastian Segura",
        date: "20/10/18",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    },
    {
        name: "Alfredo Soloaga",
        date: "10/04/17",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    },
    {
        name: "Katherina Rojas",
        date: "20/10/18",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    },
    {
        name: "Alfredo Soloaga",
        date: "10/04/17",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    },
    {
        name: "Katherina Rojas",
        date: "20/10/18",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    },
]

class Patients extends Component {
    state = {
        patientList: exampleList
    }

    onFilter = (e) => {
        // console.log(e.target.value)
        var list = exampleList.filter(
            (item) => {
                return item.name.toLowerCase().includes(e.target.value.toLowerCase())
            }
        )
        this.setState({patientList: list})
    }

    render(){
        return(
            <div>
                <Header title="Pacientes" />
                <PatientList 
                    list={this.state.patientList}
                    filter={this.onFilter}
                    />
            </div>
        )
    }
}

export default Patients