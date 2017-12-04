import React, {Component} from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Table
} from 'reactstrap';

import Auth from '../../redux/Auth';

class Profil extends Component {
    render() {
        return (<div className="animated fadeIn">
            <Card>
                <CardHeader>
                    Profil
                </CardHeader>
                <CardBody>
                    <Row className="mb-6">
                        <Col sm="2">
                            <div>Username:
                            </div>
                            <div>Email:
                            </div>
                            <div>ID:
                            </div>
                            <div>Created:
                            </div>
                        </Col>
                        <Col sm="10">
                            <div>
                                <strong>{Auth.getUser().username}</strong>
                            </div>
                            <div>
                                <strong>{Auth.getUser().email}</strong>
                            </div>
                            <div>
                                <strong>{Auth.getUser()._id}</strong>
                            </div>
                            <div>
                                <strong>{Auth.getUser().created}</strong>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    Keystore
                </CardHeader>
                <CardBody>
                    <Row className="mb-6">
                        <Col sm="2">
                            <div>Adresse:
                            </div>
                            <div>MNID:
                            </div>
                            <div>Salt:
                            </div>
                            <div>seedPhrase:
                            </div>
                            <div>Version:
                            </div>
                        </Col>
                        <Col sm="10">
                            <div>
                                <strong>{Auth.getUser().keystore.addresses[0]}</strong>
                            </div>
                            <div>
                                <strong>{Auth.getUser().keystore.mnid}</strong>
                            </div>
                            <div>
                                <strong>{Auth.getUser().keystore.salt}</strong>
                            </div>
                            <div>
                                <strong>{Auth.getUser().keystore.seedPhrase}</strong>
                            </div>
                            <div>
                                <strong>{Auth.getUser().keystore.version}</strong>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>)
    }
}

export default Profil;
