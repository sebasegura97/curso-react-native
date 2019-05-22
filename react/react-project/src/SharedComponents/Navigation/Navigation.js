import React from 'react'
import Icon from 'react-icons-kit'
import { Link } from 'react-router-dom'
import { ic_today } from 'react-icons-kit/md/ic_today'
import { ic_settings } from 'react-icons-kit/md/ic_settings'
import { ic_person } from 'react-icons-kit/md/ic_person'
import './Navigation.css'

const Tab = (props) => {
    return (
        <Link className="tab-link" to={props.link}>
            <div className="tab-container">
                <Icon className="tab-icon" icon={props.icon} size={24} />
                <label className="tab-label">{props.label}</label>
            </div>
        </Link>
    )
}

class Navigation extends React.Component{
    render(){
        return(
            <div className="navigation-container">
                <Tab 
                    link=""
                    icon={ic_today}
                    label="Calendario"
                />
                <Tab 
                    link="/patients"
                    icon={ic_person}
                    label="Pacientes"
                />
                <Tab 
                    link=""
                    icon={ic_settings}
                    label="Configuracion"
                />
            </div>
        )
    }
}

export default Navigation;