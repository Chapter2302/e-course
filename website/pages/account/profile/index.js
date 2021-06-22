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
        const newUser = {...data}
        if(inputImg) {
            let fileType = "image";
            let formData = new FormData();
            formData.append("files", inputImg);
            formData.append("type", fileType);
            const uploadMediaRes = await api.uploadMedia('media', formData)
            if(uploadMediaRes.status == 200) {
                const uploadMedia = await uploadMediaRes.json()
                newUser.avatar = uploadMedia.url
            } else {
                alert("Cannot Upload Image")
            }
        }

        const updateUserRes = await api.update('user', newUser)
        if(updateUserRes.status == 200) {
            const updateUser = await updateUserRes.json()
            const session = JSON.parse(localStorage.getItem("session"))
            session.photoUser = updateUser.avatar
            session.fullName = updateUser.full_name
            localStorage.setItem("session", JSON.stringify(session))
            setData(updateUser)
            alert("Profile Update Success")
        } else {
            alert("Profile Update Fail")
        }
    }

    return (<>
        <HeadContent title={'Profile'}/>
        <Header/>
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
                <div className="container mt-4">
                    <div className="row flex-lg-nowrap">
                    <div className="col-12 col-lg-auto mb-3" style={{width: 200}}>
                        <div className="card p-3">
                        <div className="e-navlist e-navlist--active-bg">
                            <ul className="">
                                <li><a className="nav-link px-2 active" href="./overview.html"><i className="zmdi zmdi-calendar mr-1" /><span>Transactions</span></a></li>
                                <li><a className="nav-link px-2" href="./users.html"><i className="zmdi zmdi-shopping-cart mr-1" /><span>Cart</span></a></li>
                                <li><a className="nav-link px-2" href="./settings.html"><i className="zmdi zmdi-delete mr-1" /><span>Delete</span></a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                        <div className="col mb-3">
                            <div className="card">
                            <div className="card-body">
                                <div className="e-profile">
                                <div className="row">
                                    <div className="col-12 col-sm-auto mb-3">
                                    <div className="mx-auto" style={{width: 180}}>
                                        <div className="d-flex justify-content-center align-items-center rounded" style={{height: 180, backgroundColor: 'rgb(233, 236, 239)'}}>
                                            <img className="avatar_preview" src={data.avatar ? data.avatar : "http://localhost:4000/media-resource/default-avatar.png"} alt="Avatar"/>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                                    <div className="text-center text-sm-left mb-2 mb-sm-0">
                                        <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{data.full_name != "" ? data.full_name : "No Name" }</h4>
                                        <p className="mb-0">{data.local_email}</p>
                                        <div className="text-muted"><small>Your Account Is Active</small></div>
                                        <div className="mt-2">
                                            <div className="btn btn-outline-danger">
                                                <label className="mb-0" style={{cursor: "pointer"}} htmlFor="file-upload">
                                                    <i className="fa fa-fw fa-camera mr-1" />Upload Photo
                                                </label>
                                                <input 
                                                    multiple={false}
                                                    id="file-upload"
                                                    type="file" style={{display: "none"}}
                                                    accept="image/*"
                                                    onChange = {e => previewInputImage(e)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center text-sm-right">
                                        <span className="badge badge-secondary">student</span>
                                        <div className="text-muted"><small>Joined 09 Dec 2020</small></div>
                                    </div>
                                    </div>
                                </div>
                                <div className="tab-content pt-3">
                                    <div className="tab-pane active">
                                    <form className="form" noValidate>
                                        <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Full Name</label>
                                                        <input 
                                                            className="form-control" type="text" 
                                                            name="name" placeholder="Your Name" 
                                                            defaultValue={data.full_name} onBlur={e => data.full_name = e.target.value}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input 
                                                            className="form-control" type="email" 
                                                            name="email" placeholder="user@example.com" 
                                                            defaultValue={data.local_email} onBlur={e => data.local_email = e.target.value}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Password</label>
                                                        <input 
                                                            className="form-control" type="password" 
                                                            name="password" 
                                                            defaultValue={data.local_password} onBlur={e => data.local_password = e.target.value}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <input 
                                                            className="form-control" type="" 
                                                            name="phone" placeholder="Example: 0987-7654-321" 
                                                            defaultValue={data.phone_number} onBlur={e => data.phone_number = e.target.value}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Gender</label>
                                                        <select 
                                                            className="form-control"
                                                            defaultValue={`${data.sex}$`} onBlur={e => data.sex = e.target.value}
                                                        >
                                                            <option value="male">Male</option>
                                                            <option value="male">Female</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Birthday</label>
                                                        <input 
                                                            className="form-control" 
                                                            type="date"
                                                            defaultValue={data.birthday}
                                                            onChange={e => data.birthday =  e.target.value}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Bank ID</label>
                                                        <input 
                                                            className="form-control" type="number" 
                                                            name="bank-id" placeholder="Example: Vietcombank"
                                                            defaultValue={data.bank_id} onBlur={e => data.bank_id = e.target.value}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Balance</label>
                                                        <input 
                                                            className="form-control" type="text" disabled
                                                            name="balance" placeholder="0$" 
                                                            defaultValue={`${data.balance ? data.balance : 0}$`} onBlur={e => data.bank_id = e.target.value}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Address</label>
                                                        <input 
                                                            className="form-control" type="text"
                                                            placeholder="44 Ngo Tat To St, Binh Thanh Dist, Ho Chi Minh City" 
                                                            defaultValue={data.address} onBlur={e => data.address = e.target.value}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Work Place</label>
                                                        <input 
                                                            className="form-control" type="text"
                                                            placeholder="01 Vo Van Ngan St, Thu Duc City, Ho Chi Minh City" 
                                                            defaultValue={data.work_place} onBlur={e => data.work_place = e.target.value}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <div className="form-group">
                                                        <label>About</label>
                                                        <textarea 
                                                            className="form-control" rows={5} 
                                                            placeholder="My Bio" 
                                                            defaultValue={data.bio} onBlur={e => data.bio = e.target.value}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="row">
                                            <div className="col d-flex justify-content-end">
                                                
                                            </div>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="px-xl-3">   
                                        <button className="btn btn-danger w-100" type="button" onClick={submitForm}>Save Changes</button>
                                    </div>
                                    <div className="px-xl-3 mt-2">
                                        <button className="btn btn-block btn-secondary">
                                            <i className="fa fa-sign-out" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title font-weight-bold">Support</h6>
                                    <p className="card-text">Get fast, free help from our friendly assistants.</p>
                                    <button type="button" className="btn btn-primary mt-2 w-100">Contact Us</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </>
            
            
            
            
            
            
            // <>
            //     {/* Start Checkout Area */}
            //     <section className="wn__checkout__area section-padding--lg bg__white">
            //         <div className="container">
            //             <form id='register-form' onSubmit={(e) => {e.preventDefault()}}>
            //                 <div className="row">
            //                     {/*-------------*/ }
            //                     <div className="col-lg-8 col-md-12 col-sm-12">
            //                         <div className="customer_details">
            //                             <div className="customar__field">
            //                                 <div className="margin_between" style={{margin: '0px -15px'}}>
            //                                     <div>
            //                                         <img 
            //                                             className="avatar_preview" 
            //                                             style={{width: '100%', height: '228px'}} 
            //                                             src={data.avatar} alt="Avatar"
            //                                         />
            //                                         <button 
            //                                             type="file" className="btn w-full mt-2" 
            //                                             onChange = {e => previewInputImage(e)}
            //                                         >Upload Image <i className="fas fa-file-upload" /></button>
            //                                     </div>
            //                                     <div className="input_box space_between">
            //                                         <div className="input_box">
            //                                             <label>
            //                                             Fullname <span>*</span>
            //                                             </label>
            //                                             <input type="text" defaultValue={data.full_name} onBlur={e => data.full_name = e.target.value}/>
            //                                         </div>
            //                                         <div className="margin_between">
            //                                             <div className="input_box space_between">
            //                                                 <label>
            //                                                     Gender <span>*</span>
            //                                                 </label>
            //                                                 <select className="select__option" defaultValue={data.sex} onBlur={e => data.sex = e.target.value}>
            //                                                     <option value="male">Male</option>
            //                                                     <option value="female">Female</option>
            //                                                 </select>
            //                                             </div>
            //                                             <div className="input_box space_between">
            //                                                 <label>
            //                                                     Role <span>*</span>
            //                                                 </label>
            //                                                 <select className="select__option" defaultValue={data.role} onBlur={e => data.role = e.target.value}>
            //                                                     <option value="student">Student</option>
            //                                                     <option value="teacher">Teacher</option>
            //                                                 </select>
            //                                             </div>
            //                                         </div>
            //                                         <div className="margin_between">
            //                                             <div className="input_box space_between">
            //                                                 <label>
            //                                                     Birthday <span>*</span>
            //                                                 </label>
            //                                                 <input 
            //                                                     type="date" 
            //                                                     placeholder="DD-MM-YYYY"
            //                                                     pattern='^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$'
            //                                                     defaultValue= {data.birthday} 
            //                                                     onChange={e => data.birthday =  e.target.value}
            //                                                 />
            //                                             </div>
            //                                             <div className="input_box space_between">
            //                                                 <label>
            //                                                     Balance
            //                                                 </label>
            //                                                 <input defaultValue={data.balance} disabled/>
            //                                             </div>
            //                                         </div>
            //                                     </div>
            //                                 </div>
            //                                 <div className="input_box">
            //                                     <label>
            //                                     Biology <span>*</span>
            //                                     </label>
            //                                     <textarea className="form-control" defaultValue={data.bio} onBlur= {e => data.bio = e.target.value}></textarea>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                     {/*-------------*/ }
            //                     <div className="col-lg-4 col-sm-12">
            //                         <div className="customer_details">
            //                             <div className="customar__field">
            //                                 <div className="margin_between">
            //                                     <div className="input_box space_between">
            //                                     <label>
            //                                         Email <span>*</span>
            //                                     </label>
            //                                     <input type="email" defaultValue={data.local_email} onBlur= {e => data.local_email = e.target.value}/>
            //                                     </div>
            //                                     <div className="input_box space_between">
            //                                     <label>
            //                                         Password <span>*</span>
            //                                     </label>
            //                                     <input type="text" defaultValue={data.local_password} onBlur= {e => data.local_password = e.target.value}/>
            //                                     </div>
            //                                 </div>
            //                                 <div className="margin_between">
            //                                     <div className="input_box space_between">
            //                                         <label>
            //                                             BankID <span>*</span>
            //                                         </label>
            //                                         <input type="text" defaultValue={data.bank_id} onBlur= {e => data.bank_id = e.target.value}/>
            //                                     </div>
            //                                         <div className="input_box space_between">
            //                                         <label>
            //                                             Phone-number <span>*</span>
            //                                         </label>
            //                                         <input type="text" defaultValue={data.phone_number} onBlur= {e => data.phone_number = e.target.value}/>
            //                                     </div>
            //                                 </div>
            //                                 <div className="margin_between">
            //                                     <div className="input_box space_between">
            //                                         <label>
            //                                             Address <span>*</span>
            //                                         </label>
            //                                         <input type="text" defaultValue={data.address} onBlur= {e => data.address = e.target.value}/>
            //                                     </div>
            //                                         <div className="input_box space_between">
            //                                         <label>
            //                                             Work-place <span>*</span>
            //                                         </label>
            //                                         <input type="text" defaultValue={data.work_place} onBlur= {e => data.work_place = e.target.value}/>
            //                                     </div>
            //                                 </div>
            //                                 <div className="input_box">
            //                                     <label><b>Update: </b></label>
            //                                     <button className='btn btn-outline-dark btn-xm btn-block' onClick={submitForm}><b>Submit</b></button>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </form>
            //         </div>
            //     </section>
            //     {/* End Checkout Area */}
            // </>
        }
        <Footer/>
        </>
    )
}

export default Profile