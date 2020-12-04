import {useState, useEffect} from "react"
import {useRouter} from "next/router"
import * as api from "../../../api"
import {storage} from "../../../firebase"
import HeadContent from "../../../component/head"
import Footer from "../../../component/footer"
import Header from "../../../component/header"

const Profile = () => {
    const router = useRouter()
    const [data, setData] = useState(null)
    let inputImg = null

    const getProfile = async () => {
        if(localStorage.getItem("session")) {
            const response = await fetch(`http://localhost:4000/auth/profile`, { 
                headers: {
                    Authorization: 'bearer ' + JSON.parse(localStorage.getItem("session")).token
                }, 
                method : 'GET' 
            })
            if(response.status == 200) {
                const profile = await response.json()
                setData(profile)
            }
            else {
                router.push('/account/login')
            }
        }
        else {
            router.push('/account/login')
        }
    }
    
    useEffect(() => {
        getProfile()
        inputImg = null
    }, [])

    const previewInputImage = async (e) => {
        let reader = new FileReader()
        reader.onload = () => {
            document.getElementsByClassName("avatar_preview")[0].src = reader.result
        }
        reader.readAsDataURL(e.target.files[0])
        inputImg = e.target.files[0]
    }

    const getUploadImagesURL = async (id) => {
        const image = inputImg
        const storageRef = storage.ref(`/user/${id}_0`)
        const uploadTask = storageRef.put(image)
        const url = await new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
            snapShot => {
                console.log(snapShot)
            }, 
            error => reject(error),
            async () => {
                const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
                resolve(downloadUrl)
            })
        })
        return url
    }

    const submitForm = async () => {
        if(inputImg) {
            const tempPics = await getUploadImagesURL(data._id)
            data.photoUser = await tempPics
        }
        const response = await api.update('user', data)
        const result = await response.json()
        const session = JSON.parse(localStorage.getItem("session"))
        const newSession = {...session, 
            fullName: data.fullName,
            role: data.role,
            photoUser: data.photoUser
        }
        localStorage.setItem("session", JSON.stringify(newSession))
        if(response.status == 200)
            alert('Response: Success To Update')
        else 
            alert('Response: Fail To Update')
    }

    return (<>
        <HeadContent title={'Profile'}/>
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
        <div className="ht__bradcaump__area bg-image--4">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="bradcaump__inner text-center">
                    <h2 className="bradcaump-title">Checkout</h2>
                    <nav className="bradcaump-content">
                    <a className="breadcrumb_item" href="index.html">
                        Home
                    </a>
                    <span className="brd-separetor">/</span>
                    <span className="breadcrumb_item active">Checkout</span>
                    </nav>
                </div>
                </div>
            </div>
            </div>
        </div>
        {/* End Bradcaump area */}
        {
            !data ? <></> 
            : <>
                {/* Start Checkout Area */}
                <section className="wn__checkout__area section-padding--lg bg__white">
                    <div className="container">
                        <form id='register-form' onSubmit={(e) => {e.preventDefault()}}>
                            <div className="row">
                                {/*-------------*/ }
                                <div className="col-lg-6 col-sm-12">
                                    <div className="customer_details">
                                        <div className="customar__field">
                                            <div className="margin_between" style={{margin: '0px -15px'}}>
                                                <div className="input_box space_between">
                                                    <img className="avatar_preview" style={{width: '100%', height: '228px'}} 
                                                        src={data.photoUser ? data.photoUser : "https://www.edmundsgovtech.com/wp-content/uploads/2020/01/default-picture_0_0.png"} alt="Avatar"/>
                                                    <input type="file" className="file-upload form-control" onChange = {e => previewInputImage(e)}/>
                                                </div>
                                                <div className="input_box space_between">
                                                    <div className="input_box">
                                                        <label>
                                                        Fullname <span>*</span>
                                                        </label>
                                                        <input type="text" defaultValue={data.fullName} onBlur={e => data.fullName = e.target.value}/>
                                                    </div>
                                                    <div className="margin_between">
                                                        <div className="input_box space_between">
                                                            <label>
                                                                Gender <span>*</span>
                                                            </label>
                                                            <select className="select__option" defaultValue={data.sex} onBlur={e => data.sex = e.target.value}>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                        <div className="input_box space_between">
                                                            <label>
                                                                Role <span>*</span>
                                                            </label>
                                                            <select className="select__option" defaultValue={data.role} onBlur={e => data.role = e.target.value}>
                                                                <option value="student">Student</option>
                                                                <option value="teacher">Teacher</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="margin_between">
                                                        <div className="input_box space_between">
                                                            <label>
                                                                Birthday <span>*</span>
                                                            </label>
                                                            <input 
                                                                type="date" 
                                                                placeholder="DD-MM-YYYY"
                                                                pattern='^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$'
                                                                defaultValue= {data.birthday} 
                                                                onChange={e => data.birthday =  e.target.value}
                                                            />
                                                        </div>
                                                        <div className="input_box space_between">
                                                            <label>
                                                                Balance
                                                            </label>
                                                            <input defaultValue={data.balance} disabled/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input_box">
                                                <label>
                                                Biology <span>*</span>
                                                </label>
                                                <textarea className="form-control" defaultValue={data.bio} onBlur= {e => data.bio = e.target.value}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*-------------*/ }
                                <div className="col-lg-6 col-sm-12">
                                    <div className="customer_details">
                                        <div className="customar__field">
                                            <div className="margin_between">
                                                <div className="input_box space_between">
                                                <label>
                                                    Email <span>*</span>
                                                </label>
                                                <input type="email" defaultValue={data.authenticateMethod.local.email} onBlur= {e => data.authenticateMethod.local.email = e.target.value}/>
                                                </div>
                                                <div className="input_box space_between">
                                                <label>
                                                    Password <span>*</span>
                                                </label>
                                                <input type="text" defaultValue={data.authenticateMethod.local.password} onBlur= {e => data.authenticateMethod.local.password = e.target.value}/>
                                                </div>
                                            </div>
                                            <div className="margin_between">
                                                <div className="input_box space_between">
                                                    <label>
                                                        BankID <span>*</span>
                                                    </label>
                                                    <input type="text" defaultValue={data.bankId} onBlur= {e => data.bankId = e.target.value}/>
                                                </div>
                                                    <div className="input_box space_between">
                                                    <label>
                                                        Phone-number <span>*</span>
                                                    </label>
                                                    <input type="text" defaultValue={data.phoneNumber} onBlur= {e => data.phoneNumber = e.target.value}/>
                                                </div>
                                            </div>
                                            <div className="margin_between">
                                                <div className="input_box space_between">
                                                    <label>
                                                        Address <span>*</span>
                                                    </label>
                                                    <input type="text" defaultValue={data.address} onBlur= {e => data.address = e.target.value}/>
                                                </div>
                                                    <div className="input_box space_between">
                                                    <label>
                                                        Work-place <span>*</span>
                                                    </label>
                                                    <input type="text" defaultValue={data.workPlace} onBlur= {e => data.workPlace = e.target.value}/>
                                                </div>
                                            </div>
                                            <div className="input_box">
                                                <label><b>Update: </b></label>
                                                <button className='btn btn-outline-dark btn-xm btn-block' onClick={submitForm}><b>Submit</b></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                {/* End Checkout Area */}
            </>
        }
        <Footer/>
        </>
    )
}

export default Profile