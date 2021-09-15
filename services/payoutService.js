import http from "./httpService";

const apiEndpointProvince = "/api/province";
const apiEndpointDistrict = "/api/district";
const apiEndpointCommune = "/api/commune";
const apiEndpointPayout = "/api/payout";

async function getProvince() {
  const { data: provinceList } = await http.get(apiEndpointProvince);
  return provinceList;
}

async function getDistrict(idProvince) {
  const { data: districtList } = await http.get(
    apiEndpointDistrict + "/?idProvince=" + idProvince
  );
  return districtList;
}

async function getCommune(idDistrict) {
  const { data: communeList } = await http.get(
    apiEndpointCommune + "/?idDistrict=" + idDistrict
  );
  return communeList;
}

async function orderService(userInfo) {
  return await http.post(apiEndpointPayout, { userInfo });
}

export default {
  getProvince,
  getDistrict,
  getCommune,
  orderService,
};
