import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import ChatModal from "./ChatModal"

const Footer = () => {
    const language = useSelector(state => state.language.nation)
    const [modalShow, setModalShow] = useState(false)

    return(
        <>
            <div className="chat_button" onClick={() => setModalShow(true)}>Chat With Admin</div>
            <footer id="wn__footer" className="footer__area bg__cat--8 brown--color">
                <div className="footer-static-top">
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                        <div className="footer__widget footer__menu">
                            <div className="ft__logo">
                            <p>
                                {language == "eng" 
                                ? `There are many variations of passages of Lorem Ipsum available,
                                but the majority have suffered duskam alteration variations of
                                passages` 
                                : `Có rất nhiều biến thể của các đoạn văn của Lorem Ipsum có sẵn, 
                                nhưng phần lớn đã phải chịu đựng các biến thể thay đổi hoàng hôn của các đoạn văn`}
                            </p>
                            </div>
                            <div className="footer__content">
                            <ul className="social__net social__net--2 d-flex justify-content-center">
                                <li>
                                <a href="#">
                                    <i className="bi bi-facebook" />
                                </a>
                                </li>
                                <li>
                                <a href="#">
                                    <i className="bi bi-google" />
                                </a>
                                </li>
                                <li>
                                <a href="#">
                                    <i className="bi bi-twitter" />
                                </a>
                                </li>
                                <li>
                                <a href="#">
                                    <i className="bi bi-linkedin" />
                                </a>
                                </li>
                                <li>
                                <a href="#">
                                    <i className="bi bi-youtube" />
                                </a>
                                </li>
                            </ul>
                            <ul className="mainmenu d-flex justify-content-center">
                                <li>
                                <a href="index.html">{language == "eng" ? "Trending" : "Xu Hướng"}</a>
                                </li>
                                <li>
                                <a href="index.html">{language == "eng" ? "Best Seller" : "Bán Chạy Nhất"}</a>
                                </li>
                                <li>
                                <a href="index.html">{language == "eng" ? "All Product" : "Tất Cả Khóa Học"}</a>
                                </li>
                                <li>
                                <a href="index.html">{language == "eng" ? "Wishlist" : "Ưa Thích"}</a>
                                </li>
                                <li>
                                <a href="index.html">Blog</a>
                                </li>
                                <li>
                                <a href="index.html">{language == "eng" ? "Contact" : "Liên Hệ"}</a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="copyright__wrapper">
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="copyright">
                            <div className="copy__right__inner text-left">
                            <p>
                                Copyright <i className="fa fa-copyright" />{" "}
                                <a href="https://freethemescloud.com/">Free themes Cloud.</a>{" "}
                                All Rights Reserved
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="payment text-right">
                            <img src="/images/icons/payment.png" alt={""} />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </footer>
            <ChatModal show={modalShow} onHide={() => setModalShow(false)} recieverID={"5f5439fbcd57871ad4d97473"}/>
        </>
    )
}

export default Footer