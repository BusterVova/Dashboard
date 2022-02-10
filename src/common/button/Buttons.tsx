import React from "react";
import { Status } from "../../interfaces/api";
import "./Buttons.scss";

interface Props {
  type: Status;
}

const Buttons: React.FC<Props> = ({ type, children }) => {
  return (
    <button className={"button " + type}>
      {children === "DRAFT" ? "Finalize" : "Results"}
    </button>
  );
};

export default Buttons;
