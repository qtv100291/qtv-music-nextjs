import React from "react";
import styles from "./RadioInput.module.scss";

const RadioInput = ({ name, id, label, value, error, ...rest }) => {
  return (
    <div
      className={`${styles.radioInput} radio-input d-flex align-items-center`}
    >
      <input name={name} id={id} value={value} {...rest} type="radio" />
      {label && <label htmlFor={id}>{label}</label>}
      {error && <div className="valid-feedback">{error}</div>}
    </div>
  );
};

export default RadioInput;
