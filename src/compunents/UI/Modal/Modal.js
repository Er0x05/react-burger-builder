import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    componentWillUpdate(){
        console.log(`[Modal] will be updated!`)
    };
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render (){
        return(
            <React.Fragment>
                <Backdrop show={this.props.show} closeModal={this.props.close}/>
                <div 
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
};

export default Modal;