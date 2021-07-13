import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import LoginForm from "../LoginForm/LoginForm";
import Tasks from "../Tasks/Tasks";
import TaskForm from "../TaskForm/TaskForm";
import Filtering from "../Filtering/Filtering";
import Divider from '@material-ui/core/Divider';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Header />
          <TaskForm />
          <Divider />
          <Filtering />
          <Tasks />
        </Route>
        <Route path="/login" exact>
          <LoginForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
