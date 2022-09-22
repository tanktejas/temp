import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logcont } from "../Components/logincontext/authcontext";

function Private({ Comp }) {
  const { student } = useContext(logcont);
  const navigate = useNavigate();

  useEffect(() => {
    if (student == "no") {
      navigate("/login");
    }
  }, []);

  return <>{Comp}</>;
}

export default Private;
