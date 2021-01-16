import React, { Component } from 'react'
import AppNavbar from '../layout/AppNavbar'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addCar} from '../../actions/carActions'
import {Container,Form,FormGroup,Row,Col,Input,Button,CustomInput} from 'reactstrap'
import {withRouter} from 'react-router-dom'

export class AddCar extends Component {

    state = {
        marka:'',
        model:'',
        godiste:0,
        kilometraza:'',
        karoserija:'',
        gorivo:'',
        kubikaza:'',
        snagaMotora:'',
        slika:'',
        cena:'',
        imageUploadLabel:''
    }

    static propTypes = {
        isAuthenticated:PropTypes.bool.isRequired,
        addCar:PropTypes.func.isRequired
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    onChangeImage = (e) => {
        this.setState({slika:e.target.files[0]})
    }

    onSubmit = (e) => {

        e.preventDefault()

        const formData = new FormData()
        formData.append('p',this.state.slika)
        formData.append('marka',this.state.marka)
        formData.append('model',this.state.model)
        formData.append('godiste',this.state.godiste)
        formData.append('kilometraza',this.state.kilometraza)
        formData.append('karoserija',this.state.karoserija)
        formData.append('gorivo',this.state.gorivo)
        formData.append('kubikaza',this.state.kubikaza)
        formData.append('snagaMotora',this.state.snagaMotora)
        formData.append('cena',this.state.cena)

        this.props.addCar(formData)

    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container className="mt-4 p-3">
                    <h4 className="text-center">Add car</h4>
                    <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <FormGroup>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="text" name="marka" id="marka" placeholder="Marka" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="text" name="model" id="model" placeholder="Model" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="number" name="godiste" id="godiste" placeholder="Godiste" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="number" name="kilometraza" id="kilometraza" placeholder="Kilometraza" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="text" name="karoserija" id="karoserija" placeholder="Karoserija" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="number" name="cena" id="cena" placeholder="Cena" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="text" name="gorivo" id="gorivo" placeholder="Gorivo" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="number" name="kubikaza" id="kubikaza" placeholder="Kubikaza" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Input type="number" name="snagaMotora" id="snagaMotora" placeholder="Snaga motora" className="m-3" onChange={this.onChange}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><CustomInput type="file" name="slika" id="slika" placeholder="Slika" className="m-3" label="asc" onChange={this.onChangeImage}/></Col><Col xs="2"></Col></Row>
                            <Row><Col xs="2"></Col><Col xs="8"><Button color="danger" block className="m-3">Add</Button></Col><Col xs="2"></Col></Row>
                        </FormGroup>
                    </Form>        
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    car:state.car,
    isAuthenticated:state.user.isAuthenticated
})

export default withRouter(connect(mapStateToProps,{addCar})(AddCar))
