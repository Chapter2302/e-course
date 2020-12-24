import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useRouter } from "next/router"
import HeadContent from '../../component/head'
import Header from '../../component/header'
import Footer from '../../component/footer'
import SingleCourseGrid from '../../component/singleCourseGrid'
import QuickViewModal from "../../component/quickViewModal"
import Pagination from '../../component/pagination'
import {setFilter} from "../../store/filter"
import {setSortType} from "../../store/sort"

const Shop = ({courses}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    //const searchFilter = useSelector(state => state.filter.search)
    const filter = useSelector(state => state.filter)
    const sort = useSelector(state => state.sort)
    const [currentPage, setCurrentPage] = useState(1)
    const [quickviewCourse, setQuickViewCourse] = useState(null)

    const compareName = (nameA, nameB, opt) => {
        if(nameA > nameB) 
            return opt*1
        if(nameA < nameB) 
            return opt*(-1)
        if(nameA == nameB) 
            return 0
    }

    const ShopGrid = () => {
        let _showedCourses = []
        
        _showedCourses = courses.filter(item => {
            return item.name.includes(filter.search)
            && (item.schedule.dayInWeek[0].includes(filter.dayInWeek) 
            || item.schedule.dayInWeek[1].includes(filter.dayInWeek))
            && (String(item.schedule.shift[0]).includes(filter.shift) 
            || String(item.schedule.shift[1]).includes(filter.shift))
            && String(item.category).includes(filter.category)
            && (item.price >= filter.minPrice && item.price <= filter.maxPrice)
        })
        switch(sort.type) {
            case "name-A-Z": _showedCourses.sort((a, b) => compareName(a.name, b.name, 1)); break    
            case "name-Z-A": _showedCourses.sort((a, b) => compareName(a.name, b.name, -1)); break
            case "price-asc": _showedCourses.sort((a, b) => a.price - b.price); break
            case "price-des": _showedCourses.sort((a, b) => b.price - a.price); break
            case "rate-asc": _showedCourses.sort((a, b) => a.rate - b.rate); break
            case "rate-des": _showedCourses.sort((a, b) => b.rate - a.rate); break
            case "mstudent-asc": _showedCourses.sort((a, b) => a.maxStudent - b.maxStudent); break
            case "mstudent-des": _showedCourses.sort((a, b) => b.maxStudent - a.maxStudent); break
            case "quantity-asc": _showedCourses.sort((a, b) => a.quantity - b.quantity); break
            case "quantity-des": _showedCourses.sort((a, b) => b.quantity - a.quantity); break
            default: break
        }

        return(
            <div
            className="shop-grid tab-pane fade show active"
            id="nav-grid"
            role="tabpanel"
            >
                <div className="row">
                    {
                        _showedCourses.slice((currentPage-1)*9, (currentPage)*9).map(val => {
                            return (<SingleCourseGrid key={val._id} course={val} setQuickViewCourse={setQuickViewCourse}/>)
                        })
                    }
                </div> 
                {
                    (() => {
                        let pages = _showedCourses.length%9 > 0 
                        ? Math.floor(_showedCourses.length/9 + 1)
                        : Math.floor(_showedCourses.length/9)
                        return(
                            <Pagination 
                                pages={pages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        ) 
                    })()
                }
            </div>
        )
    }

    useEffect(() => {
        if(router.query != {}) {
            dispatch(setSortType(router.query.sort ? router.query.sort : ""))
            const initialFilter = {
                search: router.query.search ? router.query.search : "",
                category: router.query.category ? router.query.category : "", 
                shift: router.query.shift ? router.query.shift : "", 
                dayInWeek: router.query.dayInWeek ? router.query.dayInWeek : "", 
                minPrice: router.query.minPrice ? router.query.minPrice : 0, 
                maxPrice: router.query.maxPrice ? router.query.maxPrice : 200
            }
            dispatch(setFilter(initialFilter))
        }
    }, [router.query])

    useEffect(() => {
        setCurrentPage(1)
        console.log(filter)
    }, [filter])

    return(
    <>
        <HeadContent title={'Shop'}/>
        <Header/>
        {/* Start Bradcaump area */}
        <div className="ht__bradcaump__area bg-image--6">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="bradcaump__inner text-center">
                    <h2 className="bradcaump-title">Shop Grid</h2>
                    <nav className="bradcaump-content">
                    <a className="breadcrumb_item" href="index.html">
                        Home
                    </a>
                    <span className="brd-separetor">/</span>
                    <span className="breadcrumb_item active">Shop Grid</span>
                    </nav>
                </div>
                </div>
            </div>
            </div>
        </div>
        {/* End Bradcaump area */}
        {/* Start Shop Page */}
        <div className="page-shop-sidebar left--sidebar bg--white section-padding--lg">
            <div className="container">
            <div className="row">
                <div className="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
                <div className="shop__sidebar">
                    <aside className="wedget__categories poroduct--cat">
                    <h3 className="wedget__title">Filter By Categories</h3>
                    <ul>
                    <li>
                        <a href="#">
                            All <span>
                                <input 
                                    name="category" 
                                    checked={filter.category == "" ? true : false} 
                                    type="radio" 
                                    onChange={() => dispatch(setFilter({...filter, category: ""}))}
                                />
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            Information Technology <span>
                                <input 
                                    name="category" 
                                    type="radio"
                                    checked={filter.category == "Information Technology" ? true : false} 
                                    onChange={() => dispatch(setFilter({...filter, category: "Information Technology"}))}
                                />
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            Marketing <span>
                                <input 
                                    name="category" 
                                    type="radio" 
                                    checked={filter.category == "Marketing" ? true : false} 
                                    onChange={() => dispatch(setFilter({...filter, category: "Marketing"}))}
                                />
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            Economy <span>
                                <input 
                                    name="category" 
                                    type="radio" 
                                    checked={filter.category == "Economy" ? true : false} 
                                    onChange={() => dispatch(setFilter({...filter, category: "Economy"}))}
                                />
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            Design <span>
                                <input 
                                    name="category" 
                                    type="radio" 
                                    checked={filter.category == "Design" ? true : false} 
                                    onChange={() => dispatch(setFilter({...filter, category: "Design"}))}
                                />
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            Language <span>
                                <input 
                                    name="category" 
                                    type="radio" 
                                    checked={filter.category == "Language" ? true : false} 
                                    onChange={() => dispatch(setFilter({...filter, category: "Language"}))}
                                />
                            </span>
                        </a>
                        </li>
                    </ul>
                    </aside>
                    <aside className="wedget__categories pro--range">
                        <h3 className="wedget__title">Filter By Schedule</h3>
                            <div className="form-row">
                                <div className="col-md-6 col-sm-12">
                                    <div>Shift</div>
                                        <select 
                                            className="shot__byselect col-12" 
                                            value={filter.shift} 
                                            onChange={e => dispatch(setFilter({...filter, shift: e.target.value}))}>
                                            <option value="">All</option>
                                            <option value="1">8AM - 11AM</option>
                                            <option value="2">2PM - 5PM</option>
                                            <option value="3">6PM - 9PM</option>
                                        </select>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div>Day In Week</div>
                                        <select 
                                            className="shot__byselect col-12" 
                                            value={filter.dayInWeek} 
                                            onChange={e => dispatch(setFilter({...filter, dayInWeek: e.target.value}))}>
                                            <option value="">--All--</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                        </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 col-sm-12">
                                    <div>Shift</div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div>Day In Week</div>
                                </div>
                            </div>
                    </aside>
                    <aside className="wedget__categories pro--range">
                        <h3 className="wedget__title">Filter by price</h3>
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
                                        $<span id="minPrice">{filter.minPrice}</span> - 
                                        $<span id="maxPrice">{filter.maxPrice}</span>
                                    </div>
                                    <div className="price--filter float-right">
                                        <a href={"#"} onClick={() => {
                                            let min = Number(document.getElementById("minPrice").textContent)
                                            let max = Number(document.getElementById("maxPrice").textContent)
                                            dispatch(setFilter({...filter, minPrice: min}))
                                            dispatch(setFilter({...filter, maxPrice: max}))
                                        }}>Filter</a>
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
                    <aside className="wedget__categories sidebar--banner">
                    <img src="/images/others/banner_left.jpg" alt="banner images" />
                    <div className="text">
                        <h2>new products</h2>
                        <h6>
                        save up to <br /> <strong>40%</strong>off
                        </h6>
                    </div>
                    </aside>
                </div>
                </div>
                <div className="col-lg-9 col-12 order-1 order-lg-2">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop__list__wrapper row">
                            <div className="col-md-4 col-sm-12 mb-2">
                                <div className="form-row d-flex justify-content-center">
                                    <div
                                        className="shop__list nav"
                                        role="tablist"
                                    >
                                        <a
                                            className="nav-item nav-link active"
                                            data-toggle="tab"
                                            href="#nav-grid"
                                            role="tab"
                                        >
                                            <i className="fa fa-th" />
                                        </a>
                                        <a
                                            className="nav-item nav-link"
                                            data-toggle="tab"
                                            href="#nav-list"
                                            role="tab"
                                        >
                                            <i className="fa fa-list" />
                                        </a>
                                    </div>
                                    Show: 1–12 of 40 results
                                </div>
                            </div>
                            
                            <div className="col-md-4 col-sm-12 mb-2">
                                <input 
                                    className="shot__byselect col-12" type="text" placeholder="Search"
                                    value={filter.search} 
                                    onChange={e => dispatch(setFilter({...filter, search: e.target.value}))}
                                />
                            </div>
                            <div className="col-md-4 col-sm-12 mb-2">
                                <select 
                                    className="shot__byselect col-12"
                                    value={sort.type}  
                                    onChange={e => dispatch(setSortType(e.target.value))}>
                                    <option value="">Default Sorting</option>
                                    <option value="name-A-Z">From A To Z</option>
                                    <option value="name-Z-A">From Z To A</option>
                                    <option value="price-asc">Price: Ascending</option>
                                    <option value="price-des">Price: Descending</option>
                                    <option value="rate-asc">Rate: Ascending</option>
                                    <option value="rate-des">Rate: Descending</option>
                                    <option value="mstudent-asc">Max Student: Ascending</option>
                                    <option value="mstudent-des">Max Student: Descending</option>
                                    <option value="quantity-asc">Quantity: Ascending</option>
                                    <option value="qauntity-des">Quantity: Descending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab__container">
                    <ShopGrid/>
                    <div
                    className="shop-grid tab-pane fade"
                    id="nav-list"
                    role="tabpanel"
                    >
                    <div className="list__view__wrapper">
                        {/* Start Single Product */}
                        <div className="list__view">
                        <div className="thumb">
                            <a className="first__img" href="single-product.html">
                            <img src="/images/product/1.jpg" alt="product images" />
                            </a>
                            <a
                            className="second__img animation1"
                            href="single-product.html"
                            >
                            <img src="/images/product/2.jpg" alt="product images" />
                            </a>
                        </div>
                        <div className="content">
                            <h2>
                            <a href="single-product.html">Ali Smith</a>
                            </h2>
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
                            <li>
                                <i className="fa fa-star-o" />
                            </li>
                            </ul>
                            <ul className="prize__box">
                            <li>$111.00</li>
                            <li className="old__prize">$220.00</li>
                            </ul>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nam fringilla augue nec est tristique auctor. Donec non
                            est at libero vulputate rutrum. Morbi ornare lectus quis
                            justo gravida semper. Nulla tellus mi, vulputate
                            adipiscing cursus eu, suscipit id nulla.
                            </p>
                            <ul className="cart__action d-flex">
                            <li className="cart">
                                <a href="cart.html">Add to cart</a>
                            </li>
                            <li className="wishlist">
                                <a href="cart.html" />
                            </li>
                            <li className="compare">
                                <a href="cart.html" />
                            </li>
                            </ul>
                        </div>
                        </div>
                        {/* End Single Product */}
                        {/* Start Single Product */}
                        <div className="list__view mt--40">
                        <div className="thumb">
                            <a className="first__img" href="single-product.html">
                            <img src="/images/product/2.jpg" alt="product images" />
                            </a>
                            <a
                            className="second__img animation1"
                            href="single-product.html"
                            >
                            <img src="/images/product/4.jpg" alt="product images" />
                            </a>
                        </div>
                        <div className="content">
                            <h2>
                            <a href="single-product.html">Blood In Water</a>
                            </h2>
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
                            <li>
                                <i className="fa fa-star-o" />
                            </li>
                            </ul>
                            <ul className="prize__box">
                            <li>$111.00</li>
                            <li className="old__prize">$220.00</li>
                            </ul>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nam fringilla augue nec est tristique auctor. Donec non
                            est at libero vulputate rutrum. Morbi ornare lectus quis
                            justo gravida semper. Nulla tellus mi, vulputate
                            adipiscing cursus eu, suscipit id nulla.
                            </p>
                            <ul className="cart__action d-flex">
                            <li className="cart">
                                <a href="cart.html">Add to cart</a>
                            </li>
                            <li className="wishlist">
                                <a href="cart.html" />
                            </li>
                            <li className="compare">
                                <a href="cart.html" />
                            </li>
                            </ul>
                        </div>
                        </div>
                        {/* End Single Product */}
                        {/* Start Single Product */}
                        <div className="list__view mt--40">
                        <div className="thumb">
                            <a className="first__img" href="single-product.html">
                            <img src="/images/product/3.jpg" alt="product images" />
                            </a>
                            <a
                            className="second__img animation1"
                            href="single-product.html"
                            >
                            <img src="/images/product/6.jpg" alt="product images" />
                            </a>
                        </div>
                        <div className="content">
                            <h2>
                            <a href="single-product.html">Madeness Overated</a>
                            </h2>
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
                            <li>
                                <i className="fa fa-star-o" />
                            </li>
                            </ul>
                            <ul className="prize__box">
                            <li>$111.00</li>
                            <li className="old__prize">$220.00</li>
                            </ul>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nam fringilla augue nec est tristique auctor. Donec non
                            est at libero vulputate rutrum. Morbi ornare lectus quis
                            justo gravida semper. Nulla tellus mi, vulputate
                            adipiscing cursus eu, suscipit id nulla.
                            </p>
                            <ul className="cart__action d-flex">
                            <li className="cart">
                                <a href="cart.html">Add to cart</a>
                            </li>
                            <li className="wishlist">
                                <a href="cart.html" />
                            </li>
                            <li className="compare">
                                <a href="cart.html" />
                            </li>
                            </ul>
                        </div>
                        </div>
                        {/* End Single Product */}
                        {/* Start Single Product */}
                        <div className="list__view mt--40">
                        <div className="thumb">
                            <a className="first__img" href="single-product.html">
                            <img src="/images/product/4.jpg" alt="product images" />
                            </a>
                            <a
                            className="second__img animation1"
                            href="single-product.html"
                            >
                            <img src="/images/product/6.jpg" alt="product images" />
                            </a>
                        </div>
                        <div className="content">
                            <h2>
                            <a href="single-product.html">Watching You</a>
                            </h2>
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
                            <li>
                                <i className="fa fa-star-o" />
                            </li>
                            </ul>
                            <ul className="prize__box">
                            <li>$111.00</li>
                            <li className="old__prize">$220.00</li>
                            </ul>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nam fringilla augue nec est tristique auctor. Donec non
                            est at libero vulputate rutrum. Morbi ornare lectus quis
                            justo gravida semper. Nulla tellus mi, vulputate
                            adipiscing cursus eu, suscipit id nulla.
                            </p>
                            <ul className="cart__action d-flex">
                            <li className="cart">
                                <a href="cart.html">Add to cart</a>
                            </li>
                            <li className="wishlist">
                                <a href="cart.html" />
                            </li>
                            <li className="compare">
                                <a href="cart.html" />
                            </li>
                            </ul>
                        </div>
                        </div>
                        {/* End Single Product */}
                        {/* Start Single Product */}
                        <div className="list__view mt--40">
                        <div className="thumb">
                            <a className="first__img" href="single-product.html">
                            <img src="/images/product/5.jpg" alt="product images" />
                            </a>
                            <a
                            className="second__img animation1"
                            href="single-product.html"
                            >
                            <img src="/images/product/9.jpg" alt="product images" />
                            </a>
                        </div>
                        <div className="content">
                            <h2>
                            <a href="single-product.html">Court Wings Run</a>
                            </h2>
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
                            <li>
                                <i className="fa fa-star-o" />
                            </li>
                            </ul>
                            <ul className="prize__box">
                            <li>$111.00</li>
                            <li className="old__prize">$220.00</li>
                            </ul>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nam fringilla augue nec est tristique auctor. Donec non
                            est at libero vulputate rutrum. Morbi ornare lectus quis
                            justo gravida semper. Nulla tellus mi, vulputate
                            adipiscing cursus eu, suscipit id nulla.
                            </p>
                            <ul className="cart__action d-flex">
                            <li className="cart">
                                <a href="cart.html">Add to cart</a>
                            </li>
                            <li className="wishlist">
                                <a href="cart.html" />
                            </li>
                            <li className="compare">
                                <a href="cart.html" />
                            </li>
                            </ul>
                        </div>
                        </div>
                        {/* End Single Product */}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <QuickViewModal course={quickviewCourse}/>
        </div>
        {/* End Shop Page */}
        <Footer/>
    </>)
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:4000/course/get-all-guess')
    const courses = await res.json()
    return {
        props: {
          courses
        }
    }
}

export default Shop