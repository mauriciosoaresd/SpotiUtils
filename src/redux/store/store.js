import { createStore, applyMiddleware } from "redux"
import reducers from "../reducers/index"
import thunk from 'redux-thunk'

//criando a store
// primeiro recebe os reducers e depois o estado inicial
export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)
