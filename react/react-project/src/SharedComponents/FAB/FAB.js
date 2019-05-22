import React from 'react'
import './FAB.css'
import Icon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add'

function FAB(props) {
    return (
        <div className="fab-container">
            <Icon icon={ic_add} size={32} />
        </div>
    )
}

export default FAB;