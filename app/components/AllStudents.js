import React from "react";
import { connect } from "react-redux";
import { fetchStudents } from "../redux/students";
import StudentView from "./StudentComponents/StudentView";
import { Link } from "react-router-dom";
import { fetchStudentAndCampus } from "../redux/singleStudent";
import { fetchCampuses } from "../redux/campuses";

export class AllStudents extends React.Component {
  componentDidMount() {
    this.props.getStudents();
    this.props.getCampuses();
  }

  render() {
    const students = this.props.students.map(
      ({ id, firstName, lastName, imageUrl, campusId }) => {
        let view = (
          <StudentView
            key={id}
            id={id}
            first={firstName}
            last={lastName}
            url={imageUrl}
            canEdit={true}
            campusId={campusId}
            showCampus={true}
          />
        );
        return view;
      }
    );
    return (
      <div className="container">
        <div className="collection">
          <div className="collection__heading d-flex align-items-center justify-content-between">
            <h1 className="collection__headingTitle">All Students</h1>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/addstudent"
            >
              <button className="collection__headingButton" type="button">
                Add Student
              </button>
            </Link>
          </div>

          <div className="row allStudents">
            {this.props.students.length > 0 ? (
              students
            ) : (
              <h3 style={{ textAlign: "center" }}>
                There are no Students registered in the database
              </h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    students: state.students,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getStudents: () => dispatch(fetchStudents()),
    fetchStudentWithCampus: (id) => dispatch(fetchStudentAndCampus(id)),
    getCampuses: () => dispatch(fetchCampuses()),
  };
};

export default connect(mapState, mapDispatch)(AllStudents);
