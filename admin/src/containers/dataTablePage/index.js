import React, { useEffect, useState } from 'react'
import { getAllData, updateEntries, updatePage } from '../../actionCreator'
import { connect } from 'react-redux'
import Pages from './subComponent/pagination'
import Entry from './subComponent/entry'
import TBody from './subComponent/tableBody'
import CreateModal from './subComponent/modal/createModal'

const Table = ( {match, state, getAllData, updateEntries, updatePage} ) => {
  const [modalShow, setModalShow] = useState(false)
  useEffect(() => {
    getAllData(match.params.collection)
    updatePage(1)
    updateEntries(10)
  }, [match])
  
  const Board = ({ items }) => {
      if (items) return (<h3>{items.page}</h3>)
      return (<></>)
    }

  let clickTest = () => {
    if(match) {
      console.log('mtach: ', match)
    }
  }
  return !match ? <></> : (
      <>
        <h1 className="h3 mb-2 text-gray-800" onClick= {clickTest}>Tables</h1>
        <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the <a target="_blank" href="https://datatables.net">official DataTables documentation</a>.</p>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                <div className="row">
                  <div className="col-sm-12 col-md-4">
                    <Entry updateEntries={updateEntries} />
                  </div>
                  <div className="col-sm-12 col-md-4" style={{textAlign:'center'}}>
                  <button href="#" className="btn btn-success btn-icon-split btn-sm" onClick={()=>{setModalShow(true)}}>
                    <span className="icon">
                      <i className="fas fa-plus"></i>
                    </span>
                    <span className="text">Create</span>
                    
                  </button>
                  </div>
                <div className="col-sm-12 col-md-4">
                  <div id="dataTable_filter" className="dataTables_filter">
                    <label>Search:
                      <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="dataTable"/>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">          
                    <TBody state = {state}/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-5">
                  <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                </div>
                <Pages state = {state} updatePage = {updatePage}/>
              </div>
              </div>
            </div>
          </div>
        </div>
        {state  ? <CreateModal 
                    collection={state.collection} 
                    show={modalShow} 
                    onHide={() => setModalShow(false)}
                  /> 
                : <></>}
      </>
    )
}

const mapStateToProps = state => {
  if(state.table) return { state: state.table }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllData: (collection) => dispatch(getAllData(collection)),
    updateEntries: (entries) => dispatch(updateEntries(entries)),
    updatePage: (page) => dispatch(updatePage(page))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Table)
