import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCampuses } from "../redux/campuses";
import { fetchStudentAndCampus, editStudent } from "../redux/singleStudent";
import StudentForm from "./StudentComponents/StudentForm";

function EditStudent({
  updateStudent,
  getCampuses,
  fetchStudentWithCampus,
  studentWithCampus,
}) {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  let student;
  if (studentWithCampus) {
    student = studentWithCampus.student;
  } else {
    student = !loading ? studentWithCampus.student : [];
  }

  useEffect(() => {
    setLoading(true);
    try {
      const fetchStudentInfo = () => {
        fetchStudentWithCampus(id);
        getCampuses();
      };
      fetchStudentInfo();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }, []);

  return !student ? (
    "loading ..."
  ) : (
    <div className="container">
      <StudentForm
        updateStudent={updateStudent}
        student={student}
        fetchStudent={fetchStudentWithCampus}
        campusID={id}
        preloaded={true}
      />
    </div>
  );
}

const mapState = (state) => {
  return {
    studentWithCampus: state.studentWithCampus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateStudent: (id, obj) => dispatch(editStudent(id, obj)),
    getCampuses: () => dispatch(fetchCampuses()),
    fetchStudentWithCampus: (id) => dispatch(fetchStudentAndCampus(id)),
  };
};
export default connect(mapState, mapDispatch)(EditStudent);
