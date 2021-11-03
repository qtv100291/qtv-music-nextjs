import React, { useState } from "react";
import AlbumItem from "../Common/AlbumItem";
import PaginationBasic from "../Common/Pagination";
import BreadCrumb from "../Common/BreadCrumb";
import Dropdown from "react-bootstrap/Dropdown";
import addfunc from "../../utils/additionalFunction";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import styles from "./SearchPage.module.scss";
import Head from "next/head";

const SearchPage = ({ searchAlbumList, keyword }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrderBy, setSortOrderBy] = useState("Name A To Z");

  const albumPerPage = 12;

  // useEffect(() => {
  //   (async function getData() {
  //     const albumList = await getSearchAlbum(keyword);
  //     setAlbumList(albumList);
  //   })();
  //   // props.onLoadingScreen();
  //   additionalFunctionDom.fixBody();
  //   setTimeout(() => {
  //     // props.onLoadingScreen();
  //     additionalFunctionDom.releaseBody();
  //   }, 1200);
  // }, [keyword]);
  const albumList = searchAlbumList;
  // console.log("albumlist", sortOrderBy);
  const totalAlbum = albumList.length;
  const sortedAlbum = addfunc.productSortBy(albumList, sortOrderBy);
  // console.log("sortedAlbum",sortedAlbum)
  const albumDisplay = addfunc.albumDisplay(
    totalAlbum,
    currentPage,
    albumPerPage,
    sortedAlbum
  );

  const handlePreviousPage = () => {
    const previousPage = currentPage;
    if (previousPage === 1) return;
    const pageNow = previousPage - 1;
    setCurrentPage(pageNow);
    document.documentElement.classList.add("on-top");
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  const handleNextPage = (maxPage) => {
    const previousPage = currentPage;
    if (previousPage === maxPage) return;
    const pageNow = previousPage + 1;
    setCurrentPage(pageNow);
    document.documentElement.classList.add("on-top");
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    document.documentElement.classList.add("on-top");
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  const handleSort = (sortValue) => {
    setSortOrderBy(sortValue);
    setCurrentPage(1);
  };

  const handleOpening = (id) => {
    additionalFunctionDom.fixBody();
    setIsOpeningModal(true);
    setPreViewId(id);
  };

  const handleClose = () => {
    additionalFunctionDom.releaseBody();
    setIsOpeningModal(false);
    setPreViewId(null);
  };

  return (
    <main className={styles.searchPageMain}>
      <Head>
        <title>Tìm Kiếm</title>
      </Head>
      <BreadCrumb
        titleParent="Tìm Kiếm"
        backgroundImage={`url(/seach-page-banner.jpg)`}
      />
      <section className={styles.resultList}>
        <h3 className={styles.resultListTitle}>
          Tìm kiếm cho : <span className={styles.keyword}>{keyword}</span>{" "}
          <span className={styles.resultNumber}>({totalAlbum} kết quả)</span>
        </h3>
        <div className={styles.productPartSort}>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <span>Sắp xếp theo</span>
              <strong>{addfunc.filterValueInVienamese(sortOrderBy)}</strong>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort("Name A To Z")}>
                Tên Từ A Đến Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("Name Z To A")}>
                Tên Từ Z Đến A
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("Price Up")}>
                Giá Tăng Dần
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("Price Down")}>
                Giá Giảm Dần
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={`result-container`}>
          {albumDisplay.map((album) => (
            <AlbumItem {...album} key={album.id} onOpen={handleOpening} />
          ))}
        </div>
        {totalAlbum > 12 && <PaginationBasic
          totalAlbum={totalAlbum}
          currentPage={currentPage}
          albumPerPage={albumPerPage}
          onPageChange={handlePageChange}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />}
      </section>
    </main>
  );
};

export default SearchPage;
