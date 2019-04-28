import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import ReactMarkdown from 'react-markdown';


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
  markdownViewer: {
    wordWrap: 'break-word',
    fontFamily: 'Playfair Display'
  }
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
    if (markdown.match("^# .*")) {
      return markdown.match("^# .*")[0].replace("# ", "")
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
      if (subtitle && line.match(/^[a-z0-9\s,.]+$/i)) {
        return line
      }
    }
  }

  saveBlog() {
    console.log({
      markdown: this.state.markdown,
      title: this.state.title,
      description: this.state.description,
      open: false
    })
  }

  render() {
    const { classes } = this.props;
    const markdown = this.state.markdown
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h4" id="modal-title">
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
            <ReactMarkdown className={classes.markdownViewer} source={markdown} />
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => this.create()}>
              Save
          </Button>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Blog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Finally, give your blog a title and description
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              value={this.state.title}
              fullWidth
              onChange={this.handleChange('title')}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              value={this.state.description}
              fullWidth
              multiline={true}
              onChange={this.handleChange('description')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.saveBlog()} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}

export default withStyles(styles)(Create);
