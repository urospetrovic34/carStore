import React, { Component } from 'react'
import {Navbar,NavbarBrand} from 'reactstrap'

export class LogoNavbar extends Component {
    render() {
        return (
            <div>
                <Navbar color="danger" light>
                    <NavbarBrand className="m-auto text-white" href="/">Prodavnica</NavbarBrand>
                </Navbar>
            </div>
        )
    }
}

export default LogoNavbar
