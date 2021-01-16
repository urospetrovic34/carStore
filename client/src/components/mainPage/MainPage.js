import React, { Component } from 'react'
import AppNavbar from '../layout/AppNavbar'
import {getCars,getLast20Cars} from '../../actions/carActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter,Link} from 'react-router-dom'
import {Container,Col,Row} from 'reactstrap'

export class MainPage extends Component {

    componentDidMount() {
        this.props.getCars()
        this.props.getLast20Cars()
    }

    static propTypes = {
        getCars: PropTypes.func.isRequired,
        getLast20Cars: PropTypes.func.isRequired,
        car:PropTypes.object.isRequired
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                
                <Container className="mt-3">
                    <Row>
                        <Col xs="12" md="6">
                            <div className="carsDisplay">
                            {this.props.car.lastCars.map(({slika,marka,model,_id,cena})=>(
                                <div className="carCard">
                                    <div className="centreImg">
                                        <Link to={`${_id}`}><img src={slika} alt="Slika"/>
                                        <h6>{marka} {model}</h6>
                                        <p>{cena} €</p></Link>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </Col>
                        <Col xs="12" md="6">
                            <div className="carsDisplay">
                            {this.props.car.cars.map(({slika,marka,model,_id,cena})=>(
                                <div className="carCard">
                                    <div className="centreImg">
                                        <Link to={`${_id}`}><img src={slika} alt="Slika"/>
                                        <h6>{marka} {model}</h6>
                                        <p>{cena} €</p></Link>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </Col>
                        <Col xs="12" md="6">
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    car:state.car
})

export default withRouter(connect(mapStateToProps,{getCars,getLast20Cars})(MainPage))
