import axios from "axios";

export const setCampuses = (campuses) => {
  return {
    type: "SET_CAMPUSES",
    campuses,
  };
};

export const fetchCampuses = () => {
  return async (dispatch) => {
    const result = await axios.get("/api/campuses");
    dispatch(setCampuses(result.data));
  };
};

export const addCampus = (updateObj) => {
  return async (dispatch) => {
    try {
      await axios.post("/api/campuses", updateObj);
      dispatch(fetchCampuses());
    } catch (error) {
      console.log(error);
    }
  };
};

export const editCampus = (id, updateObj) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/campuses/${id}`, updateObj);
      dispatch(fetchCampuses());
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCampus = (id) => {
  return async (dispatch) => {
    try {
      let result = await axios.delete(`/api/campuses/${id}`);
      result && dispatch(fetchCampuses());
    } catch (error) {
      console.log(error);
    }
  };
};

export default function campusStudentsReducer(state = [], action) {
  switch (action.type) {
    case "SET_CAMPUSES":
      return action.campuses;
    default:
      return state;
  }
}
