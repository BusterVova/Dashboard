import React, { ChangeEventHandler, memo } from "react";
import Search from "../../../common/icons/Search";
import "./DashboardSearch.scss";

interface Props {
  searchValue: string;
  handleInput: ChangeEventHandler<HTMLInputElement>;
  handleFilters: () => void;
}

const Input: React.FC<Props> = ({
  searchValue,
  handleInput,
  handleFilters,
}) => {
  const submitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleFilters();
  };
  return (
    <form onSubmit={submitSearch} className="search-form">
      <div className="input-group">
        <input
          value={searchValue}
          type="text"
          className="input"
          placeholder="Search"
          onChange={handleInput}
        />
        <Search />
      </div>
    </form>
  );
};

export default memo(Input);
