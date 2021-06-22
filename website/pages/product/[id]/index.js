import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import styles from './index.module.scss'
import cx from 'classnames'
import HeadContent from "../../../component/head"
import Header from "../../../component/header"
import Footer from "../../../component/footer"
import StarRate from "../../../component/starRate"
import ReactStars from "react-rating-stars-component"
import { addToCart } from "../../../store/cart"
import { setReciever, setIsOpen } from "../../../store/chat"
import { getUser, update } from "../../../api"
import Alert from "../../../component/Alert"

const Product = ({course, reviews, teacher}) => {
  const dispatch = useDispatch()
  const language = useSelector(state => state.language.nation)
  const [stars, setStars] = useState(null)
  const [reviewContent, setReviewContent] = useState("")
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState(null)

  useEffect(() => {
    const videos = document.getElementsByClassName("video-lesson")
    const videoDurations = document.getElementsByClassName("video-duration-lesson")
    for(let i=0; i<videos.length; i++) {
      videos[i].addEventListener('loadedmetadata', () => {
        var duration = videos[i].duration
        videoDurations[i].textContent = (new Date(duration * 1000).toISOString().substr(11, 8))
      });
    }
  }, [])

  useEffect(() => {
    if(!alertMessage && !alertType) {
      setInterval(() => {
        setAlertType(null)
        setAlertMessage(null)
      }, 8000);
    }
  }, [alertMessage, alertType])

  const teacherChatButtonClick = () => {
    dispatch(setReciever({ 
      id: teacher._id, 
      name: teacher.full_name, 
      avatar: teacher.avatar
    }))

    dispatch(setIsOpen({ isOpen: true }))
  }

  const addToCartClick = () => {
    try {
      const items = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
      const item = {
        id: course._id,
        name: course.name,
        price: course.price,
        featuredImage: course.featured_image
      }
      if(!items.some(val => { return val.id == item.id })) {
        items.push(item)
        localStorage.setItem("cart", JSON.stringify(items))
        dispatch(addToCart(item))
        setAlertType("success")
        setAlertMessage("Check Your Cart")
      }
      else {
        setAlertType("danger")
        setAlertMessage("Course Existed")
      }
    }
    catch(e) {
      setAlertType("danger")
      setAlertMessage("Sorry, Try Later")
    }
  }

  return(
  <>
    <HeadContent title={'Product'}/>
    <Header/>
    {/* Start Bradcaump area */}
    <div className="ht__bradcaump__area bg-image--4">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="bradcaump__inner text-center">
              <h2 className="bradcaump-title">Shop Single</h2>
              <nav className="bradcaump-content">
                <a className="breadcrumb_item" href="index.html">
                  Home
                </a>
                <span className="brd-separetor">/</span>
                <span className="breadcrumb_item active">Shop Single</span>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Bradcaump area */}
    {/* Start main Content */}
    <div className="maincontent bg--white pt--80 pb--55">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-12">
            <div className="wn__single__product">
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="wn__fotorama__wrapper">
                    <div
                      className="fotorama wn__fotorama__action"
                      data-nav="thumbs"
                    >
                      <a href="#">
                        <img src={course.featured_image} alt={""}/>
                      </a>
                    </div>
                  </div>
                  <div className="py-4 product__info__main">
                    <div className="product_meta">
                      <span className="posted_in">
                        Categories:
                        <a href="#">{` ${course.category}`}</a>
                      </span>
                    </div>
                    <div className="product-share">
                      <ul>
                        <li className="categories-title">Share :</li>
                        <li>
                          <a href="#">
                            <i className="icon-social-twitter icons" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon-social-tumblr icons" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon-social-facebook icons" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon-social-linkedin icons" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="product__info__main">
                    <h1>{course.name}</h1>
                    <div className="product-reviews-summary d-flex">
                      <StarRate stars={course.rating}/>
                    </div>
                    <div className="price-box">
                      <span>${course.price}.00</span>
                    </div>
                    <div className="product__overview">
                      <p>
                        Ideal for cold-weather training or work outdoors, the Chaz
                        Hoodie promises superior warmth with every wear. Thick
                        material blocks out the wind as ribbed cuffs and bottom
                        band seal in body heat.
                      </p>
                      <p>
                        Ideal for cold-weather training or work outdoors, the Chaz
                        Hoodie promises superior warmth with every wear.{" "}
                      </p>
                    </div>
                    <Alert type={alertType} message={alertMessage}/>
                    <div className="box-tocart d-flex">
                      <div className="addtocart__actions">
                        <button
                          className="tocart"
                          type="submit"
                          title="Add to Cart"
                          onClick={addToCartClick}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div className="product-addto-links clearfix">
                        <a className="wishlist" href="#" />
                        <a className="compare" href="#" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product__info__detailed">
              <div
                className="pro_details_nav nav justify-content-start"
                role="tablist"
              >
                <a
                  className="nav-item nav-link active"
                  data-toggle="tab"
                  href="#nav-syllabus"
                  role="tab"
                >
                  Syllabus
                </a>
                <a
                  className="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-details"
                  role="tab"
                >
                  Details
                </a>
                <a
                  className="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-review"
                  role="tab"
                >
                  Reviews
                </a>
              </div>
              <div className="tab__container">
                {/* Start Single Tab Content */}
                <div
                  className="pro__tab_label tab-pane fade show active"
                  id="nav-syllabus"
                  role="tabpanel"
                >
                  <div id="accordion" className="checkout_accordion mt--30" role="tablist">
                    {
                      (() => {
                        return course.content.map(part => {
                          return(
                            <div key={'part-' + part.index} className="payment">
                              <div className="che__header" role="tab" id={`heading${part.index}`}>
                                <a className="checkout__title collapsed" data-toggle="collapse" href={`#part${part.index}`} aria-expanded="false" aria-controls={`part${part.index}`}>
                                  <i className="zmdi zmdi-minus-square mr-2"></i> <span className="mr-2">Part {part.index}:</span> {part.name}
                                </a>
                              </div>
                              <div id={`part${part.index}`} className="collapse" role="tabpanel" aria-labelledby={`heading${part.index}`} data-parent="#accordion">
                                {
                                  part.lessons.map(lesson => {
                                    return(
                                      <div key={'lesson-' + lesson.index} className="payment-body d-block d-md-flex align-items-center ml-2">
                                        <video className="video-lesson mr-0 mr-md-4" width={140} height={100} src={lesson.videoUrl} controls></video>
                                        <div style={{cursor: "pointer", width: "100%", fontSize: "14px"}} className="d-block d-md-flex justify-content-between align-items-center">
                                          <div className="d-flex justify-content-center">
                                            <div className="mr-2"><i className="zmdi zmdi-play-circle mr-2"></i> Lesson {lesson.index}:</div> 
                                            <a href={lesson.videoUrl} target="_blank">{lesson.name}</a>
                                          </div>
                                          <div className="d-flex justify-content-center video-duration-lesson mr-2">00:00:00</div>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                                {
                                  (() => {
                                    
                                  })()
                                }
                              </div>
                            </div>
                          )
                        })
                      })()
                    }
                  </div>
                </div>
                {/* End Single Tab Content */}
                {/* Start Single Tab Content */}
                <div
                  className="pro__tab_label tab-pane fade"
                  id="nav-details"
                  role="tabpanel"
                >
                  <div className="description__attribute">
                    <div style={{paddingBottom: "50px"}}>
                      <h3 className="pb-4">TEACHER:</h3>
                      <div className="d-block d-md-flex">
                        <div className="d-flex justify-content-center mb-2 mb-md-0">
                          <img className={styles.teacherAvatar} src={teacher.avatar}/>
                        </div>
                        <div>
                          <div className="d-flex justify-content-between align-items-center pb-3">
                            <h4 className="pr-3">{teacher.full_name}</h4>
                            <div className={cx(styles.chatButton, "mr-4")} onClick={teacherChatButtonClick}>
                              <i className="pr-2 fa fa-paper-plane"></i> Chat
                            </div>
                          </div>
                          <p>{teacher.bio}</p>
                          <div>
                            <b className="pr-2">Email:</b> 
                            <a href="#">{teacher.local_email || teacher.google_email}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="pb-4">ABOUT COURSE:</h3>
                      <p>
                        Ideal for cold-weather training or work outdoors, the Chaz
                        Hoodie promises superior warmth with every wear. Thick
                        material blocks out the wind as ribbed cuffs and bottom band
                        seal in body heat.Ideal for cold-weather training or work
                        outdoors, the Chaz Hoodie promises superior warmth with
                        every wear. Thick material blocks out the wind as ribbed
                        cuffs and bottom band seal in body heat.Ideal for
                        cold-weather training or work outdoors, the Chaz Hoodie
                        promises superior warmth with every wear. Thick material
                        blocks out the wind as ribbed cuffs and bottom band seal in
                        body heat.Ideal for cold-weather training or work outdoors,
                        the Chaz Hoodie promises superior warmth with every wear.
                        Thick material blocks out the wind as ribbed cuffs and
                        bottom band seal in body heat.
                      </p>
                      <ul>
                        <li>• Two-tone gray heather hoodie.</li>
                        <li>• Drawstring-adjustable hood. </li>
                        <li>• Machine wash/dry.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* End Single Tab Content */}
                {/* Start Single Tab Content */}
                <div
                  className="pro__tab_label tab-pane fade"
                  id="nav-review"
                  role="tabpanel"
                >
                  <div className="review__attribute" style={{maxHeight: "300px", overflowY: "visible", overflowX: "hidden"}}>
                    {
                      (() => {
                        if(reviews.length == 0) {
                          return (<div>{language == "eng" ? "There is no comment on this course" : "Không có bình luận về khóa học"}</div>)
                        } else {
                          return reviews.map((review, i) => {
                            return(<React.Fragment key={i}>
                              <div className={i == 0 ? 'd-flex mb-2' : 'd-flex mt-2 mb-2'}>
                                <div className="d-flex align-items-center mr-4">
                                  <img style={{maxWidth: 'unset !important'}} width="80" height="80" src={review.avatar}/>
                                </div>
                                <div>
                                  <div><b>Name:</b> {review.full_name}</div>
                                  <div><b>Review:</b> {review.review}</div>
                                  <div className="d-flex"><b className="mr-2">Rate:</b><StarRate stars={review.rating}/></div>
                                </div>
                              </div>
                              {i == reviews.length-1 ? <></> : <hr/>}
                            </React.Fragment>)
                          })
                        }
                      })()
                    }
                  </div>
                  <div className="review-fieldset">
                    <div className="review_form_field">
                      <div className="form-group d-flex mb-4">
                        <h4 className="mr-4">Rating:</h4>
                        <ReactStars count={5}
                          size={30}
                          onChange={newStars => setStars(newStars)}
                          char="✩"
                          emptyIcon={<i className="far fa-star"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#e59285"
                        />  
                      </div>
                      <div className="form-group">
                        <h4 className="mb-2">Review:</h4>
                        <textarea className="form-control" name="review" defaultValue={""} onBlur={e => setReviewContent(e.target.value)}/>
                      </div>
                      <div className="review-form-actions">
                        <button onClick={async () => {
                          try {
                            if(localStorage.getItem("session")) {
                              const user = JSON.parse(localStorage.getItem("session")).id
                              const data = {
                                user,
                                course: course._id,
                                review: reviewContent
                              }
                              if(stars) data.rating = stars
                              const response = await update("trans", data)
                              if(response.status == 200)
                                alert("Success: Reviewed")
                              else
                                alert("Fail: Own This Course To Comment")
                            }
                            else {
                              alert("Fail: Login Please")
                            }
                          }
                          catch {
                            alert("Fail: Try Later")
                          }
                        }}>Submit Review</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Single Tab Content */}
              </div>
            </div>
            <div className="wn__related__product pt--80 pb--50">
              <div className="section__title text-center">
                <h2 className="title__be--2">Related Products</h2>
              </div>
              <div className="row mt--60">
                <div className="productcategory__slide--2 arrows_style owl-carousel owl-theme">
                  {/* Start Single Product */}
                  <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="product__thumb">
                      <a className="first__img" href="single-product.html">
                        <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1241/img/video_cover_image_url-1600669475.crop-730x436.jpg" alt={"product image"}/>
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">BEST SALLER</span>
                      </div>
                    </div>
                    <div className="product__content content--center">
                      <h4>
                        <a href="single-product.html">Human Resources Assistant III</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$89.00</li>
                        <li className="old_prize">$97.00</li>
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
                  {/* Start Single Product */}
                  {/* Start Single Product */}
                  <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="product__thumb">
                      <a className="first__img" href="single-product.html">
                        <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1437/img/video_cover_image_url-1555384409.crop-730x436.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box color--2">
                        <span className="hot-label">HOT</span>
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
                  {/* Start Single Product */}
                  {/* Start Single Product */}
                  <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="product__thumb">
                      <a className="first__img" href="single-product.html">
                        <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1844/img/image_url-1596773606.crop-730x436.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">HOT</span>
                      </div>
                    </div>
                    <div className="product__content content--center">
                      <h4>
                        <a href="single-product.html">Web Developer III</a>
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
                  {/* Start Single Product */}
                  {/* Start Single Product */}
                  <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="product__thumb">
                      <a className="first__img" href="single-product.html">
                        <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1241/img/video_cover_image_url-1600669475.crop-730x436.jpg" alt={"product image"}/>
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1437/img/video_cover_image_url-1555384409.crop-730x436.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">BEST SALLER</span>
                      </div>
                    </div>
                    <div className="product__content content--center">
                      <h4>
                        <a href="single-product.html">Human Resources Assistant III</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$89.00</li>
                        <li className="old_prize">$97.00</li>
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
                  {/* Start Single Product */}
                  {/* Start Single Product */}
                  <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="product__thumb">
                      <a className="first__img" href="single-product.html">
                        <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1437/img/video_cover_image_url-1555384409.crop-730x436.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/1844/img/image_url-1596773606.crop-730x436.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box color--2">
                        <span className="hot-label">HOT</span>
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
                  {/* Start Single Product */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-12 md-mt-40 sm-mt-40">
            <div className="shop__sidebar">
            <aside className="wedget__categories poroduct--cat">
              <h3 className="wedget__title">{language == "eng" ? "Filter By Categories" : "Lọc Theo Danh Mục"}</h3>
                <ul>
                  <li>
                    <a href="/shop">
                      {language == "eng" ? "All" : "Tất Cả"}
                    </a>
                  </li>
                  <li>
                    <a href="/shop?category=information+technology">
                      {language == "eng" ? "Information Technology" : "Công nghệ thông tin"}
                    </a>
                  </li>
                  <li>
                    <a href="/shop?category=marketing">
                        Marketing 
                    </a>
                  </li>
                  <li>
                    <a href="/shop?category=economy">
                        {language == "eng" ? "Economy" : "Kinh Tế"}
                      </a>
                  </li>
                  <li>
                    <a href="/shop?category=design">
                        {language == "eng" ? "Design" : "Thiết Kế"}
                    </a>
                  </li>
                  <li>
                    <a href="/shop?category=language">
                        Language
                    </a>
                  </li>
                  </ul>
              </aside>
              <aside className="wedget__categories pro--range">
                <h3 className="wedget__title">{language == "eng" ? "Filter By Price" : "Lọc Theo Giá"}</h3>
                <div className="content-shopby">
                    <div className="price_filter s-filter clear">
                    <form action="#" method="GET">
                        <div
                            id="slider-range"
                            className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
                        ></div>
                        <div className="slider__range--output">
                        <div className="price__output--wrap">
                            <div className="price--output">
                                <span>Price :</span> 
                                $<span id="minPrice">0</span> - 
                                $<span id="maxPrice">200</span>
                            </div>
                            <div className="price--filter float-right">
                                <a href="#">Filter</a>
                            </div>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
              </aside>
              <aside className="wedget__categories poroduct--tag">
                <h3 className="wedget__title">Product Tags</h3>
                <ul>
                  <li>
                    <a href="#">
                        Information Technology
                    </a>
                  </li>
                  <li>
                    <a href="#">
                        Marketing
                    </a>
                  </li>
                  <li>
                    <a href="#">
                        Economy
                    </a>
                  </li>
                  <li>
                    <a href="#">
                        Design
                    </a>
                  </li>
                  <li>
                    <a href="#">
                        Language
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End main Content */}
    <Footer/>
  </>
  )
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:4000/course/get-all-guess')
  const courses = await res.json()
  const paths = courses.map((course) => ({
    params: { id: String(course._id) },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res1 = await fetch(`http://localhost:4000/course/${params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await res1.json()

  const { course, reviews } = data

  const res2 = await getUser({ id: course.teacher })
  const teacher = await res2.json()

  return { props: { course, reviews, teacher } }
}

export default Product