function filterMusic(genre, musicData) {
  // create array following this sample [ { band : number of different albums }, ...]
  const genreFilter = musicData.filter((x) => x.country === genre);
  const bandFilter = genreFilter.map((x) => x.bandName);
  const numberOfAlbumPerBand = bandFilter.reduce((allBand, band) => {
    if (band in allBand) {
      allBand[band]++;
    } else {
      allBand[band] = 1;
    }
    return allBand;
  }, {});
  let numberOfAlbumPerBandArray = [];
  for (let band in numberOfAlbumPerBand) {
    numberOfAlbumPerBandArray.push({ [band]: numberOfAlbumPerBand[band] });
  }
  let allKey = "Rock/Metal " + genre;
  const numberOfAlbumPerBandArraySorted = [
    { [allKey]: bandFilter.length },
    ...numberOfAlbumPerBandArray,
  ];
  return numberOfAlbumPerBandArraySorted;
}

function sortAToZ(array) {
  const arraySorted = array.sort((a, b) => {
    return a.albumName.localeCompare(b.albumName);
  });
  return arraySorted;
}

function sortZToA(array) {
  const arraySorted = sortAToZ(array).reverse();
  return arraySorted;
}

function sortPriceMinToMax(array) {
  return array.sort((a, b) => {
    return (
      parseInt(a.price.replace(/\D/g, "")) -
      parseInt(b.price.replace(/\D/g, ""))
    );
  });
}

function sortPriceMaxToMin(array) {
  return array.sort((a, b) => {
    return -(
      parseInt(a.price.replace(/\D/g, "")) -
      parseInt(b.price.replace(/\D/g, ""))
    );
  });
}

function albumDisplay(total, currentpage = 1, albumPerPage, album) {
  let indexEnd;
  if (currentpage === Math.ceil(total / albumPerPage)) indexEnd = total;
  else indexEnd = currentpage * albumPerPage;
  const albumDisplay = album.slice((currentpage - 1) * albumPerPage, indexEnd);
//   console.log("albumDisplay", albumDisplay);
  return albumDisplay;
}

function productSortBy(albumList, sortOrderBy = "Name A To Z") {
  let sortedAlbum;
  switch (sortOrderBy) {
    case "Name A To Z":
      sortedAlbum = sortAToZ(albumList);
      break;
    case "Name Z To A":
      sortedAlbum = sortZToA(albumList);
      break;
    case "Price Up":
      sortedAlbum = sortPriceMinToMax(albumList);
      break;
    case "Price Down":
      sortedAlbum = sortPriceMaxToMin(albumList);
      break;
    default:
      break;
  }
  return sortedAlbum;
}

function filterValueInVienamese(value){
  let filterValue 
  switch (value) {
    case "Name Z To A":
      filterValue  = "Tên Từ Z Đến A";
      break;
    case "Price Up":
      filterValue  = "Giá Tăng Dần";
      break;
    case "Price Down":
      filterValue  = "Giá Giảm Dần";
      break;
    default:
      filterValue  = "Tên Từ A Đến Z";
      break;
  }
  return filterValue
}

function productFilter(album, filterValue) {
  let filteredAlbum;
  // console.log(filterValue === "Rock/Metal Viet Nam")
  if (filterValue === undefined) {
    filteredAlbum = album.slice(0);
    return filteredAlbum;
  }
  if (filterValue === "Rock/Metal Viet Nam") {
    filteredAlbum = album.filter((x) => x.country === "Việt Nam");
    return filteredAlbum;
  }
  if (filterValue === "Rock/Metal Quoc Te") {
    filteredAlbum = album.filter((x) => x.country === "Quốc Tế");
    return filteredAlbum;
  }
  filteredAlbum = album.filter((x) => removeAccents(x.bandName) === filterValue);
  // console.log(filteredAlbum)
  return filteredAlbum;
}

