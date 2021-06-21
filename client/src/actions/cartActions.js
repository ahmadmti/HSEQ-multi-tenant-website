import { REFRESH_CART, REMOVE_TABLE, ADD_TABLE, UPDATE_QTY, REMOVE_CUSTOMER, ADD_CUSTOMER, ADD_TO_CART, SET_TAX_TYPE, CLEAR_CART, ADD_SHIPPING_COST, ADD_DISCOUNT, REMOVE_ITEM } from '../constants/cartConstants';


function subtotal(content) {
    let subTotal = 0;
    for (let row of content) {
        subTotal += row.total_price;
    }
    return subTotal;
}
function calTax(taxType, content) {
    let amount = 0;
    let tax_type = (taxType == 'take_away') ? 'take_away' : 'din_in';

    for (let row of content) {

        amount += (row.total_price * (row[tax_type] / 100));
    }
    return Math.round(amount);

}

export function addTableNumber(table_no) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let newcart = {}
    if (cart) {
        cart.table_no = table_no;
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {

        newcart = {
            ixId: Math.random(),
            content: [],
            subTotal: 0,
            totalItem: 0,
            total_tax: 0,
            discount: 0,
            table_no: table_no,
            customerDetail: null,
            tax_array: [],
            tax_type: 'take_away',
            total: 0,
            shippingCost: 0
        }
        localStorage.setItem('cart', JSON.stringify(newcart));

    }

    return {
        type: ADD_TABLE,
        payload: cart || newcart
    }
}

export function removeTableNo(table_no) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    if (cart) {
        cart.table_no = null;
        localStorage.setItem('cart', JSON.stringify(cart));
    }


    return {
        type: REMOVE_TABLE,
        payload: cart
    }
}


export function addCustomer(customer) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let newcart = {}
    if (cart) {
        cart.customerDetail = customer;
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {

        newcart = {
            ixId: Math.random(),
            content: [],
            subTotal: 0,
            totalItem: 0,
            total_tax: 0,
            discount: 0,
            table_no: null,
            customerDetail: customer,
            tax_array: [],
            tax_type: 'take_away',
            total: 0,
            shippingCost: 0
        }
        localStorage.setItem('cart', JSON.stringify(newcart));

    }

    return {
        type: ADD_CUSTOMER,
        payload: cart || newcart
    }
}

export function addShippingCost(cost) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let newcart = {}
    if (cart) {
        cart.shippingCost = cost;
        cart.total = countTotal(cart.subTotal, cart.shippingCost, cart.discount, cart.total_tax)
        localStorage.setItem('cart', JSON.stringify(cart));

    } else {

        newcart = {
            ixId: Math.random(),
            content: [],
            subTotal: 0,
            totalItem: 0,
            total_tax: 0,
            discount: 0,
            table_no: null,
            customerDetail: null,
            tax_array: [],
            tax_type: 'take_away',
            total: 0,
            shippingCost: cost
        }
        localStorage.setItem('cart', JSON.stringify(newcart));

    }

    return {
        type: ADD_SHIPPING_COST,
        payload: cart || newcart
    }
}

function countTotal(subTotal, shippingCost = 0, discount = 0, total_tax = 0) {

    return ((parseInt(subTotal) + parseInt(shippingCost)) - discount)
}

export function clearCart() {
    localStorage.removeItem('cart');
    let cart = {
        ixId: null,
        content: [],
        subTotal: 0,
        discount: 0,
        shippingCost: 0,
        tax_array: [],
        table_no: null,
        tax_type: 'take_away',
        total_tax: 0,
        customerDetail: null,
        total: 0,
        totalItem: 0
    }
    return {
        type: CLEAR_CART,
        payload: cart
    }
}
export const setTaxType = (type) => {

    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        cart.tax_type = type;
        cart.total_tax = calTax(cart.tax_type, cart.content);
        let newType = [];
        for (let row of cart.tax_array) {

            let calRow = {
                vat_label: row.vat_label,
                take_away: row.take_away,
                din_in: row.din_in,
                amount: row.amount,
                tax_amount: Math.round(row.amount * (row[type] / 100)),

            }

            newType.push(calRow);
        }
        cart.tax_array = newType;
        cart.total = countTotal(cart.subTotal, cart.shippingCost, cart.discount, cart.total_tax)
        localStorage.setItem('cart', JSON.stringify(cart));
        return {
            type: SET_TAX_TYPE,
            payload: cart
        }
    } else {

        let newcart = {
            ixId: Math.random(),
            content: [],
            subTotal: 0,
            tax_array: [],
            totalItem: 0,
            total_tax: 0,
            table_no: null,
            tax_type: type,
            customerDetail: null,
            total: 0,
            shippingCost: 0
        }
        localStorage.setItem('cart', JSON.stringify(newcart));
        return {
            type: SET_TAX_TYPE,
            payload: newcart
        }
    }



}

