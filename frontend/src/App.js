import React from 'react';
import Edit from './Edit';
import View from './View';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends React.Component {

  render() {
    return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/edit">Edit</Link>
            </li>
            <li>
              <Link to="/view/">View</Link>
            </li>
          </ul>
        </nav>

        <Route path="/edit" exact component={Edit} />
        <Route path="/view" component={View} />
      </div>
    </Router>
    );
  }

}

export default App;
