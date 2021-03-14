import React, {useEffect,useState,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {logout} from '../../actions/userActions'
import {AppBar,Toolbar,Typography,Button,makeStyles,Menu,MenuItem} from '@material-ui/core'
import PropTypes from 'prop-types'

const AppNavbar = ({isAuthenticated}) => {

    const useStyles = makeStyles((theme) => ({
        title: {
          flexGrow: 1
        },
        link:{
            color:"white",
            '&:hover':{
                color:"white",
                textDecoration:"none"
            }        
        }
    }))

    const classes = useStyles()

    const loggedIn = (
        <Fragment>
            <Button color="inherit"><Link className={classes.link} to={`/addCar`}>Add car</Link></Button>
            <Button color="inherit"><Link className={classes.link} to={`/myCars`}>My cars</Link></Button>
            <Button color="inherit"><Link className={classes.link} to={`/`}>Logout</Link></Button>
        </Fragment>
    )

    const loggedOut = (
        <Fragment>
            <Button color="inherit"><Link className={classes.link} to={`/register`}>Register</Link></Button>
            <Button color="inherit"><Link className={classes.link} to={`/login`}>Login</Link></Button>
        </Fragment>
    )

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>Store</Typography>
                    {isAuthenticated ? loggedIn : loggedOut}
                </Toolbar>
            </AppBar>
        </div>
    )
}

AppNavbar.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired   
}

const mapStateToProps = (state) => ({
    user:state.user
})

export default withRouter(connect(mapStateToProps,{logout})(AppNavbar))