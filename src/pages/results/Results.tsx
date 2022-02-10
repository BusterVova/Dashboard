import React from "react";
import "./Results.scss";
import Vector from "../../common/icons/Vector";
import { Link } from "react-router-dom";

const Results = () => {
  return (
    <div className="container-finalize">
      <div className="results-title">Results</div>
      <div className="subtitle">Order basket redesing</div>
      <Link to="/" className="link">
        <div className="back">
            <Vector />
          <span>Back</span>
        </div>
      </Link>
    </div>
  );
};

export default Results;
