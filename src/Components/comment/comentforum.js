import React, { useState } from "react";
import Button from "@mui/material/Button";

function Coforum({
  submitLabel,
  handleSubmit,
  activecomid,
  setactivecom,
  type,
  settype,
  editcomment,
  edittext,
  student,
}) {
  const [txt, sette] = useState(type == "editing" ? edittext : "");

  const submit = () => {
    const name = student.email.slice(0, 4) + "..";
    
    console.log(activecomid);
    if (type == undefined) {
      handleSubmit(name, txt, 0);
    } else if (type == "replying") {
      handleSubmit(name, txt, activecomid);
      if (activecomid != 0) setactivecom(0);
    } else {
      editcomment(activecomid, txt);
      if (activecomid != 0) setactivecom(0);
    }
    sette("");
  };

  let what = "";
  if (activecomid) {
    if (type == "replying") what = "Reply";
    else what = "Edit";
  } else {
    what = "Add";
  }

  return (
    <>
      {/* <div>
        <textarea
          className="comment-form-textarea"
          value={txt}
          onChange={(e) => {
            sette(e.target.value);
          }}
        ></textarea>
        <button
          className="comment-form-button"
          disabled={txt == ""}
          onClick={submit}
        >
          {what}
        </button>
        {activecomid != undefined && (
          <button
            className="comment-form-button"
            onClick={() => {
              setactivecom(0);
            }}
          >
            cancel
          </button>
        )}
      </div> */}

      <div class="container">
        <div class="be-comment-block">
          <form class="form-block bbb">
            <div class="row">
              <div class="col-xs-9 ">
                <div class="form-group">
                  <textarea
                    class="form-input"
                    required=""
                    placeholder={
                      "Write here to " +
                      what +
                      " Comment ( Write at least a word )"
                    }
                    value={txt}
                    onChange={(e) => {
                      sette(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="btnforsub">
                <Button
                  variant="contained"
                  class="btn btn-primary pull-center"
                  disabled={txt == ""}
                  onClick={submit}
                >
                  {what}
                </Button>
                {activecomid != undefined && (
                  <Button
                    variant="contained"
                    class="btn btn-primary pull-center oooo"
                    className="oooo"
                    onClick={() => {
                      setactivecom(0);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Coforum;
