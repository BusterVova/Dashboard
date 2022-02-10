import { useState, useEffect } from "react";
import axios from "axios";
import { Site, Test } from "../interfaces/api";

const useApiData = () => {
  const [testData, setTestData] = useState([] as Test[]);
  const [siteData, setSiteData] = useState([] as Site[]);
  const [filteredTests, setFilteredTests] = useState([] as Test[]);

  const fetchTest = async () => {
    const { data } = await axios.get<Test[]>("http://localhost:3100/tests");
    setTestData(data);
    setFilteredTests(data);
  };

  const fetchSites = async () => {
    const { data } = await axios.get<Site[]>("http://localhost:3100/sites");
    const preparedData = data.map(
      ({ id, url }: { id: number; url: string }) => {
        return {
          id,
          url: url.replace(/^https?:\/\//, "").replace(/www./, ""),
        };
      }
    );
    setSiteData(preparedData);
  };

  useEffect(() => {
    fetchTest();
    fetchSites();
  }, []);

  return {
    testData,
    siteData,
    filteredTests,
    setFilteredTests,
  };
};

export default useApiData;
