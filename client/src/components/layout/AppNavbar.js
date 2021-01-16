import React, { Component,Fragment } from 'react'
import {Navbar,NavbarBrand,NavLink,NavbarToggler,Collapse,Nav,NavItem,Dropdown,DropdownToggle,DropdownItem,DropdownMenu} from 'reactstrap'
import {connect} from 'react-redux'
import {logout} from '../../actions/userActions'
import PropTypes from 'prop-types'

export class AppNavbar extends Component {

    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    state = {
        isOpen:false,
        isDropdownOpen:false
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired        
    }

    toggle = () => {
        this.setState({isOpen:!this.state.isOpen})
    }

    dropDownToggle = () => {
        this.setState({isDropdownOpen:!this.state.isDropdownOpen})
    }

    onMouseEnter() {
        this.setState({isDropdownOpen:true})
    }

    onMouseLeave() {
        this.setState({isDropdownOpen:false})
    }

    render() {

        const {isAuthenticated,user} = this.props.user

        const loggedIn = (
            <Fragment>
                <Dropdown onMouseClick={this.onMouseEnter} isOpen={this.state.isDropdownOpen} toggle={this.dropDownToggle}>
                    <DropdownToggle color="danger" caret>
                            {user ? user.username : ""}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <NavLink href="/addCar">Add car</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/myCars">My cars</NavLink>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavItem className="text-white">
                    <NavLink className="text-white" href="/addCar">Add car</NavLink>
                </NavItem>
                <NavItem className="text-white">
                    <NavLink className="text-white" href="/myCars">My cars</NavLink>
                </NavItem>
                <NavItem className="text-white">
                    <NavLink className="text-white" onClick={this.props.logout} href="/">Logout</NavLink>
                </NavItem>
            </Fragment>
        )

        const loggedOut = (
            <Fragment>
                <NavItem className="text-white">
                    <NavLink className="text-white" href="/register">Register</NavLink>
                </NavItem>
                <NavItem className="text-white">
                    <NavLink className="text-white" href="/login">Login</NavLink>
                </NavItem>
            </Fragment>
        )

        return (
            <div>
                <Navbar color="danger" light expand="md">
                    <NavbarBrand className="text-white" href="/">Prodavnica</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? loggedIn : loggedOut}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.user
})

export default connect(mapStateToProps,{logout})(AppNavbar)
