import { createStore, applyMiddleware, compose } from 'redux'
import thunk  from 'redux-thunk'
import rootRouter from './reducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
    rootRouter,
    composeEnhancers(applyMiddleware(thunk))
)