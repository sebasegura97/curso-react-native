import React from 'react'
import './PatientsList.css'
import Icon from 'react-icons-kit'
import { ic_search } from 'react-icons-kit/md/ic_search'

const Filter = (props) => {
    return(
        <div className="filter-container">
            <div className="filter-input-container">
                <Icon icon={ic_search} className="filter-search-icon" size={22}/>
                <input className="filter-input" type="text" placeholder="Nombre del paciente" onChange={props.filter}/>
            </div>
            <p className="filter-cancel"> Cancel </p>
        </div>
    )
}

const PatientItem = (props) => {
   return(
       <div className="patient-item-container">
           <p className="patient-item-title">{props.name}</p>
           <p className="patient-item-description">
               <span className="patient-item-date">{props.date}</span>{props.description}
            </p>
       </div>
   )
}

function PatientList(props){
    return(
        <div className="patient-list-container">
            <Filter filter={props.filter}/>
            {
                props.list.map(
                    (item, index) => {
                        return(
                            <PatientItem
                                key={index} 
                                name={item.name}
                                date={item.date}
                                description={item.description}
                            />
                        )
                    }
                )
            }
        </div>
    )
}

export default PatientList;