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
        <title>T??m Ki???m</title>
      </Head>
      <BreadCrumb
        titleParent="T??m Ki???m"
        backgroundImage={`url(/seach-page-banner.jpg)`}
      />
      <section className={styles.resultList}>
        <h3 className={styles.resultListTitle}>
          T??m ki???m cho : <span className={styles.keyword}>{keyword}</span>{" "}
          <span className={styles.resultNumber}>({totalAlbum} k???t qu???)</span>
        </h3>
        <div className={styles.productPartSort}>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <span>S???p x???p theo</span>
              <strong>{addfunc.filterValueInVienamese(sortOrderBy)}</strong>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort("Name A To Z")}>
                T??n T??? A ?????n Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("Name Z To A")}>
                T??n T??? Z ?????n A
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("Price Up")}>
                Gi?? T??ng D???n
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("Price Down")}>
                Gi?? Gi???m D???n
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
