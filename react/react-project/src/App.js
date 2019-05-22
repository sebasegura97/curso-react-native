import React, { Component } from 'react';
import Header from './SharedComponents/Header/Header';
import Navigation from './SharedComponents/Navigation/Navigation';
import FAB from './SharedComponents/FAB/FAB';
import { withRouter } from 'react-router-dom'

class App extends Component{
    render(){
        var title = this.props.location.pathname.replace("/", "")
        return(
            <div>
                {this.props.children}
                <Navigation />
                <FAB />
            </div>
        )
    }
}

export default withRouter(App)