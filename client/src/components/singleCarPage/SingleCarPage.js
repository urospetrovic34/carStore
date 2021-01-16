import React,{useEffect} from 'react'
import AppNavbar from '../layout/AppNavbar'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getCar} from '../../actions/carActions'
import {Container} from 'reactstrap'
import {withRouter} from 'react-router-dom'

const SingleCarPage = ({car:{car},getCar,match}) => {

    useEffect(() => {
        getCar(match.params.id)
    }, [getCar,match])

    return (
        <div>
            <AppNavbar/>
            <Container>
                <Container className="containerflex">
                    <div className="d-flex"><img top width="100%" src={car.slika} alt="Slika" /></div>
                    <div className="d-flex">a</div>
                    <div className="d-flex">a</div>
                </Container>
            </Container>
        </div>
    )
}

SingleCarPage.propTypes = {
    getCar:PropTypes.func.isRequired,
    car:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    car:state.car
})

export default withRouter(connect(mapStateToProps,{getCar})(SingleCarPage))
