import { takeLatest } from 'redux-saga/effects'
import * as type from '../actions/constant'
import getPersonalInfoSaga from './getPersonalnfo'

export default function* sagaWatcher() {
    console.log("watcherr")
    yield takeLatest(type.GET_PERSONAL, getPersonalInfoSaga)

}

