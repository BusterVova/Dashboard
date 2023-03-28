import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../interfaces/api";

const useApiData = () => {
  const [filteredUsers, setFilteredUsers] = useState([] as User[]);
  const [users, setUsers] = useState([] as User[]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsNumber, setRowsNumber] = useState<number>(10);

  const fetchUsers = async (
    selectedFilters: {
      Gender: string;
      Nation: string;
    },
    page: number,
    rows: number
  ) => {
    setisLoading(true);
    const {
      data: { results },
    } = await axios.get(
      `https://randomuser.me/api/?page=${page}&results=${rows}&nat=${selectedFilters.Nation}&gender=${selectedFilters.Gender}`
    );

    setFilteredUsers(results);
    setUsers(results);
    setisLoading(false);
  };

  return {
    currentPage,
    isLoading,
    filteredUsers,
    users,
    rowsNumber,
    setRowsNumber,
    setFilteredUsers,
    setCurrentPage,
    fetchUsers,
  };
};

export default useApiData;
