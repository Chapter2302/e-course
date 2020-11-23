import Link from "next/link"
import {useDispatch, useSelector} from "react-redux"
import {useState, useEffect} from "react"
import Cookies from "js-cookie"
import {setCart} from "../store/cart"

const Header = () => {
    const dispatch = useDispatch()
    const [session, setSession] = useState(null)
    const cart = useSelector(state => state.cart)

    useEffect(() => {
      (() => {
        if(localStorage.getItem("session")) {
          setSession(JSON.parse(localStorage.getItem("session")))
        } else {
          const session = Cookies.getJSON("session")
          if(session) {
            localStorage.setItem("session", JSON.stringify(session))
            setSession(JSON.parse(localStorage.getItem("session")))
          }
        }
      })()
      dispatch(setCart())
    }, [])

    const ContentInner = () => {
      return session != null ?
      <div className="content-inner">
        <div className="thumb mb-3">
          <a href="product-details.html">
            <img
              src={session.photoUser ? session.photoUser : "/images/product/sm-img/1.jpg"}
              alt="product images"
              style={{maxHeight: "150px"}}
            />
          </a>
        </div>
        <h6 className="mt-2">
          <a href="product-details.html">{session.fullName}</a>
        </h6>
        <div className="d-flex justify-content-center mt-2">
          <ul className="col-12">
            <div className="row mb-1">
              <li className="col-6">
              <Link href="/account/profile">
                <a>
                  <i className="zmdi zmdi-settings" /> 
                  <div>Profile</div>
                </a>
              </Link>
              </li>
              <li className="col-6">
                <Link href="/calendar">
                  <a>
                    <i className="zmdi zmdi-calendar" /> 
                    <div>Calendar</div>
                  </a>
                </Link>
              </li>
            </div>
            <div className="row">
              <li className="col-6">
                  <a>
                    <i className="zmdi zmdi-account-o" /> 
                    <div>Logout</div>
                  </a>
              </li>
              <li className="col-6">
                  <a>
                    <i className="zmdi zmdi-delete" /> 
                    <div>Delete</div>
                  </a>
              </li>
            </div>
          </ul>
        </div> 
      </div>
      : <div className="content-inner">
        <div className="switcher-currency mt-2">
          <strong className="label switcher-label">
            <span>My Account</span>
          </strong>
          <div className="switcher-options">
            <div className="switcher-currency-trigger">
              <div className="setting__menu">
                <span>
                  <a href="#">Compare Product</a>
                </span>
                <span>
                  <a href="#">My Account</a>
                </span>
                <span>
                  <a href="#">My Wishlist</a>
                </span>
                <span>
                  <Link href='/account/login'><a>Sign In</a></Link> 
                </span>
                <span>
                  <a href="#">Create An Account</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    return(
        <header
            id="wn__header"
            className="header__area header__absolute sticky__header"
        >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-6 col-lg-2">
                    <div className="logo">
                      <a href="index.html">
                        <img src="/images/logo/logo.png" alt="logo images" height={"98%"} width={"80%"}/>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-8 d-none d-lg-block">
                    <nav className="mainmenu__nav">
                      <ul className="meninmenu d-flex justify-content-start">
                        <li className="drop with--one--item">
                          <Link href="/home"><a>Home</a></Link>
                        </li>
                        <li className="drop">
                            <a href="/shop">Shop</a>
                          <div className="megamenu mega03">
                            <ul className="item item03">
                              <li className="title">Shop Layout</li>
                              <li>
                                <a href="shop-grid.html">Shop Grid</a>
                              </li>
                              <li>
                                <a href="single-product.html">Single Product</a>
                              </li>
                            </ul>
                            <ul className="item item03">
                              <li className="title">Shop Page</li>
                              <li>
                                <a href="my-account.html">My Account</a>
                              </li>
                              <li>
                                <a href="cart.html">Cart Page</a>
                              </li>
                              <li>
                                <a href="checkout.html">Checkout Page</a>
                              </li>
                              <li>
                                <a href="wishlist.html">Wishlist Page</a>
                              </li>
                              <li>
                                <a href="error404.html">404 Page</a>
                              </li>
                              <li>
                                <a href="faq.html">Faq Page</a>
                              </li>
                            </ul>
                            <ul className="item item03">
                              <li className="title">Bargain Books</li>
                              <li>
                                <a href="shop-grid.html">Bargain Bestsellers</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Activity Kits</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">B&amp;N Classics</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Books Under $5</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Bargain Books</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="drop">
                          <a href="shop-grid.html">Books</a>
                          <div className="megamenu mega03">
                            <ul className="item item03">
                              <li className="title">Categories</li>
                              <li>
                                <a href="shop-grid.html">Biography </a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Business </a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Cookbooks </a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Health &amp; Fitness </a>
                              </li>
                              <li>
                                <a href="shop-grid.html">History </a>
                              </li>
                            </ul>
                            <ul className="item item03">
                              <li className="title">Customer Favourite</li>
                              <li>
                                <a href="shop-grid.html">Mystery</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Religion &amp; Inspiration</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Romance</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Fiction/Fantasy</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Sleeveless</a>
                              </li>
                            </ul>
                            <ul className="item item03">
                              <li className="title">Collections</li>
                              <li>
                                <a href="shop-grid.html">Science </a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Fiction/Fantasy</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Self-Improvemen</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Home &amp; Garden</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Humor Books</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="drop">
                          <a href="shop-grid.html">Kids</a>
                          <div className="megamenu mega02">
                            <ul className="item item02">
                              <li className="title">Top Collections</li>
                              <li>
                                <a href="shop-grid.html">American Girl</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Diary Wimpy Kid</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Finding Dory</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Harry Potter</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Land of Stories</a>
                              </li>
                            </ul>
                            <ul className="item item02">
                              <li className="title">More For Kids</li>
                              <li>
                                <a href="shop-grid.html">B&amp;N Educators</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">B&amp;N Kids' Club</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Kids' Music</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Toys &amp; Games</a>
                              </li>
                              <li>
                                <a href="shop-grid.html">Hoodies</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="drop">
                          <a href="#">Pages</a>
                          <div className="megamenu dropdown">
                            <ul className="item item01">
                              <li>
                                <a href="about.html">About Page</a>
                              </li>
                              <li className="label2">
                                <a href="portfolio.html">Portfolio</a>
                                <ul>
                                  <li>
                                    <a href="portfolio.html">Portfolio</a>
                                  </li>
                                  <li>
                                    <a href="portfolio-details.html">Portfolio Details</a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a href="my-account.html">My Account</a>
                              </li>
                              <li>
                                <a href="cart.html">Cart Page</a>
                              </li>
                              <li>
                                <a href="checkout.html">Checkout Page</a>
                              </li>
                              <li>
                                <a href="wishlist.html">Wishlist Page</a>
                              </li>
                              <li>
                                <a href="error404.html">404 Page</a>
                              </li>
                              <li>
                                <a href="faq.html">Faq Page</a>
                              </li>
                              <li>
                                <a href="team.html">Team Page</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="drop">
                          <a href="blog.html">Blog</a>
                          <div className="megamenu dropdown">
                            <ul className="item item01">
                              <li>
                                <a href="blog.html">Blog Page</a>
                              </li>
                              <li>
                                <a href="blog-details.html">Blog Details</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <a href="contact.html">Contact</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="col-md-6 col-sm-6 col-6 col-lg-2">
                    <ul className="header__sidebar__right d-flex justify-content-end align-items-center">
                      <li className="shop_search">
                        <a className="search__active" href="#" />
                      </li>
                      <li className="wishlist">
                        <a href="#" />
                      </li>
                      <li className="shopcart">
                        <a className="cartbox_active" href="#">
                          <span className="product_qun">{cart.qty}</span>
                        </a>
                        {/* Start Shopping Cart */}
                        <div className="block-minicart minicart__active">
                          <div className="minicart-content-wrapper">
                            <div className="micart__close">
                              <span>close</span>
                            </div>
                            <div className="items-total d-flex justify-content-between">
                              <span>{cart.qty} items</span>
                              <span>Cart Subtotal</span>
                            </div>
                            <div className="total_amount text-right">
                              <span>${cart.total}.00</span>
                            </div>
                            <div className="mini_action cart">
                              <Link href="/cart">
                                <a className="checkout__btn">
                                  View and edit cart
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                        {/* End Shopping Cart */}
                      </li>
                      <li className="setting__bar__icon">
                        <a className="setting__active"/>
                        <div className="searchbar__content setting__block">
                            <ContentInner/>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Start Mobile Menu */}
                <div className="row d-none">
                  <div className="col-lg-12 d-none">
                    <nav className="mobilemenu__nav">
                      <ul className="meninmenu">
                        <li>
                          <a href="index.html">Home</a>
                        </li>
                        <li>
                          <a href="#">Pages</a>
                          <ul>
                            <li>
                              <a href="about.html">About Page</a>
                            </li>
                            <li>
                              <a href="portfolio.html">Portfolio</a>
                              <ul>
                                <li>
                                  <a href="portfolio.html">Portfolio</a>
                                </li>
                                <li>
                                  <a href="portfolio-details.html">Portfolio Details</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href="my-account.html">My Account</a>
                            </li>
                            <li>
                              <a href="cart.html">Cart Page</a>
                            </li>
                            <li>
                              <a href="checkout.html">Checkout Page</a>
                            </li>
                            <li>
                              <a href="wishlist.html">Wishlist Page</a>
                            </li>
                            <li>
                              <a href="error404.html">404 Page</a>
                            </li>
                            <li>
                              <a href="faq.html">Faq Page</a>
                            </li>
                            <li>
                              <a href="team.html">Team Page</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="shop-grid.html">Shop</a>
                          <ul>
                            <li>
                              <a href="shop-grid.html">Shop Grid</a>
                            </li>
                            <li>
                              <a href="single-product.html">Single Product</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="blog.html">Blog</a>
                          <ul>
                            <li>
                              <a href="blog.html">Blog Page</a>
                            </li>
                            <li>
                              <a href="blog-details.html">Blog Details</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="contact.html">Contact</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                {/* End Mobile Menu */}
                <div className="mobile-menu d-block d-lg-none"></div>
                {/* Mobile Menu */}
              </div>
        </header>
    )
}

export default Header