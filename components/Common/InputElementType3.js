import React from "react";
import styles from "./InputElementType3.module.scss";

const InputElementType3 = ({
  label,
  name,
  error,
  value,
  obligatory,
  ...rest
}) => {
  return (
    <div className={styles.inputGroupType3}>
      {label && (
        <label htmlFor={name}>
          {label}:{" "}
          <span className={styles.obligationMark}>
            {obligatory === "false" ? "" : "*"}
          </span>
        </label>
      )}
      <input
        name={name}
        id={name}
        value={value || ""}
        {...rest}
        autoComplete="off"
      />
      {error && <div className={styles.validFeedback}>{error}</div>}
    </div>
  );
};

export default InputElementType3;
