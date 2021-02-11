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
  Badge,
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
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import CourseModal from "./CourseModal";
import { getAll } from "api";

const DefaultAvatar = 'https://maytinhquanganh.com/images/noavatar.jpg';

const CourseTable = () => {
  const [userList, setUserList] = useState([]);
  const [renderUsers, setRenderUsers] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
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
                setRenderUsers(userList.slice((index - 1) * 10, index * 10));
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
    getAll('user').then(res => { 
      setUserList(res);
      setPages(res.length % 10 == 0 ? Math.floor(res.length / 10) : Math.floor(res.length / 10) + 1);
      setRenderUsers(res.slice((currentPage - 1) * 10, currentPage * 10));
    })
  }, [])

  return (
    <>
      <CourseModal
        show = {modalShow}
        isEdit = {isEdit}
        user = {selectedUser}
        onHide = {() => setModalShow(false)} 
      />
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          {
            renderUsers.length == 0 
            ? (<div className="col">
              Waiting For Data
            </div>)
            : (<div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Card tables</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Photo</th>
                      <th scope="col">Fullname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Role</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      renderUsers.map((user, index) => {
                        return(
                          <tr key={'user_' + index}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <a
                                  className="avatar rounded-circle mr-3"
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <img
                                    style={{height: "100%"}}
                                    alt="..."
                                    src={user.photoUser ? user.photoUser : DefaultAvatar}
                                  />
                                </a>
                              </Media>
                            </th>
                            <td>{user.fullName}</td>
                            <td>
                              {user.authenticateMethod.local.email || user.authenticateMethod.google.email}
                            </td>
                            <td>
                              {user.sex}
                            </td>
                            <td>
                              {(user.role)[0].toUpperCase() + (user.role).slice(1)}
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
                                        setSelectedUser(user);
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
                                        setSelectedUser(user);
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
                                        setSelectedUser(user);
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
                            setRenderUsers(userList.slice((newCurrentPage - 1) * 10, newCurrentPage * 10));
                          }
                        }
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    { renderPaginationItems() }
                    {console.log(currentPage, pages)}
                    <PaginationItem className={ currentPage == pages ? "disabled" : "" }>
                      <PaginationLink
                        href="#pablo"
                        onClick={
                          (e) => { 
                            e.preventDefault();
                            const newCurrentPage = currentPage == pages ? currentPage : currentPage + 1
                            setCurrentPage(newCurrentPage)
                            setRenderUsers(userList.slice((newCurrentPage - 1) * 10, newCurrentPage * 10));
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
