import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

import LogCompo from "./Components/logincontext/authcontext";
import LogCompo1 from "./Loginsignincontext/context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <LogCompo1>
    <LogCompo>
      <App />
    </LogCompo>
  </LogCompo1>
);
