import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { register } from '../actions/auth';

import RegisterForm from '../../containers/Register/';

class Register extends Component {
    transferToDashboardIfLoggedIn(){
        if (this.props.auth.user.keystore){
            this.props.history.push(this.props.from || { pathname: '/' });
        }
    }
    componentWillMount() {
        this.transferToDashboardIfLoggedIn();
    }
    componentDidUpdate() {
        this.transferToDashboardIfLoggedIn();
    }

    render() {
        const { auth, register } = this.props;
        return (
            <RegisterForm auth={auth} register={register} />
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
    register:(info) => dispatch(register(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