function separator1000(num) {
  // 1000 separator
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getAlbumId(path) {
  const pathArray = path.split("-");
  const albumId = pathArray[pathArray.length - 1];
  return albumId;
}

function getRatioSliderBar(time, timeDuration) {
  const ratioSliderBar = ((time / timeDuration) * 100).toFixed(2);
  // const widthSlider = document.querySelector('.input-slider::-webkit-slider-thumb').style.width = `${ratioSliderBar}`
  return ratioSliderBar;
}

function setTimeInSecond(time) {
  const minutes =
    Math.floor(time / 60) < 10
      ? `0${Math.floor(time / 60)}`
      : Math.floor(time / 60);
  const seconds =
    time - minutes * 60 < 10
      ? `0${Math.ceil(time - minutes * 60)}`
      : Math.ceil(time - minutes * 60);
  const timeInSecond = `${minutes} : ${seconds}`;
  return timeInSecond;
}

function getTimePlay(valueRef, timeDuration) {
  const timePlay = Math.ceil((valueRef / 100) * timeDuration);
  return timePlay;
}

function songTimeDuration(time) {
  const minutes =
    parseInt(time.split(":")[0]) < 10
      ? `0${parseInt(time.split(":")[0])}`
      : parseInt(time.split(":")[0]);
  const seconds =
    parseInt(time.split(":")[1]) < 10
      ? `0${parseInt(time.split(":")[1])}`
      : parseInt(time.split(":")[1]);
  return `${minutes} : ${seconds}`;
}

function titlePath(title) {
  const path = removeAccents(title).toLowerCase().split(" ").join("-");
  return path;
}

function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function totalItemCalculation(shoppingCart) {
  let totalItem = 0;
  for (let item of shoppingCart) {
    const count = item.count || 0;
    totalItem += parseInt(count);
  }
  return totalItem;
}

function totalMoneyCalculation(shoppingCart) {
  let totalMoney = 0;
  for (let item of shoppingCart) {
    const count = item.count || 0;
    totalMoney += item.price.replace(/\D/g, "") * count;
  }
  return totalMoney;
}

function GetPaymentInfo(data, shoppingCart) {
  this.receiverName = data.receiverName;
  this.phone = data.receiverPhone;
  this.address = {
    province: data.receiverProvince,
    district: data.receiverDistrict,
    commune: data.receiverCommune,
    street: data.receiverStreet,
  };
  this.note = data.reciverNote;
  this.paymentMethod = data.paymentMethod;
  if (data.paymentMethod === "card") {
    this.cardInfo = {
      cardType: data.cardType,
      cardOwner: data.cardOwner,
      cardExpireDate: data.cardExpireDate,
      cardCvv: data.cardCvv,
    };
  }
  this.orderList = [...shoppingCart];
}

const checkOnly2Digit = (value) => {
  //function check value is a number from 1 to 99
  const regex = /^\d{0,2}$/;
  const testValue = value;
  if (testValue === "") return "";
  if (regex.test(testValue) && testValue.charAt(0) !== "0") {
    return parseInt(testValue);
  } else {
    const testValueChange = testValue.substring(0, testValue.length - 1);
    if (testValueChange === "") return "";
    else return parseInt(testValueChange);
  }
};

const buildHistoryTrade = (shoppingCart) => {
  const dateSave = (function () {
    let date = new Date().getDate().toString();
    if (date < 10) {
      date = `0${date}`;
    }
    return date;
  })();

  const monthSave = (function () {
    let month = (new Date().getMonth() + 1).toString();
    if (month < 10) {
      month = `0${month}`;
    }
    return month;
  })();
  const yearSave = new Date().getFullYear();
  const timeNow = `${dateSave}/${monthSave}/${yearSave}`;
  for (let i = 0; i < shoppingCart.length; i++) {
    shoppingCart[i].time = timeNow;
  }
  return shoppingCart;
};

function searchAlbum (searchInputRaw, musicData){
  const searchInput = removeAccents(searchInputRaw).toLowerCase();
  let albumListFiltered = [];
  for (let album of musicData){
      if (removeAccents(album.albumName).toLowerCase().includes(searchInput))
      albumListFiltered.push(album);
  }
  return albumListFiltered;
}

export default {
  filterMusic,
  sortAToZ,
  sortZToA,
  sortPriceMinToMax,
  sortPriceMaxToMin,
  separator1000,
  productSortBy,
  albumDisplay,
  productFilter,
  getAlbumId,
  getRatioSliderBar,
  setTimeInSecond,
  getTimePlay,
  songTimeDuration,
  titlePath,
  removeAccents,
  totalItemCalculation,
  totalMoneyCalculation,
  GetPaymentInfo,
  checkOnly2Digit,
  buildHistoryTrade,
  filterValueInVienamese,
  searchAlbum 
};
