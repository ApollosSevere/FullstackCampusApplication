import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteStudent } from "../../redux/students";

function StudentView({
  id,
  first,
  last,
  url,
  canEdit,
  removeStudent,
  campusId,
  campuses,
  showCampus,
}) {
  const campus = campuses.filter((v) => Number(v.id) === Number(campusId))[0];

  return (
    <div className="col-md-3 col-sm-6 col-lg-2">
      <div className="studentView">
        <div className="studentView__top">
          <img src={url} className="studentView__img" />
        </div>
        <div>
          <Link className="studentView__link" to={`/singlestudent/${id}`}>
            <p>{first + " " + last}</p>
          </Link>
        </div>
        {showCampus && (
          <p className="studentView__College">
            {campus ? campus.name : "Undecided"}
          </p>
        )}
        {canEdit && (
          <button
            onClick={() => removeStudent(id)}
            className="studentView__btn"
            style={{
              // textAlign: "center",
              fontSize: "10px",
              width: "25px",
              // height: "19px",
              background: "#E68181",
            }}
            type="button"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
}

const mapState = (state) => {
  return { campuses: state.campuses };
};
const mapDispatch = (dispatch) => {
  return {
    removeStudent: (id) => dispatch(deleteStudent(id)),
  };
};

export default connect(mapState, mapDispatch)(StudentView);
