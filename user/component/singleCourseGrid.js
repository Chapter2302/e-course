import Link from 'next/link'
import StarRate from './starRate'
import {useSelector} from "react-redux"
const SingleCourseGrid = ({course, setQuickViewCourse}) => {
    const language = useSelector(state => state.language.nation)
    return(
        <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="product__thumb">
                <Link href={`/product/${course._id}`}>
                    <a className="first__img">
                        <img src={course.pictures[0]} alt={"product image"} height={180}/>
                    </a>
                </Link>
                <Link href={`/product/${course._id}`}>
                    <a className="second__img animation1">
                        <img src={course.pictures[1]} alt={"product image"} height={180}/>
                    </a>
                </Link>
                <div className="hot__box">
                    <span className="hot-label">BEST SALLER</span>
                </div>
            </div>
            <div className="product__content content--center">
                <h4>
                    <a href="single-course.html">{course.name}</a>
                </h4>
                <ul className="prize d-flex">
                    <li style={{fontSize: language == "eng" ? "14px" : "12px"}}>{language == "eng" ? `$${course.price}.00` : `${parseFloat(course.price*0.023).toFixed(1)} Tr VNĐ`}</li>
                    <li style={{fontSize: language == "eng" ? "14px" : "12px"}} className="old_prize">{language == "eng" ? `$${course.price + course.price*0.1}` : `${parseFloat((course.price + course.price*0.1)*0.023).toFixed(1)} Tr VNĐ`}</li>
                    
                    <li style={{fontSize: language == "eng" ? "14px" : "12px"}}>Qty: {course.quantity}/{course.maxStudent}</li>
                </ul>
                <div className="action">
                    <div className="actions_inner">
                        <ul className="add_to_links">
                            <li>
                                <a className="wishlist" href="#">
                                    <i className="bi bi-shopping-cart-full" />
                                </a>
                            </li>
                            <li>
                                <a
                                data-toggle="modal"
                                title="Quick View"
                                className="quickview modal-view detail-link"
                                href="#productmodal"
                                onClick={() => {setQuickViewCourse(course)}}
                                >
                                    <i className="bi bi-search" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="product__hover--content">
                    <StarRate stars={course.rating}/>
                </div>
            </div>
        </div>
    )
}

export default SingleCourseGrid