import { combineReducers } from 'redux';
import Auth from './Auth';
import Login from "./Login";
import State from "./State";
import Supplier from "./Supplier";
import City from "./City";
import Catalogue from "./Catalogue";
import Home from "./Home";
import Offer from "./Offer";
import Chat from "./Chat";

export default combineReducers({
  Auth,
  Login,
  City,
  State,
  Supplier,
  Catalogue,
  Home,
  Offer,
  Chat
})