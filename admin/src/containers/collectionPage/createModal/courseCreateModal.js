import React, {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
import * as api from "../../../api"
import {getAllData} from "../../../actionCreator"
import store from "../../../store"
import {getInputImages, getDownloadImageURLs} from "../services"

const CourseModal = (props) => {
    const [data, setData] = useState({})
    const [imgs, setImgs] = useState([])

    useEffect(() => {
        setData({
            schedule: {
                dayInWeek : []
            },
            pictures: ['', '', ''],
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
        if(createResponse.status == 200) {
            if(imgs.length > 0) {
                let result = await createResponse.json()
                const tempPics = await getDownloadImageURLs(imgs, result[0]._id, 'course')
                data.pictures[0] = await tempPics[0]
                data.pictures[1] = await tempPics[1]
                data.pictures[2] = await tempPics[2]
                data._id = result[0]._id
                let updateResult = await api.update('course', data)
                if(updateResult.status === 200) alert('Response: Success')
                else alert('Response: Fail To Save Images')
            }
            else 
                alert('Response: Success')
        }
        else alert('Response: Fail To Create')
        await store.dispatch(getAllData(props.collection))
    }

    return (
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
                                    <img className="d-block w-100" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKFSgdhQvBlZO6I8s-jtKIYOED1NqEs4xEjA&usqp=CAU"} height={200} alt="First slide"/>
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKFSgdhQvBlZO6I8s-jtKIYOED1NqEs4xEjA&usqp=CAU"} height={200} alt="Second slide"/>
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKFSgdhQvBlZO6I8s-jtKIYOED1NqEs4xEjA&usqp=CAU"} height={200} alt="Third slide"/>
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
                                   onChange={e => uploadImages(e)}/>
                        <div className="row d-flex justify-content-center" > 
                            <ReactStars 
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
                    <div className= "col-9">
                            <div className="form-row pb-2">
                                <div className="col">
                                    <b>Name: </b>
                                    <div className="input-group">
                                        <input type="text" className="form-control" 
                                            onChange={e => data.name = e.target.value}
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-success" type="button" onClick={() => alert(props.item._id)}>Id</button>
                                        </div>
                                    </div> 
                                </div>
                                <div className="col">
                                    <b>Attendable: </b>  
                                    <input className= "form-control" onChange={e => data.isActive = e.target.value}/>
                                </div>
                                <div className="col">
                                    <b>Price: </b>  
                                    <input className= "form-control" onChange={e => data.price = e.target.value}/>
                                </div>
                                <div className="col">
                                    <b>Shift: </b>  
                                    <input className= "form-control" onChange={e => data.schedule.shift = e.target.value}/>
                                </div>
                            </div>
                            <div className="form-row pb-2">
                                <div className="col-6">
                                    <b> Days In Week</b>
                                    <div className="form-row">
                                        <div className="col">
                                            <select className= "form-control" 
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
                                <div className="col-3">
                                    <b>Quantity of Course: </b>
                                    <input type="text" className="form-control" disabled={true} onChange={e => data.quantity = e.target.value} />
                                </div>
                                <div className="col-3">
                                    <b>Max Student of Course: </b>  
                                    <input className= "form-control" onChange={e => data.maxStudent = e.target.value}/>
                                </div>
                            </div>
                            <div className="form-row pb-2">
                                <div className="col-6">
                                    <b>Start Date (DD/MM/YYYY): </b>
                                    <div className="form-row">
                                        <div className="col">
                                            <input className="form-control" type="date" 
                                                   onChange={e => data.schedule.startDate = e.target.value}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <b>End Date: (DD/MM/YYY)</b> 
                                    <div className="form-row">
                                        <div className="col">
                                            <input className="form-control" type="date" 
                                                   onChange={e => data.schedule.endDate = e.target.value}/>
                                        </div>
                                    </div>                       
                                </div>
                            </div>
                            <div className = "form-row pb-2">
                                <div className="col-6">
                                    <b>Description: </b>
                                    <textarea className = "form-control" 
                                            onChange={e => data.description = e.target.value}></textarea>
                                </div>  
                                <div className="col-6">
                                    <b>Link Zoom: </b>
                                    <textarea className="form-control" 
                                              onChange={e => data.link = e.target.value}>
                                    </textarea>
                                </div>        
                            </div>
                            <div className="form-row pb-2">
                                <span className="col-6">
                                    <span className="row">
                                        <div className="col">
                                            <b>Teacher: </b>
                                            <input type="text" className="form-control"
                                            onChange={e => data.teacher =  e.target.value}/>
                                        </div>
                                        <div className="col">
                                            <b>Category: </b>  
                                            <input className= "form-control" 
                                            onChange={e => data.category =  e.target.value}/>
                                        </div>
                                    </span>
                                </span>
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

export default CourseModal