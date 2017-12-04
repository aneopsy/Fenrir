import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    NavDropdown,
    Progress
} from 'reactstrap';

const propTypes = {
    notif: PropTypes.bool,
    accnt: PropTypes.bool,
    tasks: PropTypes.bool,
    mssgs: PropTypes.bool
};
const defaultProps = {
    notif: false,
    accnt: false,
    tasks: false,
    mssgs: false
};

class HeaderDropdown extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    dropNotif() {
        const itemsCount = 5;
        return (<NavDropdown className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav="nav">
                <i className="icon-bell"></i>
                <Badge pill="pill" color="danger">{itemsCount}</Badge>
            </DropdownToggle>
            <DropdownMenu right="right">
                <DropdownItem header="header" tag="div" className="text-center">
                    <strong>You have {itemsCount}
                        notifications</strong>
                </DropdownItem>
                <DropdownItem>
                    <i className="icon-user-follow text-success"></i>
                    New user registered</DropdownItem>
                <DropdownItem>
                    <i className="icon-user-unfollow text-danger"></i>
                    User deleted</DropdownItem>
                <DropdownItem>
                    <i className="icon-chart text-info"></i>
                    Sales report is ready</DropdownItem>
                <DropdownItem>
                    <i className="icon-basket-loaded text-primary"></i>
                    New client</DropdownItem>
                <DropdownItem>
                    <i className="icon-speedometer text-warning"></i>
                    Server overloaded</DropdownItem>
                <DropdownItem header="header" tag="div" className="text-center">
                    <strong>Server</strong>
                </DropdownItem>
                <DropdownItem>
                    <div className="text-uppercase mb-1">
                        <small>
                            <b>CPU Usage</b>
                        </small>
                    </div>
                    <Progress className="progress-xs" color="info" value="25"/>
                    <small className="text-muted">348 Processes. 1/4 Cores.</small>
                </DropdownItem>
                <DropdownItem>
                    <div className="text-uppercase mb-1">
                        <small>
                            <b>Memory Usage</b>
                        </small>
                    </div>
                    <Progress className="progress-xs" color="warning" value={70}/>
                    <small className="text-muted">11444GB/16384MB</small>
                </DropdownItem>
                <DropdownItem>
                    <div className="text-uppercase mb-1">
                        <small>
                            <b>SSD 1 Usage</b>
                        </small>
                    </div>
                    <Progress className="progress-xs" color="danger" value={90}/>
                    <small className="text-muted">243GB/256GB</small>
                </DropdownItem>
            </DropdownMenu>
        </NavDropdown>);
    }

    dropAccnt() {
        return (<NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav="nav">
                <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
            </DropdownToggle>
            <DropdownMenu right="right">
                <DropdownItem header="header" tag="div" className="text-center">
                    <strong>Account</strong>
                </DropdownItem>
                <DropdownItem>
                    <i className="fa fa-bell-o"></i>
                    Updates<Badge color="info">42</Badge>
                </DropdownItem>
                <DropdownItem>
                    <i className="fa fa-envelope-o"></i>
                    Messages<Badge color="success">42</Badge>
                </DropdownItem>
                <DropdownItem>
                    <i className="fa fa-tasks"></i>
                    Tasks<Badge color="danger">42</Badge>
                </DropdownItem>
                <DropdownItem>
                    <i className="fa fa-comments"></i>
                    Comments<Badge color="warning">42</Badge>
                </DropdownItem>
                <DropdownItem header="header" tag="div" className="text-center">
                    <strong>Settings</strong>
                </DropdownItem>
                <DropdownItem>
                    <i className="fa fa-user"></i>
                    Profile</DropdownItem>
                <DropdownItem>
                    <i className="fa fa-wrench"></i>
                    Settings</DropdownItem>
                <DropdownItem>
                    <i className="fa fa-usd"></i>
                    Payments<Badge color="secondary">42</Badge>
                </DropdownItem>
                <DropdownItem>
                    <i className="fa fa-file"></i>
                    Projects<Badge color="primary">42</Badge>
                </DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem>
                    <i className="fa fa-shield"></i>
                    Lock Account</DropdownItem>
                <DropdownItem>
                    <i className="fa fa-lock"></i>
                    Logout</DropdownItem>
            </DropdownMenu>
        </NavDropdown>);
    }

    dropTasks() {
        const itemsCount = 15;
        return (<NavDropdown className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav="nav">
                <i className="icon-list"></i>
                <Badge pill="pill" color="warning">{itemsCount}</Badge>
            </DropdownToggle>
            <DropdownMenu right="right" className="dropdown-menu-lg">
                <DropdownItem header="header" tag="div" className="text-center">
                    <strong>You have {itemsCount}
                        pending tasks</strong>
                </DropdownItem>
                <DropdownItem>
                    <div className="small mb-1">Upgrade NPM &amp; Bower
                        <span className="float-right">
                            <strong>0%</strong>
                        </span>
                    </div>
                    <Progress className="progress-xs" color="info" value={0}/>
                </DropdownItem>
                <DropdownItem>
                    <div className="small mb-1">ReactJS Version
                        <span className="float-right">
                            <strong>25%</strong>
                        </span>
                    </div>
                    <Progress className="progress-xs" color="danger" value={25}/>
                </DropdownItem>
                <DropdownItem>
                    <div className="small mb-1">VueJS Version
                        <span className="float-right">
                            <strong>50%</strong>
                        </span>
                    </div>
                    <Progress className="progress-xs" color="warning" value={50}/>
                </DropdownItem>
                <DropdownItem>
                    <div className="small mb-1">Add new layouts
                        <span className="float-right">
                            <strong>75%</strong>
                        </span>
                    </div>
                    <Progress className="progress-xs" color="info" value={75}/>
                </DropdownItem>
                <DropdownItem>
                    <div className="small mb-1">Angular 2 Cli Version
                        <span className="float-right">
                            <strong>100%</strong>
                        </span>
                    </div>
                    <Progress className="progress-xs" color="success" value={100}/>
                </DropdownItem>
                <DropdownItem className="text-center">
                    <strong>View all tasks</strong>
                </DropdownItem>
            </DropdownMenu>
        </NavDropdown>);
    }

    dropMssgs() {
        const itemsCount = 7;
        return (<NavDropdown className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav="nav">
                <i className="icon-envelope-letter"></i>
                <Badge pill="pill" color="info">{itemsCount}</Badge>
            </DropdownToggle>
            <DropdownMenu right="right" className="dropdown-menu-lg">
                <DropdownItem header="header" tag="div">
                    <strong>You have {itemsCount}
                        messages</strong>
                </DropdownItem>
                <DropdownItem href="#">
                    <div className="message">
                        <div className="py-3 mr-3 float-left">
                            <div className="avatar">
                                <img src={'img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                                <Badge className="avatar-status" color="success"></Badge>
                            </div>
                        </div>
                        <div>
                            <small className="text-muted">John Doe</small>
                            <small className="text-muted float-right mt-1">Just now</small>
                        </div>
                        <div className="text-truncate font-weight-bold">
                            <span className="fa fa-exclamation text-danger"></span>
                            Important message</div>
                        <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
                        </div>
                    </div>
                </DropdownItem>
                <DropdownItem href="#">
                    <div className="message">
                        <div className="py-3 mr-3 float-left">
                            <div className="avatar">
                                <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                                <Badge className="avatar-status" color="warning"></Badge>
                            </div>
                        </div>
                        <div>
                            <small className="text-muted">Jane Doe</small>
                            <small className="text-muted float-right mt-1">5 minutes ago</small>
                        </div>
                        <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                        <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
                        </div>
                    </div>
                </DropdownItem>
                <DropdownItem href="#">
                    <div className="message">
                        <div className="py-3 mr-3 float-left">
                            <div className="avatar">
                                <img src={'img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                                <Badge className="avatar-status" color="danger"></Badge>
                            </div>
                        </div>
                        <div>
                            <small className="text-muted">Janet Doe</small>
                            <small className="text-muted float-right mt-1">1:52 PM</small>
                        </div>
                        <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                        <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
                        </div>
                    </div>
                </DropdownItem>
                <DropdownItem href="#">
                    <div className="message">
                        <div className="py-3 mr-3 float-left">
                            <div className="avatar">
                                <img src={'img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                                <Badge className="avatar-status" color="info"></Badge>
                            </div>
                        </div>
                        <div>
                            <small className="text-muted">Joe Doe</small>
                            <small className="text-muted float-right mt-1">4:03 AM</small>
                        </div>
                        <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                        <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
                        </div>
                    </div>
                </DropdownItem>
                <DropdownItem href="#" className="text-center">
                    <strong>View all messages</strong>
                </DropdownItem>
            </DropdownMenu>
        </NavDropdown>);
    }

    render() {
        const {
            notif,
            accnt,
            tasks,
            mssgs,
            ...attributes
        } = this.props;
        return (
            notif
            ? this.dropNotif()
            : accnt
                ? this.dropAccnt()
                : tasks
                    ? this.dropTasks()
                    : mssgs
                        ? this.dropMssgs()
                        : null);
    }
}

HeaderDropdown.propTypes = propTypes;
HeaderDropdown.defaultProps = defaultProps;

export default HeaderDropdown;
