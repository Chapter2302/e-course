import {useSelector} from "react-redux"

const StartSlider = () => {
    const language = useSelector(state => state.language.nation)

    return(
        <div className="slider-area brown__nav slider--15 slide__activation slide__arrow01 owl-carousel owl-theme">
            {/* Start Single Slide */}
            <div className="slide animation__style10 bg-image--1 fullscreen align__center--left">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="slider__content">
                                <div className="contentbox">
                                    <h2>
                                        {language=="eng" ? "Get" : "Mua"} <span>{language=="eng" ? "your" : "Khóa Học"} </span>
                                    </h2>
                                    <h2>
                                        {language=="eng" ? "favourite" : "Yêu Thích"} <span> {language=="eng" ? "Courses" : "Của Bạn"} </span>
                                    </h2>
                                    <h2>
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
                                    <h2>
                                        {language=="eng" ? "Get" : "Mua"} <span>{language=="eng" ? "your" : "Khóa Học"} </span>
                                    </h2>
                                    <h2>
                                        {language=="eng" ? "favourite" : "Yêu Thích"} <span> {language=="eng" ? "Courses" : "Của Bạn"} </span>
                                    </h2>
                                    <h2>
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
    )
}

export default StartSlider