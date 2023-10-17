import { createStore,applyMiddleware, compose } from "redux";
import  thunkMiddleware  from "redux-thunk";
import reducer from './reducer'


const composEnhacer = window.
__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composEnhacer(applyMiddleware(thunkMiddleware)));

export default store;