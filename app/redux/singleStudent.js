import axios from "axios";

export const setStudentAndCampus = (campus, student) => {
  return {
    type: "SET_STUDENTS_CAMPUS",
    campus,
    student,
  };
};

export const fetchStudentAndCampus = (id) => {
  return async (dispatch) => {
    const student = await axios.get(`/api/students/${id}`);
    const campus = await axios.get(`/api/campuses/${student.data.campusId}`);
    let campuInfo = campus.data ? campus.data : {};
    dispatch(setStudentAndCampus(campuInfo, student.data));
  };
};

export const addCampusToStudent = (id, campusId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/students/addstudent/${id}`, { campusId });
      dispatch(fetchStudentAndCampus(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editStudent = (id, updateObj) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/students/${id}`, updateObj);
      dispatch(fetchStudentAndCampus(id));
    } catch (error) {
      console.log(error);
    }
  };
};
export default function singleStudentReducer(state = [], action) {
  switch (action.type) {
    case "SET_STUDENTS_CAMPUS":
      return { student: action.student, campus: action.campus };
    default:
      return state;
  }
}
