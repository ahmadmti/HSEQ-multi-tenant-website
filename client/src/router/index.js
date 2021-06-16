import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from '../screens/Auth/Login';
import ProgressBar from './ProgressBar';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';
// Routes Imports
const Main = React.lazy(() => import('../screens/CompanyPanel/Main'));
const Register = React.lazy(() => import('../screens/Auth/Register'));
const ForgotPasword = React.lazy(() => import('../screens/Auth/ForgetPassword'));
const ResetPassword = React.lazy(() => import('../screens/Auth/ResetPassword'));


function router() {
    return (
        <div className="App" >
            <Suspense fallback={<ProgressBar />}>
                <BrowserRouter >
                    <Switch>
                        <AuthRoute exact path="/login" component={Login} />
                        {/* <Route path="/register" component={Register} /> */}
                        <AuthRoute path="/forgot-password" component={ForgotPasword} />
                        <AuthRoute path="/password-reset/:id/:token" component={ResetPassword} />
                        <ProtectedRoute path="/restaurant" component={Main} />
                        <Route render={() => <Redirect to="/login" />} />
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default router;