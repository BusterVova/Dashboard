import React, { ChangeEventHandler, memo } from "react";
import Search from "../../../common/icons/Search";
import "./DashboardSearch.scss";

interface Props {
  searchValue: string;
  onChangeInput: ChangeEventHandler<HTMLInputElement>;
  onChangeSearchFilter: () => void;
}

const Input: React.FC<Props> = ({
  searchValue,
  onChangeInput,
  onChangeSearchFilter,
}) => {
  const submitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onChangeSearchFilter();
  };
  return (
    <form onSubmit={submitSearch} className="search-form">
      <div className="input-group">
        <input
          value={searchValue}
          type="text"
          className="input"
          placeholder="Search"
          onChange={onChangeInput}
        />
        <Search />
      </div>
    </form>
  );
};

export default memo(Input);
