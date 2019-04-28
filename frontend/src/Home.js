import React from 'react';
import Create from './Create';
import View from './View';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Paper, Typography, Grid, withStyles } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    cursor: 'pointer'
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
});

const BlogSummary = withStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    cursor: 'pointer'
  },
}))(({ blog, classes }) => (
  <Route render={({ history }) => (
    <Paper className={classes.root} onClick={() => history.push(`/view/${blog.id}`)}>
      <Typography variant="h5" component="h3">
        {blog.title}
      </Typography>
      <Typography component="p">
        {blog.description}
      </Typography>
    </Paper>
  )} />
))

class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      blogs: [
        {
          id: "greatest-blog",
          title: "The greatest blogs",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui accumsan sit amet nulla facilisi morbi tempus. Libero justo laoreet sit amet cursus sit amet dictum sit."
        },
        {
          id: "microservices",
          title: "How to do microservices",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor morbi non arcu risus quis varius quam quisque id. Scelerisque viverra mauris in aliquam sem."
        },
        {
          id: "kubernetes",
          title: "Devops and kubernetes",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Turpis egestas maecenas pharetra convallis."
        },
      ]
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}
          direction="column"
          alignItems="center">
          <Grid item xs={6}>
            {this.state.blogs.map((blog, i) => <BlogSummary blog={blog} />)}
          </Grid>
        </Grid>
        <Fab className={classes.fab} color='primary' href="/create">
          <AddIcon />
        </Fab>
      </div>
    );
  }

}


export default withStyles(styles)(Home)