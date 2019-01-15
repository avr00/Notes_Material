import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cards from "./Cards";

const styles = {
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    margin: `20px auto`
  }
};

class CenteredTabs extends React.Component {
  state = {
    value: 0,
    todos: []
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    console.log(
      process.env.REACT_APP_HELLO,
      process.env.API_URL,
      process.env.REACT_APP_SECRET_CODE,
      "hello"
    );

    this.loadTodos();
  }

  loadTodos = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/todos`)
      .then(res => this.setState({ todos: res.data }));
  };

  handleDelete = async id => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete/${id}`);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/todos`)
      .then(res => this.setState({ todos: res.data }));
    await toast.info("Note Deleted!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  renderCards = () => {
    return this.state.todos
      .filter(x => this.state.value == x.completed)
      .map((x, index) => {
        return (
          <Cards
            author={x.author}
            description={x.description}
            key={index}
            handleDelete={() => this.handleDelete(x._id)}
            id={x._id}
            loadTodos={this.loadTodos}
            completed={x.completed}
          />
        );
      })
      .reverse();
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered>
          <Tab label="ACTIVE TODOS" />
          <Tab label="COMPLETED TODOS" />
        </Tabs>
        <Grid container justify="center">
          {this.renderCards()}
        </Grid>
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
      </Paper>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenteredTabs);