export const addDiscount = (amount) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let newcart = {};
    if (cart) {
        cart.discount = amount;
        cart.total = countTotal(cart.subTotal, cart.shippingCost, cart.discount, cart.total_tax)
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {

        newcart = {
            ixId: Math.random(),
            content: [],
            subTotal: 0,
            totalItem: 0,
            total_tax: 0,
            discount: amount,
            tax_type: 'take_away',
            total: 0,
            tax_array: [],
            table_no: null,
            customerDetail: null,
            shippingCost: 0
        }
        localStorage.setItem('cart', JSON.stringify(newcart));

    }

    return {
        type: ADD_DISCOUNT,
        payload: cart || newcart
    }
}

export const removeItemToCart = (data) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let idx = cart.content.findIndex(x => (x.id === data.id && x.size_id == data.size_id));
    let item = cart.content[idx];

    if (idx > -1) {
        cart.content.splice(idx, 1);

        let index = cart.tax_array.findIndex(row => row.vat_label == data.vat_label)

        let taxRow = cart.tax_array[index];
        if (taxRow.amount > data.total_price) {

            let newRow = {
                vat_label: taxRow.vat_label,
                take_away: taxRow.take_away,
                din_in: taxRow.din_in,
                amount: (parseInt(taxRow.amount) - parseInt(data.total_price)),
                tax_amount: Math.round((parseInt(taxRow.amount) - parseInt(data.total_price)) * (taxRow[cart.tax_type] / 100)),
            };
            cart.tax_array[index] = newRow;

        } else {
            cart.tax_array.splice(index, 1);
        }
        // item.total_price
    }
    cart.subTotal = subtotal(cart.content)
    cart.totalItem = cart.content.length;
    cart.total_tax = calTax(cart.tax_type, cart.content);
    cart.total = countTotal(cart.subTotal, cart.shippingCost, cart.discount, cart.total_tax)
    if (cart.content.length > 0)
        localStorage.setItem('cart', JSON.stringify(cart));
    else
        localStorage.removeItem('cart');

    return {
        type: REMOVE_ITEM,
        payload: cart
    }
}

function taxManger(item, type, tax_array = null) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let new_tax = [];
    if (cart) {
        let exist = cart.tax_array.find(row => row.vat_label == item.vat_label);
        if (exist) {

            let index = cart.tax_array.findIndex(row => row.vat_label == item.vat_label);
            let newRow = {
                vat_label: exist.vat_label,
                take_away: item.take_away,
                din_in: item.din_in,
                amount: (parseInt(exist.amount) + parseInt(item.total_price)),
                tax_amount: Math.round((parseInt(exist.amount) + parseInt(item.total_price)) * (item[type] / 100)),
            };


            cart.tax_array[index] = newRow;
            return cart.tax_array;

        } else {

            let newRow = {
                vat_label: item.vat_label,
                take_away: item.take_away,
                din_in: item.din_in,
                amount: (1 * item.total_price),
                tax_amount: Math.round((1 * item.total_price) * (item[type] / 100)),
            };
            cart.tax_array.push(newRow);
            return cart.tax_array;
        }

    }
    else {

        new_tax.push({
            vat_label: item.vat_label,
            take_away: item.take_away,
            din_in: item.din_in,
            amount: (1 * item.total_price),
            tax_amount: Math.round((1 * item.total_price) * (item[type] / 100)),
        })

        return new_tax;
    }



}

export const removeCustomer = () => {

    let cart = JSON.parse(localStorage.getItem('cart'));

    if (cart) {
        if (cart.content.length > 0) {
            cart.customerDetail = null;
            localStorage.setItem('cart', JSON.stringify(cart));

            return {
                type: REMOVE_CUSTOMER,
                payload: cart
            }
        }
        else {

            localStorage.removeItem('cart');
            let cartContent = {
                ixId: null,
                content: [],
                subTotal: 0,
                discount: 0,
                shippingCost: 0,
                tax_array: [],
                tax_type: 'take_away',
                total_tax: 0,
                customerDetail: null,
                total: 0,
                table_no: null,
                totalItem: 0
            }
            return {
                type: REMOVE_CUSTOMER,
                payload: cartContent
            }
        }

    }


}

export const refreshCart = (data) => {
    return {
        type: REFRESH_CART,
        payload: data
    }
}


