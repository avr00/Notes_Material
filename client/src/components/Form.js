import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const currencies = [
  {
    value: "HIGH",
    label: "High"
  },
  {
    value: "MEDIUM",
    label: "Medium"
  },
  {
    value: "LOW",
    label: "Low"
  }
];

class Form extends React.Component {
  state = {
    author: "",
    description: "",
    priority: "LOW",
    completed: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  componentDidMount() {
    console.log("ID", this.props.id);
    if (this.props.id !== undefined) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/user/${this.props.id}`)
        .then(res =>
          this.setState({
            author: res.data.author,
            description: res.data.description,
            priority: res.data.priority,
            completed: res.data.completed
          })
        );
    }
  }

  submitChange = e => {
    e.preventDefault();
    console.log("ID", this.props.id);
    const updateTodo = {
      author: this.state.author,
      description: this.state.description,
      priority: this.state.priority,
      completed: this.state.completed
    };
    if (this.props.id !== undefined) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/update/${this.props.id}`,
          updateTodo
        )
        .then(
          toast.info("Note succesfully updated!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
        )
        .catch(err => console.log(err));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/create`, updateTodo)
        .then(() =>
          toast.info("Note succesfully created!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
        )
        .catch(err => console.log("HI", err));
    }
  };

  render() {
    return (
      <>
        <form
          className={this.props.classes.container}
          noValidate
          autoComplete="off"
          onSubmit={this.submitChange}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center">
            <TextField
              id="outlined-name"
              label="Author"
              className={this.props.classes.textField}
              value={this.state.author}
              onChange={this.handleChange("author")}
              margin="normal"
              variant="outlined"
              fullWidth
              required
              helperText={this.state.author === "" ? "Empty field!" : " "}
            />

            <TextField
              id="outlined-select-priority"
              select
              label="Select"
              className={this.props.classes.textField}
              value={this.state.priority}
              onChange={this.handleChange("priority")}
              SelectProps={{
                MenuProps: {
                  className: this.props.classes.menu
                }
              }}
              helperText="Please select your priority"
              margin="normal"
              variant="outlined"
              fullWidth>
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-multiline-static"
              label="description"
              multiline
              rows="4"
              value={this.state.description}
              onChange={this.handleChange("description")}
              className={this.props.classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />

            <Button
              variant="contained"
              size="medium"
              color="primary"
              className={this.props.classes.margin}
              type="submit">
              {this.props.id !== undefined ? "Update" : "Submit"}
            </Button>
          </Grid>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);
