import React from "react";
import { Link } from "react-router-dom";

function CampusStudentsView({ schoolStudents, removeStudent, campusId }) {
  return !schoolStudents
    ? "no stunde"
    : schoolStudents.map(({ id, firstName, lastName, imageUrl }) => (
        <div key={id} className="col-12">
          <div className="editCampusView">
            <div className="editCampusView__left">
              <img src={imageUrl} className="editCampusView__img" />
              <div>
                <Link
                  style={{ fontSize: "18px", color: "black" }}
                  className="editCampusView__link"
                  to={`/singlestudent/${id}`}
                >
                  <p>{firstName + " " + lastName}</p>
                </Link>
              </div>
            </div>

            <button
              onClick={() => removeStudent(id, campusId)}
              className="editCampusView__btn"
              style={{
                fontSize: "16px",
                width: "150px",
                height: "fit-content",
                background: "#E68181",
                padding: "6px",
              }}
              type="button"
            >
              Unregister
            </button>
          </div>
        </div>
      ));
}

export default CampusStudentsView;
