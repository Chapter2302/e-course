import React from "react"
import Helmet from "react-helmet"
import { Link } from "react-router-dom"

const collapseContent = {
    profiles: [
        {
          //title: 'Options: ',
          items: [{name: 'Detail', link: '/profile/detail', }, {name: 'Edit', link: '/profile/edit'}]
        }
    ],
    tables: [
        {
            title: 'Collections: ',
            items: [{name: 'User', link: '/table/user'}, {name: 'Course', link: '/table/course'}, {name: 'Transactions', link: '/table/trans'}]
        }
    ],
    components: [
        {
            title: 'CUSTOM COMPONENTS: ',
            items: [{name: 'Cards', link: '/'}, {name: 'Buttons', link: '/'}]
        }
    ],
}

const Collapse = (props) => {
    let contentData
    switch(props.type) {
        case 'profiles': {
           contentData = collapseContent.profiles
           break
        }
        case 'components': {
            contentData = collapseContent.components
            break
        }
        case 'tables': {
            contentData = collapseContent.tables
            break
        }
        default: 
            break
    }

    const content = []

    contentData.map((val) => {
        if(val.title) content.push(<h6 class="collapse-header">{val.title}</h6>)
        val.items.map((item) => {
            content.push(<Link class="collapse-item" to={item.link}>{item.name}</Link>)
        })
    })

    return(
        <div class="bg-white py-2 collapse-inner rounded">
            {content}
        </div>
    )
} 

export default Collapse