import React from "react";
import { connect } from "react-redux";
import { addCampus } from "../redux/campuses";
import CampusForm from "./CampusComponents/CampusForm";

function AddCampus() {
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>
        Add New Student
      </h1>
      <CampusForm preloaded={false} />
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    addSchool: (name) => dispatch(addCampus(name)),
  };
};
export default connect(null, mapDispatch)(AddCampus);
