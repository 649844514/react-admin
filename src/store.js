import { createStore, applyMiddleware } from 'redux'
import thunk  from 'redux-thunk'
import rootRouter from './reducers'

export default createStore(
    rootRouter,
    applyMiddleware(thunk)
)