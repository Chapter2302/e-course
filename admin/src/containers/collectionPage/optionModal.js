import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {updateSort, updateFilter, updateTableItems} from "../../actionCreator"

const OptionModal = ({
    state,
    updateSort, 
    updateFilter }) => {
    const [sort, setSort] = useState("")
    const [filter, setFilter] = useState({})

    useEffect(() => {
        setSort("")
        setFilter({
            userRole: "",
            userGender: "",
            courseDayInWeek: "",
            courseShift: "",
            courseCategory: "",
            courseStatus: "",
            transStatus: "",
            transMonth: "",
            transYear: ""
        })
    }, [state.collection])

    const options = () => {
        switch (state.collection) {
            case "user":
                return( 
                <div className="form-row">
                    <div className="col-sm-12 col-md-4">
                        <div className="pb-2"><b>Role: </b></div>
                        <select className= "form-control" defaultValue=""
                                onChange={e => setFilter({...filter, userRole: e.target.value})}>
                            <option value="">--All--</option>
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="pb-2"><b>Gender: </b></div>
                        <select className= "form-control" defaultValue=""
                                onChange={e => setFilter({...filter, userGender: e.target.value})}>
                            <option value="">--All--</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="pb-2"><b>Sort: </b></div>
                        <select className= "form-control" defaultValue=""
                                onChange={e => setSort(e.target.value)}>
                            <option value="">--Default--</option>
                            <option value="name-A-Z">From A To Z</option>
                            <option value="name-Z-A">From Z To A</option>
                            <option value="balance-asc">Balance: Ascending</option>
                            <option value="balance-des">Balance: Descending</option>
                        </select>
                    </div>
                </div>
                )
            case "course":
                return(
                    <>
                        <div className="form-row pb-2">
                            <div className="form-group col-sm-12 col-md-4">
                                <div className="pb-2"><b>Days In Week: </b></div>
                                <select className= "form-control" defaultValue=""
                                        onChange={e => setFilter({...filter, courseDayInWeek: e.target.value})}>
                                    <option value="">--All--</option>
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                </select> 
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="pb-2"><b>Shift: </b></div>
                                <select className= "form-control" defaultValue=""
                                        onChange={e => setFilter({...filter, courseShift: e.target.value})}>
                                    <option value="">--All--</option>
                                    <option value="1">1st (8am - 11am)</option>
                                    <option value="2">2nd (2pm - 5pm)</option>
                                </select>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="pb-2"><b>Status: </b></div>
                                <select className= "form-control" defaultValue=""
                                        onChange={e => setFilter({...filter, courseStatus: e.target.value})}>
                                    <option value="">--All--</option>
                                    <option value={true}>Active</option>
                                    <option value={false}>Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row pb-2">
                            <div className="col-sm-12 col-md-6">
                                <div className="pb-2"><b>Category: </b></div>
                                <select className= "form-control" defaultValue=""
                                        onChange={e => setFilter({...filter, courseCategory: e.target.value})}>
                                    <option value="">--All--</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Economy">Economy</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Design">Design</option>
                                    <option value="Language">Language</option>
                                </select>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="pb-2"><b>Sort: </b></div>
                                <select className= "form-control" defaultValue=""
                                        onChange={e => setSort(e.target.value)}>
                                    <option value="">--Default--</option>
                                    <option value="name-A-Z">From A To Z</option>
                                    <option value="name-Z-A">From Z To A</option>
                                    <option value="price-asc">Price: Ascending</option>
                                    <option value="price-des">Price: Descending</option>
                                    <option value="rate-asc">Rate: Ascending</option>
                                    <option value="rate-des">Rate: Descending</option>
                                    <option value="mstudent-asc">Max Student: Ascending</option>
                                    <option value="mstudent-des">Max Student: Descending</option>
                                    <option value="quantity-asc">Quantity: Ascending</option>
                                    <option value="qauntity-des">Quantity: Descending</option>
                                </select>
                            </div>
                        </div>
                    </>
                )
            case "trans":
                return(
                    <>
                        <div className="form-row pb-2">
                            <div className="col-sm-12 col-md-4">
                                <div className="pb-2"><b>Status: </b></div>
                                <select className= "form-control" defaultValue=""
                                        onChange={e => setFilter({...filter, transStatus: e.target.value})}>
                                    <option value="">--All--</option>
                                    <option value="FAIL">Fail</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="SUCCESS">Success</option>
                                </select>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="pb-2"><b>Month: </b></div>
                                <select className= "form-control col"
                                        onChange={e => setFilter({...filter, transMonth: e.target.value})}>
                                    <option value="">--All--</option>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="pb-2"><b>Year: </b></div>
                                <select className= "form-control col" defaultValue=""
                                        onChange={e => setFilter({...filter, transYear: e.target.value})}>
                                    <option value="">--All--</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row pb-2">
                            <div className="col-sm-12 col-md-4">
                                <div className="pb-2"><b>Sort: </b></div>
                                <select className= "form-control" defaultValue=""
                                        onChange={e => setSort(e.target.value)}>
                                    <option value="">--Default--</option>
                                    <option value="rate-asc">Rate: Ascending</option>
                                    <option value="rate-des">Rate: Descending</option>
                                </select>
                            </div>
                        </div>
                    </>
                )
            default:
                return (<></>)
        }
    }
    return (
        <div
            className="modal fade"
            id="optionModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="optionModalTitle"
            aria-hidden="true"
            >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">
                        Sort And Filter
                        </h5>
                        <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        >
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id="option-form">
                            {options()}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button from="option-form" type="button" className="btn btn-primary" data-dismiss="modal"
                                onClick={() => {
                                    updateSort(sort)
                                    updateFilter(filter)
                                }}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    state: state.table
})
  
const mapDispatchToProps = dispatch => {
    return {
        updateSort: sort => {dispatch(updateSort(sort))},
        updateFilter: filter => {dispatch(updateFilter(filter))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OptionModal)