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
        localStorage.removeItem("session")
        Cookies.remove("session")
        const response = await fetch(`http://localhost:4000/auth/is-user-exist`, { 
            headers: {
                'Content-Type': 'application/json'
            },
            method : 'POST',
            body: JSON.stringify({
                full_name: "",
                bio: "",
                role: "student",
                address: "",
                sex: "male",
                birthday: "",
                avatar: "http://localhost:4000/media-resource/default-avatar.png",
                local_email: account.email,
                local_password: account.password,
                google_email : "",
                googel_name: "",
                google_id: "", 
                work_place: "",
                rating: "",
                bank_id: "",
                phone_number: "",
                balance: ""
            })
        })
        console.log(response.status)
        if(response.status == 200) {
            console.log(response)
            router.push("/account/register/validate")
        }
        else {
            const err = await response.json()
            alert(`Error: ${err}`)
        }   
    }

    return(
        <>
        <HeadContent title={'Register'}/>
        <Header/>
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