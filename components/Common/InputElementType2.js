import React from "react";
import styles from "./InputElementType2.module.scss";

const InputElementType2 = ({ label, name, error, value, ...rest }) => {
  return (
    <div className={styles.inputGroupType2}>
      <input name={name} id={name} value={value || ""} {...rest} required />
      {label && <label htmlFor={name}>{label}</label>}
      {error && <div className="valid-feedback">{error}</div>}
    </div>
  );
};

export default InputElementType2;
