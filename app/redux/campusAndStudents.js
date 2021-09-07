import axios from "axios";

export const setCampusAndStudents = (campus, students) => {
  return {
    type: "SET_MULTIPLE_ENROLLED_STUDENTS",
    campus: campus,
    students: students,
  };
};

export const fetchCampusesAndStudents = (id) => {
  return async (dispatch) => {
    const campus = await axios.get(`/api/campuses/${id}`);
    const studentsResult = await axios.get(`/api/campuses/students/${id}`);
    console.log(campus.data);
    let campuInfo = campus.data ? campus.data : {};

    dispatch(setCampusAndStudents(campuInfo, studentsResult.data));
  };
};

export default function multipleCampusAndStudentsReducer(state = [], action) {
  let stuff = state.map((v) => v.id);
  switch (action.type) {
    case "SET_MULTIPLE_ENROLLED_STUDENTS":
      if (!stuff.includes(Number(action.campus.id))) {
        return [
          ...state,
          {
            id: action.campus.id,
            data: { students: [...action.students], campus: action.campus },
          },
        ];
      }
      return state;
    default:
      return state;
  }
}
