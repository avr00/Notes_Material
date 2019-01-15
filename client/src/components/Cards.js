import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";

import axios from "axios";

const styles = theme => ({
  card: {
    maxWidth: 345,
    margin: 20
  },
  media: {
    height: 140
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function MediaCard(props) {
  const { classes } = props;

  const changeCompleted = async () => {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/update/${props.id}`, {
      completed: props.completed ? false : true
    });
    await props.loadTodos();
  };

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.author}
          </Typography>
          <Typography component="p">{props.description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <NavLink
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/edit/${props.id}`}>
            EDIT
          </NavLink>
        </Button>
        <Button size="small" color="primary" onClick={() => changeCompleted()}>
          {props.completed ? "MARK AS UNDONE" : "MASK AS DONE"}
        </Button>
        <IconButton
          className={classes.button}
          aria-label="Delete"
          onClick={props.handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
