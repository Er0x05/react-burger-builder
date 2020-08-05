import React from 'react';
import Modal from '../../Modal/Modal';



const errorHandler = (WrappedComponent,axios) => {
    return class extends React.Component {
        state = {
            error: null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use( req =>{
                this.setState({ error: null });
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use( res => res, err =>{
                this.setState({ error: err });
            })
            console.log('Interceptros are running!')
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorModalSwitch = () => {
            this.setState({ error: null })
        }

        render(){
            return(
                <React.Fragment>
                    <Modal 
                        show={this.state.error}
                        close={this.errorModalSwitch}
                        >{this.state.error && this.state.error.message}</Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }
};

export default errorHandler;