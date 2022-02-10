import React, {useState} from "react";
import "./Dashboard.scss";
import Buttons from "../../common/button/Buttons";
import DashboardSearch from "./DashboardSearch/DashboardSearch";
import DashboardTable from "./DashboardTable/DashboardTable";
import useApiData from "../../hooks/useAPIData";
import {SortDirection, SortNames, Status, Test} from "../../interfaces/api";

export type SortBy = {
  path: SortNames,
  order: SortDirection
}

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState({ path: SortNames.NAME, order: SortDirection.ASC });

  const { testData, filteredTests, siteData, setFilteredTests } = useApiData();

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  const titles = [SortNames.NAME, SortNames.TYPE, SortNames.STATUS, SortNames.SITE];

  const status = {
    ONLINE: 1,
    PAUSED: 2,
    STOPPED: 3,
    DRAFT: 4,
  };

  const sortAsc = (key: SortNames) => {
    return (a: Test, b: Test) =>
      a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
  };

  const sortDsc = (key: SortNames)=> {
    return (a: Test, b: Test) =>
      a[key] > b[key] ? -1 : b[key] > a[key] ? 1 : 0;
  };

  const handleSortType = (item: SortNames) => {
    if (sortBy.path === item) {
      handleSort({
        ...sortBy,
        order: sortBy.order === SortDirection.ASC ? SortDirection.DECS : SortDirection.ASC,
      });
    } else {
      handleSort({ path: item, order: "asc" as SortDirection });
    }
  };
  const sortStatus = (order: string) => {
    const sortStatusAsc = (a: Test, b: Test) =>
      status[a.status] - status[b.status];
    const sortStatusDsc = (a: Test, b: Test) =>
      status[b.status] - status[a.status];

    return order === "asc" ? sortStatusAsc : sortStatusDsc;
  };

  const handleSort = ({ path, order }: { path: SortNames; order: SortDirection }) => {
    const sortByOrder = order === "asc" ? sortAsc(path) : sortDsc(path);
    const updatedTests =
      path !== "status"
        ? filteredTests.sort(sortByOrder)
        : filteredTests.sort(sortStatus(order));

    setSortBy({ path, order });
    setFilteredTests(updatedTests);
  };

  const handleFilters = () => {
    setFilteredTests(
      testData.filter((test) =>
        test.name.toLowerCase().includes(searchValue.trim().toLocaleLowerCase())
      )
    );
  };
  const reset = () => {
    setFilteredTests(testData);
    setSearchValue("");
  };
  return (
    <div className="container">
      <div className="title">Dashboard</div>
      <DashboardSearch
        searchValue={searchValue}
        handleInput={handleInput}
        handleFilters={handleFilters}
        dataLength={filteredTests.length}
      />
      {filteredTests?.length ? (
        <DashboardTable
          titles={titles}
          handleSort={handleSortType}
          selectedSort={sortBy}
          testData={filteredTests}
          siteData={siteData}
        />
      ) : (
        <div className="search-error">
          <div className="search-error_title">
            Your search did not match any results.
          </div>
          <div onClick={reset}>
            <Buttons type={Status.ONLINE}>
              Reset
            </Buttons>

          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
