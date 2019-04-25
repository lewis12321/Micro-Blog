import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Markdown } from 'react-showdown';
import axios from 'axios';

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

class View extends React.Component {

  constructor() {
    super()
    this.state = { markdown: "" }
  }

  componentDidMount() {
    axios.get('http://192.168.86.165:8080/api/blog/ddacbc0f-ea86-47f0-9301-32ee2d901b45.json')
    .then((resp) => {
      this.setState({markdown: resp.data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const markdown = this.state.markdown
    return (
      <div className={styles.root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Markdown className={styles.paper} markup={markdown} />
          </Grid>
        </Grid>
      </div>
    );
  }

}

export default withStyles(styles)(View);
