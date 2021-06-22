import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getUserHistoryTransaction} from "../../api"
import HeadContent from "../../component/head"
import Header from "../../component/header"
import Footer from "../../component/footer"
import StarRate, {} from "../../component/starRate"

const Calendar = () => {
    const [courses, setCourses] = useState([])
    const language = useSelector(state => state.language.nation)

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
                : <div className="d-flex justify-content-center pt-4 pb-4">
                    <div className="table-responsive col-sm-12 col-md-11">
                        <h4 className="pb-2 pt-2">{language == "eng" ? "TRANSACTION HISTORY" : "LỊCH SỬ GIAO DỊCH"}</h4>
                        <table className="table table-xl">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="border border-right-light" style={{width: "30%"}} scope="col">{language == "eng" ? "Course Name" : "Tên Khóa Học"}</th>
                                    <th className="border border-light" style={{width: "20%"}} scope="col">{language == "eng" ? "Date" : "Ngày Thực Hiện"}</th>
                                    <th className="border border-light" style={{width: "20%"}} scope="col">{language == "eng" ? "Rating" : "Đánh Giá"}</th>
                                    <th className="border border-light" style={{width: "10%"}} scope="col">{language == "eng" ? "Price" : "Giá"}</th>
                                    <th className="border border-light" style={{width: "10%"}} scope="col">{language == "eng" ? "Active" : "Hiệu Lực"}</th>
                                    <th className="border border-light" style={{width: "10%"}} scope="col">{language == "eng" ? "Status" : "Trạng Thái"}</th>
                                </tr>
                            </thead>
                            <tbody className="text-dark">
                                {
                                    (() => {
                                        if(courses.length == 0) {
                                            return(
                                                <tr className="font-weight-bold">
                                                    <div className="py-2 pl-2">{language == "eng" ? "There Is No Transaction" : "Không Có Gia Dịch"}</div>
                                                </tr>
                                            )
                                        } else {
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
                                        }
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