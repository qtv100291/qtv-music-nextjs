import React, { Component } from "react";
import FilterContent from "./FilterContent";
import BreadCrumb from "../Common/BreadCrumb";
import AlbumItem from "../Common/AlbumItem";
import Dropdown from "react-bootstrap/Dropdown";
import PaginationBasic from "../Common/Pagination";
import addfunc from "../../utils/additionalFunction";
import Link from "next/link";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import styles from "./Product.module.scss";
import Head from "next/head";
import { withRouter } from "next/router";

class Product extends Component {
  state = {
    albumPerPage: 12,
    isModalShowing: false,
  };

  handleSort = (sortValue) => {
    const { filter } = this.props.query;
    let url;
    if (filter === undefined && sortValue === "Name A To Z") {
      url = "/san-pham";
    } else {
      url = `/san-pham?${filter ? `filter=${filter}` : ""}${
        sortValue === "Name A To Z"
          ? ""
          : `${filter ? `&sort=${sortValue}` : `sort=${sortValue}`}`
      }`;
    }

    this.props.router.push(url);
    // document.documentElement.classList.add("on-top");
    // setTimeout(() => window.scrollTo(0, 0), 100);
  };

  handlePageChange = (pageValue) => {
    const { filter, sort: sortValue, page } = this.props.query;
    if (pageValue.toString() === page) return;
    let url;
    if (
      filter === undefined &&
      sortValue === undefined &&
      pageValue.toString() === "1"
    ) {
      url = "/san-pham";
    } else {
      url = `/san-pham?${filter ? `filter=${filter}` : ""}${
        sortValue === undefined
          ? ""
          : `${filter ? `&sort=${sortValue}` : `sort=${sortValue}`}`
      }${
        pageValue.toString() !== "1"
          ? `${
              filter || sortValue !== undefined
                ? `&page=${pageValue}`
                : `page=${pageValue}`
            }`
          : ""
      }`;
    }
    this.props.router.push(url);
    document.documentElement.classList.add("on-top");
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  handlePreviousPage = () => {
    const { filter, sort: sortValue, page } = this.props.query;
    if (page === undefined) return;
    const pageValue = page - 1;
    let url;
    if (
      filter === undefined &&
      sortValue === undefined &&
      pageValue.toString() === "1"
    ) {
      url = "/san-pham";
    } else {
      url = `/san-pham?${filter ? `filter=${filter}` : ""}${
        sortValue === undefined
          ? ""
          : `${filter ? `&sort=${sortValue}` : `sort=${sortValue}`}`
      }${
        pageValue.toString() !== "1"
          ? `${
              filter || sortValue !== undefined
                ? `&page=${pageValue}`
                : `page=${pageValue}`
            }`
          : ""
      }`;
    }
    this.props.router.push(url);
    document.documentElement.classList.add("on-top");
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  handleNextPage = (maxPage) => {
    const { filter, sort: sortValue, page } = this.props.query;
    if (parseInt(page) === maxPage) return;
    const pageValue = page ? parseInt(page) + 1 : 2;
    let url;
    if (
      filter === undefined &&
      sortValue === undefined &&
      pageValue.toString() === "1"
    ) {
      url = "/san-pham";
    } else {
      url = `/san-pham?${filter ? `filter=${filter}` : ""}${
        sortValue === undefined
          ? ""
          : `${filter ? `&sort=${sortValue}` : `sort=${sortValue}`}`
      }${
        pageValue.toString() !== "1"
          ? `${
              filter || sortValue !== undefined
                ? `&page=${pageValue}`
                : `page=${pageValue}`
            }`
          : ""
      }`;
    }
    this.props.router.push(url);
    document.documentElement.classList.add("on-top");
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  handleFilter = (filterValueRaw) => {
    const previousFilterValue = this.props.query.filter;
    const filterValue = addfunc.removeAccents(filterValueRaw);
    if (filterValue === previousFilterValue)
      this.props.router.push("/san-pham");
    else {
      let url = `/san-pham?filter=${filterValue}`;
      this.props.router.push(encodeURI(url));
    }
    document.documentElement.classList.add("on-top");
    // setTimeout(() => window.scrollTo(0, 0), 100);
    // this.setState({ isModalShowing: false });
  };

  handleCloseFilter = () => {
    this.setState({ isModalShowing: false });
  };

  handleShow = () => {
    this.setState({ isModalShowing: true });
  };

  render() {
    const { totalAlbum, albums, query, classificationAlbum } = this.props;
    const { albumPerPage } = this.state;
    const currentPage = parseInt(query.page) || 1;
    const filterValueVietnamese = addfunc.filterValueInVienamese(query.sort);
    return (
      <main className={styles.productSection}>
        <Head>
          <title>Sản Phẩm</title>
        </Head>
        <Modal show={this.state.isModalShowing} onHide={this.handleCloseFilter}>
          <Modal.Header closeButton>
            <Modal.Title>Bộ Lọc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FilterContent
              filterList={classificationAlbum["vietnameseAlbums"]}
              filterValue={query.filter}
              onFilter={this.handleFilter}
              onHide={this.handleCloseFilter}
            />
            <FilterContent
              filterList={classificationAlbum["internationalAlbums"]}
              filterValue={query.filter}
              onFilter={this.handleFilter}
              onHide={this.handleCloseFilter}
            />
          </Modal.Body>
        </Modal>
        <BreadCrumb
          titleParent="Sản Phẩm"
          backgroundImage={`url(/san-pham-banner.jpg)`}
        />
        <div
          className={`${styles.productSectionContainer} d-flex justify-content-between`}
        >
          <section className={styles.filterPart}>
            <h3 className={styles.filterPartTitle}>Bộ Lọc</h3>
            <FilterContent
              filterList={classificationAlbum["vietnameseAlbums"]}
              filterValue={query.filter}
              onFilter={this.handleFilter}
            />
            <FilterContent
              filterList={classificationAlbum["internationalAlbums"]}
              filterValue={query.filter}
              onFilter={this.handleFilter}
            />
          </section>
          <section className={styles.productPart}>
            <div
              className={`${styles.productPartSort} d-flex justify-content-between align-items-center`}
            >
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <span>Sắp xếp theo</span>
                  <strong>{filterValueVietnamese}</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.handleSort("Name A To Z")}>
                    Tên Từ A Đến Z
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleSort("Name Z To A")}>
                    Tên Từ Z Đến A
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleSort("Price Up")}>
                    Giá Tăng Dần
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleSort("Price Down")}>
                    Giá Giảm Dần
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div
                className={`${styles.filterIcon} d-flex align-items-center justify-content-center`}
                onClick={this.handleShow}
              >
                <FontAwesomeIcon icon="filter" />
              </div>
            </div>
            <div className="product-part-container">
              {!albums ?  <div>hehehecongacongacongaconga</div> : albums.map((album) => (
                <AlbumItem
                  {...album}
                  key={album.id}
                  onOpen={this.handleOpening}
                />
              ))}
            </div>
            <PaginationBasic
              totalAlbum={totalAlbum}
              currentPage={currentPage}
              albumPerPage={albumPerPage}
              onPageChange={this.handlePageChange}
              onPreviousPage={this.handlePreviousPage}
              onNextPage={this.handleNextPage}
            />
          </section>
        </div>
      </main>
    );
  }
}

export default withRouter(Product);
