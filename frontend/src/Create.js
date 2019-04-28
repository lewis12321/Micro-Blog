import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Markdown } from 'react-showdown'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { axiosInstance } from './index';

import { Typography, Modal } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class Create extends React.Component {

  constructor() {
    super()
    this.state = { markdown: "", open: false }
  }

  updateMarkdown(event) {
    this.setState({ markdown: event.target.value })
  }

  create() {
    this.setState({
      open: true,
      description: this.getDescription(),
      title: this.getTitle()
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getTitle() {
    const markdown = this.state.markdown
    if (markdown.match("^\# .*")) {
      return markdown.match("^\# .*")[0].replace("# ", "")
    }
    return ""
  }

  getDescription() {
    const markdown = this.state.markdown
    const lines = markdown.split("\n")
    var subtitle = false
    for (const line of lines) {
      if (!subtitle && line.match("^## ")) {
        subtitle = true
      }
      if (subtitle && line.match(/^[a-z0-9\s\,\.]+$/i)) {
        return line
      }
    }
  }

  saveBlog() {
    console.log({
      markdown: this.state.markdown,
      title: this.state.title,
      description: this.state.description,
    })
  }

  render() {
    const { classes } = this.props;
    const markdown = this.state.markdown
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h6" id="modal-title">
              Create Your Blog
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ width: '100%', height: '100%' }}
              multiline={true}
              inputStyle={{ width: '100%' }}
              value={markdown} onChange={(event) => this.updateMarkdown(event)}
            />
          </Grid>
          <Grid item xs={6}>
            <Markdown className={classes.paper} markup={markdown} />
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => this.create()}>
              Save
          </Button>
          </Grid>
        </Grid>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Create Your Blog
            </Typography>
            <TextField
              label="Title"
              className={classes.textField}
              value={this.state.title}
              onChange={this.handleChange('title')}
            />
            <TextField
              label="Description"
              className={classes.textField}
              value={this.state.description}
              onChange={this.handleChange('description')}
              multiline={true}
            />
            <Button onClick={() => this.saveBlog()}>Create</Button>
          </div>
        </Modal>
      </div>
    );
  }

}

export default withStyles(styles)(Create);
