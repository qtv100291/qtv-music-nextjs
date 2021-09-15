import "../scss/main.scss";
import { Provider, useDispatch } from "react-redux";
import store from "../store/configureStore";
import Layout from "../components/Layout";
import IconLibrary from "../utils/addIcon";
import { useEffect } from "react";
import { useRouter } from "next/router";
import additionalFunctionDom from "../utils/additionalFunctionDom";
import { loginGoogle } from "../services/googleService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

IconLibrary.addIcon();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(()=>{
    const resizeObserver = new ResizeObserver(() => {
      additionalFunctionDom.checkhtmlHeight();
    });
    resizeObserver.observe(document.documentElement);
  },[])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      additionalFunctionDom.checkhtmlHeight();
    });
    resizeObserver.observe(document.documentElement);

    if (
      router.pathname === "/dang-nhap" &&
      document.readyState === "complete"
    ) {
      const MySwal = withReactContent(Swal);
      async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        try {
          await loginGoogle({ googleAccessToken: response.credential });
          MySwal.fire({
            icon: "success",
            html: "Đăng Nhập Thành Công",
            showConfirmButton: false,
            timer: 1250,
          }).then(() => {
            window.location = "/";
          });
        } catch (err) {
          console.log("error", err);
        }
      }
      google.accounts.id.initialize({
        client_id:
          "1020234478913-eptfd3u3qg9kds0ngb44tijnb77gojn8.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "filled_blue", size: "large", width: "320" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
      console.log("hhehe");
    }
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
