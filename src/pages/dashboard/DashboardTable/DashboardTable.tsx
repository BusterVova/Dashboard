import React, { memo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment/moment";
import "./DashboardTable.scss";
import { Names, User } from "../../../interfaces/api";

interface Props {
  titles: Names[];
  users: User[];
  isLoading: boolean;
}

const Table: React.FC<Props> = ({ titles, users, isLoading }) => {
  return (
    <div className="table">
      <table>
        <thead className="thead">
          <tr className="top-bar">
            {titles.map((title, idx) => {
              return (
                <th key={idx} className="header">
                  <div className="sort">
                    <p className="sort">{title}</p>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        {!isLoading ? (
          <tbody>
            {users.map(
              ({ name, email, location, dob, gender, nat, phone, picture }) => (
                <React.Fragment key={email}>
                  <tr className="inside">
                    <td className="data data__profile">
                      <div className="name-wrapper">
                        <div className="circle-image">
                          <img src={picture.thumbnail} alt="avatar" />
                        </div>
                        <div className="name__data">
                          {`${name.first} ${name.last}`}
                        </div>
                      </div>
                    </td>
                    <td className="data">{location.country}</td>
                    <td className="data">{email}</td>
                    <td className="data">
                      {moment(dob.date).format("DD.MM.YYYY")}
                    </td>
                    <td className="data">{gender}</td>
                    <td className="data">{nat}</td>
                    <td className="data data__phone">{phone}</td>
                  </tr>
                  <tr className="divider" />
                </React.Fragment>
              )
            )}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                {titles.map((title, idx) => {
                  return (
                    <td className="skeleton" key={idx}>
                      <Skeleton count={1} />
                    </td>
                  );
                })}
              </SkeletonTheme>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default memo(Table);
