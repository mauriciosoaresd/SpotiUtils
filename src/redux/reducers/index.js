import { combineReducers } from "redux";
import accountReducer from './accountReducer'
import userReducer from './userReducer'

//combina todos reducers. geralmente terão mais arquivos de reducer
const reducers = combineReducers({ 
    account: accountReducer,
    user: userReducer
})

export default reducers;