import { Fragment, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/";
import ScrollTopIcon from "../Common/ScrollTopIcon";
import PreviewModalRender from "../PreviewModal";
import { isOpeningModal } from "../../store/quickViewModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import authService from "../../services/loginService";
import { getInitialValue } from "../../store/shoppingCart";
import { setLogin } from "../../store/authentication";
import shoppingCartFunc from "../../utils/shoppingCartFunc";
import { initFacebookSdk } from "../FacebookSDK";
import LoadingModalRender from '../LoadingModal'
import { isRunningLoadingModal } from "../../store/loadingModal";

const Layout = (props) => {
  const dispatch = useDispatch();
  const isOpening = useSelector(isOpeningModal);
  const isOpeningLoadingModal = useSelector(isRunningLoadingModal);
  useEffect(() => {
    checkIsLogged();
    initFacebookSdk();
    
  }, []);

  const checkIsLogged = async () => {
    const tokenKey = authService.checkToken();
    const timeNow = Date.now() / 1000;
    if (tokenKey && tokenKey.exp > timeNow) {
      try {
        const userData = await authService.getUserData();
        const shoppingCart = [...userData.shoppingCart];
        userData.shoppingCart = [];
        dispatch(getInitialValue(shoppingCart));
        dispatch(setLogin(userData));
      } catch (err) {}
    } else {
      const shoppingCart = shoppingCartFunc.loadCartLocal();
      dispatch(getInitialValue(shoppingCart));
    }
  };

  return (
    <Fragment>
      {isOpening && <PreviewModalRender />}
      {isOpeningLoadingModal && <LoadingModalRender isOpening={isOpeningLoadingModal} />}
      <NavBar />
      {props.children}
      <ScrollTopIcon />
      <Footer />
    </Fragment>
  );
};

export default Layout;
