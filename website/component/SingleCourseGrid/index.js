import StarRate from "../starRate"
import {useSelector} from "react-redux"
import styles from './index.module.scss'
import cx from 'classnames'

const SingleCourseGrid = ({course}) => {
    const language = useSelector(state => state.language.nation)
    return(
        <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="product__thumb">
                <a className="first__img" href={`/product/${course._id}`}>
                    <img src={course.featured_image} alt={"product image"} height={180}/>
                </a>
                <div className="hot__box">
                    <span className="hot-label">BEST SALLER</span>
                </div>
            </div>
            <div className={styles.productInfo}>
                <div className="d-flex justify-content-between">
                    <a className={styles.courseName} href="single-course.html">{course.name}</a>
                    <div className={cx(styles.price, styles.currentPrice)}>
                        {language == "eng" ? `$${course.price}.00` : `${parseFloat(course.price*0.023).toFixed(1)}K VNĐ`}
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <StarRate stars={course.rating}/>
                    <div className={cx(styles.price, styles.oldPrice)}>
                        {language == "eng" ? `$${course.price + course.price*0.1}` : `${parseFloat((course.price + course.price*0.1)*0.023).toFixed(1)}K VNĐ`}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleCourseGrid