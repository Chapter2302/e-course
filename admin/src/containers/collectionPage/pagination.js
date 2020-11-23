import Pagination from 'react-bootstrap/Pagination'
import React from 'react'
import {updatePage} from "../../actionCreator"
import {connect} from "react-redux"

const Pages = ({state, updatePage}) => {
    if(state.tableItems) {
      let number = []
      let count = (state.tableItems.length % state.entries > 0 ) 
                  ? ((state.tableItems.length / state.entries ) + 1) 
                  : (state.tableItems.length / state.entries)
      for (let i = 1; i <= count ; i++) {number.push(i)}
      let updateClick = (e,value) => {
        console.log('im value ', value)
        updatePage(value)
      }
      let numberOfPages = number.map(value => {
         return (value == state.page) ? <Pagination.Item key={value} onClick={(e) => updateClick(e,value)} active> {value} </Pagination.Item>
                                      : <Pagination.Item key={value} onClick={(e) => updateClick(e,value)}> {value}</Pagination.Item>
      })
      return (
        <div className = "col-sm-12 col-md-7">      
          <Pagination style = {{float: 'right'}}>
            <Pagination.Prev />
              {numberOfPages}
            <Pagination.Next />
          </Pagination>  
        </div>
      )
    }
    return (<></>)
}

const mapStateToProps = state => {
  if(state.table) return { state: state.table }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePage: (page) => dispatch(updatePage(page))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Pages)