import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import CampusView from "./CampusComponents/CampusView";
import { fetchCampuses } from "../redux/campuses";
import { fetchStudentsEnrolled } from "../redux/singleCampus";
import { deleteStudent, fetchStudents } from "../redux/students";
import StudentCampusView from "./StudentComponents/StudentCampusView";
import {
  fetchStudentAndCampus,
  addCampusToStudent,
} from "../redux/singleStudent";

function ShowStudent({
  fetchStudentWithCampus,
  studentWithCampus,
  getCampuses,
  campuses,
  addStudent,
  removeStudent,
  getStudents,
}) {
  const [loading, setLoading] = useState(true);
  const [picked, setPicked] = useState({ value: "" });
  const history = useHistory();
  const { id } = useParams();

  const student = !loading ? studentWithCampus.student : [];
  let campus = !loading ? studentWithCampus.campus : [];
  const showCampuses = !loading ? campuses : [];

  const handleChange = ({ target }) => {
    if (target.name == "removeButton") {
      removeStudent(id);
      history.goBack();
    } else {
      setPicked({ value: target.value });
    }
  };
  const handleClick = () => {
    addStudent(Number(id), Number(picked.value));
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetchStudentWithCampus(id);
      getCampuses();
      getStudents();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  const campusView = campus && (
    <CampusView
      key={campus.id}
      id={campus.id}
      name={campus.name}
      url={campus.imageUrl}
    />
  );

  const select = (
    <select
      onChange={handleChange}
      style={{ fontSize: "24px" }}
      className="selectCampus"
      name="selectCampus"
    >
      <option value="" disabled selected hidden>
        Select campus...
      </option>
      {showCampuses.map((school) => (
        <option key={school.id} value={school.id}>
          {school.name}
        </option>
      ))}
    </select>
  );

  return (
    <div className="container">
      <div className="singleCampus">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="singleCampus__imgBox">
                <img
                  className="singleCampus__img"
                  src={student ? student.imageUrl : "Loading ..."}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 singleStudent__right">
              <div>
                {student ? (
                  <span>
                    <p style={{ fontSize: "42px" }}>
                      {student.firstName + " " + student.lastName}
                    </p>
                    <p style={{ fontSize: "24px" }}>GPA: {student.gpa}</p>
                  </span>
                ) : (
                  "Loading ..."
                )}
              </div>
              <div className="d-flex align-items-baseline singleStudent__bottom justify-content-between">
                <div className="left d-flex gap-4">
                  <Link to={`/editstudent/${id}`}>
                    <button
                      style={{
                        fontSize: "21px",
                        width: "90px",
                        height: "50px",
                        background: "#27AE60",
                      }}
                      type="button"
                    >
                      edit
                    </button>
                  </Link>

                  <button
                    onClick={handleChange}
                    name="removeButton"
                    style={{
                      fontSize: "21px",
                      width: "110px",
                      height: "50px",
                      background: "#E68181",
                    }}
                    type="button"
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {campuses.length > 0 ? (
            <StudentCampusView
              campusView={campusView}
              select={select}
              handleClick={handleClick}
            />
          ) : (
            <h3 style={{ marginTop: "70px" }}>
              Warning: There are no campuses registered in the database
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    studentWithCampus: state.studentWithCampus,
    campuses: state.campuses,
    stuff: state,
    campusesWithStudents: state.campusesWithStudents,
    campusStudents: state.campusStudents.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudentWithCampus: (id) => dispatch(fetchStudentAndCampus(id)),
    getCampuses: () => dispatch(fetchCampuses()),
    getStudents: () => dispatch(fetchStudents()),
    addStudent: (studentId, campusId) =>
      dispatch(addCampusToStudent(studentId, campusId)),
    fetchCampus: (id) => dispatch(fetchStudentsEnrolled(id)),
    removeStudent: (id) => dispatch(deleteStudent(id)),
  };
};
export default connect(mapState, mapDispatch)(ShowStudent);
