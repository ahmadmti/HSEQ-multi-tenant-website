import React, { Suspense } from 'react';
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import ProgressBar from './ProgressBar';

const AddMenuItem = React.lazy(() => import('../screens/RestaurantPanel/Menu/AddMenuItem'));
const ViewMenuItem = React.lazy(() => import('../screens/RestaurantPanel/Menu/ViewMenuItem'));

const AddMenuIngredients = React.lazy(() => import('../screens/RestaurantPanel/Menu/AddMenuIngredients'));
const ViewMenuIngredients = React.lazy(() => import('../screens/RestaurantPanel/Menu/ViewMenuIngredients'));
const AddMenuSize = React.lazy(() => import('../screens/RestaurantPanel/Menu/AddMenuSize'));
const ViewMenuSizes = React.lazy(() => import('../screens/RestaurantPanel/Menu/ViewMenuSizes'));
const AddIngredientCategory = React.lazy(() => import('../screens/RestaurantPanel/Menu/AddIngredientCategory'));
const ViewIngredientCategory = React.lazy(() => import('../screens/RestaurantPanel/Menu/ViewIngredientCategory'));
const AddRestaurant = React.lazy(() => import('../screens/RestaurantPanel/General/AddRestaurant'));

const ViewGeneral = React.lazy(() => import('../screens/RestaurantPanel/General/ViewRestaurant'));
const OrderReport = React.lazy(() => import('../screens/RestaurantPanel/Report/OrderReport'));
const SaleReport = React.lazy(() => import('../screens/RestaurantPanel/Report/SaleReport'));
const FinancialReport = React.lazy(() => import('../screens/RestaurantPanel/Report/FinancialReport'));
const AddCustomer = React.lazy(() => import('../screens/RestaurantPanel/Customer/AddCustomer'));
const ViewCustomer = React.lazy(() => import('../screens/RestaurantPanel/Customer/ViewCustomer'));
const AddTable = React.lazy(() => import('../screens/RestaurantPanel/Setting/AddTable'));
const ViewTables = React.lazy(() => import('../screens/RestaurantPanel/Setting/ViewTables'));
const NewTableReservation = React.lazy(() => import('../screens/RestaurantPanel/Setting/NewTableReservation'));
const ViewReservations = React.lazy(() => import('../screens/RestaurantPanel/Setting/ViewReservations'));
const ViewOrders = React.lazy(() => import('../screens/RestaurantPanel/Order/ViewOrders'));
const OrderDetail = React.lazy(() => import('../screens/RestaurantPanel/Order/OrderDetail'));
const CreateInvoice = React.lazy(() => import('../screens/RestaurantPanel/Invoice/CreateInvoice'));
const AddOffer = React.lazy(() => import('../screens/RestaurantPanel/Offer/AddOffer'));
const ViewOffer = React.lazy(() => import('../screens/RestaurantPanel/Offer/ViewOffer'));
const AddBonusPoint = React.lazy(() => import('../screens/RestaurantPanel/Bonus/AddBonusPoint'));
const ViewBonusPoint = React.lazy(() => import('../screens/RestaurantPanel/Bonus/ViewBonusPoint'));
const AddRole = React.lazy(() => import('../screens/RestaurantPanel/UserManagement/AddRole'));
const ViewRole = React.lazy(() => import('../screens/RestaurantPanel/UserManagement/ViewRole'));
const ViewUser = React.lazy(() => import('../screens/RestaurantPanel/UserManagement/ViewUser'));
const AddUser = React.lazy(() => import('../screens/RestaurantPanel/UserManagement/AddUser'));
const RestaurantDashboard = React.lazy(() => import('../screens/RestaurantPanel/Dashboard/dashboard'));
const AddCategory = React.lazy(() => import('../screens/RestaurantPanel/Category/AddCategory'));
const ShowCategory = React.lazy(() => import('../screens/RestaurantPanel/Category/ShowCategory'));
const Setting = React.lazy(() => import('../screens/RestaurantPanel/AppSetting/Setting'));
const Configuration = React.lazy(() => import('../screens/RestaurantPanel/Configuration/Configuration'));
const Profile = React.lazy(() => import('../screens/RestaurantPanel/Profile/Profile'));
const ChangePassword = React.lazy(() => import('../screens/Auth/ChangePassword'));

const PikoPakoOrderDetail = React.lazy(() => import('../screens/RestaurantPanel/PikoPakoOrderDetail/index'));



function RestaurantRoutes() {

    let { path, url } = useRouteMatch();

    return (

        <React.Fragment>
            <Suspense fallback={<ProgressBar />}>
                <Route path={`${path}/profile`} component={Profile} />

                <Route path={`${path}/change-password`} component={ChangePassword} />

                <Route path={`${path}/show-categories`} component={ShowCategory} />
                <Route path={`${path}/create-category`} component={AddCategory} />
                <Route path={`${path}/add-menu-item`} component={AddMenuItem} />
                <Route path={`${path}/view-menu-item`} component={ViewMenuItem} />
                <Route path={`${path}/create-menu-ingredients`} component={AddMenuIngredients} />
                <Route path={`${path}/view-menu-ingredients`} component={ViewMenuIngredients} />
                <Route path={`${path}/create-menu-size`} component={AddMenuSize} />
                <Route path={`${path}/view-menu-sizes`} component={ViewMenuSizes} />
                <Route path={`${path}/create-ingredients-category`} component={AddIngredientCategory} />
                <Route path={`${path}/view-ingredients-category`} component={ViewIngredientCategory} />
                <Route path={`${path}/add-customer`} component={AddCustomer} />
                <Route path={`${path}/view-customers`} component={ViewCustomer} />
                <Route path={`${path}/add-table`} component={AddTable} />
                <Route path={`${path}/view-tables`} component={ViewTables} />
                <Route path={`${path}/new-table-reservation`} component={NewTableReservation} />
                <Route path={`${path}/view-reservations`} component={ViewReservations} />
                <Route path={`${path}/create-restaurant`} component={AddRestaurant} />
                <Route path={`${path}/view-restaurant`} component={ViewGeneral} />
                <Route path={`${path}/order-report`} component={OrderReport} />
                <Route path={`${path}/sales-report`} component={SaleReport} />
                <Route path={`${path}/financial-report`} component={FinancialReport} />
                <Route path={`${path}/view-orders`} component={ViewOrders} />
                <Route path={`${path}/order/:order_id`} component={OrderDetail} />
                <Route path={`${path}/create-invoice`} component={CreateInvoice} />
                <Route path={`${path}/add-offer`} component={AddOffer} />
                <Route path={`${path}/view-offer`} component={ViewOffer} />

                <Route path={`${path}/add-role`} component={AddRole} />
                <Route path={`${path}/view-role`} component={ViewRole} />
                <Route path={`${path}/view-user`} component={ViewUser} />
                <Route path={`${path}/add-user`} component={AddUser} />

                <Route path={`${path}/dashboard`} component={RestaurantDashboard} />

                <Route path={`${path}/piko-pako-order`} component={PikoPakoOrderDetail} />



                <Route path={`${path}/add-bonus-points`} component={AddBonusPoint} />
                <Route path={`${path}/view-bonus`} component={ViewBonusPoint} />
                <Route path={`${path}/settings`} component={Setting} />
                <Route path={`${path}/configuration`} component={Configuration} />
                
                
                {/* <Route render={() => <Redirect to={`${path}/view-restaurant`} />} /> */}
                <Route render={() => <Redirect to={`${path}/profile`} />} />
            </Suspense>
        </React.Fragment>



    );
}


export default RestaurantRoutes;
