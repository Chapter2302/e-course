import React, { useEffect, useState } from 'react'
import {loadScript} from "../../util"
import { 
  getAllData, 
  updateEntries, 
  updatePage, 
  updateSearchFilter
} from '../../actionCreator'
import { connect } from 'react-redux'
import Pages from "./pagination"
import Entry from "./entry"
import OptionModal from "./optionModal"
import Table from "./table"
import CreateModal from "./createModal"

const Collection = ({
  match, 
  state, 
  getAllData,
  updateSearchFilter
}) => {
  const [modalShow, setModalShow] = useState(false)
  useEffect(() => {
    getAllData(match.params.collection)
  }, [match])

  return !match ? <></> : (
      <>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Collection DataTables</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="dataTables_wrapper dt-bootstrap4">
                <div className="form-row">
                  <div className="col-sm-12 col-md-3 mb-2">
                    <button href="#" className="btn btn-sm btn-primary col-12" 
                            type="button" data-toggle="modal" data-target="#optionModal">
                      <span className="icon mr-2">
                        <i className="fas fa-filter"></i>
                      </span>
                      <b>Sort And Filter</b>
                    </button>
                    <OptionModal/>
                  </div>
                  <div className="col-sm-12 col-md-3 mb-2">
                    <input  type="text" className="form-control form-control-sm" placeholder="Search" 
                            onChange={e => {
                              updateSearchFilter(e.target.value)
                            }}/>
                  </div>
                  <div className="col-sm-12 col-md-3 mb-2">
                    <button href="#" className="btn btn-sm btn-success col-12" onClick={()=>{setModalShow(true)}}>
                    <span className="icon mr-2">
                      <i className="fas fa-plus-square"></i>
                    </span>
                    <span><b>Create New</b></span>
                    </button>
                  </div>
                  <div className="col-sm-12 col-md-3 mb-2"  style={{textAlign:'right'}}>
                    <Entry/>
                  </div>
                </div>
              <div className="row">
                <div className="col-sm-12">          
                    <Table/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-5">
                  <div className="dataTables_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                </div>
                <Pages/>
              </div>
              </div>
            </div>
          </div>
        </div>
        { 
          state 
          ? <CreateModal collection={state.collection} show={modalShow} onHide={() => setModalShow(false)} /> 
          : <></> 
        }
    </>
  )
}

const mapStateToProps = state => ({
  state: state.table
})

const mapDispatchToProps = dispatch => {
  return {
    getAllData: (collection) => dispatch(getAllData(collection)),
    updateEntries: (entries) => dispatch(updateEntries(entries)),
    updatePage: (page) => dispatch(updatePage(page)),
    updateSearchFilter: (search) => dispatch(updateSearchFilter(search))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Collection)
