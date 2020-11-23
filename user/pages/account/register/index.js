import {useState, useEffect} from "react"
import {useRouter} from "next/router"
import HeadContent from '../../../component/head'
import Header from '../../../component/header'
import Footer from '../../../component/footer'
import Cookies from "js-cookie"

const Register = () => {
    const router = useRouter()
    const [account, setAccount] = useState({email: "", password: ""})
    
    useEffect(() => {
        setAccount({email: "", password: ""})
    }, [])

    const doSubmit = async () => {
        await localStorage.removeItem("session")
        await Cookies.remove("session")
        const response = await fetch(`http://localhost:4000/auth/is-user-exist`, { 
            headers: {
                'Content-Type': 'application/json'
            },
            method : 'POST',
            body: JSON.stringify({
                fullName: "",
                bio: "",
                role: "student",
                address: "",
                sex: "Male",
                birthday: "",
                photoUser: "",
                authenticateMethod: {
                  local: {
                      email: account.email,
                      password: account.password,
                  },
                  facebook: {
                    name: "",
                    id: ""
                  },
                  google: {
                      email : "",
                      name: "",
                      id: ""
                  }  
                },
                workPlace: "",
                rating: "",
                bankId: "",
                phoneNumber: "",
                balance: ""
            })
        })
        if(response.status == 200) 
            router.push("/account/register/validate")
        else 
            alert("Your Email Is Existing!")
    }

    return(
        <>
        <HeadContent title={'Register'}/>
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
                    <form onSubmit={e => {e.preventDefault(); doSubmit()}}>
                        <div className="account__form">
                        <div className="input__box">
                            <label>
                                Email address <span>*</span>
                            </label>
                            <input required type="email" onBlur={e => setAccount({...account, email: e.target.value})}/>
                        </div>
                        <div className="input__box">
                            <label>
                                Password <span>*</span>
                            </label>
                            <input required type="password" onBlur={e => setAccount({...account, password: e.target.value})}/>
                        </div>
                        <div className="form__btn">
                            <button className='col-12'>REGISTER</button>
                        </div>
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

export default Register