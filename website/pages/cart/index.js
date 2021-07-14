import {useDispatch, useSelector} from "react-redux"
import HeadContent from "../../component/head"
import Header from "../../component/header"
import Footer from "../../component/footer"
import ConfirmDialog from "../../component/Dialog/ConfirmDialog"
import Alert from "../../component/Alert"
import {setCart} from "../../store/cart"
import { createTransaction } from "../../api"
import styles from './index.module.scss'
import cx from 'classnames'
import React, { useEffect, useState } from "react"
import { toast } from 'react-toastify'

const Cart = () => {
    const dispatch = useDispatch()
    const language = useSelector(state => state.language.nation)
    const userId = useSelector(state => state.chat.senderID)
    const [alertType, setAlertType] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)
    const cart = useSelector(state => state.cart)
    const [selectToBuyCourse, setSelectToBuyCourse] = useState(null)
    const [confirmBuyDialogShow, setConfirmBuyDialogShow] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)

    const deleteCartClick = (index) => {
        try {
            const newCart = JSON.parse(localStorage.getItem("cart"))
            newCart.splice(index, 1)
            localStorage.setItem("cart", JSON.stringify(newCart))
            dispatch(setCart())
            toast.success("Remove Successfully")
        } catch(e) {
            toast.error("Remove Fail. Try Again")
        }
    }

    const handleOpenConfirmDialog = (course) => {
        setSelectToBuyCourse({ ...course })
    }

    const handleCloseConfirmDialog = () => { 
        setSelectToBuyCourse(null)
        setConfirmBuyDialogShow(false) 
    }

    const handleConfirmDialog = () => {
        setConfirmBuyDialogShow(false)
        setIsConfirmed(true) 
    }

    useEffect(() => {
        if(selectToBuyCourse) {
            setConfirmBuyDialogShow(!confirmBuyDialogShow)
        }
    }, [selectToBuyCourse])

    useEffect(() => {
        if(!alertMessage && !alertType) {
          setInterval(() => {
            setAlertType(null)
            setAlertMessage(null)
          }, 8000);
        }
    }, [alertMessage, alertType])

    useEffect(() => {
        if(isConfirmed && selectToBuyCourse) {
            createTransaction({ userId, courseId: selectToBuyCourse.id})
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAlertType(data.type)
                setAlertMessage(data.message)
                setIsConfirmed(false)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [isConfirmed])

    return(
        <>
            <HeadContent title={"Cart"}/>
            <Header/>
            <ConfirmDialog
                title="Buy This Course?"
                show={confirmBuyDialogShow}
                handleClose={handleCloseConfirmDialog}
                handleConfirm={handleConfirmDialog}
            >
                { 
                    !selectToBuyCourse ? <React.Fragment></React.Fragment> :
                    <React.Fragment>
                        <div className="cartbox__total__area">
                            <div className="cartbox-total d-flex justify-content-between">
                                <ul className="cart__total__list">
                                <li>{language == "eng" ? "Course Price: " : "Giá Khóa Học: "}</li>
                                <li>{language == "eng" ? "Sub Total: " : "Phụ thu: "}</li>
                                </ul>
                                <ul className="cart__total__tk">
                                <li>{language == "eng" ? `$${selectToBuyCourse.price}.00` : `${parseFloat(cart.total*0.023).toFixed(1)} Triệu VNĐ`}</li>
                                <li>$0</li>
                                </ul>
                            </div>
                            <div className="cart__total__amount">
                                <span>{language == "eng" ? "Grand Total: " : "Tổng Cộng: "}</span>
                                <span>{language == "eng" ? `$${selectToBuyCourse.price}.00` : `${parseFloat(cart.total*0.023).toFixed(1)} Triệu VNĐ`}</span>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </ConfirmDialog>
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
                    <div className="row wn_checkout_wrap">
                        <div className="checkout_info w-100">
                            <span className="mr-2">Top up the account via bank transfer?</span>
                            <a className="showlogin" href="#">Click here</a>
                        </div>
                        <div className="checkout_login w-100">
                            <form className="wn__checkout__form" action="#">
                                <div>
                                    {
                                        language == "eng"
                                        ? "Please transfer payment to us via the following bank accounts:"
                                        : "Chuyển khoản đến chúng tôi qua các tài khoản ngân hàng"
                                    }
                                </div>
                                <div>+ Vietcombank: <b>1675643657657</b> - {language == "eng" ? "Bến Nghé Branch" : "Chi Nhánh Bến Nghé"}</div>
                                <div>+ BIDV: <b>1675643657657</b> - {language == "eng" ? "Thị Nghè Branch" : "Chi Nhánh Thị Nghè"}</div>
                                <div>{language == "eng" ? "Syntax: " : "Cú pháp: "} <b>{language == "eng" ? "Email Address - Pay For Online Courses" : "Địa Chỉ Email - Trả Phí Khóa Học Online"}</b></div>
                                <div>{language == "eng" ? "Example: " : "Ví dụ: "} <b>"Chapter2302@gmail.com - {language == "eng" ? `Pay For Online Courses"` : `Trả Phí Khóa Học Online"`}</b></div>
                            </form>
                        </div>
                        <div className="checkout_info w-100">
                            <span className="mr-2">Top up the account via digital wallet?</span>
                            <a className="showcoupon" href="#">Click here</a>
                        </div>
                        <div className="checkout_coupon mt-0 w-100">
                            <form className="wn__checkout__form" action="#">
                                <div>
                                    {
                                        language == "eng"
                                        ? "Please transfer payment to us via the following wallet:"
                                        : "Chuyển khoản đến chúng tôi qua các tài khoản ví điện tử sau:"
                                    }
                                </div>
                                <div>+ Momo: <b>0987654321</b> - {language == "eng" ? "Name: " : "Tên: "} E-Course Payment</div>
                                <div>+ Zalopay: <b>0987654321</b> - {language == "eng" ? "Name: " : "Tên: "} E-Course Payment</div>
                                <div>{language == "eng" ? "Syntax: " : "Cú pháp: "} <b>{language == "eng" ? "Email Address - Pay For Online Courses" : "Địa Chỉ Email - Trả Phí Khóa Học Online"}</b></div>
                                <div>{language == "eng" ? "Example: " : "Ví dụ: "} <b>"Chapter2302@gmail.com - {language == "eng" ? `Pay For Online Courses"` : `Trả Phí Khóa Học Online"`}</b></div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 ol-lg-12">
                            {alertType && alertMessage ? <Alert type={alertType} message={alertMessage}/> : <React.Fragment></React.Fragment>}
                            <h4 className="pb-2">{language == "eng" ? "CART LIST" : "GIỎ HÀNG"}</h4>
                            <form action="#">
                                <div className="table-content wnro__table table-responsive">
                                    <table>
                                        <thead className={styles.tableHeader}>
                                            <tr>
                                                <th className="border border-right-light" scope="col">{language == "eng" ? "Photo" : "Hình Ảnh"}</th>
                                                <th className="border border-light" scope="col">{language == "eng" ? "Course" : "Khóa Học"}</th>
                                                <th className="border border-light" scope="col">{language == "eng" ? "Price" : "Giá Tiền"}</th>
                                                <th className="border border-light" scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-dark">
                                            {
                                                (() => {
                                                    return cart.items.length == 0 ? <></> : cart.items.map((item, index) => {
                                                        return (<tr key={item.id}>
                                                            <td className="product-thumbnail">
                                                                <a>
                                                                    <img src={item.featuredImage} style={{maxHeight: "120px", minWidth: "150px"}} alt="product img"/>
                                                                </a>
                                                            </td>
                                                            <td className="product-price">
                                                                <span className="amount"><a href={`http://localhost:3000/product/${item._id}`}>{item.name}</a></span>
                                                            </td>
                                                            <td className="product-price">
                                                                <span className="amount">{language == "eng" ? `$${item.price}.00` : `${parseFloat(item.price*0.023).toFixed(1)} Tr VNĐ`}</span>
                                                            </td>
                                                            <td className="product-price">
                                                                <div className="form-row d-flex">
                                                                    <div className="col-12 col-lg-6 my-1">
                                                                        <button 
                                                                            className={cx(styles.buyButton, "col-12 btn btn-sm")}
                                                                            onClick={() => handleOpenConfirmDialog(item)}
                                                                        >
                                                                            <b>Buy</b>
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-12 col-lg-6 my-1">
                                                                        <button className="col-12 btn btn-sm" onClick={() => deleteCartClick(index)}>
                                                                            <b>Remove</b>
                                                                        </button>
                                                                    </div>
                                                                </div>
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
                </div>
            </div>
            {/* cart-main-area end */}
            <Footer/>
        </>
    )
}

export default Cart