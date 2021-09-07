import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { addStudent } from "../../redux/students";
import { connect } from "react-redux";
function StudentForm({
  campusID,
  student,
  updateStudent,
  fetchStudent,
  preloaded,
  setStudent,
}) {
  let formState = {
    firstName: "",
    lastName: "",
    email: "",
    gpa: "",
    imageUrl: "",
  };
  const history = useHistory();

  let [formData, setFormData] = preloaded
    ? useState(student)
    : useState(formState);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (preloaded) {
        updateStudent(campusID, formData);
      } else {
        setStudent(formData);
      }
      fetchStudent(campusID);
    } catch (error) {
      console.log(error);
    }
    history.goBack();
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%", marginTop: "60px" }}>
        <form id="todo-form" onSubmit={handleSubmit}>
          <div className="row" style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontSize: "30px",
                paddingRight: "30px",
                fontWeight: "100",
              }}
              className="col-5 d-flex align-items-center justify-content-end"
              htmlFor="assignee"
            >
              First Name
            </label>
            <input
              required
              onChange={handleChange}
              style={{ fontSize: "22px", height: "60px", borderRadius: "0px" }}
              value={formData ? formData.firstName : "loading"}
              className="col-7"
              name="firstName"
            />
          </div>
          <div className="row" style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontSize: "30px",
                paddingRight: "30px",
                fontWeight: "100",
                //   backgroundColor: "red",
              }}
              className="col-5 d-flex align-items-center justify-content-end"
              htmlFor="assignee"
            >
              Last Name
            </label>
            <input
              required
              onChange={handleChange}
              style={{ fontSize: "22px", height: "60px", borderRadius: "0px" }}
              value={formData ? formData.lastName : "loading"}
              className="col-7"
              name="lastName"
            />
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontSize: "30px",
                paddingRight: "30px",
                fontWeight: "100",
              }}
              className="col-5 d-flex align-items-center justify-content-end"
              htmlFor="assignee"
            >
              Email
            </label>
            <input
              required
              onChange={handleChange}
              style={{ fontSize: "22px", height: "60px", borderRadius: "0px" }}
              value={formData ? formData.email : "loading"}
              className="col-7"
              name="email"
            />
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontSize: "30px",
                paddingRight: "30px",
                //   backgroundColor: "red",
              }}
              className="col-5 d-flex align-items-center justify-content-end"
              htmlFor="assignee"
            >
              GPA
            </label>
            <input
              required
              onChange={handleChange}
              style={{ fontSize: "22px", height: "60px", borderRadius: "0px" }}
              value={formData ? formData.gpa : "loading .."}
              className="col-7"
              name="gpa"
            />
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontSize: "30px",
                paddingRight: "30px",
                //   backgroundColor: "red",
              }}
              className="col-5 d-flex align-items-center justify-content-end"
              htmlFor="assignee"
            >
              Student URL
            </label>
            <input
              onChange={handleChange}
              style={{ fontSize: "22px", height: "60px", borderRadius: "0px" }}
              value={formData ? formData.imageUrl : "loading ..."}
              className="col-7"
              name="imageUrl"
            />
          </div>

          <div
            className="d-flex flex-column align-items-center"
            style={{ position: "relative" }}
          >
            <button
              className="editCampusView__button"
              style={{ width: "fit-content" }}
              type="submit"
            >
              Save Changes
            </button>

            <Link className="editCampusView__nav" to="/campuses">
              <button
                style={{
                  fontSize: "21px",
                  width: "110px",
                  height: "40px",
                  background: "#E68181",
                }}
                type="button"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    setStudent: (obj) => dispatch(addStudent(obj)),
  };
};
export default connect(null, mapDispatch)(StudentForm);
