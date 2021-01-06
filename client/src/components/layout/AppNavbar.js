import React, { Component,Fragment } from 'react'
import {Navbar,NavbarBrand,NavLink,NavbarToggler,Collapse,Nav,NavItem} from 'reactstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/userActions'
import PropTypes from 'prop-types'

export class AppNavbar extends Component {

    state = {
        isOpen:false
    }

    static propTypes = {
        user: PropTypes.object.isRequired        
    }

    toggle = () => {
        this.setState({isOpen:!this.state.isOpen})
    }

    render() {

        const {isAuthenticated} = this.props.user

        const loggedIn = (
            <Fragment>
                <NavItem className="text-white">
                    <NavItem className="text-white">
                        <NavLink className="text-white" onClick={this.props.logout} href="/">Logout</NavLink>
                    </NavItem>
                </NavItem>
            </Fragment>
        )

        const loggedOut = (
            <Fragment>
                <NavItem className="text-white">
                    <Link to="/">
                        <NavItem className="text-white">
                            <NavLink className="text-white">Register</NavLink>
                        </NavItem>
                    </Link>
                </NavItem>
                <NavItem className="text-white">
                    <Link to="/">
                        <NavItem className="text-white">
                            <NavLink className="text-white">Login</NavLink>
                        </NavItem>
                    </Link>
                </NavItem>
            </Fragment>
        )

        return (
            <div>
                <Navbar color="danger" light expand="md">
                    <Link to="/"><NavbarBrand className="text-white" href="/">Prodavnica</NavbarBrand></Link>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse>
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
