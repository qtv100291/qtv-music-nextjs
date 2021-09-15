import React from "react";
import  ReactDOM  from "react-dom";
import PreviewModal from "./PreviewModal";

const PreviewModalRender = () => {
  return ReactDOM.createPortal(
    <PreviewModal/>, document.getElementById('preview-modal')
  );
};

export default PreviewModalRender;
