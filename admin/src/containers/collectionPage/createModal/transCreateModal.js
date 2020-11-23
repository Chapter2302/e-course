import React, {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import * as api from "../../../api"
import {getAllData} from "../../../actionCreator"
import store from "../../../store"

const TransModal = (props) => {
    const [data, setData] = useState({})

    useEffect(() => {
        setData({
            user: "",
            cids: [],
            date: ""
        })
    }, [props])

    const createData = async () => {
        let createResponse = await api.create(props.collection, data)
        let trans = await createResponse.json()
        console.log('respone: ', trans)
        if(createResponse.status === 200) alert("Message: " + trans[0].message)
        await store.dispatch(getAllData(props.collection))
    }
    return(
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Transaction
                </Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <form id="trans-form" onSubmit={(e) => {e.preventDefault()}}>
                <div className="form-row pb-2">
                    <div className="col">
                        <b>User: </b>
                        <div className="input-group">
                            <input  type="text" className="form-control" 
                                    onChange={e => setData({...data, user: e.target.value})}/>
                        </div>  
                    </div>
                    <div className="col">
                        <b>Course: </b>
                        <div className="input-group">
                            <input  type="text" className="form-control" 
                                    onChange={e => setData({...data, cids: [...data.cids, e.target.value]})}/>
                        </div>   
                    </div>
                    <div className="col">
                        <b>Date: </b>
                        <input type="date" className="form-control" placeholder="DD-MM-YYYY"
                            pattern='^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$' 
                            onChange={e => setData({...data, date: e.target.value})}/>
                    </div>
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button form='trans-form' className="btn btn-info" onClick={createData}>Create</button>
                <button className="btn btn-primary" onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default TransModal