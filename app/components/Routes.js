import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AllCampuses from "./AllCampuses";
import AllStudents from "./AllStudents";
import ShowCampus from "./ShowCampus";
import AddStudent from "./AddStudent";
import ShowStudent from "./ShowStudent";
import AddCampus from "./AddCampus";
import EditCampus from "./EditCampus";
import EditStudent from "./EditStudent";
import Home from "./Home";

const Routes = () => {
  return (
    <Router>
      <div>
        <div className="container">
          <nav className="header">
            <div className="header__left">
              <Link className="header__links" to="/">
                Home
              </Link>
            </div>
            <div className="header__right">
              <Link className="header__links" to="/campuses">
                Campuses
              </Link>
              <Link className="header__links" to="/students">
                Students
              </Link>
            </div>
          </nav>
        </div>

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/campuses" component={AllCampuses} />
            <Route exact path="/students" component={AllStudents} />
            <Route exact path="/editstudent/:id" component={EditStudent} />
            <Route exact path="/editcampus/:id" component={EditCampus} />
            <Route exact path="/addstudent" component={AddStudent} />
            <Route exact path="/addcampus" component={AddCampus} />
            <Route exact path="/singlecampus/:id" component={ShowCampus} />
            <Route path="/singlestudent/:id" component={ShowStudent} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
