import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../interfaces/api";

const useApiData = () => {
  const [filteredUsers, setFilteredUsers] = useState([] as User[]);
  const [users, setUsers] = useState([] as User[]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchUsers = async () => {
    setisLoading(true);
    const {
      data: { results },
    } = await axios.get("https://randomuser.me/api/?results=1000");
    setFilteredUsers(results);
    setUsers(results);
    setisLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    currentPage,
    isLoading,
    filteredUsers,
    users,
    setFilteredUsers,
    setCurrentPage,
  };
};

export default useApiData;
