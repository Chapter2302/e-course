import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useRouter } from "next/router"
import HeadContent from '../../component/head'
import Header from '../../component/header'
import Footer from '../../component/footer'
import SingleCourseGrid from '../../component/SingleCourseGrid'
import Pagination from '../../component/pagination'
import {setFilter} from "../../store/filter"
import {setSortType} from "../../store/sort"

const Shop = ({courses}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const language = useSelector(state => state.language.nation)
    //const searchFilter = useSelector(state => state.filter.search)
    const filter = useSelector(state => state.filter)
    const sort = useSelector(state => state.sort)
    const [currentPage, setCurrentPage] = useState(1)

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
                            return (<SingleCourseGrid key={val._id} course={val}/>)
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
                minPrice: router.query.minPrice ? router.query.minPrice : 0, 
                maxPrice: router.query.maxPrice ? router.query.maxPrice : 200
            }
            console.log(initialFilter)
            dispatch(setFilter({...initialFilter}))
        }
    }, [router.query])

    useEffect(() => {
        console.log("cxcds", filter)
        setCurrentPage(1)
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
                        {language == "eng" ? "Home" : "Trang Chủ"}
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
                    <h3 className="wedget__title">{language == "eng" ? "Filter By Categories" : "Lọc Theo Danh Mục"}</h3>
                    <ul>
                    <li>
                        <a href="#">
                            {language == "eng" ? "All" : "Tất Cả"} <span>
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
                            {language == "eng" ? "Information Technology" : "Công Nghệ Thông Tin"}<span>
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
                            {language == "eng" ? "Economy" : "Kinh Tế"}<span>
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
                            {language == "eng" ? "Design" : "Thiết Kế"}<span>
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
                            {language == "eng" ? "Language" : "Ngôn Ngữ"}<span>
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
                                        <span>{language == "eng" ? "Price: " : "Giá: "} </span> 
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
                                    {language == "eng" ? "Information Technology" : "Công Nghệ Thông Tin"}
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Marketing
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    {language == "eng" ? "Economy" : "Kinh Tế"}
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    {language == "eng" ? "Design" : "Thiết Kế"}
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    {language == "eng" ? "Language" : "Ngôn Ngữ"}
                                </a>
                            </li>
                        </ul>
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
                                    {language == "eng" ? `Show: 1-9 of ${courses.length} results` : `Hiện: 1-9 trên ${courses.length} sản phẩm`}
                                </div>
                            </div>
                            
                            <div className="col-md-4 col-sm-12 mb-2">
                                <input 
                                    className="shot__byselect col-12" type="text" placeholder={language == "eng" ? "Search" : "Tìm Kiếm"}
                                    value={filter.search} 
                                    onChange={e => dispatch(setFilter({...filter, search: e.target.value}))}
                                />
                            </div>
                            <div className="col-md-4 col-sm-12 mb-2">
                                <select 
                                    className="shot__byselect col-12"
                                    value={sort.type}  
                                    onChange={e => dispatch(setSortType(e.target.value))}>
                                    <option value="">{language == "eng" ? "Default Sorting" : "Sắp Xếp Mặc Định"}</option>
                                    <option value="name-A-Z">{language == "eng" ? "From A To Z" : "Từ A Đến Z"}</option>
                                    <option value="name-Z-A">{language == "eng" ? "From Z To A" : "Từ Z Đến A"}</option>
                                    <option value="price-asc">{language == "eng" ? "Price: Ascending" : "Giá: Tăng Dần"}</option>
                                    <option value="price-des">{language == "eng" ? "Price: Descending" : "Giá: Giảm Dần"}</option>
                                    <option value="rate-asc">{language == "eng" ? "Rate: Ascending" : "Đánh Giá: Tăng Dần"}</option>
                                    <option value="rate-des">{language == "eng" ? "Rate: Descending" : "Đánh Giá: Giảm Dần"}</option>
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