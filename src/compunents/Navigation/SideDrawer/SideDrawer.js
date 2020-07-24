import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {

    let attachedCss = [ styles.SideDrawer, styles.Close ];
    props.show && ( attachedCss = [ styles.SideDrawer, styles.Open ] );

    return (
        <React.Fragment>
            <BackDrop show={props.show} closeModal={props.close} />
            <div className={attachedCss.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>   
        </React.Fragment>
    )
};

export default sideDrawer; 