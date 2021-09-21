import { put, call } from 'redux-saga/effects'
import * as type from '../actions/constant'
import getPersonalInfo from '../services/personalInfoList'
export default function* getPersonalInfoSaga(action) {
    console.log("serviceresss")
    try {
        let res = yield call(getPersonalInfo)
        // let res = ["response After Api call"]
        console.log("service", res)
        yield put({ type: type.SET_PERSONAL, payload: res })
    } catch (err) {

    }

}