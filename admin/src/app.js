import React, { useEffect } from "react"
import { Route, Redirect, Switch } from "react-router-dom";
import {connect} from "react-redux"

import store from "./store"
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const App = ({isAuth}) => {
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"))
        if(session) {
            store.dispatch({
                type: 'LOGIN',
                session
            })
        }
    }, [])

    return( 
        <Switch>
            {console.log(isAuth)}
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/" to="/admin/index" />
        </Switch>
      )
}

const mapStateToProps = state => {
    return state.auth ? { isAuth: state.auth.isAuth } : { isAuth: false }
}

export default connect(mapStateToProps)(App)