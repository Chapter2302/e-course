import React, { useEffect } from "react"
import { Route, Redirect, Switch } from "react-router-dom";
import {connect} from "react-redux"

import store from "./store"
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const App = ({isAuth}) => {
    const session  = JSON.parse(localStorage.getItem("session"));

    useEffect(() => {

    }, [isAuth])

    return( 
        <Switch>
            {console.log(session)}
            <Route path="/admin" render={
                (props) => { 
                    return localStorage.getItem("session")
                    ? <AdminLayout {...props} />
                    : <Redirect from="/" to="/auth/login" />
                }
            }/>
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/" to="/admin/index" />
        </Switch>
      )
}

const mapStateToProps = state => {
    return state.auth ? { isAuth: state.auth.isAuth } : { isAuth: false }
}

export default connect(mapStateToProps)(App)