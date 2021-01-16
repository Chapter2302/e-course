import {useDispatch, useSelector} from "react-redux"
import {useRouter} from "next/router"
import HeadContent from "../../component/head"
import Header from "../../component/header"
import Footer from "../../component/footer"
import {setCart} from "../../store/cart"
import {create} from "../../api"

const Cart = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const language = useSelector(state => state.language.nation)
    const cart = useSelector(state => state.cart)
    return(
        <>
            <HeadContent title={"Cart"}/>
            <Header/>
            {/* Start Bradcaump area */}
            <div className="ht__bradcaump__area bg-image--3">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="bradcaump__inner text-center">
                        <h2 className="bradcaump-title">{language == "eng" ? "Checkout" : "Thanh Toán"}</h2>
                        <nav className="bradcaump-content">
                            <a className="breadcrumb_item" href="index.html">
                            {language == "eng" ? "Home" : "Trang Chủ"}
                            </a>
                            <span className="brd-separetor">/</span>
                            <span className="breadcrumb_item active">{language == "eng" ? "Checkout" : "Thanh Toán"}</span>
                        </nav>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            {/* Start Bradcaump area */}
            {/* cart-main-area start */}
            <div className="cart-main-area section-padding--lg bg--white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 ol-lg-12">
                            <form action="#">
                                <div className="table-content wnro__table table-responsive">
                                    <h4 className="pb-2">{language == "eng" ? "CART LIST" : "DANH SÁCH THANH TOÁN"}</h4>
                                    <table className="table table-xl text-center border">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th className="border border-right-light" style={{width: "25%"}} scope="col">{language == "eng" ? "Photo" : "Hình Ảnh"}</th>
                                                <th className="border border-light" style={{width: "25%"}} scope="col">{language == "eng" ? "Course" : "Khóa Học"}</th>
                                                <th className="border border-light" style={{width: "25%"}} scope="col">{language == "eng" ? "Price" : "Giá Tiền"}</th>
                                                <th className="border border-light" style={{width: "25%"}} scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-dark">
                                            {
                                                (() => {
                                                    return cart.items == [] ? <></> : cart.items.map((item, i) => {
                                                        return (<tr key={item.id}>
                                                            <td className="product-thumbnail">
                                                                <a>
                                                                    <img src={item.picture} height="20%" alt="product img"/>
                                                                </a>
                                                            </td>
                                                            <td className="product-price">
                                                                <span className="amount"><a href="#">{item.name}</a></span>
                                                            </td>
                                                            <td className="product-price">
                                                                <span className="amount">{language == "eng" ? `$${item.price}.00` : `${parseFloat(item.price*0.023).toFixed(1)} Tr VNĐ`}</span>
                                                            </td>
                                                            <td className="product-price">
                                                                <span className="amount"><button className="btn btn-danger btn-sm" onClick={() => {
                                                                    try {
                                                                        const newCart = JSON.parse(localStorage.getItem("cart"))
                                                                        newCart.splice(i, 1)
                                                                        localStorage.setItem("cart", JSON.stringify(newCart))
                                                                        dispatch(setCart())
                                                                        alert("Success: Removed")
                                                                    }
                                                                    catch(e) { alert("Fail: Try Later") }
                                                                }}><b>X</b></button></span>
                                                            </td>
                                                        </tr>)
                                                    })
                                                })()
                                            } 
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-6 mb-4">
                            <div className="cartbox__total__area">
                                <div className="cartbox-total d-flex justify-content-between">
                                    <ul className="cart__total__list">
                                    <li>{language == "eng" ? "Cart total: " : "Tổng giỏ hàng: "}</li>
                                    <li>{language == "eng" ? "Sub Total: " : "Phụ thu: "}</li>
                                    </ul>
                                    <ul className="cart__total__tk">
                                    <li>{language == "eng" ? `$${cart.total}.00` : `${parseFloat(cart.total*0.023).toFixed(1)} Tr VNĐ`}</li>
                                    <li>$0</li>
                                    </ul>
                                </div>
                                <div className="cart__total__amount">
                                    <span>{language == "eng" ? "Grand Total: " : "Tổng Cộng: "}</span>
                                    <span>{language == "eng" ? `$${cart.total}.00` : `${parseFloat(cart.total*0.023).toFixed(1)} Tr VNĐ`}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div>
                                {
                                    language == "eng"
                                    ? "Please transfer payment to us via the following accounts:"
                                    : "Chuyển khoản đến chúng tôi qua các tài khoản"
                                }
                            </div>
                            <div>+ Vietcombank: <b>1675643657657</b> - {language == "eng" ? "Bến Nghé Branch" : "Chi Nhánh Bến Nghé"}</div>
                            <div>+ BIDV: <b>1675643657657</b> - {language == "eng" ? "Thị Nghè Branch" : "Chi Nhánh Thị Nghè"}</div>
                            <div>{language == "eng" ? "Syntax: " : "Cú pháp: "} <b>{language == "eng" ? "Email Address - Pay For Online Courses" : "Địa Chỉ Email - Trả Phí Khóa Học Online"}</b></div>
                            <div>{language == "eng" ? "Example: " : "Ví dụ: "} <b>"Chapter2302@gmail.com - {language == "eng" ? `Pay For Online Courses"` : `Trả Phí Khóa Học Online"`}</b></div>
                            <div className="mt-2 form-row">
                                <span className="col-6"><button className="btn btn-outline-danger col-12" 
                                onClick={() => {
                                    try {
                                        localStorage.removeItem("cart")
                                        dispatch(setCart()) 
                                        alert("Success: Removed All")
                                    } catch { alert("Fail: Try Later") }
                                }}
                                >{language == "eng" ? "REMOVE ALL" : "XÓA TẤT CẢ"}</button></span>
                                <span className="col-6"><button className="btn btn-outline-success col-12"
                                onClick={async () => {
                                    try {
                                        const d = new Date()
                                        const today = {
                                            day: d.getDate() < 10 ? "0" + d.getDate() : d.getDate(),
                                            month: d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1),
                                            year: d.getFullYear()
                                        }
                                        const data = {
                                            user: JSON.parse(localStorage.getItem("session")).id,
                                            cids: cart.items.map(item => (item.id)),
                                            date: today.year + "-" + today.month + "-" + today.day
                                        }
                                        console.log("data: ", data)
                                        const response = await create("trans", data)
                                        const result = await response.json()
                                        console.log("res: ", result)
                                        if(response.status == 200) {
                                            localStorage.removeItem("cart")
                                            dispatch(setCart()) 
                                            router.push("/calendar")
                                        }
                                        else {
                                            alert("Fail: Try Later")
                                        }
                                    } catch(e) { console.log(e); alert("Fail: Try Later") }
                                }}
                                >{language == "eng" ? "CONFIRM TO LEARN" : "XÁC NHẬN"}</button></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* cart-main-area end */}
            <Footer/>
        </>
    )
}

export default Cart