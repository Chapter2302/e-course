import React from 'react'
import 'react-dropdown/style.css'
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

export default Entry