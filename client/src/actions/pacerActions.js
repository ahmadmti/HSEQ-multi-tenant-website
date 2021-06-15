import { PACER_STATE_CHANGE, ORDER, ORDER_ARRAY } from '../constants/pacerConstants';

export const toggle = (msg = null, value = null) => {
    return {
        type: PACER_STATE_CHANGE,
        payload: { value, msg }
    }
}


export const order = (order) => {
    return {
        type: ORDER,
        payload: order
    }
}

export const ordersArray = (order) => {
    return {
        type: ORDER_ARRAY,
        payload: order
    }
}