import React, {useState, useEffect} from "react"
import {getUserHistoryTransaction} from "../../api"
import HeadContent from "../../component/head"
import Header from "../../component/header"
import Footer from "../../component/footer"
import StarRate, {} from "../../component/starRate"

const Calendar = () => {
    const [courses, setCourses] = useState([])

    const Cell = ({day, shift}) => {
        return <>
            {
                courses.map((course, i) => {
                    if( course.schedule.dayInWeek.includes(day) 
                        && (course.schedule.shift[0] == shift || course.schedule.shift[1] == shift) 
                        && course.isActive == true
                        && course.status == "SUCCESS"
                    ) {
                        return(<React.Fragment key={course._id}>
                            <div><b>Subject: </b><div><a href={`/product/${course._id}`}>{course.name}</a></div></div>
                            <div><b>Link: </b><div><a href={"https://meet.google.com/dii-szkk-voe"}><u>Google Meet</u></a></div></div>
                            <hr className="mt-2 mb-2"/>
                        </React.Fragment>)
                    }
                })
            }
        </>
    }

    useEffect(() => {
        (async () => {
            const courses = await getUserHistoryTransaction()
            if(courses) setCourses(courses)
        })()
    }, [])
    
    return(
        <>
            <HeadContent title={'Login'}/>
            <Header/>
            {/* Start Bradcaump area */}
            <div className="ht__bradcaump__area bg-image--6">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="bradcaump__inner text-center">
                        <h2 className="bradcaump-title">My Account</h2>
                        <nav className="bradcaump-content">
                        <a className="breadcrumb_item" href="index.html">
                            Home
                        </a>
                        <span className="brd-separetor">/</span>
                        <span className="breadcrumb_item active">My Account</span>
                        </nav>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            {/* End Bradcaump area */}
            {/* Start Schedule area */}
            {
                !courses ? <></> 
                : <div className="d-flex justify-content-center pt-4 pb-4 table-light">
                    <div className="table-responsive col-sm-12 col-md-11">
                        <h4 className="pb-2 pt-2">WEEK SCHEDULE</h4>
                        <table className="table table-hover table-xl table-border">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="border border-right-light" scope="col" style={{width: "9%"}}></th>
                                    <th className="border border-light" scope="col" style={{width: "13%"}}>MON</th>
                                    <th className="border border-light" scope="col" style={{width: "13%"}}>TUE</th>
                                    <th className="border border-light" scope="col" style={{width: "13%"}}>WED</th>
                                    <th className="border border-light" scope="col" style={{width: "13%"}}>THURS</th>
                                    <th className="border border-light" scope="col" style={{width: "13%"}}>FRI</th>
                                    <th className="border border-light" scope="col" style={{width: "13%"}}>SAT</th>
                                    <th className="border border-left-light" scope="col" style={{width: "13%"}}>SUN</th>
                                </tr>
                            </thead>
                            <tbody className="text-dark border border-dark">
                                <tr>
                                    <td scope="row" className="table-light text-center">
                                        <b>8AM <div>To</div> 11AM</b>
                                    </td>
                                    <td className="table-primary">
                                        <Cell day="monday" shift={1}/>
                                    </td>
                                    <td className="table-warning">
                                        <Cell day="tuesday" shift={1}/>
                                    </td>
                                    <td className="table-success">
                                        <Cell day="wednesday" shift={1}/>
                                    </td>
                                    <td className="table-danger">
                                        <Cell day="thursday" shift={1}/>
                                    </td>
                                    <td className="table-warning">
                                        <Cell day="friday" shift={1}/>
                                    </td>
                                    <td className="table-info">
                                        <Cell day="saturday" shift={1}/>
                                    </td>
                                    <td className="table-danger">
                                        <Cell day="sunday" shift={1}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" className="table-light text-center">
                                        <b>2PM <div>To</div> 5PM</b>
                                    </td>
                                    <td className="table-primary">
                                        <Cell day="monday" shift={2}/>
                                    </td>
                                    <td className="table-warning">
                                        <Cell day="tuesday" shift={2}/>
                                    </td>
                                    <td className="table-success">
                                        <Cell day="wednesday" shift={2}/>
                                    </td>
                                    <td className="table-danger">
                                        <Cell day="thursday" shift={2}/>
                                    </td>
                                    <td className="table-warning">
                                        <Cell day="friday" shift={2}/>
                                    </td>
                                    <td className="table-info">
                                        <Cell day="saturday" shift={2}/>
                                    </td>
                                    <td className="table-danger">
                                        <Cell day="sunday" shift={2}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" className="table-light text-center">
                                        <b>6PM <div>To</div> 9PM</b>
                                    </td>
                                    <td className="table-primary">
                                        <Cell day="monday" shift={3}/>
                                    </td>
                                    <td className="table-warning">
                                        <Cell day="tuesday" shift={3}/>
                                    </td>
                                    <td className="table-success">
                                        <Cell day="wednesday" shift={3}/>
                                    </td>
                                    <td className="table-danger">
                                        <Cell day="thursday" shift={3}/>
                                    </td>
                                    <td className="table-warning">
                                        <Cell day="friday" shift={3}/>
                                    </td>
                                    <td className="table-info">
                                        <Cell day="saturday" shift={3}/>
                                    </td>
                                    <td className="table-danger">
                                        <Cell day="sunday" shift={3}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {/* End Schedule area */}

            {/* Start Schedule area */}
            {
                !courses ? <></> 
                : <div className="d-flex justify-content-center pt-4 pb-4">
                    <div className="table-responsive col-sm-12 col-md-11">
                        <h4 className="pb-2 pt-2">TRANSACTION HISTORY</h4>
                        <table className="table table-xl">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="border border-right-light" style={{width: "30%"}} scope="col">Course Name</th>
                                    <th className="border border-light" style={{width: "20%"}} scope="col">Date</th>
                                    <th className="border border-light" style={{width: "20%"}} scope="col">Rating</th>
                                    <th className="border border-light" style={{width: "10%"}} scope="col">Price</th>
                                    <th className="border border-light" style={{width: "10%"}} scope="col">Active</th>
                                    <th className="border border-light" style={{width: "10%"}} scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-dark">
                                {
                                    (() => {
                                        return courses.map(course => {
                                            return(
                                                <tr key={course._id}>
                                                    <td>
                                                        <b>{course.name}</b>
                                                    </td>
                                                    <td>
                                                        <input type="date" defaultValue={course.transactionDate}/>
                                                    </td>
                                                    <td>
                                                        <StarRate stars={course.rating}/>
                                                    </td>
                                                    <td>
                                                        <b>{course.price}.00$</b>
                                                    </td>
                                                    <td>
                                                        <b>{course.isActive ? "True" : "False"}</b>
                                                    </td>
                                                    <td className="col-2" style={{height: "20%"}}>
                                                        {
                                                            (() => {
                                                                switch(course.status) {
                                                                    case "SUCCESS":
                                                                        return <b className="text-success">SUCCESS</b>
                                                                    case "PENDING":
                                                                        return <b className="text-warning">PENDING</b>
                                                                    case "FAIL":
                                                                        return <b className="text-danger">FAIL</b>
                                                                }
                                                            })()
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    })()
                                } 
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {/* End Schedule area */}
            
            <Footer/>
        </>
    )
}

export default Calendar