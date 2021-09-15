import React from "react";
import styles from "./InputSelect.module.scss";

const Select = ({
  name,
  label,
  options,
  idName,
  error,
  obligatory,
  ...rest
}) => {
  return (
    <div className={styles.formGroupSelect}>
      <div className={`${styles.selectInput} d-flex align-items-center`}>
        <label htmlFor={name}>
          {label}:{" "}
          <span className={styles.obligationMark}>
            {obligatory === "false" ? "" : "*"}
          </span>
        </label>
        <div className={name}>
          <select name={name} id={name} {...rest} className="form-control">
            {options.map((option, index) => (
              <option
                key={index}
                value={option[idName]}
                check={option.check && "true"}
              >
                {option.name}
              </option>
            ))}
          </select>
          <span></span>
        </div>
      </div>
      {error && <div className={styles.validFeedback}>{error}</div>}
    </div>
  );
};

export default Select;
