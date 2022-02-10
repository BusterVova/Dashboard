import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Buttons from "../../../common/button/Buttons";
import Arrow from "../../../common/arrow/Arrow";
import "./DashboardTable.scss";
import { Colors, Site, SortNames, Test } from "../../../interfaces/api";
import { SortBy } from "../Dashboard";

interface Props {
  titles: SortNames[];
  handleSort: (item: SortNames) => void;
  selectedSort: SortBy;
  testData: Test[];
  siteData: Site[];
}

type Sites = {
  1: string;
  2: string;
  3: string;
};

const Table: React.FC<Props> = ({
  titles,
  handleSort,
  selectedSort,
  testData,
  siteData,
}) => {
  const [urls, setUrls] = useState({} as Sites);

  useEffect(() => {
    if (siteData.length) {
      const urlsData = siteData.reduce((acc, { id, url }) => {
        // @ts-ignore
        acc[id] = url;
        return acc;
      }, {} as Sites);
      setUrls(urlsData);
    }
  }, [siteData]);

  const colors = {
    1: Colors.RED,
    2: Colors.PURPLE,
    3: Colors.BLUE,
  };
  return (
    <div className="table">
      <table>
        <thead>
          <tr className="top-bar">
            {titles.map((title, idx) => {
              const columnTitle =
                title === SortNames.SITE ? "SITE" : title.toUpperCase();
              return (
                <th onClick={() => handleSort(title)} key={idx}>
                  <div className="sort">
                    <p>{columnTitle}</p>
                    {selectedSort.path === title ? (
                      <Arrow selectedSort={selectedSort} />
                    ) : null}
                  </div>
                </th>
              );
            })}
          </tr>
          <tr className="divider" />
        </thead>
        <tbody>
          {testData.map(({ id, siteId, name, type, status }) => (
            <React.Fragment key={id}>
              <tr>
                <td className={("name " + colors[siteId]) as Colors}>{name}</td>
                <td className="type">
                  {type === "MVT"
                    ? type
                    : type.charAt(0) + type.slice(1).toLowerCase()}
                </td>
                <td className={`${status}-status`}>
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </td>

                <td className="url">{urls[siteId]}</td>

                <td className="buttons">
                  <Link
                    to={
                      status === "DRAFT"
                        ? `/finalize/${siteId}`
                        : `/results/${siteId}`
                    }
                  >
                    <Buttons type={status}>{status}</Buttons>
                  </Link>
                </td>
              </tr>
              <tr className="divider" />
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
