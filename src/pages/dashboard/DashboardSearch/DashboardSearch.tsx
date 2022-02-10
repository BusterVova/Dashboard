import React, { ChangeEventHandler } from "react";
import Search from "../../../common/icons/Search";
import "./DashboardSearch.scss";

interface Props {
  searchValue: string;
  handleInput: ChangeEventHandler<HTMLInputElement>;
  handleFilters: () => void;
  dataLength: number;
}

const Input: React.FC<Props> = ({
  searchValue,
  handleInput,
  handleFilters,
  dataLength,
}) => {
  const submitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleFilters();
  };
  return (
    <form onSubmit={submitSearch}>
      <div className="input-group">
        <input
          value={searchValue}
          type="text"
          className="input"
          placeholder="What test are you looking for?"
          onChange={handleInput}
        />
        <Search />
        <span className="input-remark"> {dataLength} tests</span>
      </div>
    </form>
  );
};

export default Input;
