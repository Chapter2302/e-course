/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import CourseModal from "./CourseModal";
import CreateCourseModal from "./CreateCourseModal";
import { getAll } from "api";

const DefaultAvatar = 'https://maytinhquanganh.com/images/noavatar.jpg';

const CourseTable = () => {
  const [courseList, setCourseList] = useState([]);
  const [renderCourses, setRenderCourses] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const renderPaginationItems = () => {
    let paginationItems = [];

    for(let index=1; index<=pages; index++) {
      paginationItems.push(
        <PaginationItem key={ 'pagination-item-' + index } className={ currentPage == index ? "active" : "" }>
          <PaginationLink
            onClick={
              (e) => { 
                e.preventDefault();
                setCurrentPage(index);
                setRenderCourses(courseList.slice((index - 1) * 10, index * 10));
              }
            }
          >
            { index }
          </PaginationLink>
        </PaginationItem>
      )
    }

    return paginationItems;
  }

  useEffect(() => {
    getAll('course').then(res => { 
      setCourseList(res);
      setPages(res.length % 10 == 0 ? Math.floor(res.length / 10) : Math.floor(res.length / 10) + 1);
      setRenderCourses(res.slice((currentPage - 1) * 10, currentPage * 10));
    })
  }, [])

  return (
    <>
      <CourseModal
        show = {modalShow}
        isEdit = {isEdit}
        course = {selectedCourse}
        onHide = {() => setModalShow(false)} 
      />
      <CreateCourseModal 
        show = {createModalShow}
        onHide = {() => setCreateModalShow(false)} 
      />
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          {
            renderCourses.length == 0 
            ? (<div className="col">
              Waiting For Data
            </div>)
            : (<div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between">
                  <h3 className="mb-0">Card tables</h3>
                  <button className="btn btn-sm btn-primary" onClick={() => setCreateModalShow(true)}>Create</button>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Photo</th>
                      <th scope="col">Course Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Max Student</th>
                      <th scope="col">Price</th>
                      <th scope="col">Active</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      renderCourses.map((course, index) => {
                        return(
                          <tr key={'course_' + index}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <a
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    style={{maxHeight: "80px", width: "100px"}}
                                    src={course.pictures[0] ? course.pictures[0] : DefaultAvatar}
                                  />
                                </a>
                              </Media>
                            </th>
                            <td>{course.name}</td>
                            <td>
                              {course.category}
                            </td>
                            <td>
                              {course.maxStudent}
                            </td>
                            <td>
                              ${course.price}
                            </td>
                            <td className="icon icon-sm text-center">
                              <i className={course.isActive ? "ni ni-check-bold text-green" : "ni ni-fat-remove text-red"}></i>
                            </td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="btn-icon-only text-light"
                                  href="#pablo"
                                  role="button"
                                  size="sm"
                                  color=""
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                  <DropdownItem
                                    onClick={
                                      (e) => {
                                        e.preventDefault(); 
                                        setModalShow(true);
                                        setSelectedCourse(course);
                                        setIsEdit(false);
                                      }
                                    }
                                  >
                                    Detail
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={
                                      (e) => {
                                        e.preventDefault(); 
                                        setModalShow(true);
                                        setSelectedCourse(course);
                                        setIsEdit(true);
                                      }
                                    }
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={
                                      (e) => {
                                        e.preventDefault(); 
                                        setModalShow(true);
                                        setSelectedCourse(course);
                                        setIsEdit(false);
                                      }
                                    }
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className={ currentPage == 1 ? "disabled" : "" }>
                      <PaginationLink
                        href="#pablo"
                        onClick={
                          (e) => { 
                            e.preventDefault();
                            const newCurrentPage = currentPage == 1 ? currentPage : currentPage - 1
                            setCurrentPage(newCurrentPage)
                            setRenderCourses(courseList.slice((newCurrentPage - 1) * 10, newCurrentPage * 10));
                          }
                        }
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    { renderPaginationItems() }
                    <PaginationItem className={ currentPage == pages ? "disabled" : "" }>
                      <PaginationLink
                        href="#pablo"
                        onClick={
                          (e) => { 
                            e.preventDefault();
                            const newCurrentPage = currentPage == pages ? currentPage : currentPage + 1
                            setCurrentPage(newCurrentPage)
                            setRenderCourses(courseList.slice((newCurrentPage - 1) * 10, newCurrentPage * 10));
                          }
                        }
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>)
          }
        </Row>
      </Container>
    </>
  );
};

export default CourseTable;
