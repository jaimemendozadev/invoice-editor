import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddItem from "./components/additem";
import Invoice from "./components/invoice";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/additem" component={AddItem} />
      <Route path="/" component={Invoice} />
    </Switch>
  </BrowserRouter>
);

export default App;
