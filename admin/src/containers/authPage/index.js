import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { login } from "../../actionCreator"
 
const Auth = ({login}) => {
    const [account, setAccount] = useState({email: '', password: ''})

    return(
        <div className="container">
            <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                        <div className="p-5">
                        <div className="text-center">
                            <div className="h5 text-gray-900 mb-4">dchuong@ute.edu.vn - abc123</div>
                            <div className="h5 text-gray-900 mb-4">tcaselli0@ycombinator.com - abc123</div>
                        </div>
                        <form id='user-form' className="user" onSubmit={e=>e.preventDefault()}>
                                <div className="form-group">
                                    <input  type="email" className="form-control form-control-user" name='email'
                                            id="exampleInputEmail" aria-describedby="emailHelp" 
                                            placeholder="Enter Email Address..."
                                            onBlur={e => setAccount({...account, email: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <input  type="password" className="form-control form-control-user" name='password'
                                            id="exampleInputPassword" placeholder="Password"
                                            onBlur={e => setAccount({...account, password: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox small">
                                        <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                    </div>
                                </div>
                                <button form='user-form' className="btn btn-primary btn-user btn-block" 
                                        onClick={async () => {
                                            await login(account.email, account.password)
                                            window.location.reload()
                                        }}>
                                        Login
                                </button>
                        </form>
                        <hr/>
                        <div className="text-center">
                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                        <div className="text-center">
                            <a className="small" href="register.html">Create an Account!</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth)