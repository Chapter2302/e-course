import Pagination from 'react-bootstrap/Pagination'
import React from 'react'

const Pages = ({state, updatePage}) => {
    if(state.listItems) {
      let number = []
      let count = ( state.listItems.length % state.entries > 0 ) ? ( ( state.listItems.length / state.entries ) + 1 ) : ( state.listItems.length / state.entries )
      for (let i = 1; i <= count ; i++) {number.push(i)}
      let updateClick = (e,value) => {
        console.log('im value ', value)
        updatePage(value)
      }
      let numberOfPages = number.map(value => {
         return (value == state.page) ? <Pagination.Item onClick={(e) => updateClick(e,value)} active> {value} </Pagination.Item>
                                      : <Pagination.Item onClick={(e) => updateClick(e,value)}> {value}</Pagination.Item>
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
export default Pages