import React from "react";
import StudentForm from "./StudentComponents/StudentForm";

function AddCampus() {
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>
        Add New Student
      </h1>
      <StudentForm preloaded={false} />
    </div>
  );
}

export default AddCampus;
