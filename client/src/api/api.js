import instance from './axiosConfig';

function token() {
    if (localStorage.getItem('auth_user')) {
        let data = localStorage.getItem('auth_user');
        let parseData = JSON.parse(data);
        return parseData.token;
    }
    return null;

}
function headers() {
    return {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token()
    }
}
// dasboard 


export async function getAssignments() {
    return await instance.get('/dashboard/get-assignments', { headers: headers() });
}

export async function getTotalSales(data) {
    console.log(data)
    return await instance.post('/dashboard/get-total-sale', data, { headers: headers() });
}

export async function addCategory(data) {

    return await instance.post('/category/create-category', { ...data }, { headers: headers() });
}

export async function getCategories() {
    return await instance.get('/category/all-categories', { headers: headers() });
}

// invoice
export async function getCategoriesItemsTab() {
    return await instance.get('/category/invoice-categories', { headers: headers() });
}

export async function getTabItems(id) {
    // console.log(id)
    return await instance.post('/category/invoice-categories-items', { id }, { headers: headers() });
}

export async function addSizeItem(data) {

    return await instance.post('/menus/add-size-item', data, { headers: headers() });
}

export async function updateMenuSize(data) {
    return await instance.post('/menus/update-item-size', data, { headers: headers() });
}

export async function deleteSizeItem(id) {
    return await instance.post('/menus/delete-item-size', { id }, { headers: headers() });
}










export async function getCities() {

    return await instance.get('/customer/cities', { headers: headers() });
}

export async function getStates() {
    return await instance.get('/customer/states', { headers: headers() });
}
export async function getStreetAddress(zipCode) {
    return await instance.post('/customer/street-address', { zipCode }, { headers: headers() });
}

export async function getZipCodes(cityId) {
    return await instance.post('/customer/zip-code', { cityId }, { headers: headers() });
}
export async function removeCategoryById(id) {
    return await instance.post('/category/remove-categories', { id }, { headers: headers() });
}

export async function updateCategory(data) {
    return await instance.post('/category/update-category', data, { headers: headers() });
}

export async function login({ email, password }) {
    return await instance.post('/auth/login', { email, password });
}

export async function changePassword({ old_password, new_password }) {
    return await instance.post('/auth/change-password', { old_password, new_password }, { headers: headers() });
}


export async function sendForgotEmailLink({ email }) {

    return await instance.post('/auth/forgot-password-email-link', { email }, { headers: headers() });
}


export async function resetPassword({ password, id, token }) {

    return await instance.post('/auth/reset-password', { password, id, token }, { headers: headers() });
}



export async function removeTableById(id) {
    return await instance.post('/table/remove-table', { id }, { headers: headers() });
}

export async function getCustomers() {
    return await instance.get('/customer/all-customers', { headers: headers() });
}
// menu route  start

export async function getMenuSizes() {
    return await instance.get('/menus/get-menu-size', { headers: headers() });
}
export async function getMenuCategories() {
    return await instance.get('/menus/get-menu-categories', { headers: headers() });
}


export async function addMenuItems(size_name) {

    return await instance.post('/menus/add-menu-size', size_name, { headers: headers() });
}

export async function updateMenuItems(data) {
    //  console.log(data);
    return await instance.post('/menus/update/menu_size', data, { headers: headers() });
}

export async function deleteMenuItem(id) {
    // console.log(id)
    return await instance.post('/menus/delete-menu-size', { 'id': id }, { headers: headers() });
}

// ingredients category
export async function updateIngredientsCategory(data) {

    return await instance.post('/menus/update-ingredients-category', data, { headers: headers() });
}

export async function getIngredientsCategory() {
    return await instance.get('/menus/get-ingredients-category', { headers: headers() });
}

export async function getCompanyDetail() {
    return await instance.get('/company/get-company', { headers: headers() });
}

export async function getOrders(data) {
    return await instance.post('/order/get-orders', data, { headers: headers() });
}

