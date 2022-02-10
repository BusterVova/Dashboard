import React from "react";
import "./Finalize.scss";
import Vector from '../../common/icons/Vector'
import { Link } from "react-router-dom";

const Finalize = () => {
  return (
    <div className="container">
      <div className="finalize-title">Finalize</div>
      <div className="subtitle">Spring promotion</div>
      <Link to="/" className="link">
        <div className="back">
            <Vector/>
          {/*<img className="back-icon" src={arrow} alt="back" />*/}
          <span>Back</span>
        </div>
      </Link>
    </div>
  );
};

export default Finalize;
