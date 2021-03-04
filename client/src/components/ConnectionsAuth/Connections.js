import React from 'react';
import { useEffect } from 'react';
import { Redirect, Route, useHistory, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../Login/Login';
import Register from '../Login/Register';
import ForgotPassword from '../Login/ForgotPassword';

const Connections = () => {

    return (
    <Switch>
        <Route exact path="/user/login" component={Login}/>
        <Route exact path='/user/register' component={Register}/>
        <Route exact path='/user/forgotPassowrd' component={ForgotPassword}/>
    </Switch>
)
}

export default (Connections)