import axios from 'axios'
import {GET_CARS,GET_MYCARS,GET_LAST20CARS,GET_CAR,ADD_CAR,CARS_LOADING,DELETE_CAR,EDIT_CAR,CAR_ERROR} from './types'

export const getCars = () => async dispatch => {

    try 
    {
        const queryString = document.location.search.substring(1)

        const search = new URLSearchParams(queryString)

        const ignore = []

        search.forEach((value,key)=>{
            if(value==='')
            {
                ignore.push(key)
            }
        })

        ignore.forEach(key=>{
            search.delete(key)
        })

        const params = {}

        search.forEach((value,key)=>{
            params[key]=value
        })

        dispatch(setCarsLoading())

        const response = await axios.get('/api/cars',{params})

        dispatch({
            type:GET_CARS,
            payload:response.data  
        })
    } 
    catch (error) 
    {
        dispatch({type:CAR_ERROR})
    }

}

export const getMyCars = () => async (dispatch,getState) => {

    try 
    {
        const response = await axios.get('/api/cars/myCars',tokenConfig(getState))

        dispatch({
            type:GET_MYCARS,
            payload:response.data  
        })
    } 
    catch (error) 
    {
        dispatch({type:CAR_ERROR})
    }

}

export const getLast20Cars = () => async (dispatch) => {

    try 
    {
        const response = await axios.get('/api/cars/last20Cars')

        dispatch({
            type:GET_LAST20CARS,
            payload:response.data  
        })
    } 
    catch (error) 
    {
        dispatch({type:CAR_ERROR})
    }

}


export const setCarsLoading = () => {
    return {
        type:CARS_LOADING
    }
}

export const getCar = (id) => async dispatch => {

    try 
    {
        const response = await axios.get(`/api/cars/${id}`)

        dispatch({
            type:GET_CAR,
            payload:response.data
        })
    } 
    catch (error) 
    {
        dispatch({type:CAR_ERROR})
    }

}

export const addCar = (formData) => async (dispatch,getState) => {

    try 
    {
        const response = await axios.post('/api/cars',formData,tokenConfig(getState))

        dispatch({
            type:ADD_CAR,
            payload:response.data
        })
    } 
    catch (error) 
    {
        console.log(error.message)
        dispatch({type:CAR_ERROR})
    }

}

export const deleteCar = (id) => async (dispatch,getState) => {

    try 
    {
        await axios.delete(`/api/cars/${id}`,tokenConfig(getState))
        
        dispatch({
            type:DELETE_CAR,
            payload:id
        })
    } 
    catch (error) 
    {
        dispatch({type:CAR_ERROR})
    }

}

export const editCar = (id,car) => async (dispatch,getState) => {

    try 
    {
        const response = await axios.put(`/api/cars/${id}`,car,tokenConfig(getState))
        
        dispatch({
            type:EDIT_CAR,
            payload:response.data
        })
    } 
    catch (error) 
    {
        dispatch({type:CAR_ERROR})
    }

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