export const updateQuanity = (data, qty) => {

    let cart = JSON.parse(localStorage.getItem('cart'));

    if (cart) {

        let isItemExists = cart.content.find((item) => (item.id === data.id && item.size_id == data.size_id));
        if (typeof +qty == 'number') {
            if (qty > 0) {

                let idx = cart.content.findIndex(x => (x.id === data.id && x.size_id == data.size_id));


                let index = cart.tax_array.findIndex(row => row.vat_label == data.vat_label)

                let taxRow = cart.tax_array[index];
                if (taxRow.amount > data.total_price) {

                    let newRow = {
                        vat_label: taxRow.vat_label,
                        take_away: taxRow.take_away,
                        din_in: taxRow.din_in,
                        amount: (parseInt(taxRow.amount) - parseInt(data.total_price)),
                        tax_amount: Math.round((parseInt(taxRow.amount) - parseInt(data.total_price)) * (taxRow[cart.tax_type] / 100)),
                    };
                    cart.tax_array[index] = newRow;

                } else {
                    cart.tax_array.splice(index, 1);
                }
                // item.total_price

                cart.subTotal = subtotal(cart.content)
                cart.totalItem = cart.content.length;
                cart.total_tax = calTax(cart.tax_type, cart.content);
                cart.total = countTotal(cart.subTotal, cart.shippingCost, cart.discount, cart.total_tax)

                localStorage.setItem('cart', JSON.stringify(cart));
                //Remove Item

                //remove item
                isItemExists.qty = parseInt(qty);
                isItemExists.total_price = parseInt(isItemExists.qty) * parseInt(isItemExists.unit_price)
                cart.content[idx] = isItemExists;
                cart.subTotal = subtotal(cart.content)
                cart.totalItem = cart.content.length;
                cart.total_tax = calTax(cart.tax_type, cart.content);
                cart.tax_array = taxManger(isItemExists, cart.tax_type, cart.tax_array);
                cart.total = countTotal(cart.subTotal, cart.shippingCost, cart.discount, cart.total_tax)
                localStorage.setItem('cart', JSON.stringify(cart));
            }

            else {

                let idx = cart.content.findIndex(x => (x.id === data.id && x.size_id == data.size_id));
                let item = cart.content[idx];

                if (idx > -1) {
                    cart.content.splice(idx, 1);

                    let index = cart.tax_array.findIndex(row => row.vat_label == data.vat_label)

                    let taxRow = cart.tax_array[index];
                    if (taxRow.amount > data.total_price) {

                        let newRow = {
                            vat_label: taxRow.vat_label,
                            take_away: taxRow.take_away,
                            din_in: taxRow.din_in,
                            amount: (parseInt(taxRow.amount) - parseInt(data.total_price)),
                            tax_amount: Math.round((parseInt(taxRow.amount) - parseInt(data.total_price)) * (taxRow[cart.tax_type] / 100)),
                        };
                        cart.tax_array[index] = newRow;

                    } else {
                        cart.tax_array.splice(index, 1);
                    }
                    // item.total_price
                }
                cart.subTotal = subtotal(cart.content)
                cart.totalItem = cart.content.length;
                cart.total_tax = calTax(cart.tax_type, cart.content);
                cart.total = countTotal(cart.subTotal, cart.shippingCost, cart.discount, cart.total_tax)
                if (cart.content.length > 0)
                    localStorage.setItem('cart', JSON.stringify(cart));
                else
                    localStorage.removeItem('cart');
            }
        }
    }

    return {
        type: UPDATE_QTY,
        payload: cart
    }

}



export const addToCart = (data) => {

    let cart = JSON.parse(localStorage.getItem('cart'));
    let newcart = {};
    if (cart) {

        let isItemExists = cart.content.find((item) => (item.id === data.id && item.size_id == data.size_id));

        if (isItemExists) {
            isItemExists.qty += 1;
            isItemExists.total_price = parseInt(isItemExists.qty) * parseInt(isItemExists.unit_price)
            let idx = cart.content.findIndex(x => (x.id === data.id && x.size_id == data.size_id));
            cart.content[idx] = isItemExists;
            cart.subTotal = subtotal(cart.content)
            cart.totalItem = cart.content.length;
            cart.total_tax = calTax(cart.tax_type, cart.content);
            cart.tax_array = taxManger(data, cart.tax_type);

            cart.total = countTotal(cart.subTotal, cart.shippingCost, cart.discount, cart.total_tax)
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            cart.content = [...cart.content, data]
            cart.subTotal = subtotal(cart.content)
            cart.totalItem = cart.content.length;
            cart.total_tax = calTax(cart.tax_type, cart.content);
            cart.tax_array = taxManger(data, cart.tax_type);
            cart.total = countTotal(cart.subTotal, cart.shippingCost, cart.discount, cart.total_tax)
            localStorage.setItem('cart', JSON.stringify(cart));
        }

    } else {
        let tax = calTax('take_away', [data])
        newcart = {
            ixId: Math.random(),
            content: [data],
            subTotal: data.total_price,
            totalItem: 1,
            tax_type: 'take_away',
            tax_array: taxManger(data, 'take_away'),
            total_tax: tax,
            table_no: null,
            customerDetail: null,
            total: countTotal(data.total_price, 0, 0, tax)
        }
        localStorage.setItem('cart', JSON.stringify(newcart));

    }


    return {
        type: ADD_TO_CART,
        payload: cart || newcart
    }
}