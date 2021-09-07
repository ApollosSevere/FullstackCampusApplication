import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCampuses } from "../redux/campuses";
import CampusView from "./CampusComponents/CampusView";
import { fetchStudents } from "../redux/students";
import { fetchCampusesAndStudents } from "../redux/campusAndStudents";

export class AllCampuses extends React.Component {
  componentDidMount() {
    this.props.getCampuses();
    this.props.getStudents();
  }

  render() {
    const campuses = this.props.campuses.map(({ id, name, imageUrl }) => {
      this.props.getBothStudentsCampus(id);
      let view = (
        <CampusView
          key={id}
          id={id}
          name={name}
          url={imageUrl}
          canEdit={true}
        />
      );
      return view;
    });
    return (
      <div className="container">
        <div className="collection">
          <div className="collection__heading d-flex align-items-center justify-content-between">
            <h1 className="collection__headingTitle">All Campuses</h1>

            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/addcampus"
            >
              <button className="collection__headingButton" type="button">
                Add Campus
              </button>
            </Link>
          </div>

          <div className="row allCollections">
            {this.props.campuses.length > 0 ? (
              campuses
            ) : (
              <h3>"There are no Campuses registered in the database"</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campuses: state.campuses,
    campusStudents: state.campusesWithStudents,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCampuses: () => dispatch(fetchCampuses()),
    getStudents: () => dispatch(fetchStudents()),
    getBothStudentsCampus: (studentId) =>
      dispatch(fetchCampusesAndStudents(studentId)),
  };
};

export default connect(mapState, mapDispatch)(AllCampuses);
