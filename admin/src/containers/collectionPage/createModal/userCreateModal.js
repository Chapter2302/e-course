import React, {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
import * as api from "../../../api"
import {getAllData} from "../../../actionCreator"
import store from "../../../store"
import {getInputImages, getDownloadImageURLs} from "../services"

const UserModal = (props) => {
    const [data, setData] = useState({})
    const [imgs, setImgs] = useState([])

    useEffect(() => {
        setData({
            authenticateMethod: {
                local: {
                    email: '',
                    password: '',
                },
                facebook: {
                    name: '',
                    id: ''
                },
                google: {
                    email : '',
                    name: '',
                    id: ''
                }    
            }
        })
        setImgs([])
    }, [props])

    const uploadImages = async e => {
        setImgs([])
        let inputImgs = []
        inputImgs = await getInputImages(e)
        setImgs([...inputImgs])
    }
    
    const createData = async () => {
        let createResponse = await api.create(props.collection, data)
        if(createResponse.json()._id) {
            if(imgs.length > 0) {
                let result = await createResponse.json()
                const tempPics = await getDownloadImageURLs(imgs, result[0]._id, 'user')
                data.pictures[0] = await tempPics[0]
                data.pictures[1] = await tempPics[1]
                data.pictures[2] = await tempPics[2]
                data._id = result[0]._id
                let updateResult = await api.update('user', data)
                if(updateResult.status === 200) alert('Response: Success')
                else alert('Response: Fail To Save Images')
            }
        }
        else alert('Response: Fail To Create')
        await store.dispatch(getAllData(props.collection))
    }

    return(
        <Modal {...props}  size="xl" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    CREATE USER
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id='user-form' onSubmit={(e) => {e.preventDefault()}}>
                    <div className = "row">
                        <div className= "col-3">
                            <div id="carouselExampleControls" className="carousel slide pb-3" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img className="d-block w-100" src={"https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"} 
                                                                    height={200} alt="First slide"/>
                                    </div>
                                </div>
                            </div>
                            <input type="file" className="file-upload form-control" onChange={e => uploadImages(e)}/>
                        </div>
                        <div className= "col-9">
                            <div className = "form-row pb-2">
                                <div className="col-12">
                                    <b>Bio: </b>
                                    <textarea className = "form-control" onChange= {e => data.bio = e.target.value}></textarea>   
                                </div>         
                            </div>
                            <div className="form-row pb-2">
                                <div className="col">
                                    <b>Full Name: </b>
                                    <input type="text" required className="form-control" onChange= {e => data.fullName = e.target.value}/>
                                </div>
                                <div className="col">
                                    <b>Email: </b>  
                                    <input 
                                        type="email" className= "form-control" 
                                        pattern='^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$'
                                        onChange={e => {
                                            data.authenticateMethod.local.email = e.target.value
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-row pb-2">                          
                                <div className="col">
                                    <b>Sex: </b>
                                    <select className= "form-control" defaultValue="Male" onChange={e => setData({...data, sex: e.target.value})}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <b>Birthday: </b>
                                    <input 
                                        type="date" className="form-control" 
                                        pattern='^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$'
                                        onChange={e => {
                                            data.birthday = e.target.value
                                            }}/>
                                </div>
                                <div className="col">
                                    <b>Rating: </b>
                                    <ReactStars
                                        edit={true}
                                        count={5} 
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                        size={25}
                                        onChange={newRate => data.rating = newRate}
                                    />
                                </div>
                            </div>
                            <div className="form-row pb-2">
                                <div className="col">
                                    <b>Workplace: </b>
                                    <input className="form-control" onChange={e => data.workPlace = e.target.value}/>
                                </div>
                                <div className="col">
                                    <b>Contact: </b>
                                    <input className="form-control" onChange={e => data.phoneNumber =  e.target.value}/>
                                </div>
                            </div>
                            <div className="form-row pb-2">
                                <div className="col">
                                    <b>Balance: </b>
                                    <input type="number" className="form-control" onChange={e => data.balance = e.target.value}/>
                                </div>
                                <div className="col">
                                    <b>BankId: </b>
                                    <input className="form-control" onChange={e => data.bankId = e.target.value}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button form='user-form' className="btn btn-info" onClick={createData}>Create</button>
                <button className="btn btn-primary" onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </Modal>  
    )
}

export default UserModal