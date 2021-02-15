import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    CardFooter,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from "reactstrap";

const DefaultAvatar = 'https://maytinhquanganh.com/images/noavatar.jpg';

const CourseModal = (props) => {
    const [thisCourse, setThisCourse]  = useState(null);
    const [isUpdating, setIsUpdating] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const [carouselItems, setCarpuselItems] = useState([]);

    useEffect(() => {
        setThisCourse(props.course ? props.course : null);
        setIsUpdating(false);
    }, [props])

    useEffect(() => {
        setCarpuselItems([
            {
                src: thisCourse ? thisCourse.pictures[0] : DefaultAvatar,
                altText: 'Slide 1'
            },
            {
              src: thisCourse ? thisCourse.pictures[1] : DefaultAvatar,
              altText: 'Slide 2'
            },
            {
              src: thisCourse ? thisCourse.pictures[2] : DefaultAvatar,
              altText: 'Slide 3'
            }
        ]);
    }, [thisCourse])

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const inputFileChange = (e) => {
        let reader = new FileReader()
        if(e.target.files[0]) {
            reader.onload = () => {
                let newPictures = {...thisCourse.pictures};
                newPictures[activeIndex] = reader.result;
                setThisCourse({ ...thisCourse, pictures: newPictures });
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const clickUpdateBtn = () => {
        setIsUpdating(true);
    }

    const slides = carouselItems.map((item, index) => {
        return (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={'picture_' + index}
          >
            <div className="d-flex justify-content-center">
                <img className="rounded m-auto" src={item.src} alt={item.altText} style={{width: "100%", maxWidth: "300px"}}/>
            </div>
          </CarouselItem>
        );
    });

    return(
        !props.course ? <></> : 
        <Modal {...props}  size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header><p></p></Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="col-10 pt-4">
                                    <Carousel
                                        activeIndex={activeIndex}
                                        interval={false}
                                    >
                                        <CarouselIndicators items={carouselItems} activeIndex={activeIndex} onClickHandler={goToIndex} />
                                        {slides}
                                    </Carousel>
                                </Col>
                            </Row>
                            <CardBody className="">
                                <Row>
                                    <div className="col">
                                        { isUpdating ? <div className="text-red text-sm font-weight-bold">Updating...</div> : <></> }
                                        <div className="card-profile-stats d-flex justify-content-center">
                                            <input className="btn btn-primary" type="file" multiple={false} onChange={e => inputFileChange(e)}/>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <ReactStars
                                                count={5}
                                                // onChange={ratingChanged}
                                                size={30}
                                                emptyIcon={<i className="far fa-star"></i>}
                                                fullIcon={<i className="fas fa-star"></i>}
                                                activeColor="#F5365C"
                                            />
                                        </div>
                                    </div>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Row className="d-flex justify-content-center">
                                    <button className="btn btn-lg btn-primary" onClick={() => clickUpdateBtn()}>CONFIRM</button>{' '}
                                    <button className="btn btn-lg btn-secondary" onClick={props.onHide}>CANCEL</button>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                        <CardBody>
                            <Form>
                            <h6 className="heading-small text-muted mb-4">
                                Course information
                            </h6>
                            <div className="pl-lg-4">
                            <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Course Name
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            defaultValue="Basic Programming"
                                            type="text"
                                        />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                            >
                                                Category
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="select"
                                            >
                                                <option value="Information Technology">Information Technology</option>
                                                <option value="Language">Language</option>
                                                <option value="Economy">Economy</option>
                                                <option value="Design">Design</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-city"
                                            >
                                                Active
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="select"
                                            >
                                                <option value={true}>True</option>
                                                <option value={false}>False</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-country"
                                            >
                                                Max Student
                                            </label>
                                            <Input className="form-control-alternative" type="number" defaultValue={0}/>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-country"
                                            >
                                                
                                                Quantity
                                            </label>
                                            <Input className="form-control-alternative" type="number" defaultValue={0}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-address"
                                        >
                                            Teacher
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            defaultValue="Teacher ID"
                                            type="text"
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-city"
                                            >
                                                Date Of Birth
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="date"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-last-name"
                                            >
                                                Password
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Password"
                                                type="password"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Bank ID
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="0987-6543-210"
                                            type="text"
                                        />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            type="text"
                                        >
                                            Phone Number
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder="0987654321"
                                            type="email"
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-address"
                                        >
                                            Link Room
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            defaultValue="https://meet.google.com/"
                                            type="text"
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <div className="pl-lg-4">
                                <FormGroup>
                                    <label>Decsription</label>
                                <Input
                                    className="form-control-alternative"
                                    placeholder="A few words about you ..."
                                    rows="4"
                                    defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                                    Open Source."
                                    type="textarea"
                                />
                                </FormGroup>
                            </div>
                            </Form>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    )
}

export default CourseModal;