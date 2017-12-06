import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    CardGroup,
    Card,
    CardBody,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    Alert
} from 'reactstrap';

import {Link} from 'react-router-dom';

class Login extends Component {
    handleLogin(e) {
        this.props.login(this.state);
    }

    render() {
        const {auth} = this.props;
        const {fetching, error} = auth;
        return (<div className="app flex-row align-items-center">

            <div className="container" id="login-block">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4">

                        <div className="login-box clearfix animated flipInY">
                            <div className="page-icon animated bounceInDown">
                                <img src="img/user-icon.png" alt="Key icon"></img>
                            </div>
                            <div className="login-logo">
                                <a href="#?login-theme-7">
                                    <img src="img/login-logo.png" alt="Company Logo"></img>
                                </a>
                            </div>
                            <hr></hr>
                            <div className="login-form">
                                {
                                    error
                                        ? (<div className="alert alert-danger hide">
                                            <button type="button" className="close" data-dismiss="alert">
                                                ×</button>
                                            <h4>Error!</h4>
                                            {error}
                                        </div>)
                                        : (<div/>)
                                }

                                <form action="#" method="get">
                                    <input type="text" placeholder="User name" className="input-field" required="" onChange={(e) => this.setState({email: e.target.value.trim()})}></input>
                                    <input type="password" placeholder="Password" className="input-field" required="" onChange={(e) => this.setState({password: e.target.value.trim()})}></input>
                                    <button type="submit" className="btn btn-login" onClick={this.handleLogin.bind(this)} disabled={fetching}>Login</button>
                                </form>
                                <div className="login-links">
                                    <Link to="/forgot">
                                        Forgot password?
                                    </Link>
                                    <br></br>
                                    <Link to="/register">
                                        Don't have an account?
                                        <strong>Sign Up</strong>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="social-login row">
                            <div className="fb-login col-lg-6 col-md-12 animated flipInX">
                                <a href="#" className="btn btn-facebook btn-block">Connect with
                                    <strong>Facebook</strong>
                                </a>
                            </div>
                            <div className="twit-login col-lg-6 col-md-12 animated flipInX">
                                <a href="#" className="btn btn-twitter btn-block">Connect with
                                    <strong>Twitter</strong>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>);
    }
}

export default Login;
