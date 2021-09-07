import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStudents } from "../redux/students";
import CampusForm from "./CampusComponents/CampusForm";
import CampusStudentsView from "./CampusComponents/CampusStudentsView";
import {
  fetchStudentsEnrolled,
  addStudentToCampus,
  removeStudentFromCampus,
} from "../redux/singleCampus";

function EditCampus({
  fetchEnrolled,
  campusStudents,
  getStudents,
  allStudents,
  campusesWithStudents,
  addStudent,
  removeStudent,
}) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [picked, setPicked] = useState({ value: "" });

  const schoolStudents = !loading ? campusStudents.students : [];
  const globalStudents = !loading ? allStudents : [];
  let campus;

  if (campusesWithStudents.length !== 0) {
    campus = campusesWithStudents.filter((v) => Number(v.id) === Number(id))[0]
      .data.campus;
  } else {
    campus = campusStudents.campus;
  }

  const handleChange = ({ target }) => {
    setPicked({ value: target.value });
  };

  const handleClick = () => {
    addStudent(Number(picked.value), id);
  };

  useEffect(() => {
    setLoading(true);
    try {
      const fetchStudent = () => {
        fetchEnrolled(id);
        getStudents();
      };
      fetchStudent();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  const studentsView =
    schoolStudents && schoolStudents.length > 0 ? (
      <CampusStudentsView
        schoolStudents={schoolStudents}
        removeStudent={removeStudent}
        campusId={id}
      />
    ) : (
      <h3 style={{ marginTop: "20px", textAlign: "center" }}>
        There are no students registered to this campus
      </h3>
    );
  const select = (
    <select
      value={picked.value}
      onChange={handleChange}
      style={{ fontSize: "16px" }}
      className="selectEditCampus"
      name="selectCampus"
    >
      <option value="" disabled selected hidden>
        Select Student...
      </option>
      {globalStudents.map((student) => (
        <option key={student.id} value={student.id}>
          {student.firstName + " " + student.lastName}
        </option>
      ))}
    </select>
  );

  return (
    <div style={{ maxWidth: "1000px" }} className="container">
      {campus && (
        <CampusForm
          campus={campus}
          campusID={id}
          fetchEnrolled={fetchEnrolled}
          preloaded={true}
        />
      )}
      <div className="editCampus__collection">
        <div className="editCampus__collection__heading d-flex align-items-center justify-content-between">
          <h1
            style={{ marginBottom: "10px" }}
            className="editCampus__collection__headingTitle"
          >
            Students on campus
          </h1>
        </div>
        <div className="row editCampus__editTab">
          <div className="col-6">{select}</div>

          <div className="col-6">
            <button
              onClick={handleClick}
              className="editCampus__collection__headingButton "
              type="button"
            >
              Add to Campus
            </button>
          </div>
        </div>

        <div className="row editCampus__allStudents">
          {globalStudents.length > 0 ? (
            studentsView
          ) : (
            <h4 style={{ textAlign: "center" }}>
              Warning: There are no students registered in the database
            </h4>
          )}
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    campusesWithStudents: state.campusesWithStudents,
    campusStudents: state.campusStudents,
    allStudents: state.students,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchEnrolled: (id) => dispatch(fetchStudentsEnrolled(id)),
    getStudents: () => dispatch(fetchStudents()),
    addStudent: (studentId, campusId) =>
      dispatch(addStudentToCampus(studentId, campusId)),
    removeStudent: (studentId, campusId) =>
      dispatch(removeStudentFromCampus(studentId, campusId)),
  };
};
export default connect(mapState, mapDispatch)(EditCampus);
