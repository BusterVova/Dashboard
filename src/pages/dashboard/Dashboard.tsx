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

  const {
    users,
    filteredUsers,
    isLoading,
    currentPage,
    rowsNumber,
    setRowsNumber,
    setFilteredUsers,
    setCurrentPage,
    fetchUsers,
  } = useApiData();

  useEffect(() => {
    fetchUsers(selectedFilters, currentPage, rowsNumber);
  }, [selectedFilters, currentPage, rowsNumber]);

  useEffect(() => {
    setFilteredUsers(users);
    if (searchValue) {
      setFilteredUsers(
        filteredUsers.filter((user) => {
          const name = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`;
          return name.includes(searchValue.trim().toLocaleLowerCase());
        })
      );
    }
  }, [searchValue]);

  const defaultNationalities = users.map((el) => el.nat);

  const [nations, setNations] = useState<string[]>(defaultNationalities);

  useEffect(() => {
    window.localStorage.setItem(
      "nationalities",
      JSON.stringify(defaultNationalities)
    );
  }, [isLoading]);

  useEffect(() => {
    setNations(JSON.parse(localStorage.getItem("nationalities") || ""));
  }, [isLoading]);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setCurrentPage(1);
      setSearchValue(e.target.value);
    },
    [setCurrentPage]
  );

  const handleSearchFilter = useCallback(() => {
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
        onChangeInput={handleInput}
        onChangeSearchFilter={handleSearchFilter}
      />
      <div className="filters-wrapper">
        <Filters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          nationalities={Array.from(new Set(nations))}
        />
      </div>
      <DashboardTable
        titles={titles}
        users={filteredUsers}
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
