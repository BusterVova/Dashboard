import React, { useCallback, memo } from "react";
import "./Footer.scss";
import Dropdown from "../Dropdown/Dropdown";
import { User } from "../../../interfaces/api";
import Arrow from "../../../common/icons/Arrow";

interface Props {
  rowsNumber: number;
  setRowsNumber: React.Dispatch<React.SetStateAction<number>>;
  users: User[];
  setCurrentpage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const Footer: React.FC<Props> = ({
  rowsNumber,
  setRowsNumber,
  users,
  setCurrentpage,
  currentPage,
}) => {
  const handlePagination = useCallback(
    (isToBack: boolean) => {
      if (isToBack) {
        setCurrentpage((prev) => prev - 1);
      } else {
        setCurrentpage((prev) => prev + 1);
      }
    },
    [setCurrentpage]
  );

  return (
    <div className="footer">
      <div className="pages-wrapper">
        <button
          disabled={currentPage === 1}
          className="arrow-button"
          onClick={() => handlePagination(true)}
        >
          <div className="arrow-wrapper">
            <Arrow className="arrow-icon__left"></Arrow>
          </div>
        </button>
        <div className="pages">{`${currentPage} of ${
          users.length !== 10 ? Math.ceil(users.length / rowsNumber) : 10
        }`}</div>
        <button
          className="arrow-button"
          disabled={
            users.length !== 10
              ? currentPage === Math.ceil(users.length / rowsNumber)
              : currentPage === 10
          }
          onClick={() => handlePagination(false)}
        >
          <div className="arrow-wrapper">
            <Arrow className="arrow-icon"></Arrow>
          </div>
        </button>
      </div>
      <div className="pagination-wrapper">
        <div className="pagination-header">Rows per page:</div>
        <Dropdown
          rowsNumber={rowsNumber}
          setRowsNumber={setRowsNumber}
          setCurrentpage={setCurrentpage}
        />
      </div>
    </div>
  );
};

export default memo(Footer);
