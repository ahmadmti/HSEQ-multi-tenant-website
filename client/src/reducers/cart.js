import { ADD_TO_CART, REMOVE_TABLE, ADD_TABLE, UPDATE_QTY, REMOVE_CUSTOMER, ADD_CUSTOMER, REFRESH_CART, SET_TAX_TYPE, REMOVE_ITEM, ADD_SHIPPING_COST, CLEAR_CART, ADD_DISCOUNT } from '../constants/cartConstants';

const intialState = {

    cart: JSON.parse(localStorage.getItem('cart')) || {
        ixId: null,
        content: [],
        subTotal: "",
        discount: 0,
        shippingCost: 0,
        tax_type: 'take_away',
        total_tax: 0,
        tax_array: [],
        total: 0,
        table_no: null,
        customerDetail: null,
        totalItem: 0
    }
}

const cart = (state = intialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: return {
            ...state,
            cart: action.payload
        };
        case REMOVE_ITEM: return {
            ...state,
            cart: action.payload
        };
        case ADD_SHIPPING_COST: return {
            ...state,
            cart: action.payload
        };
        case ADD_DISCOUNT: return {
            ...state,
            cart: action.payload
        };
        case CLEAR_CART: return {
            ...state,
            cart: action.payload
        };
        case SET_TAX_TYPE: return {
            ...state,
            cart: action.payload
        };
        case REFRESH_CART: return {
            ...state,
            cart: action.payload
        };
        case ADD_CUSTOMER: return {
            ...state,
            cart: action.payload
        };
        case REMOVE_CUSTOMER: return {
            ...state,
            cart: action.payload
        };
        case UPDATE_QTY: return {
            ...state,
            cart: action.payload
        };
        case ADD_TABLE: return {
            ...state,
            cart: action.payload
        };
        case REMOVE_TABLE: return {
            ...state,
            cart: action.payload
        }
        default: return state;
    }
}

export default cart;