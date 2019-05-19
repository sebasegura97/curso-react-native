import React from 'react'
import './Header.css'

function Header(props) {
    return (
        <div className="header-container">
            <h4>{props.title}</h4>
        </div>
    )
}

export default Header;