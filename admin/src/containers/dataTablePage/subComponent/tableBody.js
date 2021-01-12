import React, {useState, useEffect} from 'react'
import ReactStars from 'react-rating-stars-component'
import OrdinaryModal from './modal/ordinaryModal'
const UserBody = ({listItems}) => {
    const [optionType, setOptionType] = useState('detail')
    const [currentItem,setCurrentItem] = useState({
        _id: '',
        authenticateMethod: {
            local: {
                email: ''
            }
        }
    })
    const [modalShow, setModalShow] = useState(false)
    return (
        <>
        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info" style={{width: '100%'}}>
            <thead>
                <tr role="row">
                    <th className="sorting_asc" tabIndex="0" aria-controls="dataTable"  aria-sort="ascending" aria-label="Name: activate to sort column descending">Photo</th>
                    <th className="sorting" tabIndex="0" aria-controls="dataTable" aria-label="Position: activate to sort column ascending">Fullname</th>
                    <th className="sorting" tabIndex="0" aria-controls="dataTable" aria-label="Office: activate to sort column ascending">Role</th>
                    <th className="sorting" tabIndex="0" aria-controls="dataTable" aria-label="Age: activate to sort column ascending">Email</th>
                    <th aria-controls="dataTable"></th>
                </tr>
            </thead>
            <tbody>
            {  
                listItems.map(value => {
                    return (
                        <tr role= "row">
                            <td>
                                <img src={value.photoUser} alt='Nam Kiki' width='80' height='80'></img>
                            </td>
                            <td>{value.fullName}</td>
                            <td>{value.role}</td>
                            <td>{value.authenticateMethod.local.email}</td> 
                            <td style={{textAlign:'center'}}>
                                <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('detail') }} className="btn btn-info col-md-3"> 
                                    <span className="icon text-center">
                                        <i className="fas fa-info"></i>
                                    </span>
                                </button>
                                <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('update')}} className="btn btn-primary col-md-3 ml-1 mr-1">
                                    <span className="icon text-center">
                                        <i className="fas fa-edit"></i>
                                    </span>
                                </button>
                                <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('delete')}} className="btn btn-danger col-md-3"> 
                                    <span className="icon">
                                        <i className="fas fa-trash"></i>
                                    </span>
                                </button>
                            </td>
                        </tr>                      
                    )
                })
            }
            </tbody>
        </table>
        <OrdinaryModal collection='user' optionType={optionType} item={currentItem} show={modalShow} onHide={() => setModalShow(false)}/>
        </>
    )
}

const CourseBody = ({listItems}) => {
    const [optionType, setOptionType] = useState('detail')
    const [currentItem,setCurrentItem] = useState({})
    const [modalShow, setModalShow] = useState(false)
    return (
        <>
        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info" style={{width: '100%'}}>
            <thead>
                <tr role="row">
                    <th className="sorting_asc" tabIndex="0" aria-controls="dataTable" aria-sort="ascending" aria-label="Name: activate to sort column descending">Photo</th>
                    <th className="sorting" tabIndex="0" aria-controls="dataTable" aria-label="Position: activate to sort column ascending">Course Name</th>
                    <th className="sorting" tabIndex="0" aria-controls="dataTable" aria-label="Office: activate to sort column ascending">Category</th>
                    <th className="sorting" tabIndex="0" aria-controls="dataTable" aria-label="Start date: activate to sort column ascending">Rating</th>
                    <th tabIndex="0" aria-controls="dataTable"></th>
                </tr>
            </thead>
            <tbody>
                {  
                    listItems.map(value => {
                        return(
                            <tr role= "row">
                                <td>
                                    <img src={value.pictures[0]} alt="First Picture" width='150' height='100'></img>
                                </td>
                                <td>{value.name}</td>
                                <td>{value.category}</td>
                                <td>
                                    <ReactStars 
                                        count={5} 
                                        value={value.rating}
                                        edit = {false}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                        size={25}
                                    />
                                </td>
                                <td style={{textAlign:'center'}}>
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('detail') }} className="btn btn-info col-md-3"> 
                                        <span className="icon text-center">
                                            <i className="fas fa-info"></i>
                                        </span>
                                    </button>
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('update')}} className="btn btn-primary col-md-3 ml-1 mr-1">
                                        <span className="icon text-center">
                                            <i className="fas fa-edit"></i>
                                        </span>
                                    </button>
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('delete')}} className="btn btn-danger col-md-3"> 
                                        <span className="icon">
                                            <i className="fas fa-trash"></i>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <OrdinaryModal collection='course' optionType={optionType} item={currentItem} show={modalShow} onHide={() => setModalShow(false)}/>
        </>
    )
}

const TransBody = ({listItems}) => {
    const [optionType, setOptionType] = useState('detail')
    const [currentItem,setCurrentItem] = useState({})
    const [modalShow, setModalShow] = useState(false)
    return (
        <>
        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info" style={{width: '100%'}}>
            <thead>
                <tr role="row">
                    <th className="sorting" tabIndex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending">Transactions ID</th>
                    <th className="sorting" tabIndex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending">Status</th>
                    <th className="sorting" tabIndex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending">Rating</th>
                    <th className="sorting" tabIndex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending">Date</th>
                    <th className="sorting" tabIndex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending"></th>
                </tr>
            </thead>
            <tbody>
                {  
                    listItems.map(value => {
                        return(
                            <tr role= "row">
                                <td>{value._id}</td>
                                <td>{value.status}</td>
                                <td>
                                    <ReactStars 
                                        count={5} 
                                        value={value.rating}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                        size={23}
                                    />
                                </td>
                                <td>21-1-1999</td>
                                <td style={{textAlign:'center'}}>
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('detail') }} className="btn btn-info col-md-3"> 
                                        <span className="icon text-center">
                                            <i className="fas fa-info"></i>
                                        </span>
                                    </button>
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('update')}} className="btn btn-primary col-md-3 ml-1 mr-1">
                                        <span className="icon text-center">
                                            <i className="fas fa-edit"></i>
                                        </span>
                                    </button>
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('delete')}} className="btn btn-danger col-md-3"> 
                                        <span className="icon">
                                            <i className="fas fa-trash"></i>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <OrdinaryModal collection='trans' optionType={optionType} item={currentItem} show={modalShow} onHide={() => setModalShow(false)}/>
        </>
    )
}

const TBody = ({state}) => {
    if(state) {
        //console.log(state.listItems.slice(state.page - 1, state.page - 1 + state.entries))
        switch(state.collection) {
            case 'user':
                return (
                    <UserBody listItems={state.listItems.slice((state.page-1)*state.entries, (state.page)* state.entries)}/>
                )
            case 'course':
                return (
                    <CourseBody listItems={state.listItems.slice((state.page-1)*state.entries, (state.page)* state.entries)}/>
                )
            case 'trans':
                return (
                    <TransBody listItems={state.listItems.slice((state.page-1)*state.entries, (state.page)* state.entries)}/>
                )
            default: 
                return(<></>)
        }    
    }
    return (<></>)
}
export default TBody