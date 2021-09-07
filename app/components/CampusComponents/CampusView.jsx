import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCampus } from "../../redux/campuses";

function CampusView({ id, name, url, canEdit, removeCampus, students }) {
  const numOfStudents = students.filter(
    (v) => Number(v.campusId) === Number(id)
  );

  return (
    <div className="col-md-6 col-sm-12">
      <div className="campusView">
        <div className="campusView__left">
          <img src={url} className="campusView__img" />
        </div>
        <div className="campusView__right">
          <Link className="campusView__link" to={`/singlecampus/${id}`}>
            <h2>{name}</h2>
          </Link>
          <p className="campusView__info">{numOfStudents.length} students</p>

          {canEdit && (
            <div className="campusView__updates">
              <Link
                className="campusView__editBtn"
                style={{ color: "#333333", fontSize: "18px" }}
                to={`/editcampus/${id}`}
              >
                edit
              </Link>
              <button
                onClick={() => removeCampus(id)}
                className="campusView__DelBtn"
                type="button"
              >
                delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    students: state.students,
  };
};

const mapDispatch = (dispatch) => {
  return {
    removeCampus: (campusId) => dispatch(deleteCampus(campusId)),
  };
};

export default connect(mapState, mapDispatch)(CampusView);
