import {GET_CARS,GET_MYCARS,GET_LAST20CARS,GET_CAR,ADD_CAR,CARS_LOADING,DELETE_CAR,EDIT_CAR,CAR_ERROR} from '../actions/types'
import carUtil from '../util/carUtil'

const initialState = {
    cars:[],
    car:carUtil,
    isLoading:false,
    lastCars:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action)
{
    switch(action.type)
    {
        case GET_CARS:
            return{
                ...state,
                cars:action.payload,
                isLoading:false,
                car:carUtil
            }
        case GET_MYCARS:
            return{
                ...state,
                cars:action.payload,
                isLoading:false,
                car:carUtil
            }
        case GET_LAST20CARS:
            return{
                ...state,
                lastCars:action.payload,
                isLoading:false,
                car:carUtil
            }
        case ADD_CAR:
            return{
                ...state,
                cars:[action.payload,...state.cars]
            }
        case GET_CAR:
            return{
                ...state,
                car:action.payload,
                isLoading:false
            }
        case EDIT_CAR:
            return{
                ...state,
                car:action.payload
            }
        case DELETE_CAR:
            return{
                ...state,
                cars:state.cars.filter(car=>car._id!==action.payload)
            }
        case CARS_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case CAR_ERROR:
            return{
                ...state,
                isLoading:false
            }
        default:
            return state
    }
}