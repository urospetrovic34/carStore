import axios from 'axios'
import {USER_LOADING,USER_LOADED,USER_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL} from './types'

export const loadUser = () => async (dispatch,getState) => {

    try 
    {
        dispatch({type:USER_LOADING})

        const response = await axios.get('/api/users',tokenConfig(getState))

        dispatch({
            type:USER_LOADED,
            payload:response.data
        })
    } 
    catch (error) 
    {
        console.log(error.message)
        dispatch({type:USER_ERROR})
    }

}

export const register = ({username,email,password}) => async dispatch => {

    const body = {username,email,password}

    try 
    {
        const response = await axios.post('/api/users', body)

        dispatch({
            type:REGISTER_SUCCESS,
            payload:response.data
        })

        dispatch(loadUser())
    } 
    catch (error) 
    {
        dispatch({type:REGISTER_FAIL})
    }

}

export const login = ({email,password}) => async dispatch => {

    const body = {email,password}

    try 
    {
        const response = await axios.post('/api/users/login',body)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data
        })

        dispatch(loadUser())
    } 
    catch (error) 
    {
        dispatch({type:LOGIN_FAIL})        
    }

}

export const logout = () => {

    return {type:LOGOUT_SUCCESS}

}

export const tokenConfig = getState => {

    const token = getState().user.token

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    if(token)
    {
        config.headers['x-auth-token'] = token
    }

    return config
}