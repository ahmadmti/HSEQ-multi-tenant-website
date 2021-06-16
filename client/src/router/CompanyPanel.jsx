import React, { Suspense } from 'react';
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import ProgressBar from './ProgressBar';

const AddRole = React.lazy(() => import('../screens/CompanyPanel/UserManagement/AddRole'));
const ViewRole = React.lazy(() => import('../screens/CompanyPanel/UserManagement/ViewRole'));
const ViewUser = React.lazy(() => import('../screens/CompanyPanel/UserManagement/ViewUser'));
const AddUser = React.lazy(() => import('../screens/CompanyPanel/UserManagement/AddUser'));
const Configuration = React.lazy(() => import('../screens/CompanyPanel/Configuration/Configuration'));
const Profile = React.lazy(() => import('../screens/CompanyPanel/Profile/Profile'));
const ChangePassword = React.lazy(() => import('../screens/Auth/ChangePassword'));



function RestaurantRoutes() {

    let { path, url } = useRouteMatch();

    return (

        <React.Fragment>
            <Suspense fallback={<ProgressBar />}>
                <Route path={`${path}/profile`} component={Profile} />

                <Route path={`${path}/change-password`} component={ChangePassword} />


                <Route path={`${path}/add-role`} component={AddRole} />
                <Route path={`${path}/view-role`} component={ViewRole} />
                <Route path={`${path}/view-user`} component={ViewUser} />
                <Route path={`${path}/add-user`} component={AddUser} />


                <Route path={`${path}/configuration`} component={Configuration} />


                {/* <Route render={() => <Redirect to={`${path}/view-restaurant`} />} /> */}
                <Route render={() => <Redirect to={`${path}/profile`} />} />
            </Suspense>
        </React.Fragment>



    );
}


export default RestaurantRoutes;
