import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import Reducer from '../Reducer';
import authSaga from '../Saga/Auth';
import loginSaga from "../Saga/Login";
import citySaga from "../Saga/City";
import stateSaga from "../Saga/State";
import supplierSaga from "../Saga/Supplier";
import catalogueSaga from "../Saga/Catalogue";
import homeSaga from "../Saga/Home";
import offerSaga from "../Saga/Offer"
import ChatSaga from '../Saga/Chat';


const sagamiddleware = createSagaMiddleware()
const store = createStore(Reducer, applyMiddleware(sagamiddleware))
sagamiddleware.run(authSaga)
sagamiddleware.run(loginSaga)
sagamiddleware.run(citySaga)
sagamiddleware.run(stateSaga)
sagamiddleware.run(supplierSaga)
sagamiddleware.run(catalogueSaga)
sagamiddleware.run(homeSaga)
sagamiddleware.run(offerSaga)
sagamiddleware.run(ChatSaga)
export default store;

