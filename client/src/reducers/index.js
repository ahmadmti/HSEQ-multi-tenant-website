import { combineReducers } from 'redux'
import cart from './cart';
import pacer from './pacer.js';
const reducers = combineReducers({
    cart, pacer
})

export default reducers
