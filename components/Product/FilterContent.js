import React from "react";
import styles from "./FilterContent.module.scss";
import addfunc from "../../utils/additionalFunction";


const FilterContent = ({ filterList, filterValue, onFilter }) => {
  return (
    <ul className={styles.listGroupFilter}>
      {filterList.map((band) => (
        <li
          className={
            filterValue === addfunc.removeAccents(Object.keys(band)[0])
              ? "list-group-item d-flex justify-content-between align-items-center active"
              : "list-group-item d-flex justify-content-between align-items-center"
          }
          key={Object.keys(band)[0]}
          onClick={() => onFilter(Object.keys(band)[0])}
        >
          {Object.keys(band)[0]}
          <span className="badge badge-primary badge-pill">
            {band[Object.keys(band)[0]]}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default FilterContent;
