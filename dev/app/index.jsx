import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./services/redux";
import AddItem from "./components/additem";
import Invoice from "./components/invoice";

console.log("store is ", store);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/additem" component={AddItem} />
        <Route path="/" component={Invoice} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
