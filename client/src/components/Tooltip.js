import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { NavLink } from "react-router-dom";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
});

function SimpleTooltips(props) {
  const { classes } = props;

  return (
    <Tooltip title="Add" aria-label="Add" placement="bottom-end">
      <Fab color="primary" className={classes.absolute}>
        <NavLink to="/create" style={{ color: "inherit" }}>
          <AddIcon />
        </NavLink>
      </Fab>
    </Tooltip>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTooltips);
