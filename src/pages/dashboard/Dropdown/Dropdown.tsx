import React, { useState } from "react";
import Arrow from "../../../common/icons/Arrow";
import "./Dropdown.scss";

interface Props {
  rowsNumber: number;
  setRowsNumber: React.Dispatch<React.SetStateAction<number>>;
  setCurrentpage: React.Dispatch<React.SetStateAction<number>>;
}

const Dropdown: React.FC<Props> = ({
  rowsNumber,
  setRowsNumber,
  setCurrentpage,
}) => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const rowsNumbers = [10, 50, 100];

  const handleRowsNumber = (rows: number) => {
    setCurrentpage(1);
    setRowsNumber(rows);
    setIsopen(false);
  };
  const handleDropDown = () => {
    setIsopen(!isOpen);
  };

  return (
    <>
      <div className="pagination">
        <div className="pagination-btn" onClick={() => handleDropDown()}>
          <div>{rowsNumber}</div>
          <Arrow className={isOpen ? "icon" : ""}></Arrow>
        </div>
        {isOpen && (
          <div className="pagination-content">
            {rowsNumbers.map((number, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={
                    number === rowsNumber
                      ? "pagination-item__chosen"
                      : "pagination-item"
                  }
                  key={idx}
                  onClick={() => handleRowsNumber(number)}
                >
                  {number}
                </div>
                {number === rowsNumber && <div className="divider"></div>}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
