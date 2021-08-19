import { AuthProvider } from "./contexts/UserAuthContext";
import { GardenPlannerProvider } from "./contexts/GardenPlannerContext";
import { TaskListProvider } from "./contexts/TaskListContext";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Registration/Login";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";
import Navbar from "./components/Navbar/Navbar";
import GardenPlanner from "./pages/GardenPlanner/GardenPlanner";
import TaskList from "./pages/TaskList/TaskList";
import CropIndex from "./pages//CropIndex/CropIndex";
import Support from "./pages/Support/Support";
import Footer from "./components/Footer/Footer";
import NameLocation from "./pages/Registration/NameLocation";
import CropInfo from "./pages/CropInfo/CropInfo";
import Thanks from "./pages/Thanks/Thanks";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskListProvider>
          <div className="page-container">
            <div className="content-wrap">
              <Navbar />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/register" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/userdetails" component={NameLocation} />
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />

                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/task-list" component={TaskList} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute path="/support" component={Support} />

                <GardenPlannerProvider>
                  <PrivateRoute
                    path="/garden-planner"
                    component={GardenPlanner}
                  />

                  <PrivateRoute
                    path="/crop-index/:plantID"
                    component={CropInfo}
                  />

                  <PrivateRoute
                    exact
                    path="/crop-index"
                    component={CropIndex}
                  />
                  <PrivateRoute path="/thanks" component={Thanks} />
                </GardenPlannerProvider>
              </Switch>
            </div>

            <Footer />
          </div>
        </TaskListProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
