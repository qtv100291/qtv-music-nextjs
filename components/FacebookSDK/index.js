export function initFacebookSdk() {
  return new Promise(resolve => {
      // wait for facebook sdk to initialize before starting the react app
      window.fbAsyncInit = function () {
          window.FB.init({
              appId: 225595846168627,
              autoLogAppEvents : true,
              cookie: true,
              xfbml: true,
              version: 'v11.0'
          });
          resolve()
      };
      // load facebook sdk script
      (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) { return; }
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/vi_VN/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));    
  });
}