import { PACER_STATE_CHANGE, ORDER, ORDER_ARRAY } from '../constants/pacerConstants';

const intialState = {
    open: false,
    msg: 'Loading',
    orders: []
}

const cart = (state = intialState, action) => {
    switch (action.type) {
        case PACER_STATE_CHANGE: return {
            ...state,
            open: (action.payload.value ? action.payload.value : !state.open),
            msg: (action.payload.msg ? action.payload.msg : 'Loading')
        };
        case ORDER: return {
            ...state,
            orders: [action.payload, ...state.orders],
        };
        case ORDER_ARRAY: return {
            ...state,
            orders: action.payload,
        };
        default: return state;
    }
}

export default cart;