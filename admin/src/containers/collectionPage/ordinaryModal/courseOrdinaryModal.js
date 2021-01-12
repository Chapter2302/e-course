import React, {useState, useEffect} from 'react'
import {Button, Modal} from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
import * as api from "../../../api"
import {getAllData} from "../../../actionCreator"
import store from "../../../store"
import {getDownloadImageURLs, getInputImages, deleteFirebaseImgs} from "../services"

const CourseModal = (props) => {
    const [data, setdata] = useState({})
    const [imgs, setImgs] = useState([])
    useEffect(() => {
        setdata({...props.item})
        setImgs([])
    }, [props.item])

    const FooterContent = ({type}) =>{
        switch (type) {
            case 'delete': 
                return (<button className = "btn btn-danger" onClick={deleteData}>Confirm</button>)
            case 'update':
                return (<button className="btn btn-primary" form='course-form' onClick={updateData}>Update</button>)
            default:
                return (<></>)
        }
    }
    const updateData = async () => {
        if(imgs.length > 0) {
            const tempPics = await getDownloadImageURLs(imgs, props.item._id, 'course')
            data.pictures[0] = await tempPics[0]
            data.pictures[1] = await tempPics[1]
            data.pictures[2] = await tempPics[2]
        }
        let result = await api.update('course', data)
        await store.dispatch(getAllData('course'))
        alert('Response: ' + await result.json())
    } 
    const deleteData = async () => {
        if(props.item.pictures[0] != "" && props.item.pictures[1] != "" && props.item.pictures[0] != "")
            await deleteFirebaseImgs(props.item._id, 'course')
        let result = await api.remove('course', props.item._id)
        await store.dispatch(getAllData('course'))
        if(result.status == 200)
            alert('Response: Success')
        else
            alert('Response: Fail To Delete')
    }

    const uploadImages = async (e) => {
        setImgs([])
        let inputImgs = []
        inputImgs = await getInputImages(e)
        setImgs([...inputImgs])
    }

    const onCheck = (status) => { return status == 'update' ? true : false }
    
    return (!props.item.pictures && !props.item.schedule) ? (<></>) : (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Course
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form id='course-form' onSubmit={e => e.preventDefault()}>
                <div className = "row">
                    <div className= "col-3">
                        <div id="carouselExampleControls" className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src={props.item.pictures[0]} height={200} alt="First slide"/>
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src={props.item.pictures[1]} height={200} alt="Second slide"/>
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src={props.item.pictures[2]} height={200} alt="Third slide"/>
                                </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                            <input type="file" className="file-upload form-control" multiple
                                   disabled={!onCheck(props.optionType)}
                                   onChange={e => uploadImages(e)}/>
                        <div className="row d-flex justify-content-center" > 
                            <ReactStars
                                edit={onCheck(props.optionType)} 
                                count={5} 
                                value={props.item.rating}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                                size={25}
                                onChange={newRate => data.rating = newRate}
                            />
                        </div>
                    </div>
                    <div className= "col-9">
                            <div className="form-row pb-2">
                                <div className="col">
                                    <b>Name: </b>
                                    <div className="input-group">
                                        <input type="text" className="form-control" 
                                            defaultValue={props.item.name} 
                                            disabled={!onCheck(props.optionType)}
                                            onChange={e => data.name = e.target.value}
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-success" type="button" onClick={() => alert(props.item._id)}>Id</button>
                                        </div>
                                    </div> 
                                </div>
                                <div className="col">
                                    <b>Attendable: </b>  
                                    <select className= "form-control" 
                                        defaultValue = {props.item.isActive} 
                                        disabled={!onCheck(props.optionType)}
                                        onChange={e => data.isActive= e.target.value}
                                    >
                                        <option value="true">
                                            True
                                        </option>
                                        <option value="false">
                                            False
                                        </option>
                                    </select>
                                    {/* <input className= "form-control" defaultValue = {props.item.isActive} disabled={!onCheck(props.optionType)} onChange={e => data.isActive= e.target.value}/> */}
                                </div>
                                <div className="col">
                                    <b>Price: </b>  
                                    <input className= "form-control" defaultValue = {props.item.price} disabled={!onCheck(props.optionType)} onChange={e => data.price= e.target.value}/>
                                </div>
                                <div className="col">
                                <b> Days In Week</b>
                                    <div className="form-row">
                                        <div className="col">
                                            <select className= "form-control" 
                                                defaultValue={props.item.schedule.dayInWeek[0]} 
                                                disabled={!onCheck(props.optionType)} 
                                                onChange={e => data.schedule.dayInWeek[0] = e.target.value}>
                                                <option value="monday">
                                                    Monday
                                                </option>
                                                <option value="tuesday">
                                                    Tuesday
                                                </option>
                                                <option value="wednesday">
                                                    Wednesday
                                                </option>
                                                <option value="thursday">
                                                    Thursday
                                                </option>
                                                <option value="friday">
                                                    Friday
                                                </option>
                                                <option value="saturday">
                                                    Saturday
                                                </option>
                                                <option value="sunday">
                                                    Sunday
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <select className= "form-control" 
                                                defaultValue={props.item.schedule.dayInWeek[1]} 
                                                disabled={!onCheck(props.optionType)} 
                                                onChange={e => data.schedule.dayInWeek[1] = e.target.value}>
                                                <option value="monday">
                                                    Monday
                                                </option>
                                                <option value="tuesday">
                                                    Tuesday
                                                </option>
                                                <option value="wednesday">
                                                    Wednesday
                                                </option>
                                                <option value="thursday">
                                                    Thursday
                                                </option>
                                                <option value="friday">
                                                    Friday
                                                </option>
                                                <option value="saturday">
                                                    Saturday
                                                </option>
                                                <option value="sunday">
                                                    Sunday
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row pb-2">
                                <div className="col-6">
                                <b>Shift: </b>  
                                    <div className="form-row">
                                        <div className="col">
                                            <select className= "form-control" defaultValue={props.item.schedule.shift[0]}
                                                disabled={!onCheck(props.optionType)} 
                                                onChange={e => data.schedule.shift[0] = e.target.value}>
                                                <option value="1">
                                                    8AM - 11AM
                                                </option>
                                                <option value="2">
                                                    14PM - 17PM
                                                </option>
                                                <option value="3">
                                                    14PM - 17PM
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <select className= "form-control" defaultValue={props.item.schedule.shift[1]}
                                                disabled={!onCheck(props.optionType)} 
                                                onChange={e => data.schedule.shift[1] = e.target.value}>
                                                <option value="1">
                                                    8AM - 11AM
                                                </option>
                                                <option value="2">
                                                    14PM - 17PM
                                                </option>
                                                <option value="3">
                                                    14PM - 17PM
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <b>Quantity of Course: </b>
                                    <input type="text" className="form-control" defaultValue={props.item.quantity} disabled={!onCheck(props.optionType)} onChange={e => data.quantity= e.target.value} />
                                </div>
                                <div className="col-3">
                                    <b>Max Student of Course: </b>  
                                    <input className= "form-control" defaultValue = {props.item.maxStudent} disabled={!onCheck(props.optionType)} onChange={e => data.maxStudent= e.target.value}/>
                                </div>
                            </div>
                            <div className="form-row pb-2">
                                <div className="col-6">
                                    <b>Start Date (DD/MM/YYYY): </b>
                                    <div className="form-row">
                                        <div className="col">
                                            <input className="form-control" type="date" 
                                                   defaultValue= {props.item.schedule.startDate}
                                                   disabled={!onCheck(props.optionType)} 
                                                   onChange={e => data.schedule.startDate}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <b>End Date: (DD/MM/YYY)</b> 
                                    <div className="form-row">
                                        <div className="col">
                                            <input className="form-control" type="date"
                                                   defaultValue= {props.item.schedule.endDate}
                                                   disabled={!onCheck(props.optionType)} 
                                                   onChange={e => data.schedule.endDate}/>
                                        </div>
                                    </div>                       
                                </div>
                            </div>
                            <div className = "form-row pb-2">
                                <div className="col-6">
                                    <b>Description: </b>
                                    <textarea className = "form-control" 
                                            defaultValue={props.item.description} 
                                            disabled={!onCheck(props.optionType)} 
                                            onChange={e => data.description = e.target.value}></textarea>
                                </div>  
                                <div className="col-6">
                                    <b>Link Zoom: </b>
                                    <textarea className="form-control" defaultValue={props.item.linkMeet} 
                                              disabled={!onCheck(props.optionType)} 
                                              onChange={e => data.link = e.target.value}>
                                    </textarea>
                                </div>        
                            </div>
                            <div className="form-row pb-2">
                                <span className="col-6">
                                    <span className="row">
                                        <div className="col">
                                            <b>Teacher: </b>
                                            <input type="text" className="form-control" defaultValue={props.item.teacher} disabled={!onCheck(props.optionType)} 
                                            onChange ={e => data.quantity =  e.target.value}/>
                                        </div>
                                        <div className="col">
                                            <b>Category: </b>  
                                            <input className= "form-control" defaultValue = {props.item.category} disabled={!onCheck(props.optionType)} 
                                            onChange={e => data.maxStudent =  e.target.value}/>
                                        </div>
                                    </span>
                                </span>
                            </div>
                    </div>
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <FooterContent type = {props.optionType}/>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CourseModal 