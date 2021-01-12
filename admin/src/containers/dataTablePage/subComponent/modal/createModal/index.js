import React from 'react'
import {Modal} from 'react-bootstrap'
import UserModal from './userCreateModal'
import CourseModal from './courseCreateModal'
import TransModal from './transCreateModal'

const CreateModal = (props) => {
    switch (props.collection) {
        case 'user':
            return(<UserModal {...props}/>)
        case 'course':
            return(<CourseModal {...props}/>)
        case 'trans':
            return(<TransModal {...props}/>)
        default:
            return(
                <Modal {...props}  size="xl" aria-labelledby="contained-modal-title-vcenter" centered >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            NULL
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                    <Modal.Footer>
                        {/* <button form='user-form' className="btn btn-info" onClick={createData}>Create</button> */}
                        {/* <button className="btn btn-primary" onClick={props.onHide}>Close</button> */}
                    </Modal.Footer>
                </Modal> 
            )
    }
}

export default CreateModal