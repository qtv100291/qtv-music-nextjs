import React from "react";
import styles from "./TextArea.module.scss";

const TextArea = ({ label, name, error, value, ...rest }) => {
  return (
    <div className={`${styles.textArea} d-flex`}>
      {label && <label htmlFor={name}>{label}: </label>}
      <textarea name={name} id={name} value={value || ""} {...rest} />
      {error && <div className="valid-feedback">{error}</div>}
    </div>
  );
};

export default TextArea;
