import React from 'react';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class layout extends React.Component {
    state = {
        switchSdrawerDrop: false
    }

    toSwitchSdrawerDrop = () => {
        this.setState((prevState)=>{
            return { switchSdrawerDrop: !prevState.switchSdrawerDrop }
        })
    }
    
    render(){
        return(
            <React.Fragment>
                <Toolbar
                    clicked={this.toSwitchSdrawerDrop} />
                <SideDrawer
                    show={this.state.switchSdrawerDrop}
                    close={this.toSwitchSdrawerDrop} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>   
        )
    }
};

export default layout;