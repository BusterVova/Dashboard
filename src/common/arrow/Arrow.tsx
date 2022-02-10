import React from "react";
import Sort from "../icons/Sort";
import { SortBy } from "../../pages/dashboard/Dashboard";
import "./Arrow.scss";
interface Props {
  selectedSort: SortBy;
}

const Arrow: React.FC<Props> = ({ selectedSort }) => {
  return (
    <Sort
      className={
        selectedSort.order === "asc"
          ? "sort-icon sort-icon_reverse"
          : "sort-icon"
      }
    />
  );
};

export default Arrow;
