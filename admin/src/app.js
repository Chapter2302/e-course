import React, { useEffect } from "react"
import { Route, Redirect, Switch } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const App = () => {
    const session  = JSON.parse(localStorage.getItem("session"));

    return( 
        <Switch>
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

export default App;