import React from "react";
import { Route, Switch } from "react-router-dom";
import MyNotes from "./MyNotes";
import EditTodo from "./EditTodo";
import Error from "./Error";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={MyNotes} exact />
      <Route path="/edit/:id" component={EditTodo} />
      <Route path="/create" component={EditTodo} />
      <Route component={Error} />
    </Switch>
  );
}
export default Routes;
