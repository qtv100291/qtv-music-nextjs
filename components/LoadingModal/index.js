import React from "react";
import  ReactDOM  from "react-dom";
import LoadingModal from "./LoadingModal";

const LoadingModalRender = (props) => {
  return ReactDOM.createPortal(
    <LoadingModal {...props}/>, document.getElementById('loading-modal')
  );
};

export default LoadingModalRender;