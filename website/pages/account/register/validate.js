import HeadContent from '../../../component/head'
import Header from '../../../component/header'
import Footer from '../../../component/footer'

const Validate = () => {
    return(
        <>
        <HeadContent title={'Validate'}/>
        <Header/>
        {/* Start Bradcaump area */}
        <div className="ht__bradcaump__area bg-image--5">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="bradcaump__inner text-center">
                    <h2 className="bradcaump-title">Validate</h2>
                    <nav className="bradcaump-content">
                    <a className="breadcrumb_item" href="index.html">
                        Home
                    </a>
                    <span className="brd-separetor">/</span>
                    <span className="breadcrumb_item active">Validate</span>
                    </nav>
                </div>
                </div>
            </div>
            </div>
        </div>
        {/* End Bradcaump area */}
        {/* Start Error Area */}
        <section className="page_error section-padding--lg bg--white">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="error__inner text-center">
                    <div className="error__logo">
                    </div>
                    <div className="error__content">
                    <h2>Please Check Your Email To Validate</h2>
                    <p>It looks like you are lost! Try searching here</p>
                    <div className="search_form_wrapper">
                        <form action="#">
                        <div className="form__box">
                            <input type="text" placeholder="Search..." />
                            <button>
                            <i className="fa fa-search" />
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* End Error Area */}
        <Footer/>
    </>
    )
}

export default Validate