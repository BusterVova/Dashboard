import React, { useState, useCallback, useMemo, memo } from "react";
import Cancel from "../../../common/icons/Cancel";
import { Genders } from "../../../interfaces/api";
import "./Filters.scss";

interface Props {
  selectedFilters: { Gender: string; Nation: string };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{
      Gender: string;
      Nation: string;
    }>
  >;
  nationalities: string[];
}
const Dropdown: React.FC<Props> = ({
  selectedFilters,
  setSelectedFilters,
  nationalities,
}) => {
  const [isOpen, setIsOpen] = useState({ Gender: false, Nation: false });

  const genders = [Genders.MALE, Genders.FEMALE];

  const handleGenderCancel = useCallback(() => {
    setSelectedFilters({ ...selectedFilters, Gender: "" });
    setIsOpen({ ...isOpen, Gender: false });
  }, [isOpen, selectedFilters, setSelectedFilters]);

  const handleNationCancel = useCallback(() => {
    setSelectedFilters({ ...selectedFilters, Nation: "" });
    setIsOpen({ ...isOpen, Nation: false });
  }, [isOpen, selectedFilters, setSelectedFilters]);

  const handleGenders = useCallback(
    (gender: string) => {
      setSelectedFilters({
        ...selectedFilters,
        Gender: gender,
      });
      setIsOpen({ ...isOpen, Gender: false });
    },
    [isOpen, selectedFilters, setSelectedFilters]
  );

  const handleNations = useCallback(
    (nation: string) => {
      setSelectedFilters({
        ...selectedFilters,
        Nation: nation,
      });
      setIsOpen({ ...isOpen, Nation: false });
    },
    [isOpen, selectedFilters, setSelectedFilters]
  );

  return (
    <>
      <div className="dropdown">
        <div
          className="dropdown-btn dropdown-btn__gender"
          onClick={() => {
            setIsOpen((prev) => ({ ...isOpen, Gender: !prev.Gender }));
          }}
        >
          <div className="dropdown-header">
            {selectedFilters.Gender ? (
              <>
                <div>Gender equal</div>
                <div className="dropdown__gender">{selectedFilters.Gender}</div>
              </>
            ) : (
              "Gender"
            )}
          </div>
          {selectedFilters.Gender && (
            <button
              className="cancel-button"
              onClick={(e) => {
                e.stopPropagation();
                handleGenderCancel();
              }}
            >
              <Cancel />
            </button>
          )}
        </div>
        {isOpen.Gender && (
          <div className="dropdown-content">
            {genders.map((gender, idx) => {
              return (
                <React.Fragment key={idx}>
                  <div
                    className={
                      gender === selectedFilters.Gender
                        ? "dropdown-item__chosen"
                        : "dropdown-item"
                    }
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGenders(gender);
                    }}
                  >
                    {gender}
                  </div>
                  {gender === selectedFilters.Gender && (
                    <div className="divider"></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
      <div className="dropdown">
        <div
          className="dropdown-btn"
          onClick={() =>
            setIsOpen((prev) => ({ ...isOpen, Nation: !prev.Nation }))
          }
        >
          <div className="dropdown-header">
            {selectedFilters.Nation ? (
              <>
                <div>Nation</div>
                <div className="dropdown__nation">{selectedFilters.Nation}</div>
              </>
            ) : (
              "Nation"
            )}
          </div>
          {selectedFilters.Nation && (
            <button
              className="cancel-button"
              onClick={(e) => {
                e.stopPropagation();
                handleNationCancel();
              }}
            >
              <Cancel />
            </button>
          )}
        </div>
        {isOpen.Nation && (
          <div className="dropdown-content dropdown-content__nations">
            {nationalities.map((nation, idx) => {
              return (
                <React.Fragment key={idx}>
                  <div
                    className={
                      nation === selectedFilters.Nation
                        ? "dropdown-item__chosen"
                        : "dropdown-item"
                    }
                    onClick={() => {
                      handleNations(nation);
                    }}
                  >
                    {nation}
                  </div>
                  {nation === selectedFilters.Nation && (
                    <div className="divider"></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default memo(Dropdown);
