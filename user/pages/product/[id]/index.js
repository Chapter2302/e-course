import {useState} from "react"
import {useDispatch} from "react-redux"
import HeadContent from "../../../component/head"
import Header from "../../../component/header"
import Footer from "../../../component/footer"
import StarRate from "../../../component/starRate"
import ReactStars from "react-rating-stars-component"
import {addToCart} from "../../../store/cart"
import {update} from "../../../api"

const Product = ({course, reviews}) => {
  const dispatch = useDispatch()
  const [stars, setStars] = useState(null)
  const [reviewContent, setReviewContent] = useState("")
  const addToCartClick = () => {
    try {
      const items = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
      const item = {
        id: course._id,
        name: course.name,
        price: course.price,
        picture: course.pictures[0]
      }
      if(!items.some(val => { return val.id == item.id })) {
        items.push(item)
        localStorage.setItem("cart", JSON.stringify(items))
        dispatch(addToCart(item))
        alert("Success: Check Your Cart")
      }
      else {
        alert("Fail: Course Existed")
      }
    }
    catch(e) {
      alert("Fail: Sorry, Try Later")
    }
  }

  return(
  <>
    <HeadContent title={'Product'}/>
    <Header/>
    {/* Start Search Popup */}
    <div className="box-search-content search_active block-bg close__top">
      <form id="search_mini_form" className="minisearch" action="#">
        <div className="field__search">
          <input type="text" placeholder="Search entire store here..." />
          <div className="action">
            <a href="#">
              <i className="zmdi zmdi-search" />
            </a>
          </div>
        </div>
      </form>
      <div className="close__wrap">
        <span>close</span>
      </div>
    </div>
    {/* End Search Popup */}
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
                        <img src={course.pictures[0]} alt={""}/>
                      </a>
                      <a href="#">
                        <img src={course.pictures[1]} alt={""}/>
                      </a>
                      <a href="#">
                        <img src={course.pictures[2]} alt={""}/>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="product__info__main">
                    <h1>Chaz Kangeroo Hoodie</h1>
                    <div className="product-reviews-summary d-flex">
                      <ul className="rating-summary d-flex">
                        <li>
                          <i className="zmdi zmdi-star-outline" />
                        </li>
                        <li>
                          <i className="zmdi zmdi-star-outline" />
                        </li>
                        <li>
                          <i className="zmdi zmdi-star-outline" />
                        </li>
                        <li className="off">
                          <i className="zmdi zmdi-star-outline" />
                        </li>
                        <li className="off">
                          <i className="zmdi zmdi-star-outline" />
                        </li>
                      </ul>
                    </div>
                    <div className="price-box">
                      <span>$52.00</span>
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
                    <div className="product_meta">
                      <span className="posted_in">
                        Categories:
                        <a href="#">Adventure</a>,<a href="#">Kids' Music</a>
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
                  id="nav-details"
                  role="tabpanel"
                >
                  <div className="description__attribute">
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
                {/* End Single Tab Content */}
                {/* Start Single Tab Content */}
                <div
                  className="pro__tab_label tab-pane fade"
                  id="nav-review"
                  role="tabpanel"
                >
                  <div className="review__attribute" style={{maxHeight: "250px", overflowY: "visible", overflowX: "hidden"}}>
                    {
                      (() => {
                        return reviews.map((review, i) => {
                          return(<React.Fragment key={i}>
                            <div className="form-row mt-4 mb-4">
                              <div className="col-2 w-20">
                                <img src={review.photoUser}/>
                              </div>
                              <div className="col-10">
                                <div><b>Name:</b> {review.fullName}</div>
                                <div><b>Review:</b> {review.review}</div>
                                <div><b>Rate:</b><StarRate stars={review.rating}/></div>
                              </div>
                            </div>
                            {i == reviews.length-1 ? <></> : <hr/>}
                          </React.Fragment>)
                        })
                      })()
                    }
                  </div>
                  <div className="review-fieldset">
                    <h2 className="form-group">Reviewing: <b>Chaz Kangeroo Hoodie</b></h2>
                    <div className="review_form_field">
                      <div className="form-group">
                        <h4>Rating:</h4>
                        <ReactStars count={5}
                          size={30}
                          onChange={newStars => setStars(newStars)}
                          emptyIcon={<i className="far fa-star"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#eb0e42" 
                        />  
                      </div>
                      <div className="form-group">
                        <h4>Review:</h4>
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
                                alert("Fail: Transaction Error. Try Later")
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
                        <img src="/images/books/1.jpg" alt={"product image"}/>
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/2.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">BEST SALLER</span>
                      </div>
                    </div>
                    <div className="product__content content--center">
                      <h4>
                        <a href="single-product.html">robin parrish</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$35.00</li>
                        <li className="old_prize">$35.00</li>
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
                        <img src="/images/books/3.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/4.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box color--2">
                        <span className="hot-label">HOT</span>
                      </div>
                    </div>
                    <div className="product__content content--center">
                      <h4>
                        <a href="single-product.html">The Remainng</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$35.00</li>
                        <li className="old_prize">$35.00</li>
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
                        <img src="/images/books/7.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/8.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">HOT</span>
                      </div>
                    </div>
                    <div className="product__content content--center">
                      <h4>
                        <a href="single-product.html">Lando</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$35.00</li>
                        <li className="old_prize">$50.00</li>
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
                        <img src="/images/books/9.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/10.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">HOT</span>
                      </div>
                    </div>
                    <div className="product__content content--center">
                      <h4>
                        <a href="single-product.html">Doctor Wldo</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$35.00</li>
                        <li className="old_prize">$35.00</li>
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
                        <img src="/images/books/11.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/2.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">BEST SALER</span>
                      </div>
                    </div>
                    <div className="product__content content--center content--center">
                      <h4>
                        <a href="single-product.html">Animals Life</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$50.00</li>
                        <li className="old_prize">$35.00</li>
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
                        <img src="/images/books/1.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/6.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">BEST SALER</span>
                      </div>
                    </div>
                    <div className="product__content content--center content--center">
                      <h4>
                        <a href="single-product.html">Olio Madu</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$50.00</li>
                        <li className="old_prize">$35.00</li>
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
            <div className="wn__related__product">
              <div className="section__title text-center">
                <h2 className="title__be--2">upsell products</h2>
              </div>
              <div className="row mt--60">
                <div className="productcategory__slide--2 arrows_style owl-carousel owl-theme">
                  {/* Start Single Product */}
                  <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="product__thumb">
                      <a className="first__img" href="single-product.html">
                        <img src="/images/books/1.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/2.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">BEST SALLER</span>
                      </div>
                    </div>
                    <div className="product__content content--center">
                      <h4>
                        <a href="single-product.html">robin parrish</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$35.00</li>
                        <li className="old_prize">$35.00</li>
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
                        <img src="/images/books/3.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/4.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box color--2">
                        <span className="hot-label">HOT</span>
                      </div>
                    </div>
                    <div className="product__content content--center">
                      <h4>
                        <a href="single-product.html">The Remainng</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$35.00</li>
                        <li className="old_prize">$35.00</li>
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
                        <img src="/images/books/7.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/8.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">HOT</span>
                      </div>
                    </div>
                    <div className="product__content content--center">
                      <h4>
                        <a href="single-product.html">Lando</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$35.00</li>
                        <li className="old_prize">$50.00</li>
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
                        <img src="/images/books/9.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/10.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">HOT</span>
                      </div>
                    </div>
                    <div className="product__content content--center">
                      <h4>
                        <a href="single-product.html">Doctor Wldo</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$35.00</li>
                        <li className="old_prize">$35.00</li>
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
                        <img src="/images/books/11.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/2.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">BEST SALER</span>
                      </div>
                    </div>
                    <div className="product__content content--center content--center">
                      <h4>
                        <a href="single-product.html">Animals Life</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$50.00</li>
                        <li className="old_prize">$35.00</li>
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
                        <img src="/images/books/1.jpg" alt={"product image"} />
                      </a>
                      <a
                        className="second__img animation1"
                        href="single-product.html"
                      >
                        <img src="/images/books/6.jpg" alt={"product image"} />
                      </a>
                      <div className="hot__box">
                        <span className="hot-label">BEST SALER</span>
                      </div>
                    </div>
                    <div className="product__content content--center content--center">
                      <h4>
                        <a href="single-product.html">Olio Madu</a>
                      </h4>
                      <ul className="prize d-flex">
                        <li>$50.00</li>
                        <li className="old_prize">$35.00</li>
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
                <h3 className="wedget__title">Product Categories</h3>
                <ul>
                  <li>
                    <a href="#">
                      Biography <span>(3)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Business <span>(4)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Cookbooks <span>(6)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Health &amp; Fitness <span>(7)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      History <span>(8)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Mystery <span>(9)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Inspiration <span>(13)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Romance <span>(20)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Fiction/Fantasy <span>(22)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Self-Improvement <span>(13)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Humor Books <span>(17)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Harry Potter <span>(20)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Land of Stories <span>(34)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Kids' Music <span>(60)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Toys &amp; Games <span>(3)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      hoodies <span>(3)</span>
                    </a>
                  </li>
                </ul>
              </aside>
              <aside className="wedget__categories pro--range">
                <h3 className="wedget__title">Filter by price</h3>
                <div className="content-shopby">
                  <div className="price_filter s-filter clear">
                    <form action="#" method="GET">
                      <div id="slider-range" />
                      <div className="slider__range--output">
                        <div className="price__output--wrap">
                          <div className="price--output">
                            <span>Price :</span>
                            <input type="text" id="amount" readOnly />
                          </div>
                          <div className="price--filter">
                            <a href="#">Filter</a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </aside>
              <aside className="wedget__categories poroduct--compare">
                <h3 className="wedget__title">Compare</h3>
                <ul>
                  <li>
                    <a href="#">x</a>
                    <a href="#">Condimentum posuere</a>
                  </li>
                  <li>
                    <a href="#">x</a>
                    <a href="#">Condimentum posuere</a>
                  </li>
                  <li>
                    <a href="#">x</a>
                    <a href="#">Dignissim venenatis</a>
                  </li>
                </ul>
              </aside>
              <aside className="wedget__categories poroduct--tag">
                <h3 className="wedget__title">Product Tags</h3>
                <ul>
                  <li>
                    <a href="#">Biography</a>
                  </li>
                  <li>
                    <a href="#">Business</a>
                  </li>
                  <li>
                    <a href="#">Cookbooks</a>
                  </li>
                  <li>
                    <a href="#">Health &amp; Fitness</a>
                  </li>
                  <li>
                    <a href="#">History</a>
                  </li>
                  <li>
                    <a href="#">Mystery</a>
                  </li>
                  <li>
                    <a href="#">Inspiration</a>
                  </li>
                  <li>
                    <a href="#">Religion</a>
                  </li>
                  <li>
                    <a href="#">Fiction</a>
                  </li>
                  <li>
                    <a href="#">Fantasy</a>
                  </li>
                  <li>
                    <a href="#">Music</a>
                  </li>
                  <li>
                    <a href="#">Toys</a>
                  </li>
                  <li>
                    <a href="#">Hoodies</a>
                  </li>
                </ul>
              </aside>
              <aside className="wedget__categories sidebar--banner">
                <img src="/images/others/banner_left.jpg" alt={"banner images"} />
                <div className="text">
                  <h2>new products</h2>
                  <h6>
                    save up to <br /> <strong>40%</strong>off
                  </h6>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End main Content */}
    {/* Start Search Popup */}
    <div className="box-search-content search_active block-bg close__top">
      <form id="search_mini_form--2" className="minisearch" action="#">
        <div className="field__search">
          <input type="text" placeholder="Search entire store here..." />
          <div className="action">
            <a href="#">
              <i className="zmdi zmdi-search" />
            </a>
          </div>
        </div>
      </form>
      <div className="close__wrap">
        <span>close</span>
      </div>
    </div>
    {/* End Search Popup */}
    <Footer/>
  </>
  )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:4000/course/get-all-guess')
  const courses = await res.json()
  // Get the paths we want to pre-render based on posts
  const paths = courses.map((course) => ({
    params: { id: String(course._id) },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`http://localhost:4000/course/get/${params.id}`)
  const data = await res.json()
  // Pass post data to the page via props
  return { props: { course: data.course, reviews: data.reviews } }
}

export default Product