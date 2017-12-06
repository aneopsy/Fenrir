import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { login } from '../actions/auth';

import LoginForm from '../../containers/Login/';
import Auth from '../Auth';

class Login extends Component {
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
    componentDidMount() {
        const { login } = this.props;
        const user = Auth.getUser();
        if (user && user.token ) {
            login();
        }
    }

    render() {
      const { auth, login } = this.props;

        return (
            <LoginForm auth={auth} login={login} />
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
    login:(info) => dispatch(login(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
