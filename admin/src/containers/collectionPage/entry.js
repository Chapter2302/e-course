import React from 'react'
import {updateEntries} from "../../actionCreator"
import {connect} from "react-redux"

const Entry = ({ updateEntries }) => {
    const entriesChange = (e) => { updateEntries(e.target.value) }
    return (
        <div className="dataTables_length" id="dataTable_length">
            <label>
                Show <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm" onChange={entriesChange}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select> entries 
            </label>
        </div>
    )
}

const mapStateToProps = state => {
    if(state.table) return { state: state.table }
}
  
const mapDispatchToProps = dispatch => {
    return {
        updateEntries: (page) => dispatch(updateEntries(page))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Entry)