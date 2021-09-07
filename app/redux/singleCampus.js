import axios from "axios";

export const setStudentsEnrolled = (campus, students) => {
  return {
    type: "SET_ENROLLED_STUDENTS",
    campus: campus,
    students: students,
  };
};

export const fetchStudentsEnrolled = (id) => {
  return async (dispatch) => {
    const campus = await axios.get(`/api/campuses/${id}`);
    const studentsResult = await axios.get(`/api/campuses/students/${id}`);
    dispatch(setStudentsEnrolled(campus.data, studentsResult.data));
  };
};

export const addStudentToCampus = (id, campusId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/campuses/addstudent/${id}`, { campusId });
      dispatch(fetchStudentsEnrolled(campusId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeStudentFromCampus = (id, campusId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/campuses/removestudent/${id}`, { campusId: null });
      dispatch(fetchStudentsEnrolled(campusId));
    } catch (error) {
      console.log(error);
    }
  };
};
export default function singleCampusReducer(state = [], action) {
  switch (action.type) {
    case "SET_ENROLLED_STUDENTS":
      return { students: [...action.students], campus: action.campus };
    default:
      return state;
  }
}
