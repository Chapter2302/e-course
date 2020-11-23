import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import SideBar from "./components/sidebar"
import TopBar from "./components/topbar"
import Home from "./containers/homePage"
import Auth from "./containers/authPage"
import Collection from "./containers/collectionPage"
import store from "./store"
import {connect} from "react-redux"
import {loadScript} from "./util"

const App = ({authenticated}) => {
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"))
        if(session) {
            store.dispatch({
                type: 'LOGIN',
                session
            })
        }
        //document.onload = loadScript()
    }, [])

    return !authenticated
    ?   (<Auth/>)
    :   (<Router>
            <div id="wrapper">
                <SideBar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopBar />
                        <div className="container-fluid">
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/collection/:collection" component={Collection}/>
                        </div>
                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2020</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
        </Router>
    )
}
const mapStateToProps = state => {
    if(state.auth) return { 
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(App)
