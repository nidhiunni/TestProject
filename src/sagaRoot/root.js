import { fork } from 'redux-saga/effects';
import sagaWatcher from "../components/saga/watcherSaga"


export default function* coreSaga() {

    yield [
        fork(sagaWatcher),


    ]
}