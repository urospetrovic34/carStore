import React, { Component } from 'react'
import AppNavbar from '../layout/AppNavbar'
import {Container,Row,Col,Button} from 'reactstrap'
import {getMyCars,deleteCar} from '../../actions/carActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

export class MyCars extends Component {

    componentDidMount() {
        this.props.getMyCars()
    }

    static propTypes = {
        getMyCars: PropTypes.func.isRequired,
        deleteCar: PropTypes.func.isRequired,
        car:PropTypes.object.isRequired
    }

    onDeleteButtonClick = (id) => {
        this.props.deleteCar(id)
        window.location.reload()
    }

    onEditButtonClick = (id) => {
        this.props.history.push(`/editCar/${id}`)
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid className="mt-3">
                    {this.props.car.cars.map(({slika,marka,model,_id})=>(
                        <Row><Col xs="2"><img top width="50%" src={slika} alt="Slika" className="mx-auto d-block"/></Col><Col xs="2" className="m-auto text-center"><h5>{marka}</h5></Col><Col xs="2" className="m-auto text-center"><h5>{model}</h5></Col><Col xs="2" className="m-auto text-center"><Button color="danger" size="sm" onClick={this.onDeleteButtonClick.bind(this,_id)}>Delete</Button></Col><Col xs="2" className="m-auto text-center"><Button color="success" size="sm" onClick={this.onEditButtonClick.bind(this,_id)}>Edit Car</Button></Col></Row>        
                    ))}
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    car:state.car
})

export default withRouter(connect(mapStateToProps,{getMyCars,deleteCar})(MyCars))