export async function addIngredientsCategory(category_name) {

    return await instance.post('/menus/add-ingredients-category', category_name, { headers: headers() });
}
export async function getActivePaymentMethods() {

    return await instance.get('/payment/payment-methods', { headers: headers() });
}
export async function deleteIngredientsCategoryItem(id) {
    // console.log(id)
    return await instance.post('/menus/delete-ingredients-category', { 'id': id }, { headers: headers() });
}
export async function markAsRead(id) {
    return await instance.post('/notifications/mark-as-read', { id }, { headers: headers() });
}
//  ingredients
export async function addIngredients(data) {
    return await instance.post('/menus/add-ingredients', data, { headers: headers() });
}

export async function getNotifications() {
    return await instance.get('/notifications/get-notifications', { headers: headers() });

}

export async function saveInvoiceData(data) {
    return await instance.post('/invoice/save-invoice', data, { headers: headers() });
}

export async function getBarcodeItem(barcode) {
    return await instance.post('/invoice/get-barcode-item', { barcode }, { headers: headers() });
}

export async function getOrderDetail(id) {
    return await instance.post('/order/get-order-detail', { id }, { headers: headers() });
}

export async function getAllSizes(data) {
    console.log(data)
    return await instance.post('/invoice/get-all-sizes', data, { headers: headers() });
}

export async function getIngredients() {
    return await instance.get('/menus/get-ingredients', { headers: headers() });
}

export async function updateIngredients(data) {

    return await instance.post('/menus/update-ingredients', data, { headers: headers() });
}

export async function addRole(data) {
    return await instance.post('/user/add-role', data, { headers: headers() });
}

export async function companyDetail(data) {
    return await instance.post('/company/add-details', data, { headers: headers() });
}
export async function createPaymentMethod(data) {
    return await instance.post('/payment/add-method', data, { headers: headers() });
}
export async function updatePaymentMethod(data) {
    return await instance.post('/payment/update-method', data, { headers: headers() });
}
export async function removePaymentMethod(id) {
    return await instance.post('/payment/remove', { id }, { headers: headers() });
}

export async function deleteIngredients(id) {
    // console.log(id)
    return await instance.post('/menus/delete-ingredients', { 'id': id }, { headers: headers() });
}

export async function searchProduct(data) {
    return await instance.post('/invoice/search-item', data, { headers: headers() });
}

export async function getAllPayments() {
    return await instance.get('/payment/get-all-methods', { headers: headers() });
}
//  menu items
export async function addItem(data) {
    return await instance.post('/menus/add-item', data, { headers: headers() });
}
export async function orderRefund(data) {
    return await instance.post('/order/order-refund', data, { headers: headers() });
}

export async function getMenuSizesItem(id) {

    return await instance.post('/menus/get-edit-size-item', id, { headers: headers() });
}

export async function addDiverseitem(data) {
    return await instance.post('/invoice/add-diverse-item', data, { headers: headers() });
}

export async function orderVat(id) {
    return await instance.post('/order/order-vat', { id }, { headers: headers() });
}
export async function getItems() {
    return await instance.get('/menus/get-item', { headers: headers() });
}

export async function deleteItem(id) {
    // console.log(id)
    return await instance.post('/menus/delete-item', { 'id': id }, { headers: headers() });
}

export async function updateItem(data) {
    return await instance.post('/menus/update-item', data, { headers: headers() });
}

export async function removeUser(id) {
    return await instance.post('/user/remove-user', { id }, { headers: headers() });
}
export async function updateUser(data) {
    return await instance.post('/user/update-user', data, { headers: headers() });
}
export async function getUsers() {
    return await instance.get('/user/all-users', { headers: headers() });
}
export async function changeLang(lng) {
    return await instance.post('/company/change-language', { lng }, { headers: headers() });
}
export async function getCustomerByNumber(number) {
    return await instance.post('/customer/get-customer-by-number', { number }, { headers: headers() });

}
export async function getAllUsers() {
    return await instance.get('/user/get-all-users', { headers: headers() });
}
export async function sync() {
    return await instance.get('/menus/sync', { headers: headers() });
}

