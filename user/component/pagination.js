const Pagination = ({pages, currentPage, setCurrentPage}) => {
    return(
        <ul className="wn__pagination">
            {
                (() => {
                    const content = []

                    if(currentPage < 3) {
                        for(let i=1; i<=3; i++) {
                            if(i <= pages) {
                                content.push(i == currentPage
                                ? (<li key={i} className="active">
                                    <a onClick={() => {setCurrentPage(i)}}>{i}</a>
                                </li>)
                                : (<li key={i}>
                                    <a onClick={() => {setCurrentPage(i)}}>{i}</a>
                                </li>))
                            }
                        }
                        content.push(<li key={"right"}>
                            <a onClick={() => {setCurrentPage(pages)}}>
                                <i className="zmdi zmdi-chevron-right"/>
                                <i className="zmdi zmdi-chevron-right"/>
                            </a>
                        </li>)
                    }
                    else if (currentPage > pages-2) {
                        content.push(<li key={"left"}>
                            <a onClick={() => {setCurrentPage(1)}}>
                                <i className="zmdi zmdi-chevron-left"/>
                                <i className="zmdi zmdi-chevron-left"/>
                            </a>
                        </li>)
                        for(let i=pages-2; i<=pages; i++) {
                            content.push(i == currentPage
                            ? (<li key={i} className="active">
                                <a onClick={() => {setCurrentPage(i)}}>{i}</a>
                            </li>)
                            : (<li key={i}>
                                <a onClick={() => {setCurrentPage(i)}}>{i}</a>
                            </li>))
                        }
                    }
                    else if (currentPage >= 3 && currentPage <= pages-2) {
                        content.push(<li key={"left"}>
                            <a onClick={() => {setCurrentPage(1)}}>
                                <i className="zmdi zmdi-chevron-left"/>
                                <i className="zmdi zmdi-chevron-left"/>
                            </a>
                        </li>)
                        for(let i=currentPage-1; i<=currentPage+1; i++) {
                            content.push(i == currentPage
                            ? (<li key={i} className="active">
                                <a onClick={() => {setCurrentPage(i)}}>{i}</a>
                            </li>)
                            : (<li key={i}>
                                <a onClick={() => {setCurrentPage(i)}}>{i}</a>
                            </li>))
                        }
                        content.push(<li key={"right"}>
                            <a onClick={() => {setCurrentPage(1)}}>
                                <i className="zmdi zmdi-chevron-right"/>
                                <i className="zmdi zmdi-chevron-right"/>
                            </a>
                        </li>)
                    }

                    return content
                })()
            }
        </ul>
    )
}

export default Pagination