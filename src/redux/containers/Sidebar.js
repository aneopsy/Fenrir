import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { list } from '../actions/sidebar';

import Sidebar from '../../components/Sidebar/';

class SidebarContainer extends Component {
    componentDidMount() {
        this.props.list();
    }

    render() {
      const { sidebar } = this.props;

        return (
            <Sidebar sidebar={sidebar} {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    sidebar: state.sidebar,
});
const mapDispatchToProps = (dispatch) => ({
    list:() => dispatch(list()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