export async function getPendingOrders() {
    return await instance.get('/order/pending-orders', { headers: headers() });
}
export async function getCompleteOrders() {
    return await instance.get('/order/complete-orders', { headers: headers() });
}

export async function getPendingOrdersStatus(id) {
    return await instance.post('/order/pending-orders-status', { id }, { headers: headers() });

}

export async function updateTable(data) {
    return await instance.post('/table/update-table', data, { headers: headers() });
}
export async function customers() {
    return await instance.get('/customer/customers', { headers: headers() });
}

export async function updateCategoryOrder(data) {
    return await instance.post('/category/order-update', { tr: data }, { headers: headers() });
}

export async function createUser(data) {
    return await instance.post('/user/create-user', data, { headers: headers() });
}

export async function roles() {
    return await instance.get('/user/roles', { headers: headers() });
}

export async function removeRolePermission(id) {
    return await instance.post('/user/remove-permission', { id }, { headers: headers() });
}
export async function assignNewPermission(id, permissions) {
    return await instance.post('/user/update-permission', { id, permissions }, { headers: headers() });
}

export async function createReservation(data) {
    return await instance.post('/table/create-reservation', data, { headers: headers() })
}


export async function getReservations() {
    return await instance.get('/table/get-reservation', { headers: headers() })
}

export async function removeReservationById(id) {
    return await instance.post('/table/remove-reservation', {id}, { headers: headers() })
}

export async function updateReservation(data) {
    return await instance.post('/table/update-reservation', data, { headers: headers() })
}







export async function updateRole(data) {
    return await instance.post('/user/update-role', data, { headers: headers() })
}
export async function getActiveTable() {
    return await instance.get('/table/active-tables', { headers: headers() });
}

export async function updateCustomer(data) {
    return await instance.post('/customer/update-customer', data, { headers: headers() });
}

export async function createTable(data) {
    return await instance.post('/table/create-table', data, { headers: headers() });
}


export async function getUserRole() {
    return await instance.get('/user/get-roles', { headers: headers() });
}
export async function getTables() {
    return await instance.get('/table/all-tables', { headers: headers() });
}
export async function removeRole(id) {
    return await instance.post('/user/remove-role', { id }, { headers: headers() });
}

export async function getMenuItems() {
    return await instance.get('/menus/get-menus', { headers: headers() });
}

export async function loadSideBar() {
    return await instance.get('/sidebar/get-item', { headers: headers() });
}

export async function removeCustomerById(id) {
    return await instance.post('/customer/remove-customer', { id }, { headers: headers() });
}

export async function createCustomer(data) {
    return await instance.post('/customer/create-customer', data, { headers: headers() });
}



// bonus
export async function addBonus(data) {
    // console.log(data);
    return await instance.post('/bonus/add-bonus', data, { headers: headers() });
}
export async function getBonus() {
    return await instance.get('/bonus/get-bonus', { headers: headers() });
}

export async function removeBonusById(id) {
    return await instance.post('/bonus/remove-bonus', { id }, { headers: headers() });
}

export async function updateBonus(data) {
    // console.log(data)
    return await instance.post('/bonus/update-bonus', data, { headers: headers() });
}


export async function getOrderReport(data) {
    console.log(data, "api")
    return await instance.post('/reports/get-order-report', data, { headers: headers() });
}
export async function getFinancialReport(data) {
    return await instance.post('/reports/get-financial-report', data, { headers: headers() });
}



// Offers Routes

export async function addOffer(data) {

    return await instance.post('/offer/add-offer', data, { headers: headers() });
}

export async function getOffers() {

    return await instance.get('/offer/get-offer', { headers: headers() });
}

export async function updateOffer(data) {

    return await instance.post('/offer/update-offer', data, { headers: headers() });
}

export async function removeOfferById(id) {
    return await instance.post('/offer/remove-offer', { id }, { headers: headers() });
}


export async function getProducts() {

    return await instance.get('/offer/get-active-products', { headers: headers() });
}

export async function getSizeOfProduct(id) {
    console.log(id)
    return await instance.post('/offer/get-size-products',{id}, { headers: headers() });
}

