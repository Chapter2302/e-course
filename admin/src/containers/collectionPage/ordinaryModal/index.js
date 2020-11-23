import React from 'react'
import UserModal from './userOrdinaryModal'
import CourseModal from './courseOrdinaryModal'
import TransModal from './transOrdinaryModal'

const OrdinaryModal = (props) => {
    switch (props.collection) {
        case 'user':
            return(<UserModal {...props}/>)
        case 'course':
            return(<CourseModal {...props}/>)
        case 'trans':
            return(<TransModal {...props}/>)
        default:
            return <></>
    }  
}

export default OrdinaryModal