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
    axios.get('https://n17hksuqz7.execute-api.eu-west-1.amazonaws.com/dev/api/blog/06c398c0-68fc-11e9-ba75-fb5e90696eba')
    .then((resp) => {
      console.log(resp);
      this.setState({markdown: resp.data.blog.text.S})
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
