import {useSelector} from "react-redux"
import HeadContent from '../component/head'
import Header from '../component/header'
import Footer from '../component/footer'
import styles from './index.module.scss'

const Home = () => {
  const language = useSelector(state => state.language.nation)
    
  return(
    <>
      <HeadContent title={'Home'}/>
      <Header/>
      {/* Start Slider area */}
      <div className="slider-area brown__nav slider--15 slide__activation slide__arrow01 owl-carousel owl-theme">
        {/* Start Single Slide */}
        <div className="slide animation__style10 bg-image--1 fullscreen align__center--left">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="slider__content">
                  <div className="contentbox">
                    <h2 className={styles.slideFont}>
                      {language=="eng" ? "Get" : "Mua"} <span>{language=="eng" ? "your" : "Khóa Học"} </span>
                    </h2>
                    <h2 className={styles.slideFont}>
                      {language=="eng" ? "favourite" : "Yêu Thích"} <span> {language=="eng" ? "Courses" : "Của Bạn"} </span>
                    </h2>
                    <h2 className={styles.slideFont}>
                      {language=="eng" ? "from" : "Ở"} <span>{language=="eng" ? "Here" : "Đây"} </span>
                    </h2>
                    <a className="shopbtn" href="#">
                      {language=="eng" ? "go now" : "Đi Đến"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Single Slide */}
        {/* Start Single Slide */}
        <div className="slide animation__style10 bg-image--7 fullscreen align__center--left">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="slider__content">
                  <div className="contentbox">
                    <h2 className={styles.slideFont}>
                      {language=="eng" ? "Get" : "Mua"} <span>{language=="eng" ? "your" : "Khóa Học"} </span>
                    </h2>
                    <h2 className={styles.slideFont}>
                      {language=="eng" ? "favourite" : "Yêu Thích"} <span> {language=="eng" ? "Courses" : "Của Bạn"} </span>
                    </h2>
                    <h2 className={styles.slideFont}>
                      {language=="eng" ? "from" : "Ở"} <span>{language=="eng" ? "Here" : "Đây"} </span>
                    </h2>
                    <a className="shopbtn" href="#">
                      {language=="eng" ? "go now" : "Đi Đến"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Single Slide */}
      </div>
      {/* End Slider area */}
      {/* Start BEst Seller Area */}
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
            {/* Start Single Product */}
            <div className="product product__style--3">
              <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="product__thumb">
                  <a className="first__img" href="single-product.html">
                    <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1437/img/video_cover_image_url-1555384409.crop-730x436.jpg" alt={"product image"} />
                  </a>
                  <div className="hot__box">
                    <span className="hot-label">{ language == "eng" ? "BEST SALLER" : "BÁN CHẠY" }</span>
                  </div>
                </div>
                <div className="product__content content--center">
                  <h4>
                    <a href="single-product.html">{ language == "eng" ? "Programmer Analyst IV" : "Phân Tích Lập Trình IV" }</a>
                  </h4>
                  <ul className="prize d-flex">
                    <li>{language == "eng" ? "$71.00" : "1.6 Triệu VNĐ"} </li>
                    <li className="old_prize">{language == "eng" ? "$78.00" : "1.8 Triệu VNĐ"}</li>
                  </ul>
                  <div className="action">
                    <div className="actions_inner">
                      <ul className="add_to_links">
                        <li>
                          <a className="cart" href="cart.html">
                            <i className="bi bi-shopping-bag4" />
                          </a>
                        </li>
                        <li>
                          <a className="wishlist" href="wishlist.html">
                            <i className="bi bi-shopping-cart-full" />
                          </a>
                        </li>
                        <li>
                          <a className="compare" href="#">
                            <i className="bi bi-heart-beat" />
                          </a>
                        </li>
                        <li>
                          <a
                            data-toggle="modal"
                            title="Quick View"
                            className="quickview modal-view detail-link"
                            href="#productmodal"
                          >
                            <i className="bi bi-search" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="product__hover--content">
                    <ul className="rating d-flex">
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li>
                        <i className="fa fa-star-o" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Start Single Product */}
            {/* Start Single Product */}
            <div className="product product__style--3">
              <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="product__thumb">
                  <a className="first__img" href="single-product.html">
                    <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1844/img/image_url-1596773606.crop-730x436.jpg" alt={"product image"} />
                  </a>
                  <div className="hot__box color--2">
                    <span className="hot-label">HOT</span>
                  </div>
                </div>
                <div className="product__content content--center">
                  <h4>
                    <a href="single-product.html">{language == "eng" ? "Account Coordinator" : "Điều Phối Tài Khoản"}</a>
                  </h4>
                  <ul className="prize d-flex">
                    <li>{language == "eng" ? "$83.00" : "1.9 Triệu VNĐ"}</li>
                    <li className="old_prize">{language == "eng" ? "$91.00" : "2.1 Triệu VNĐ"}</li>
                  </ul>
                  <div className="action">
                    <div className="actions_inner">
                      <ul className="add_to_links">
                        <li>
                          <a className="cart" href="cart.html">
                            <i className="bi bi-shopping-bag4" />
                          </a>
                        </li>
                        <li>
                          <a className="wishlist" href="wishlist.html">
                            <i className="bi bi-shopping-cart-full" />
                          </a>
                        </li>
                        <li>
                          <a className="compare" href="#">
                            <i className="bi bi-heart-beat" />
                          </a>
                        </li>
                        <li>
                          <a
                            data-toggle="modal"
                            title="Quick View"
                            className="quickview modal-view detail-link"
                            href="#productmodal"
                          >
                            <i className="bi bi-search" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="product__hover--content">
                    <ul className="rating d-flex">
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li>
                        <i className="fa fa-star-o" />
                      </li>
                      <li>
                        <i className="fa fa-star-o" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Start Single Product */}
            {/* Start Single Product */}
            <div className="product product__style--3">
              <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="product__thumb">
                  <a className="first__img" href="single-product.html">
                    <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1241/img/video_cover_image_url-1600669475.crop-730x436.jpg" alt={"product image"} />
                  </a>
                  <div className="hot__box">
                    <span className="hot-label">BEST SALLER</span>
                  </div>
                </div>
                <div className="product__content content--center">
                  <h4>
                    <a href="single-product.html">{language == "eng" ? "Financial Analyst" : "Phân Tích Tài Chính"}</a>
                  </h4>
                  <ul className="prize d-flex">
                    <li>{language == "eng" ? "$82.00" : "1.9 Triệu VNĐ"}</li>
                    <li className="old_prize">{language == "eng" ? "$90.00" : "2.0 Triệu VNĐ"}</li>
                  </ul>
                  <div className="action">
                    <div className="actions_inner">
                      <ul className="add_to_links">
                        <li>
                          <a className="cart" href="cart.html">
                            <i className="bi bi-shopping-bag4" />
                          </a>
                        </li>
                        <li>
                          <a className="wishlist" href="wishlist.html">
                            <i className="bi bi-shopping-cart-full" />
                          </a>
                        </li>
                        <li>
                          <a className="compare" href="#">
                            <i className="bi bi-heart-beat" />
                          </a>
                        </li>
                        <li>
                          <a
                            data-toggle="modal"
                            title="Quick View"
                            className="quickview modal-view detail-link"
                            href="#productmodal"
                          >
                            <i className="bi bi-search" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="product__hover--content">
                    <ul className="rating d-flex">
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Start Single Product */}
            {/* Start Single Product */}
            <div className="product product__style--3">
              <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="product__thumb">
                  <a className="first__img" href="single-product.html">
                    <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1437/img/video_cover_image_url-1555384409.crop-730x436.jpg" alt={"product image"} />
                  </a>
                  <div className="hot__box">
                    <span className="hot-label">BEST SALLER</span>
                  </div>
                </div>
                <div className="product__content content--center">
                  <h4>
                    <a href="single-product.html">{language == "eng" ? "Programmer Analyst IV" : "Phân Tích Lập Trình IV"}</a>
                  </h4>
                  <ul className="prize d-flex">
                    <li>{language == "eng" ? "$71.00" : "1.6 Triệu VNĐ"}</li>
                    <li className="old_prize">{language == "eng" ? "$78.00" : "1.8 Triệu VNĐ"}</li>
                  </ul>
                  <div className="action">
                    <div className="actions_inner">
                      <ul className="add_to_links">
                        <li>
                          <a className="cart" href="cart.html">
                            <i className="bi bi-shopping-bag4" />
                          </a>
                        </li>
                        <li>
                          <a className="wishlist" href="wishlist.html">
                            <i className="bi bi-shopping-cart-full" />
                          </a>
                        </li>
                        <li>
                          <a className="compare" href="#">
                            <i className="bi bi-heart-beat" />
                          </a>
                        </li>
                        <li>
                          <a
                            data-toggle="modal"
                            title="Quick View"
                            className="quickview modal-view detail-link"
                            href="#productmodal"
                          >
                            <i className="bi bi-search" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="product__hover--content">
                    <ul className="rating d-flex">
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li>
                        <i className="fa fa-star-o" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Start Single Product */}
            {/* Start Single Product */}
            <div className="product product__style--3">
              <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="product__thumb">
                  <a className="first__img" href="single-product.html">
                    <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1844/img/image_url-1596773606.crop-730x436.jpg" alt={"product image"} />
                  </a>
                  <div className="hot__box color--2">
                    <span className="hot-label">HOT</span>
                  </div>
                </div>
                <div className="product__content content--center">
                  <h4>
                    <a href="single-product.html">{language == "eng" ? "Account Coordinator" : "Điều Phối Tài Khoản"}</a>
                  </h4>
                  <ul className="prize d-flex">
                    <li>{language == "eng" ? "$83.00" : "1.9 Triệu VNĐ"}</li>
                    <li className="old_prize">{language == "eng" ? "$91.00" : "2.1 Triệu VNĐ"}</li>
                  </ul>
                  <div className="action">
                    <div className="actions_inner">
                      <ul className="add_to_links">
                        <li>
                          <a className="cart" href="cart.html">
                            <i className="bi bi-shopping-bag4" />
                          </a>
                        </li>
                        <li>
                          <a className="wishlist" href="wishlist.html">
                            <i className="bi bi-shopping-cart-full" />
                          </a>
                        </li>
                        <li>
                          <a className="compare" href="#">
                            <i className="bi bi-heart-beat" />
                          </a>
                        </li>
                        <li>
                          <a
                            data-toggle="modal"
                            title="Quick View"
                            className="quickview modal-view detail-link"
                            href="#productmodal"
                          >
                            <i className="bi bi-search" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="product__hover--content">
                    <ul className="rating d-flex">
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li>
                        <i className="fa fa-star-o" />
                      </li>
                      <li>
                        <i className="fa fa-star-o" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Start Single Product */}
            {/* Start Single Product */}
            <div className="product product__style--3">
              <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="product__thumb">
                  <a className="first__img" href="single-product.html">
                    <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1241/img/video_cover_image_url-1600669475.crop-730x436.jpg" alt={"product image"} />
                  </a>
                  <div className="hot__box">
                    <span className="hot-label">BEST SALLER</span>
                  </div>
                </div>
                <div className="product__content content--center">
                  <h4>
                    <a href="single-product.html">{language == "eng" ? "Financial Analyst" : "Phân Tích Tài Chính"}</a>
                  </h4>
                  <ul className="prize d-flex">
                    <li>{language == "eng" ? "$82.00" : "1.9 Triệu VNĐ"}</li>
                    <li className="old_prize">{language == "eng" ? "$90.00" : "2.1 Triệu VNĐ"}</li>
                  </ul>
                  <div className="action">
                    <div className="actions_inner">
                      <ul className="add_to_links">
                        <li>
                          <a className="cart" href="cart.html">
                            <i className="bi bi-shopping-bag4" />
                          </a>
                        </li>
                        <li>
                          <a className="wishlist" href="wishlist.html">
                            <i className="bi bi-shopping-cart-full" />
                          </a>
                        </li>
                        <li>
                          <a className="compare" href="#">
                            <i className="bi bi-heart-beat" />
                          </a>
                        </li>
                        <li>
                          <a
                            data-toggle="modal"
                            title="Quick View"
                            className="quickview modal-view detail-link"
                            href="#productmodal"
                          >
                            <i className="bi bi-search" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="product__hover--content">
                    <ul className="rating d-flex">
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                      <li className="on">
                        <i className="fa fa-star-o" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Start Single Product */}
          </div>
          {/* End Single Tab Content */}
        </div>
      </section>
      {/* Start BEst Seller Area */}
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
      {/* Start Best Seller Area */}
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
                <div className="single__product">
                  {/* Start Single Product */}
                  <div className="product product__style--3">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                      <div className="product__thumb">
                        <a className="first__img" href="single-product.html">
                          <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1437/img/video_cover_image_url-1555384409.crop-730x436.jpg" alt={"product image"} />
                        </a>
                        <div className="hot__box">
                          <span className="hot-label">BEST SALLER</span>
                        </div>
                      </div>
                      <div className="product__content content--center">
                        <h4>
                          <a href="single-product.html">Programmer Analyst IV</a>
                        </h4>
                        <ul className="prize d-flex">
                          <li>$71.00</li>
                          <li className="old_prize">$78.00</li>
                        </ul>
                        <div className="action">
                          <div className="actions_inner">
                            <ul className="add_to_links">
                              <li>
                                <a className="cart" href="cart.html">
                                  <i className="bi bi-shopping-bag4" />
                                </a>
                              </li>
                              <li>
                                <a className="wishlist" href="wishlist.html">
                                  <i className="bi bi-shopping-cart-full" />
                                </a>
                              </li>
                              <li>
                                <a className="compare" href="#">
                                  <i className="bi bi-heart-beat" />
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="modal"
                                  title="Quick View"
                                  className="quickview modal-view detail-link"
                                  href="#productmodal"
                                >
                                  <i className="bi bi-search" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="product__hover--content">
                          <ul className="rating d-flex">
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li>
                              <i className="fa fa-star-o" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Start Single Product */}
                  {/* Start Single Product */}
                  <div className="product product__style--3">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                      <div className="product__thumb">
                        <a className="first__img" href="single-product.html">
                          <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1844/img/image_url-1596773606.crop-730x436.jpg" alt={"product image"} />
                        </a>
                        <div className="hot__box color--2">
                          <span className="hot-label">HOT</span>
                        </div>
                      </div>
                      <div className="product__content content--center">
                        <h4>
                          <a href="single-product.html">Account Coordinator</a>
                        </h4>
                        <ul className="prize d-flex">
                          <li>$83.00</li>
                          <li className="old_prize">$91.00</li>
                        </ul>
                        <div className="action">
                          <div className="actions_inner">
                            <ul className="add_to_links">
                              <li>
                                <a className="cart" href="cart.html">
                                  <i className="bi bi-shopping-bag4" />
                                </a>
                              </li>
                              <li>
                                <a className="wishlist" href="wishlist.html">
                                  <i className="bi bi-shopping-cart-full" />
                                </a>
                              </li>
                              <li>
                                <a className="compare" href="#">
                                  <i className="bi bi-heart-beat" />
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="modal"
                                  title="Quick View"
                                  className="quickview modal-view detail-link"
                                  href="#productmodal"
                                >
                                  <i className="bi bi-search" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="product__hover--content">
                          <ul className="rating d-flex">
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li>
                              <i className="fa fa-star-o" />
                            </li>
                            <li>
                              <i className="fa fa-star-o" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Start Single Product */}
                </div>
                <div className="single__product">
                  {/* Start Single Product */}
                  <div className="product product__style--3">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                      <div className="product__thumb">
                        <a className="first__img" href="single-product.html">
                          <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1844/img/image_url-1596773606.crop-730x436.jpg" alt={"product image"} />
                        </a>
                        <div className="hot__box color--2">
                          <span className="hot-label">HOT</span>
                        </div>
                      </div>
                      <div className="product__content content--center">
                        <h4>
                          <a href="single-product.html">Account Coordinator</a>
                        </h4>
                        <ul className="prize d-flex">
                          <li>$83.00</li>
                          <li className="old_prize">$91.00</li>
                        </ul>
                        <div className="action">
                          <div className="actions_inner">
                            <ul className="add_to_links">
                              <li>
                                <a className="cart" href="cart.html">
                                  <i className="bi bi-shopping-bag4" />
                                </a>
                              </li>
                              <li>
                                <a className="wishlist" href="wishlist.html">
                                  <i className="bi bi-shopping-cart-full" />
                                </a>
                              </li>
                              <li>
                                <a className="compare" href="#">
                                  <i className="bi bi-heart-beat" />
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="modal"
                                  title="Quick View"
                                  className="quickview modal-view detail-link"
                                  href="#productmodal"
                                >
                                  <i className="bi bi-search" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="product__hover--content">
                          <ul className="rating d-flex">
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li>
                              <i className="fa fa-star-o" />
                            </li>
                            <li>
                              <i className="fa fa-star-o" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Start Single Product */}
                  {/* Start Single Product */}
                  <div className="product product__style--3">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                      <div className="product__thumb">
                        <a className="first__img" href="single-product.html">
                          <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1241/img/video_cover_image_url-1600669475.crop-730x436.jpg" alt={"product image"} />
                        </a>
                        <div className="hot__box">
                          <span className="hot-label">BEST SALLER</span>
                        </div>
                      </div>
                      <div className="product__content content--center">
                        <h4>
                          <a href="single-product.html">Financial Analyst</a>
                        </h4>
                        <ul className="prize d-flex">
                          <li>$82.00</li>
                          <li className="old_prize">$90.00</li>
                        </ul>
                        <div className="action">
                          <div className="actions_inner">
                            <ul className="add_to_links">
                              <li>
                                <a className="cart" href="cart.html">
                                  <i className="bi bi-shopping-bag4" />
                                </a>
                              </li>
                              <li>
                                <a className="wishlist" href="wishlist.html">
                                  <i className="bi bi-shopping-cart-full" />
                                </a>
                              </li>
                              <li>
                                <a className="compare" href="#">
                                  <i className="bi bi-heart-beat" />
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="modal"
                                  title="Quick View"
                                  className="quickview modal-view detail-link"
                                  href="#productmodal"
                                >
                                  <i className="bi bi-search" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="product__hover--content">
                          <ul className="rating d-flex">
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Start Single Product */}
                </div>
                <div className="single__product">
                  {/* Start Single Product */}
                  <div className="product product__style--3">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                      <div className="product__thumb">
                        <a className="first__img" href="single-product.html">
                          <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1844/img/image_url-1596773606.crop-730x436.jpg" alt={"product image"} />
                        </a>
                        <div className="hot__box">
                          <span className="hot-label">BEST SALLER</span>
                        </div>
                      </div>
                      <div className="product__content content--center">
                        <h4>
                          <a href="single-product.html">Programmer Analyst IV</a>
                        </h4>
                        <ul className="prize d-flex">
                          <li>$71.00</li>
                          <li className="old_prize">$78.00</li>
                        </ul>
                        <div className="action">
                          <div className="actions_inner">
                            <ul className="add_to_links">
                              <li>
                                <a className="cart" href="cart.html">
                                  <i className="bi bi-shopping-bag4" />
                                </a>
                              </li>
                              <li>
                                <a className="wishlist" href="wishlist.html">
                                  <i className="bi bi-shopping-cart-full" />
                                </a>
                              </li>
                              <li>
                                <a className="compare" href="#">
                                  <i className="bi bi-heart-beat" />
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="modal"
                                  title="Quick View"
                                  className="quickview modal-view detail-link"
                                  href="#productmodal"
                                >
                                  <i className="bi bi-search" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="product__hover--content">
                          <ul className="rating d-flex">
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li>
                              <i className="fa fa-star-o" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Start Single Product */}
                  {/* Start Single Product */}
                  <div className="product product__style--3">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                      <div className="product__thumb">
                        <a className="first__img" href="single-product.html">
                          <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1241/img/video_cover_image_url-1600669475.crop-730x436.jpg" alt={"product image"} />
                        </a>
                        <div className="hot__box">
                          <span className="hot-label">BEST SALLER</span>
                        </div>
                      </div>
                      <div className="product__content content--center">
                        <h4>
                          <a href="single-product.html">Financial Analyst</a>
                        </h4>
                        <ul className="prize d-flex">
                          <li>$82.00</li>
                          <li className="old_prize">$90.00</li>
                        </ul>
                        <div className="action">
                          <div className="actions_inner">
                            <ul className="add_to_links">
                              <li>
                                <a className="cart" href="cart.html">
                                  <i className="bi bi-shopping-bag4" />
                                </a>
                              </li>
                              <li>
                                <a className="wishlist" href="wishlist.html">
                                  <i className="bi bi-shopping-cart-full" />
                                </a>
                              </li>
                              <li>
                                <a className="compare" href="#">
                                  <i className="bi bi-heart-beat" />
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="modal"
                                  title="Quick View"
                                  className="quickview modal-view detail-link"
                                  href="#productmodal"
                                >
                                  <i className="bi bi-search" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="product__hover--content">
                          <ul className="rating d-flex">
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Start Single Product */}
                </div>
                <div className="single__product">
                  {/* Start Single Product */}
                  <div className="product product__style--3">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                      <div className="product__thumb">
                        <a className="first__img" href="single-product.html">
                          <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1437/img/video_cover_image_url-1555384409.crop-730x436.jpg" alt={"product image"} />
                        </a>
                        <div className="hot__box">
                          <span className="hot-label">BEST SALLER</span>
                        </div>
                      </div>
                      <div className="product__content content--center">
                        <h4>
                          <a href="single-product.html">Programmer Analyst IV</a>
                        </h4>
                        <ul className="prize d-flex">
                          <li>$71.00</li>
                          <li className="old_prize">$78.00</li>
                        </ul>
                        <div className="action">
                          <div className="actions_inner">
                            <ul className="add_to_links">
                              <li>
                                <a className="cart" href="cart.html">
                                  <i className="bi bi-shopping-bag4" />
                                </a>
                              </li>
                              <li>
                                <a className="wishlist" href="wishlist.html">
                                  <i className="bi bi-shopping-cart-full" />
                                </a>
                              </li>
                              <li>
                                <a className="compare" href="#">
                                  <i className="bi bi-heart-beat" />
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="modal"
                                  title="Quick View"
                                  className="quickview modal-view detail-link"
                                  href="#productmodal"
                                >
                                  <i className="bi bi-search" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="product__hover--content">
                          <ul className="rating d-flex">
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li>
                              <i className="fa fa-star-o" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Start Single Product */}
                  {/* Start Single Product */}
                  <div className="product product__style--3">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                      <div className="product__thumb">
                        <a className="first__img" href="single-product.html">
                          <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1844/img/image_url-1596773606.crop-730x436.jpg" alt={"product image"} />
                        </a>
                        <div className="hot__box color--2">
                          <span className="hot-label">HOT</span>
                        </div>
                      </div>
                      <div className="product__content content--center">
                        <h4>
                          <a href="single-product.html">Account Coordinator</a>
                        </h4>
                        <ul className="prize d-flex">
                          <li>$83.00</li>
                          <li className="old_prize">$91.00</li>
                        </ul>
                        <div className="action">
                          <div className="actions_inner">
                            <ul className="add_to_links">
                              <li>
                                <a className="cart" href="cart.html">
                                  <i className="bi bi-shopping-bag4" />
                                </a>
                              </li>
                              <li>
                                <a className="wishlist" href="wishlist.html">
                                  <i className="bi bi-shopping-cart-full" />
                                </a>
                              </li>
                              <li>
                                <a className="compare" href="#">
                                  <i className="bi bi-heart-beat" />
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="modal"
                                  title="Quick View"
                                  className="quickview modal-view detail-link"
                                  href="#productmodal"
                                >
                                  <i className="bi bi-search" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="product__hover--content">
                          <ul className="rating d-flex">
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li>
                              <i className="fa fa-star-o" />
                            </li>
                            <li>
                              <i className="fa fa-star-o" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Start Single Product */}
                </div>
                <div className="single__product">
                  {/* Start Single Product */}
                  <div className="product product__style--3">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                      <div className="product__thumb">
                        <a className="first__img" href="single-product.html">
                          <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1844/img/image_url-1596773606.crop-730x436.jpg" alt={"product image"} />
                        </a>
                        <div className="hot__box color--2">
                          <span className="hot-label">HOT</span>
                        </div>
                      </div>
                      <div className="product__content content--center">
                        <h4>
                          <a href="single-product.html">Account Coordinator</a>
                        </h4>
                        <ul className="prize d-flex">
                          <li>$83.00</li>
                          <li className="old_prize">$91.00</li>
                        </ul>
                        <div className="action">
                          <div className="actions_inner">
                            <ul className="add_to_links">
                              <li>
                                <a className="cart" href="cart.html">
                                  <i className="bi bi-shopping-bag4" />
                                </a>
                              </li>
                              <li>
                                <a className="wishlist" href="wishlist.html">
                                  <i className="bi bi-shopping-cart-full" />
                                </a>
                              </li>
                              <li>
                                <a className="compare" href="#">
                                  <i className="bi bi-heart-beat" />
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="modal"
                                  title="Quick View"
                                  className="quickview modal-view detail-link"
                                  href="#productmodal"
                                >
                                  <i className="bi bi-search" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="product__hover--content">
                          <ul className="rating d-flex">
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li>
                              <i className="fa fa-star-o" />
                            </li>
                            <li>
                              <i className="fa fa-star-o" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Start Single Product */}
                  {/* Start Single Product */}
                  <div className="product product__style--3">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                      <div className="product__thumb">
                        <a className="first__img" href="single-product.html">
                          <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1241/img/video_cover_image_url-1600669475.crop-730x436.jpg" alt={"product image"} />
                        </a>
                        <div className="hot__box">
                          <span className="hot-label">BEST SALLER</span>
                        </div>
                      </div>
                      <div className="product__content content--center">
                        <h4>
                          <a href="single-product.html">Financial Analyst</a>
                        </h4>
                        <ul className="prize d-flex">
                          <li>$82.00</li>
                          <li className="old_prize">$90.00</li>
                        </ul>
                        <div className="action">
                          <div className="actions_inner">
                            <ul className="add_to_links">
                              <li>
                                <a className="cart" href="cart.html">
                                  <i className="bi bi-shopping-bag4" />
                                </a>
                              </li>
                              <li>
                                <a className="wishlist" href="wishlist.html">
                                  <i className="bi bi-shopping-cart-full" />
                                </a>
                              </li>
                              <li>
                                <a className="compare" href="#">
                                  <i className="bi bi-heart-beat" />
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="modal"
                                  title="Quick View"
                                  className="quickview modal-view detail-link"
                                  href="#productmodal"
                                >
                                  <i className="bi bi-search" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="product__hover--content">
                          <ul className="rating d-flex">
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                            <li className="on">
                              <i className="fa fa-star-o" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Start Single Product */}
                </div>
              </div>
            </div>
            {/* End Single Tab Content */}
            
          </div>
        </div>
      </section>
      {/* Start BEst Seller Area */}
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
                <h2 className="title__be--2">
                {language == "eng" ? `Best` : `Bán Chạy`} <span className="color--theme">{language == "eng" ? `Seller` : `Hàng Đầu`} </span>
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
        </div>
        <div className="slider center">
          {/* Single product start */}
          <div className="product product__style--3">
            <div className="product__thumb">
              <a className="first__img" href="single-product.html">
                <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1437/img/video_cover_image_url-1555384409.crop-730x436.jpg" alt={"product image"} />
              </a>
            </div>
            <div className="product__content content--center">
              <div className="action">
                <div className="actions_inner">
                  <ul className="add_to_links">
                    <li>
                      <a className="cart" href="cart.html">
                        <i className="bi bi-shopping-bag4" />
                      </a>
                    </li>
                    <li>
                      <a className="wishlist" href="wishlist.html">
                        <i className="bi bi-shopping-cart-full" />
                      </a>
                    </li>
                    <li>
                      <a className="compare" href="#">
                        <i className="bi bi-heart-beat" />
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="modal"
                        title="Quick View"
                        className="quickview modal-view detail-link"
                        href="#productmodal"
                      >
                        <i className="bi bi-search" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product__hover--content">
                <ul className="rating d-flex">
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single product end */}
          {/* Single product start */}
          <div className="product product__style--3">
            <div className="product__thumb">
              <a className="first__img" href="single-product.html">
                <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1844/img/image_url-1596773606.crop-730x436.jpg" alt={"product image"} />
              </a>
            </div>
            <div className="product__content content--center">
              <div className="action">
                <div className="actions_inner">
                  <ul className="add_to_links">
                    <li>
                      <a className="cart" href="cart.html">
                        <i className="bi bi-shopping-bag4" />
                      </a>
                    </li>
                    <li>
                      <a className="wishlist" href="wishlist.html">
                        <i className="bi bi-shopping-cart-full" />
                      </a>
                    </li>
                    <li>
                      <a className="compare" href="#">
                        <i className="bi bi-heart-beat" />
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="modal"
                        title="Quick View"
                        className="quickview modal-view detail-link"
                        href="#productmodal"
                      >
                        <i className="bi bi-search" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product__hover--content">
                <ul className="rating d-flex">
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single product end */}
          {/* Single product start */}
          <div className="product product__style--3">
            <div className="product__thumb">
              <a className="first__img" href="single-product.html">
                <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1241/img/video_cover_image_url-1600669475.crop-730x436.jpg" alt={"product image"} />
              </a>
            </div>
            <div className="product__content content--center">
              <div className="action">
                <div className="actions_inner">
                  <ul className="add_to_links">
                    <li>
                      <a className="cart" href="cart.html">
                        <i className="bi bi-shopping-bag4" />
                      </a>
                    </li>
                    <li>
                      <a className="wishlist" href="wishlist.html">
                        <i className="bi bi-shopping-cart-full" />
                      </a>
                    </li>
                    <li>
                      <a className="compare" href="#">
                        <i className="bi bi-heart-beat" />
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="modal"
                        title="Quick View"
                        className="quickview modal-view detail-link"
                        href="#productmodal"
                      >
                        <i className="bi bi-search" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product__hover--content">
                <ul className="rating d-flex">
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single product end */}
          {/* Single product start */}
          <div className="product product__style--3">
            <div className="product__thumb">
              <a className="first__img" href="single-product.html">
                <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1241/img/video_cover_image_url-1600669475.crop-730x436.jpg" alt={"product image"} />
              </a>
            </div>
            <div className="product__content content--center">
              <div className="action">
                <div className="actions_inner">
                  <ul className="add_to_links">
                    <li>
                      <a className="cart" href="cart.html">
                        <i className="bi bi-shopping-bag4" />
                      </a>
                    </li>
                    <li>
                      <a className="wishlist" href="wishlist.html">
                        <i className="bi bi-shopping-cart-full" />
                      </a>
                    </li>
                    <li>
                      <a className="compare" href="#">
                        <i className="bi bi-heart-beat" />
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="modal"
                        title="Quick View"
                        className="quickview modal-view detail-link"
                        href="#productmodal"
                      >
                        <i className="bi bi-search" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product__hover--content">
                <ul className="rating d-flex">
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single product end */}
          {/* Single product start */}
          <div className="product product__style--3">
            <div className="product__thumb">
              <a className="first__img" href="single-product.html">
                <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1437/img/video_cover_image_url-1555384409.crop-730x436.jpg" alt={"product image"} />
              </a>
            </div>
            <div className="product__content content--center">
              <div className="action">
                <div className="actions_inner">
                  <ul className="add_to_links">
                    <li>
                      <a className="cart" href="cart.html">
                        <i className="bi bi-shopping-bag4" />
                      </a>
                    </li>
                    <li>
                      <a className="wishlist" href="wishlist.html">
                        <i className="bi bi-shopping-cart-full" />
                      </a>
                    </li>
                    <li>
                      <a className="compare" href="#">
                        <i className="bi bi-heart-beat" />
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="modal"
                        title="Quick View"
                        className="quickview modal-view detail-link"
                        href="#productmodal"
                      >
                        <i className="bi bi-search" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product__hover--content">
                <ul className="rating d-flex">
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single product end */}
          {/* Single product start */}
          <div className="product product__style--3">
            <div className="product__thumb">
              <a className="first__img" href="single-product.html">
                <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1844/img/image_url-1596773606.crop-730x436.jpg" alt={"product image"} />
              </a>
            </div>
            <div className="product__content content--center">
              <div className="action">
                <div className="actions_inner">
                  <ul className="add_to_links">
                    <li>
                      <a className="cart" href="cart.html">
                        <i className="bi bi-shopping-bag4" />
                      </a>
                    </li>
                    <li>
                      <a className="wishlist" href="wishlist.html">
                        <i className="bi bi-shopping-cart-full" />
                      </a>
                    </li>
                    <li>
                      <a className="compare" href="#">
                        <i className="bi bi-heart-beat" />
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="modal"
                        title="Quick View"
                        className="quickview modal-view detail-link"
                        href="#productmodal"
                      >
                        <i className="bi bi-search" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product__hover--content">
                <ul className="rating d-flex">
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single product end */}
          {/* Single product start */}
          <div className="product product__style--3">
            <div className="product__thumb">
              <a className="first__img" href="single-product.html">
                <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1241/img/video_cover_image_url-1600669475.crop-730x436.jpg" alt={"product image"} />
              </a>
            </div>
            <div className="product__content content--center">
              <div className="action">
                <div className="actions_inner">
                  <ul className="add_to_links">
                    <li>
                      <a className="cart" href="cart.html">
                        <i className="bi bi-shopping-bag4" />
                      </a>
                    </li>
                    <li>
                      <a className="wishlist" href="wishlist.html">
                        <i className="bi bi-shopping-cart-full" />
                      </a>
                    </li>
                    <li>
                      <a className="compare" href="#">
                        <i className="bi bi-heart-beat" />
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="modal"
                        title="Quick View"
                        className="quickview modal-view detail-link"
                        href="#productmodal"
                      >
                        <i className="bi bi-search" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product__hover--content">
                <ul className="rating d-flex">
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single product end */}
          {/* Single product start */}
          <div className="product product__style--3">
            <div className="product__thumb">
              <a className="first__img" href="single-product.html">
                <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1241/img/video_cover_image_url-1600669475.crop-730x436.jpg" alt={"product image"} />
              </a>
            </div>
            <div className="product__content content--center">
              <div className="action">
                <div className="actions_inner">
                  <ul className="add_to_links">
                    <li>
                      <a className="cart" href="cart.html">
                        <i className="bi bi-shopping-bag4" />
                      </a>
                    </li>
                    <li>
                      <a className="wishlist" href="wishlist.html">
                        <i className="bi bi-shopping-cart-full" />
                      </a>
                    </li>
                    <li>
                      <a className="compare" href="#">
                        <i className="bi bi-heart-beat" />
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="modal"
                        title="Quick View"
                        className="quickview modal-view detail-link"
                        href="#productmodal"
                      >
                        <i className="bi bi-search" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product__hover--content">
                <ul className="rating d-flex">
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li className="on">
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                  <li>
                    <i className="fa fa-star-o" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single product end */}
        </div>
      </section>
      {/* Best Sale Area */}
      <Footer/>
    </>
    )
}

export default Home