import "../scss/main.scss";
import { Provider } from "react-redux";
import store from "../store/configureStore";
import Layout from "../components/Layout";
import IconLibrary from "../utils/addIcon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import additionalFunctionDom from "../utils/additionalFunctionDom";
import LoadingScreen from "../components/LoadingScreen";

IconLibrary.addIcon();

function MyApp({ Component, pageProps }) {
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      additionalFunctionDom.checkhtmlHeight();
    });
    resizeObserver.observe(document.documentElement);
    const windowWidthInitial = window.innerWidth;
    window.addEventListener("resize", updateWindowWidth);
    setWindowWidth(windowWidthInitial);
  }, []);

  const updateWindowWidth = () => {
    const windowWidthUpdate = window.innerWidth;
    setWindowWidth(windowWidthUpdate);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      additionalFunctionDom.checkhtmlHeight();
    });
    resizeObserver.observe(document.documentElement);
  }, [router.pathname]);

  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  const handleStart = (url) => {
    const prevUrl = window.location.pathname;
    const prevBaseUrl = prevUrl.split("?")[0];
    // console.log(prevBaseUrl === "/san-pham");
    const [baseUrl, hashUrl] = url.split("?");
    if (
      prevBaseUrl === "/san-pham" &&
      baseUrl === "/san-pham" &&
      hashUrl !== undefined
    ) {
      setIsLoadingScreen(false);
    } else {
      additionalFunctionDom.fixBody();
      setIsLoadingScreen(true);
    }
  };
  const handleComplete = (url) =>
    setTimeout(() => {
      additionalFunctionDom.releaseBody();
      setIsLoadingScreen(false);
    }, 1000);

  return (
    <Provider store={store}>
      <LoadingScreen isLoadingScreen={isLoadingScreen} />
      <Layout>
        <Component {...pageProps} windowWidth={windowWidth} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
