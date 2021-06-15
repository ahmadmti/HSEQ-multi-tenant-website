
import React from 'react';
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        !localStorage.getItem('auth_user')
            ? <Component {...props} />
            : <Redirect to='/restaurant' />
    )} />
)

export default AuthRoute;