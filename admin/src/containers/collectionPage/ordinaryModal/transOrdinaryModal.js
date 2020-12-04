import React, {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
import * as api from "../../../api"
import {getAllData} from "../../../actionCreator"
import store from "../../../store"

const TransModal = (props) => {
    const [data, setData] = useState({})

    useEffect(() => {
        setData({...props.item})
    }, [props.item])

    const FooterContent = () => {
        switch (props.optionType) {
            case 'delete': 
                return (<button className = "btn btn-danger" onClick={deleteData}>Confirm</button>)
            case 'update':
                return (<button className="btn btn-primary" form='user-form' onClick={updateData}>Update</button>)
            default:
                return (<></>)
        }
    }

    const updateData = async () => {
        let result = await api.update('trans', data)
        await store.dispatch(getAllData('trans'))
        await alert('Response: ' + await result.json())
    } 

    const deleteData = async () => {
        let result = await api.remove('trans', props.item._id)
        await store.dispatch(getAllData('trans'))
        if(result.status == 200)
            alert('Response: Success')
        else
            alert('Response: Fail To Delete')
    }

    const onCheck = (status) => {
        switch (status){
            case 'update':
                return true
            default: 
                return false
        }
    }

    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Transaction
                </Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <div className="form-row pb-2">
                    <div className="col">
                        <b>User: </b>
                        <div className="input-group">
                            <input  type="text" className="form-control" disabled={!onCheck(props.optionType)} 
                                    defaultValue={props.item.user}
                                    onChange={e => data.user = e.target.value}/>
                        </div>  
                    </div>
                    <div className="col">
                        <b>Course: </b>
                        <div className="input-group">
                            <input  type="text" className="form-control" 
                                    defaultValue={props.item.course} disabled={!onCheck(props.optionType)}
                                    onChange={e => data.course = e.target.value}/>
                        </div>   
                    </div>
                </div>
                <div className="form-row pb-2">
                    <div className="col-3">
                        <b>Rating: </b>
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
                    <div className="col-3">
                        <b>Status: </b>
                        <select className= "form-control" id = "chuongcho2" name="role" defaultValue={props.item.status} 
                                disabled={!onCheck(props.optionType)} 
                                onChange={e => data.status = e.target.value}>
                            <option value="SUCCESS">Success</option>
                            <option value="PENDING">Pending</option>
                            <option value="FAIL">Fail</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <b>Date: </b>
                        <input type="date" className="form-control" placeholder="DD-MM-YYYY"
                            pattern='^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$'
                            defaultValue= {props.item.date} 
                            disabled={!onCheck(props.optionType)} 
                            onChange={e => data.date =  e.target.value}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <b>Review: </b>
                        <textarea   className="form-control"
                                    disabled={!onCheck(props.optionType)} 
                                    onChange={(e) => data.review = e.target.value}>
                            {props.item.review}
                        </textarea>
                    </div>
                </div> 
            </Modal.Body>
            <Modal.Footer>
                <FooterContent/>
                <button className='btn btn-primary' onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default TransModal