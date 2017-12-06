import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {eth_blockNumber} from '../actions/infura';

import Dashboard from '../../containers/Dashboard/';

class DashboardContainer extends Component {
    componentDidMount() {
        this.props.eth_blockNumber();
    }
    
    render() {
        const {infura} = this.props;

        return (<Dashboard infura={infura} {...this.props}/>);
    }
}

const mapStateToProps = state => ({infura: state.infura});
const mapDispatchToProps = (dispatch) => ({
    eth_blockNumber: () => dispatch(eth_blockNumber())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardContainer));
