import axios from "axios";

export const setStudents = (students) => {
  return {
    type: "SET_STUDENTS",
    students,
  };
};

export const fetchStudents = () => {
  return async (dispatch) => {
    const result = await axios.get("/api/students");
    if (result.data === 0) {
      return "none";
    } else {
      dispatch(setStudents(result.data));
    }
  };
};

export const addStudent = (updateObj) => {
  return async (dispatch) => {
    try {
      await axios.post("/api/students", updateObj);
      dispatch(fetchStudents());
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteStudent = (id) => {
  return async (dispatch) => {
    try {
      let result = await axios.delete(`/api/students/${id}`);
      result && dispatch(fetchStudents());
    } catch (error) {
      console.log(error);
    }
  };
};

export default function studentsReducer(state = [], action) {
  switch (action.type) {
    case "SET_STUDENTS":
      return action.students;
    default:
      return state;
  }
}
