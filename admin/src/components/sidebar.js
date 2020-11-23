import React, {useState} from "react"
import { Link } from "react-router-dom"
import {connect} from "react-redux"

const SideBar = () => {
    const user = JSON.parse(localStorage.getItem("session"))
    const [toggle, setToggle] = useState(false)

    return (
        <ul className={toggle ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"} id="accordionSidebar">
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </Link>

        <hr className="sidebar-divider my-0"/>
        <li className="nav-item active">
            <a className="nav-link" href="index.html">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
        </li>
        <hr className="sidebar-divider"/>
          <div className="sidebar-heading">
              Addons
          </div>
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                  <i className="fas fa-fw fa-folder"></i>
                  <span>Profile</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Methods:</h6>
                    <Link className="collapse-item" to="/profile/detail">Detail</Link>
                    <Link className="collapse-item" to="/profile/update">Update</Link>
                    <Link className="collapse-item" to="/profile/remove">Remove</Link>
                  </div>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                  <i className="fas fa-fw fa-table"></i>
                  <span>Collections</span>
                </a>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Options:</h6>

                    { user.role == "admin" ? <Link className="collapse-item" to="/collection/user">User</Link> : <></> }
                    <Link className="collapse-item" to="/collection/course">Course</Link>
                    <Link className="collapse-item" to="/collection/trans">Transaction</Link>
                  </div>
                </div> 
            </li>
          <hr className="sidebar-divider d-none d-md-block"/>
          <div className="text-center d-none d-md-inline">
              <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => setToggle(!toggle)}></button>
          </div>
      </ul>
    )
}

const mapStateToProps = state => {
  if(state.auth) 
    return { 
      session: state.auth.session
    }
}

export default connect(mapStateToProps)(SideBar)