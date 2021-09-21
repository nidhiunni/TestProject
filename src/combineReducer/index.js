import { combineReducers } from 'redux'
import addDetailsReducer from '../components/addDetailsReducer'
import addOfficeDetailReducer from '../components/addOfficeDetailReducer'
import getDetailsPersonal from '../components/getPerssonalInfoReducer'
const allReducers = combineReducers({

    addDetails: addDetailsReducer,
    addOffice: addOfficeDetailReducer,
    getPersonal: getDetailsPersonal,
})
//console.log("reducerCom")
export default allReducers