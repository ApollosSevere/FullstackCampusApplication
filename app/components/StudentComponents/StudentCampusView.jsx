import React from "react";

function StudentCampusView({ campusView, select, handleClick }) {
  const canShow = campusView === undefined || campusView.key;
  return (
    // <div>
    <div className="collection singleCampus__collection ">
      <div className="collection__heading d-flex align-items-center justify-content-between">
        {canShow ? (
          <h1 style={{ fontSize: "25px", marginTop: "40px" }}>
            This Student is registered to a campus:
          </h1>
        ) : (
          <h1 style={{ fontSize: "25px", marginTop: "50px" }}>
            This Student not registered to a campus:
          </h1>
        )}
      </div>

      <div className="row allCollections">
        {canShow && campusView}

        <div className="col-md-6 col-sm-12 singleStudent__updaterigtht">
          <div className="singleStudent__area">
            {select}
            <button
              onClick={handleClick}
              style={{ display: "block", marginTop: "20px" }}
              className="collection__headingButton"
              type="button"
            >
              Change Campus
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default StudentCampusView;
