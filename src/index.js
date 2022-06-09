import * as React from "react";
import ReactDOM from "react-dom";
import ConfigurationsPage from "./configurations-page/configurations-page";
import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import EditConfigurationPage from "./configurations-page/edit-configuration-page";

function App() {
  var urlParts = new URL(window.location).pathname.split('/');
  const scenarioId = urlParts.length > 2 ? urlParts[3] : undefined;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin/configurations">
          <ConfigurationsPage />
        </Route>
        <Route path="/admin/configurations/new">
        <EditConfigurationPage />
        </Route>
        <Route path="/admin/configurations/:id">
          <EditConfigurationPage scenarioId={scenarioId} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
