import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logcontstu } from "../Loginsignincontext/context";

function Private({ Comp }) {
  const { student } = useContext(logcontstu);
  const navigate = useNavigate();

  useEffect(() => {
    if (student == "no") {
      navigate("/slogin");
    }
  }, []);

  return <>{Comp}</>;
}

export default Private;
