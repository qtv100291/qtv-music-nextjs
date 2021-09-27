import React, { Component } from "react";
import styles from "./NavbarIconItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import addfunc from "../../utils/additionalFunction";
import { createRef } from "react";
import { withRouter } from "next/router";
import loadingIconSmall from "../../assets/homepage-assets/loading-icon-small.gif";
import Image from "next/image";
import { getSearchAlbum } from "../../services/albumServiceHomePage";
import axios from "axios";
class SearchBar extends Component {
  state = {
    isDisplaying: false,
    keyword: "",
    searchResult: null,
    isLoading: false,
  };

  myInput = createRef();
  cancelToken = undefined;

  handleChangeIcon = () => {
    const isDisplaying = this.state.isDisplaying ? false : true;
    this.setState({ isDisplaying, keyword: "", searchResult: null });
    isDisplaying && this.myInput.current.focus();
  };

  handleSearchInput = async ({ currentTarget: input }) => {
    if (typeof this.cancelToken != typeof undefined) {
      this.cancelToken.cancel("Operation canceled due to new request");
    }
    this.cancelToken = axios.CancelToken.source();
    if (input.value === "") {
      this.setState({ searchResult: null, keyword: "", isLoading: false });
      return;
    } else {
      this.setState({ isLoading: true });
      const keyword = input.value;
      this.setState({ keyword, isSearching: true });
      const searchResult = await getSearchAlbum(input.value, this.cancelToken);
      if (searchResult) {
        this.setState({ searchResult, isLoading: false });
      }
    }
  };

  handleLoseFocus = () => {
    setTimeout(
      () =>
        this.setState({ isDisplaying: false, keyword: "", searchResult: null }),
      300
    );
  };

  handleGoToSeachPage = (event) => {
    if (this.state.keyword === "") return;
    if (event.keyCode === 13) {
      const { keyword } = this.state;
      const queryString = keyword.replace(" ", "+");
      this.props.router.push({
        pathname: "/tim-kiem",
        search: `?search=${queryString}`,
      });
      this.setState({ isDisplaying: false, keyword: "", searchResult: null });
      this.myInput.current.blur();
    }
  };

  handleGoToSeachPageByClickIcon = () => {
    if (this.state.keyword === "") return;
    const { keyword } = this.state;
    const queryString = keyword.replace(" ", "");
    this.props.router.push({
      pathname: "/tim-kiem",
      search: `?search=${queryString}`,
    });
    this.setState({ isDisplaying: false, keyword: "", searchResult: null });
  };

  renderSearchResult = (result, searchInputRaw) => {
    const searchInput = addfunc.removeAccents(searchInputRaw).toLowerCase();
    const resultPath =
      "/san-pham/" +
      (result.albumName && result.albumName.replace(/ /g, "-")) +
      "-" +
      result.id;
    const indexOfTextColored = addfunc
      .removeAccents(result.albumName)
      .toLowerCase()
      .indexOf(searchInput);
    const textColored = result.albumName.slice(
      indexOfTextColored,
      indexOfTextColored + searchInput.length
    );
    return (
      <Link href={resultPath} key={result.id} passHref>
        <a className={styles.linkSearchBar}>
          <div className="link-container">
            {result.albumName.slice(0, indexOfTextColored)}
            <span className={styles.textColored}>{textColored}</span>
            {result.albumName.slice(indexOfTextColored + searchInput.length)}
          </div>
        </a>
      </Link>
    );
  };

  render() {
    const { searchResult, keyword, isDisplaying, isLoading } = this.state;
    return (
      <div
        className={`${styles.searchBarIconPart} ${styles.navbarIconItem}`}
        title="Tìm Kiếm"
      >
        <div
          className={`${styles.searchBarIcon} d-flex justify-content-center align-items-center`}
          onClick={this.handleChangeIcon}
        >
          {!isDisplaying ? (
            <FontAwesomeIcon
              icon="search"
              className="real-font-awesome icon-navbar"
            />
          ) : (
            <FontAwesomeIcon
              icon="times"
              className="real-font-awesome icon-navbar"
            />
          )}
        </div>
        <div
          className={
            !isDisplaying
              ? `${styles.searchBar} d-flex align-items-center justify-content-between`
              : `${styles.searchBar} ${styles.displaying} d-flex align-items-center justify-content-between`
          }
        >
          <input
            type="text"
            onChange={this.handleSearchInput}
            onBlur={this.handleLoseFocus}
            placeholder="Tìm Kiếm..."
            id={this.props.idInput}
            value={keyword}
            ref={this.myInput}
            autoComplete="off"
            onKeyDown={this.handleGoToSeachPage}
          />
          <div className={styles.iconSearchContainer}>
            <FontAwesomeIcon
              icon="search"
              className={`real-font-awesome ${styles.iconSearch}`}
              onClick={this.handleGoToSeachPageByClickIcon}
            />
            <div
              className={
                isLoading
                  ? `${styles.loadingSearchBar}`
                  : `${styles.loadingSearchBar} turn-off`
              }
            >
              <Image
                loading="eager"
                src={loadingIconSmall}
                alt="loading-icon"
              />
            </div>
          </div>
          <div className={styles.result}>
            {isLoading ? (
              <p style={{ textAlign: "left", marginLeft: "10px" }}>. . . </p>
            ) : (
              searchResult &&
              (searchResult.length === 0 ? (
                <p>Không có sản phẩm phù hợp</p>
              ) : (
                searchResult.map((album) =>
                  this.renderSearchResult(album, keyword)
                )
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBar);
