import { fetchCampuses, addCampus, editCampus } from "../../redux/campuses";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { connect } from "react-redux";

function CampusForm({
  campus,
  campusID,
  updateCampus,
  setCampus,
  campuses,
  preloaded,
}) {
  let data;

  let formState = {
    name: "",
    address: "",
    description: "",
    imageUrl: "",
  };

  let history = useHistory();
  if (campuses.length !== 0) {
    data = campuses.filter((v) => Number(v.id) === Number(campusID))[0];
  } else {
    data = campus;
  }

  const [formData, setFormData] = preloaded
    ? useState(data)
    : useState(formState);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (preloaded) {
        updateCampus(campusID, formData);
      } else {
        setCampus(formData);
      }
    } catch (error) {
      console.log(error);
    }
    history.goBack();
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
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
            Campus Name
          </label>
          <input
            required
            onChange={handleChange}
            style={{ fontSize: "22px", height: "60px", borderRadius: "0px" }}
            value={formData ? formData.name : "loading ..."}
            className="col-7"
            name="name"
          />
        </div>

        <div className="row" style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "30px",
              paddingRight: "30px",
            }}
            className="col-5 d-flex align-items-center justify-content-end"
            htmlFor="assignee"
          >
            Campus Location
          </label>
          <input
            required
            onChange={handleChange}
            style={{ fontSize: "22px", height: "60px", borderRadius: "0px" }}
            value={formData ? formData.address : "loading ..."}
            className="col-7"
            name="address"
          />
        </div>

        <div className="row" style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "30px",
              paddingRight: "30px",
            }}
            className="col-5 d-flex align-items-center justify-content-end"
            htmlFor="assignee"
          >
            Campus Image URL
          </label>
          <input
            required
            onChange={handleChange}
            style={{ fontSize: "22px", height: "60px", borderRadius: "0px" }}
            value={formData ? formData.imageUrl : "loading ..."}
            className="col-7"
            name="imageUrl"
          />
        </div>

        <div className="row" style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "30px",
              paddingRight: "30px",
            }}
            className="col-5 d-flex justify-content-end"
            htmlFor="assignee"
          >
            Campus Description
          </label>
          <textarea
            onChange={handleChange}
            style={{ fontSize: "22px", height: "300px" }}
            value={formData ? formData.description : "loading ..."}
            className="col-7"
            name="description"
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
  );
}

const mapState = (state) => {
  return {
    campuses: state.campuses,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateCampus: (id, obj) => dispatch(editCampus(id, obj)),
    getCampuses: () => dispatch(fetchCampuses()),
    setCampus: (obj) => dispatch(addCampus(obj)),
  };
};
export default connect(mapState, mapDispatch)(CampusForm);
