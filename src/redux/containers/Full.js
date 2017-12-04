import React, { Component } from 'react';
import { connect } from 'react-redux';

import Full from '../../containers/Full/';

class FullContainer extends Component {
    render() {
        return (
            <Full {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
});
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FullContainer);
