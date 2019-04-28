import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Create from './Create';
import Home from './Home';
import View from './View';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Microblog
          </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={Create} />
        <Route path="/view/:id" component={View} />
      </Router>
    );
  }

}

export default withStyles(styles)(App)
