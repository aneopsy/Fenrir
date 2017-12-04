import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { logout } from '../actions/auth';

import HeaderDropdown from '../../components/Header/';

class HeaderDropdownContainer extends Component {
    transferToDashboardIfLogout(){
        if (!this.props.auth.user.token){
            this.props.history.push(this.props.from || { pathname: '/login' });
        }
    }
    componentWillMount() {
        this.transferToDashboardIfLogout();
    }
    componentDidUpdate() {
        this.transferToDashboardIfLogout();
    }

    render() {
      const { auth, logout } = this.props;

        return (
            <HeaderDropdown auth={auth} logout={logout} />
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
    logout:() => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderDropdownContainer));
