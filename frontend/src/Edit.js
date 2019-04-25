import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Markdown } from 'react-showdown'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

class Edit extends React.Component {

  constructor() {
    super()
    this.state = { markdown: "" }
  }

  updateMarkdown(event) {
    this.setState({ markdown: event.target.value })
  }

  save() {
    const markdown = this.state.markdown
    axios.post('http://192.168.86.165:8080/api/blog', markdown, {
      headers: {
        "Content-Type": "text/plain"
      }
    })
    .then(function (response) {
      console.log(response);
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
            <TextField
              style={{ width: '100%', height: '100%' }}
              multiline={true}
              inputStyle={{ width: '100%' }}
              value={markdown} onChange={(event) => this.updateMarkdown(event)}
            />
          </Grid>
          <Grid item xs={6}>
            <Markdown className={styles.paper} markup={markdown} />
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary" className={styles.button} onClick={() => this.save()}>
              Save
          </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

}

export default withStyles(styles)(Edit);
