import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LogoNavbar from '../layout/LogoNavbar'
import {Container,Form,FormGroup,Row,Col,Input,Button} from 'reactstrap'
import {connect} from 'react-redux'
import {register} from '../../actions/userActions'
import {withRouter} from 'react-router-dom'

export class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username:'',
            email:'',
            password:'',
        }
    }

    static propTypes = {
        isAuthenticated:PropTypes.bool,
        register:PropTypes.func.isRequired
    }

    componentDidUpdate(){
        if(this.props.isAuthenticated)
        {
            this.props.history.push('/')
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit = (e) => {

        e.preventDefault()

        const {username,email,password} = this.state

        const newUser = {
            username,email,password
        }

        this.props.register(newUser)
    }

    render() {
        return (
            <div>
                <LogoNavbar/>
                <Container className="mt-4 p-3">
                    <h4 className="text-center">Register</h4>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="text" name="username" id="username" placeholder="Username" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="text" name="email" id="email" placeholder="Email" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="password" name="password" id="password" placeholder="Password" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Button color="danger" block className="m-3">Register</Button></Col><Col xs="2"></Col></Row>
                        </FormGroup>
                    </Form>        
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated:state.user.isAuthenticated
})

export default withRouter(connect(mapStateToProps,{register})(Register))
