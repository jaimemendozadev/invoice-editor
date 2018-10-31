import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddItem from "./components/additem";
import Form from "./components/form";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/additem" component={AddItem} />
      <Route path="/" component={Form} />
    </Switch>
  </BrowserRouter>
);

export default App;
