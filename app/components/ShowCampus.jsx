import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { fetchStudentsEnrolled } from "../redux/singleCampus";
import StudentView from "./StudentComponents/StudentView";
import { fetchStudents } from "../redux/students";
import { fetchCampuses, deleteCampus } from "../redux/campuses";

function ShowCampus({
  fetchEnrolled,
  campusStudents,
  getCampuses,
  removeCampus,
  getStudents,
  allStudents,
}) {
  const history = useHistory();
  const students = campusStudents.students;
  const campus = campusStudents.campus;
  const { id } = useParams();
  const handleClick = () => {
    removeCampus(id);
    history.goBack();
  };

  useEffect(() => {
    const fetchStudent = () => {
      fetchEnrolled(id);
      getCampuses();
      getStudents();
    };
    fetchStudent();
  }, []);

  const canAddStudents = allStudents && allStudents.length > 0;

  const studentsView =
    students && students.length > 0 ? (
      students.map(({ id, firstName, lastName, imageUrl }) => (
        <StudentView
          key={id}
          id={id}
          first={firstName}
          last={lastName}
          url={imageUrl}
          showCampus={false}
        />
      ))
    ) : (
      <h3 style={{ textAlign: "center" }}>
        There are no Students registered to this Campus
      </h3>
    );

  return !campus ? (
    "loading..."
  ) : (
    <div className="container">
      <div className="singleCampus">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="singleCampus__imgBox">
                <img className="singleCampus__img" src={campus.imageUrl} />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <h2>{campus.name}</h2>
              <p style={{ fontSize: "21px" }}>{campus.description}</p>
            </div>
          </div>

          <div className="d-flex align-items-baseline singleCampus__bottom justify-content-between">
            <div className="right">
              <p style={{ fontSize: "20px" }}>{campus.address}</p>
            </div>
            <div className="left d-flex gap-4">
              <Link to={`/editcampus/${id}`}>
                <button
                  style={{
                    fontSize: "21px",
                    width: "100px",
                    height: "50px",
                    background: "#27AE60",
                  }}
                  type="button"
                >
                  edit
                </button>
              </Link>
              <button
                onClick={handleClick}
                style={{
                  fontSize: "21px",
                  width: "120px",
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

        <div className="collection">
          <div className="collection__heading d-flex align-items-center justify-content-between">
            <h1 className="collection__headingTitle">Students on campus</h1>
            {canAddStudents && (
              <Link to={`/editcampus/${id}`}>
                <button className="collection__headingButton" type="button">
                  Add Students
                </button>
              </Link>
            )}
          </div>

          <div className="row allStudents">
            {allStudents.length > 0 ? (
              studentsView
            ) : (
              <h3 style={{ textAlign: "center" }}>
                Warning: There are no Students registered in the database
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    campusStudents: state.campusStudents,
    campuses: state.campuses,
    allStudents: state.students,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchEnrolled: (id) => dispatch(fetchStudentsEnrolled(id)),
    getCampuses: () => dispatch(fetchCampuses()),
    removeCampus: (id) => dispatch(deleteCampus(id)),
    getStudents: () => dispatch(fetchStudents()),
  };
};
export default connect(mapState, mapDispatch)(ShowCampus);
