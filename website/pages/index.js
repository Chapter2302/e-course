import {useSelector} from "react-redux"
import HeadContent from '../component/head'
import Header from '../component/header'
import Footer from '../component/footer'
import styles from './index.module.scss'
import SingleCourseGrid from '../component/SingleCourseGrid'
import StartSlider from '../component/StartSlider'
import cx from 'classnames'

const Home = ({ mapCourses, eightCourseLatest }) => {
  const language = useSelector(state => state.language.nation)
    
  return(
    <div className={styles.container}>
      <HeadContent title={'Home'}/>
      <Header/>

      {/* Start Slider area */}
      <StartSlider />
      {/* End Slider area */}
      
      {/* Start New Course Area */}
      <section className="wn__product__area brown--color pt--80  pb--30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__title text-center">
                <h2 className="title__be--2">
                  { language == "eng" ? "New" : "Khóa học" } <span className="color--theme">{ language == "eng" ? "Courses" : "Mới" }</span> 
                </h2>
                <p>
                  {language == "eng" 
                  ? "There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form"
                  : "Có nhiều biến thể của các đoạn Lorem Ipsum có sẵn, nhưng phần lớn đã bị biến đổi lebmid ở một số dạng ledmid" 
                  }
                </p>
              </div>
            </div>
          </div>
          {/* Start Single Tab Content */}
          <div className="furniture--4 border--round arrows_style owl-carousel owl-theme row mt--50">
            {
              eightCourseLatest.map((course, index) => {
                return(
                  <SingleCourseGrid key={`new-course-${index}`} course={course}/>
                )
              })
            }
          </div>
          {/* End Single Tab Content */}
        </div>
      </section>
      {/* Start New Course Area */}

      {/* Start NEwsletter Area */}
      <section className="wn__newsletter__area bg-image--2">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 offset-lg-5 col-md-12 col-12 ptb--150">
              <div className="section__title text-center">
                <h2>{language == "eng" ? "Stay With Us" : "Nhận Thông Báo"}</h2>
              </div>
              <div className="newsletter__block text-center">
                <p>
                  {language == "eng" 
                  ? `Subscribe to our newsletters now and stay up-to-date with new 
                  collections, the latest lookbooks and exclusive offers.` 
                  : `Theo dõi thông tin mới nhất của chúng tôi ngay bây giờ và được
                  cập nhật những khóa học mới nhất, cùng với những chương trình khuyến mãi`}
                </p>
                <form action="#">
                  <div className="newsletter__box">
                    <input type="email" placeholder={language == "eng" ? "Enter your e-mail" : "Điền e-mail của bạn"}/>
                    <button>{language == "eng" ? "Subscribe" : "Theo Dõi"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End NEwsletter Area */}

      {/* Start All Course Area */}
      <section className="wn__bestseller__area bg--white pt--80  pb--30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__title text-center">
                <h2 className="title__be--2">
                {language == "eng" ? "All" : "Tất Cả"} <span className="color--theme">{language == "eng" ? "Category" : "Danh Mục"}</span>
                </h2>
                <p>
                  {language == "eng" 
                  ? `There are many variations of passages of Lorem Ipsum available,
                  but the majority have suffered lebmid alteration in some ledmid
                  form` 
                  : `Có nhiều biến thể của đoạn văn Lorem Ipsum có sẵn, 
                  nhưng phần lớn đã bị biến đổi lebmid ở một số dạng ledmid`}
                </p>
              </div>
            </div>
          </div>
          <div className="row mt--50">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <div
                className="product__nav nav justify-content-center"
                role="tablist"
              >
                <a
                  className="nav-item nav-link active"
                  data-toggle="tab"
                  href="#nav-all"
                  role="tab"
                >
                  {language == "eng" ? "All" : "Tất Cả"}
                </a>
                <a
                  className="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-biographic"
                  role="tab"
                >
                  {language == "eng" ? "IT" : "CNTT"}
                </a>
                <a
                  className="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-adventure"
                  role="tab"
                >
                  {language == "eng" ? "ECONOMY" : "KINH TẾ"}
                </a>
                <a
                  className="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-children"
                  role="tab"
                >
                  {language == "eng" ? "DESIGN" : "THIẾT KẾ"}
                </a>
                <a
                  className="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-marketing"
                  role="tab"
                >
                  MARKETING
                </a>
                <a
                  className="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-cook"
                  role="tab"
                >
                  {language == "eng" ? "LANGUAGES" : "NGÔN NGỮ"}
                </a>
              </div>
            </div>
          </div>
          <div className="tab__container mt--60">
            {/* Start Single Tab Content */}
            <div
              className="row single__tab tab-pane fade show active"
              role="tabpanel"
            >
              <div className="product__indicator--4 arrows_style owl-carousel owl-theme">
                {
                  mapCourses.map((doubleCourse, index) => {
                    return(
                      <div key={`all-course-${index}`} className="single__product">
                        {doubleCourse[0] && <SingleCourseGrid key={`all-course-${index}-0`} course={doubleCourse[0]}/>}
                        {doubleCourse[1] && <SingleCourseGrid key={`all-course-${index}-1`} course={doubleCourse[1]}/>}
                      </div>
                    )
                  })
                }
              </div>
            </div>
            {/* End Single Tab Content */}
            
          </div>
        </div>
      </section>
      {/* Start All Course Area */}

      {/* Start Recent Post Area */}
      <section className="wn__recent__post bg--gray ptb--80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__title text-center">
                <h2 className="title__be--2">
                  {language == "eng" ? "Our" : "Blog"} <span className="color--theme">{language == "eng" ? "Blog" : "Của Chúng Ta"}</span>
                </h2>
                <p>
                  {language == "eng" 
                  ? `There are many variations of passages of Lorem Ipsum available,
                  but the majority have suffered lebmid alteration in some ledmid
                  form` 
                  : `Có nhiều biến thể của đoạn văn Lorem Ipsum có sẵn, 
                  nhưng phần lớn đã bị biến đổi lebmid ở một số dạng ledmid`}
                </p>
              </div>
            </div>
          </div>
          <div className="row mt--50">
            <div className="col-md-6 col-lg-4 col-sm-12">
              <div className="post__itam">
                <div className="content">
                  <h3>
                    <a href="blog-details.html">
                      {language == "eng" ? `International activities of the Frankfurt Courses` : `Hoạt động Quốc Tế diễn ra tại Frankfurt`}{" "}
                    </a>
                  </h3>
                  <p>
                  {language == "eng" 
                  ? `We are proud to announce the very first the edition of the
                    frankfurt news.We are proud to announce the very first of
                    edition of the fault frankfurt news for us.` 
                  : `Chúng tôi tự hào thông báo ấn bản đầu tiên của tin tức Frankfurt Chúng tôi tự hào thông báo 
                    ấn bản đầu tiên của tin tức Frankfurt lỗi cho chúng tôi.`}
                  </p>
                  <div className="post__time">
                    <span className="day">Dec 06, 18</span>
                    <div className="post-meta">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="bi bi-love" />
                            72
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bi bi-chat-bubble" />
                            27
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-sm-12">
              <div className="post__itam">
                <div className="content">
                  <h3>
                    <a href="blog-details.html">
                    {language == "eng" ? `Reading has a signficant info number of benefits` : `Một số lợi ích hấp dẫn của việc đọc sách`}
                    </a>
                  </h3>
                  <p>
                    {
                      language == "eng" 
                      ? `Find all the information you need to ensure your experience.Find
                      all the information you need to ensure your experience . Find
                      all the information you of.`
                      : `Tìm tất cả thông tin bạn cần để đảm bảo trải nghiệm của bạn. 
                      Tìm tất cả thông tin bạn cần để đảm bảo trải nghiệm của bạn. 
                      Tìm tất cả thông tin của bạn.`
                    }
                  </p>
                  <div className="post__time">
                    <span className="day">Mar 08, 18</span>
                    <div className="post-meta">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="bi bi-love" />
                            72
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bi bi-chat-bubble" />
                            27
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-sm-12">
              <div className="post__itam">
                <div className="content">
                  <h3>
                    <a href="blog-details.html">
                    {language == "eng" ? `The London Book Fair is to be packed with exciting` : `Hội Chợ Sách ở London sẽ được tổ chức rất thú vị`}{" "}
                    </a>
                  </h3>
                  <p>
                  {language == "eng" 
                  ? `The London Book Fair is the global area inon marketplace for
                    rights negotiation.The year London Book Fair is the global area
                    inon forg marketplace for rights.`
                  : `Hội chợ sách London là thị trường đàm phán về quyền ở khu vực toàn cầu. 
                    Hội chợ sách London năm là thị trường toàn cầu về quyền. Chợ sách hứa hẹn nhiều điều thú vị`}
                  </p>
                  <div className="post__time">
                    <span className="day">Nov 11, 18</span>
                    <div className="post-meta">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="bi bi-love" />
                            72
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bi bi-chat-bubble" />
                            27
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Recent Post Area */}
      {/* Best Sale Area */}
      <section className="best-seel-area pt--80 pb--60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__title text-center pb--50">
                <h2>
                  {language == "eng" ? `PARTNERS` : `THƯƠNG HIỆU`} <span className="color--theme">{language == "eng" ? `CUSTOMERS` : `HÀNG ĐẦU`} </span>
                </h2>
                <p>
                {language == "eng" 
                ? `There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered lebmid alteration in some ledmid
                form` 
                : `Với nhiều khóa học uy tín và chất lượng, E-Course đã liên kết và hợp tác với rất nhiều tập đoàn công ty lớn nhỏ. Dành được sự tin tưởng và kỳ vọng to lớn trong tương lai`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="slider center">
          {/* Single product start */}
          <div className="product product__style--3">
            <div className={cx(styles.productThumbCustom, "product__thumb")}>
              <a className="first__img">
                <img className={styles.brandImage} src="/images/brand/janeto-brand.png" alt={"product image"} />
              </a>
            </div>
          </div>
          {/* Single product end */}
          {/* Single product start */}
          <div className="product product__style--3">
            <div className={cx(styles.productThumbCustom, "product__thumb")}>
              <a className="first__img">
                <img className={styles.brandImage} src="/images/brand/ute-brand.png" alt={"product image"} />
              </a>
            </div>
          </div>
          {/* Single product end */}
          {/* Single product start */}
          <div className="product product__style--3">
            <div className={cx(styles.productThumbCustom, "product__thumb")}>
              <a className="first__img">
                <img className={styles.brandImage} src="/images/brand/ecr-brand.png" alt={"product image"} />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Best Sale Area */}
      <Footer/>
    </div>
    )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:4000/course/get-all-guess')
  const courses = await res.json()

  const eightCourseLatest = courses.sort((a, b) => {
    return new Date(b.created_date) - new Date(a.created_date);
  }).slice(0, 9)
  
  const mapCourses = []
  
  for(let i=0; i<=courses.length; i+=2) {
    const arrTemp = []
    courses[i] && arrTemp.push(courses[i])
    courses[i+1] && arrTemp.push(courses[i+1])
    arrTemp.length>0 && mapCourses.push(arrTemp)
  }

  return {
      props: {
        mapCourses,
        eightCourseLatest
      }
  }
}

export default Home