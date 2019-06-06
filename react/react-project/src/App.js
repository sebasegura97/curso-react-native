import React, { Component } from 'react';
import Navigation from './SharedComponents/Navigation/Navigation';
import { withRouter } from 'react-router-dom'

class App extends Component{
    render(){
        return(
            <div>
                {this.props.children}
                <Navigation />
            </div>
        )
    }
}

export default withRouter(App)