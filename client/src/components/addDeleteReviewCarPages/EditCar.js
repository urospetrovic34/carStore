import React, {useEffect,useState} from 'react'
import AppNavbar from '../layout/AppNavbar'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getCar,editCar} from '../../actions/carActions'
import {Spinner,Container,Form,FormGroup,Row,Col,Input,Button} from 'reactstrap'
import {withRouter} from 'react-router-dom'

const state = {
    marka:'',
    model:'',
    godiste:0,
    kilometraza:'',
    karoserija:'',
    gorivo:'',
    kubikaza:'',
    snagaMotora:'',
    slika:'',
    cena:''
}

const EditCar = ({car:{car,isLoading},getCar,editCar,match}) => {

    const [data,setData] = useState(state)

    useEffect(() => {

        if(car.marka==="")
        {
            getCar(match.params.id)
        }
        
        if(!isLoading && car.marka!=="")
        {
            const carData = {...state}

            for(const k in car)
            {
                if(k in carData)
                {
                    carData[k] = car[k]
                }
            }

            setData(carData)
        }

    }, [isLoading,getCar,car,match])

    const {
        marka,
        model,
        godiste,
        kilometraza,
        karoserija,
        gorivo,
        kubikaza,
        snagaMotora,
        slika,
        cena
    } = data

    const onChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    const onSubmit = (e) => {

        e.preventDefault()

        const editedCar = {
            marka:marka,
            model:model,
            godiste:godiste,
            kilometraza:kilometraza,
            karoserija:karoserija,
            gorivo:gorivo,
            kubikaza:kubikaza,
            snagaMotora:snagaMotora,
            slika:slika,
            cena:cena,
        }

        editCar(match.params.id,editedCar)
        
        window.location.reload()
    }

    return car.marka === "" ? (<Spinner color="danger" style={{margin:'auto',width:'6rem',height:'6rem',display:'block', marginTop:'25vh'}}/>) : (
        <div>
            <AppNavbar/>
            <Container className="mt-4 p-3">
                <Row>
                    <Col xs="12" md={{ size: '8', offset:2 }}>
                        <h4 className="text-center">Izmena</h4>
                    </Col>
                </Row>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Row><Col xs="2"></Col><Col xs="8"><Input type="text" name="marka" id="marka" placeholder="Marka" value={marka} onChange={onChange} className="m-3"/></Col><Col xs="2"></Col></Row>
                        <Row><Col xs="2"></Col><Col xs="8"><Input type="text" name="model" id="model" placeholder="Model" value={model} onChange={onChange} className="m-3"/></Col><Col xs="2"></Col></Row>
                        <Row><Col xs="2"></Col><Col xs="8"><Input type="number" name="godiste" id="godiste" placeholder="Godiste" value={godiste} onChange={onChange} className="m-3"/></Col><Col xs="2"></Col></Row>
                        <Row><Col xs="2"></Col><Col xs="8"><Input type="number" name="kilometraza" id="kilometraza" placeholder="Kilometraza" value={kilometraza} onChange={onChange} className="m-3"/></Col><Col xs="2"></Col></Row>
                        <Row><Col xs="2"></Col><Col xs="8"><Input type="text" name="karoserija" id="karoserija" placeholder="Karoserija" value={karoserija} onChange={onChange} className="m-3"/></Col><Col xs="2"></Col></Row>
                        <Row><Col xs="2"></Col><Col xs="8"><Input type="text" name="gorivo" id="gorivo" placeholder="Gorivo" value={gorivo} onChange={onChange} className="m-3"/></Col><Col xs="2"></Col></Row>
                        <Row><Col xs="2"></Col><Col xs="8"><Input type="number" name="kubikaza" id="kubikaza" placeholder="Kubikaza" value={kubikaza} onChange={onChange} className="m-3"/></Col><Col xs="2"></Col></Row>
                        <Row><Col xs="2"></Col><Col xs="8"><Input type="number" name="snagaMotora" id="snagaMotora" placeholder="Snaga motora" value={snagaMotora} onChange={onChange} className="m-3"/></Col><Col xs="2"></Col></Row>
                        <Row><Col xs="2"></Col><Col xs="8"><Input type="number" name="cena" id="cena" placeholder="Cena" value={cena} onChange={onChange} className="m-3"/></Col><Col xs="2"></Col></Row>
                        <Row><Col xs="2"></Col><Col xs="8"><Button color="danger" block className="m-3">Edit</Button></Col><Col xs="2"></Col></Row>
                    </FormGroup>
                </Form>        
            </Container>
        </div>
    )
}

EditCar.propTypes = {
    isAuthenticated:PropTypes.bool.isRequired,
    getCar:PropTypes.func.isRequired,
    editCar:PropTypes.func.isRequired,
    car:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    car:state.car,
    isAuthenticated:state.user.isAuthenticated
})

export default withRouter(connect(mapStateToProps,{getCar,editCar})(EditCar))

