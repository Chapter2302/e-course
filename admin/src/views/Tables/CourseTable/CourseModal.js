import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    CardFooter,
    Carousel,
    CarouselItem,
    CarouselIndicators,
  } from "reactstrap";

const DefaultAvatar = 'https://maytinhquanganh.com/images/noavatar.jpg';

const CourseModal = (props) => {
    const [thisCourse, setThisCourse]  = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        setThisCourse(props.course ? props.course : null);
        setIsUpdating(false);
        setIsDeleting(false);
        setCarouselItems([
            {
                src: props.course ? props.course.pictures[0] : DefaultAvatar,
                altText: 'Slide 1'
            },
            {
              src: props.course ? props.course.pictures[1] : DefaultAvatar,
              altText: 'Slide 2'
            },
            {
              src: props.course ? props.course.pictures[2] : DefaultAvatar,
              altText: 'Slide 3'
            }
        ]);
    }, [props.show])

    useEffect(() => {
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
        !thisCourse ? <></> : 
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
                                        { isUpdating ? <div className="text-yellow text-sm font-weight-bold">Updating...</div> : <></> }
                                        { isDeleting ? <div className="text-red text-sm font-weight-bold">Deleting...</div> : <></> }
                                        <div className="card-profile-stats d-flex justify-content-center">
                                            <input  className="btn btn-primary" type="file" 
                                                    disabled={props.state === "edit" ? false : true}
                                                    multiple={false} onChange={e => inputFileChange(e)}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <ReactStars
                                                count={5}
                                                onChange={newRate => setThisCourse({ ...thisCourse, rating: newRate })}
                                                disabled={props.state === "edit" ? false : true}
                                                value={thisCourse.rating}
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
                                {   
                                        props.state === "edit"  
                                        ?   <>
                                                <button 
                                                    className={"btn btn-primary"}>
                                                    CONFIRM
                                                </button>{' '}
                                            </>
                                        :   <></>
                                    }
                                    {   
                                        props.state === "delete"  
                                        ?   <>
                                                <button 
                                                    className={"btn btn-danger"}>
                                                    DELETE
                                                </button>{' '}
                                            </>
                                        :   <></>
                                    }
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
                                            disabled={props.state === "edit" ? false : true}
                                            defaultValue={thisCourse.name}
                                            onBlur={(e) => setThisCourse({ ...thisCourse, name: e.target.value })}
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
                                                disabled={props.state === "edit" ? false : true}
                                                defaultValue={thisCourse.category}
                                                onChange={(e) => setThisCourse({ ...thisCourse, category: e.target.value })}
                                                type="select"
                                            >
                                                <option value="Information Technology">Information Technology</option>\
                                                <option value="Marketing">Marketing</option>
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
                                                disabled={props.state === "edit" ? false : true}
                                                onChange={(e) => setThisCourse({ ...thisCourse, isActive: e.target.value })}
                                                defaultValue={thisCourse.isActive}
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
                                            <Input className="form-control-alternative" 
                                                type="number" defaultValue={thisCourse.maxStudent}
                                                onBlur={(e) => setThisCourse({ ...thisCourse, maxStudent: e.target.value })}
                                                disabled={props.state === "edit" ? false : true}
                                            />
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
                                            <Input className="form-control-alternative" 
                                                type="number" defaultValue={thisCourse.quantity}
                                                disabled={props.state === "edit" ? false : true}
                                                onBlur={(e) => setThisCourse({ ...thisCourse, quantity: e.target.value })}
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
                                                Start Date
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="date" defaultValue={thisCourse.schedule.startDate}
                                                disabled={props.state === "edit" ? false : true}
                                                onChange={
                                                    (e) => {
                                                        let newSchedule = thisCourse.schedule;
                                                        newSchedule.startDate = e.target.value;
                                                        setThisCourse({ ...thisCourse, schedule: newSchedule })
                                                    }
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                        <label
                                                className="form-control-label"
                                                htmlFor="input-city"
                                            >
                                                End Date
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="date" defaultValue={thisCourse.schedule.endDate}
                                                disabled={props.state === "edit" ? false : true}
                                                onChange={
                                                    (e) => {
                                                        let newSchedule = thisCourse.schedule;
                                                        newSchedule.endDate = e.target.value;
                                                        setThisCourse({ ...thisCourse, schedule: newSchedule })
                                                    }
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label className="form-control-label" >
                                                First Day
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="select" defaultValue={thisCourse.schedule.dayInWeek[0]}
                                                disabled={props.state === "edit" ? false : true}
                                                onChange={
                                                    (e) => {
                                                        let newSchedule = thisCourse.schedule;
                                                        newSchedule.dayInWeek[0] = e.target.value;
                                                        setThisCourse({ ...thisCourse, schedule: newSchedule })
                                                    }
                                                }
                                            >
                                                <option value={"monday"}>Monday</option>
                                                <option value={"tuesday"}>Tuesday</option>
                                                <option value={"wednesday"}>Wednesday</option>
                                                <option value={"thursday"}>Thursday</option>
                                                <option value={"friday"}>Friday</option>
                                                <option value={"saturday"}>Saturday</option>
                                                <option value={"sunday"}>Sunday</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label className="form-control-label">
                                                Day's Shift
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="select" defaultValue={thisCourse.schedule.shift[0]}
                                                disabled={props.state === "edit" ? false : true}
                                                onChange={
                                                    (e) => {
                                                        let newSchedule = thisCourse.schedule;
                                                        newSchedule.shift[0] = e.target.value;
                                                        setThisCourse({ ...thisCourse, schedule: newSchedule })
                                                    }
                                                }
                                            >
                                                <option value={1}>8.AM - 11.AM</option>
                                                <option value={2}>14.PM - 17.PM</option>
                                                <option value={3}>18.PM - 21.PM</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label className="form-control-label" >
                                                Second Day
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="select" defaultValue={thisCourse.schedule.dayInWeek[1]}
                                                disabled={props.state === "edit" ? false : true}
                                                onChange={
                                                    (e) => {
                                                        let newSchedule = thisCourse.schedule;
                                                        newSchedule.dayInWeek[1] = e.target.value;
                                                        setThisCourse({ ...thisCourse, schedule: newSchedule })
                                                    }
                                                }
                                            >
                                                <option value={"monday"}>Monday</option>
                                                <option value={"tuesday"}>Tuesday</option>
                                                <option value={"wednesday"}>Wednesday</option>
                                                <option value={"thursday"}>Thursday</option>
                                                <option value={"friday"}>Friday</option>
                                                <option value={"saturday"}>Saturday</option>
                                                <option value={"sunday"}>Sunday</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label className="form-control-label">
                                                Day's Shift
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="select" defaultValue={thisCourse.schedule.shift[1]}
                                                disabled={props.state === "edit" ? false : true}
                                                onChange={
                                                    (e) => {
                                                        let newSchedule = thisCourse.schedule;
                                                        newSchedule.shift[1] = e.target.value;
                                                        setThisCourse({ ...thisCourse, schedule: newSchedule })
                                                    }
                                                }
                                            >
                                                <option value={1}>8.AM - 11.AM</option>
                                                <option value={2}>14.PM - 17.PM</option>
                                                <option value={3}>18.PM - 21.PM</option>
                                            </Input>
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
                                            defaultValue={thisCourse.teacher}
                                            type="text" disabled={props.state === "edit" ? false : true}
                                            onBlur={(e) => setThisCourse({ ...thisCourse, teacher: e.target.value })}
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
                                            defaultValue={thisCourse.link}
                                            type="text" disabled={props.state === "edit" ? false : true}
                                            onBlur={(e) => setThisCourse({ ...thisCourse, link: e.target.value })}
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
                                    rows="4" disabled={props.state === "edit" ? false : true}
                                    defaultValue={thisCourse.description}
                                    type="textarea"
                                    onBlur={(e) => setThisCourse({ ...thisCourse, bio: e.target.value })}
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