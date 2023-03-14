import React, { useState, useEffect, useCallback, memo } from "react";
import DashboardSearch from "./DashboardSearch/DashboardSearch";
import DashboardTable from "./DashboardTable/DashboardTable";
import useApiData from "../../hooks/useAPIData";
import { Names } from "../../interfaces/api";
import Filters from "./Filters/Filters";
import Footer from "./Footer/Footer";
import "./Dashboard.scss";

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    Gender: "",
    Nation: "",
  });
  const [rowsNumber, setRowsNumber] = useState<number>(10);

  const {
    users,
    filteredUsers,
    setFilteredUsers,
    isLoading,
    currentPage,
    setCurrentPage,
  } = useApiData();

  useEffect(() => {
    setFilteredUsers(users);
    if (selectedFilters.Gender && selectedFilters.Nation) {
      setFilteredUsers((prev) =>
        prev.filter((user) => {
          return (
            user.gender === selectedFilters.Gender &&
            selectedFilters.Nation === user.nat
          );
        })
      );
    } else {
      if (selectedFilters.Gender) {
        setFilteredUsers((prev) =>
          prev.filter((user) => {
            return user.gender === selectedFilters.Gender;
          })
        );
      }
      if (selectedFilters.Nation) {
        setFilteredUsers((prev) =>
          prev.filter((user) => {
            return selectedFilters.Nation === user.nat;
          })
        );
      }
    }
    if (!selectedFilters.Gender && !selectedFilters.Nation) {
      setFilteredUsers(users);
    }
    if (searchValue) {
      setFilteredUsers((prev) =>
        prev.filter((user) => {
          const name = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`;
          return name.includes(searchValue.trim().toLocaleLowerCase());
        })
      );
    }
  }, [selectedFilters, searchValue, setFilteredUsers, users]);

  const lastUserIndex = currentPage * rowsNumber;
  const firstUserIndex = lastUserIndex - rowsNumber;
  console.log({ firstUserIndex, lastUserIndex });
  const currentUsers = filteredUsers.slice(firstUserIndex, lastUserIndex);

  const nationalities = users.map((el) => el.nat);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const handleFilters = useCallback(() => {
    setFilteredUsers(
      filteredUsers.filter((user) => {
        const name = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`;

        return name.includes(searchValue.trim().toLocaleLowerCase());
      })
    );
  }, [filteredUsers, searchValue, setFilteredUsers]);

  const titles = [
    Names.PROFILE,
    Names.LOCATION,
    Names.EMAIL,
    Names.BIRTHDAY,
    Names.GENDER,
    Names.NATIONALITY,
    Names.PHONE,
  ];

  return (
    <div className="container">
      <DashboardSearch
        searchValue={searchValue}
        handleInput={handleInput}
        handleFilters={handleFilters}
      />
      <div className="filters-wrapper">
        <Filters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          nationalities={Array.from(new Set(nationalities))}
        />
      </div>
      <DashboardTable
        titles={titles}
        users={currentUsers}
        isLoading={isLoading}
      />
      <Footer
        rowsNumber={rowsNumber}
        setRowsNumber={setRowsNumber}
        users={filteredUsers}
        setCurrentpage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default memo(Dashboard);
