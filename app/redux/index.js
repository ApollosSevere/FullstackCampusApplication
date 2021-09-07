import { combineReducers } from "redux";
import campusesReducer from "./campuses";
import studentsReducer from "./students";
import singleCampusReducer from "./singleCampus";
import singleStudentReducer from "./singleStudent";
import multipleCampusAndStudentsReducer from "./campusAndStudents";

const appReducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
  campusStudents: singleCampusReducer,
  studentWithCampus: singleStudentReducer,
  campusesWithStudents: multipleCampusAndStudentsReducer,
});

export default appReducer;
