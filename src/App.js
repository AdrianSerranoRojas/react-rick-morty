import React from "react";
import { Route } from "react-router-dom";

import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";

function App() {
  return (
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/episode/:id" component={Episode} />
      <Route path="/character/:episodeId" component={Character} />
    </div>
  );
}

export default App;
