import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import {localLogin} from "../../../api"
import HeadContent from '../../../component/head'
import Header from "../../../component/header"
import Footer from '../../../component/footer'
const Login = () => {
    const router = useRouter()
    const [account, setAccount] = useState({email: "", password: ""})

    useEffect(() => {
        setAccount({email: "", password: ""})
    }, [])

    const doSubmit = async () => {
        console.log('email: ', account.email, 'pwd: ', account.password)
        let response = await localLogin(account.email, account.password)
        if(response.status == 200) {
            let session = await response.json()
            localStorage.setItem("session", JSON.stringify(session))
            router.push('/home')
        }
    }
    
    return(
        <>
        <HeadContent title={'Login'}/>
        <Header/>
        {/* Start Search Popup */}
        <div className="box-search-content search_active block-bg close__top">
            <form id="search_mini_form" className="minisearch" action="#">
            <div className="field__search">
                <input type="text" placeholder="Search entire store here..." />
                <div className="action">
                <a href="#">
                    <i className="zmdi zmdi-search" />
                </a>
                </div>
            </div>
            </form>
            <div className="close__wrap">
            <span>close</span>
            </div>
        </div>
        {/* End Search Popup */}
        {/* Start Bradcaump area */}
        <div className="ht__bradcaump__area bg-image--6">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="bradcaump__inner text-center">
                    <h2 className="bradcaump-title">My Account</h2>
                    <nav className="bradcaump-content">
                    <a className="breadcrumb_item" href="index.html">
                        Home
                    </a>
                    <span className="brd-separetor">/</span>
                    <span className="breadcrumb_item active">My Account</span>
                    </nav>
                </div>
                </div>
            </div>
            </div>
        </div>
        {/* End Bradcaump area */}
        {/* Start My Account Area */}
        <section className="my_account_area pt--80 pb--55 bg--white">
            <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-12">
                <div className="my__account__wrapper">
                    <a className='btn col-12 mb-2' href="http://localhost:4000/auth/google" style={{backgroundColor:'#DD4B39', color:'white'}}>
                        <i className="fa fa-google mr-1"></i> Sign in with Google
                    </a>
                    <a className='btn col-12' href="http://localhost:4000/auth/facebook" style={{backgroundColor:'#3B5998', color:'white'}}>
                        <i className="fa fa-facebook mr-1"></i> Sign in with Facebook
                    </a>
                    <form action="#" onSubmit={e => e.preventDefault()}>
                        <div className="account__form">
                        <div className="input__box">
                            <label>
                                Username or email address <span>*</span>
                            </label>
                            <input type="text" onBlur={e => setAccount({...account, email: e.target.value})}/>
                        </div>
                        <div className="input__box">
                            <label>
                                Password <span>*</span>
                            </label>
                            <input type="password" onBlur={e => setAccount({...account, password: e.target.value})}/>
                        </div>
                        <div className="form__btn">
                            <button className='col-12' onClick={doSubmit}>Login</button>
                        </div>
                        <a className="forget_pass" href="#">
                        Lost your password?
                        </a>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* End My Account Area */}
        <Footer/>
        </>
    )
}

export default Login