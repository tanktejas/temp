import React, { useState } from "react";
import Coforum from "./comentforum";

function Singleco({
  data,
  replies,
  currstudent,
  deletecomment,
  activecomid,
  setactivecom,
  handleSubmit,
  type,
  settype,
  editcomment,
  student,
}) {
  return (
    <>
      <div className="comment">
        <div className="comment-image-container">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"></img>
        </div>
        <div className="comment-right-part">
          <div className="comment-content">
            <div className="comment-author">{data.username}</div>
            <div className="comment-author" style={{ color: "black" }}>
              {data.createdat}
            </div>
          </div>
          <div className="comment-text">{data.body}</div>
          <div className="comment-actions">
            {currstudent != null && data.parentid == 0 && (
              <div
                className="comment-action button2"
                onClick={() => {
                  setactivecom(data.id);
                  settype("replying");
                }}
              >
                Reply
              </div>
            )}
            {data.email == currstudent?.email && (
              <>
                <div
                  className="comment-action button2"
                  onClick={() => {
                    settype("editing");
                    setactivecom(data.id);
                  }}
                >
                  Edit
                </div>
                <div
                  className="comment-action button2"
                  onClick={() => {
                    deletecomment(data.id);
                  }}
                >
                  Delete
                </div>
              </>
            )}
          </div>
          {activecomid == data.id && (
            <Coforum
              handleSubmit={handleSubmit}
              activecomid={activecomid}
              setactivecom={setactivecom}
              type={type}
              settype={settype}
              editcomment={editcomment}
              edittext={data.body}
              student={student}
            />
          )}
          {replies.length > 0 && (
            <div className="replies">
              {replies.map((item) => {
                return (
                  <>
                    <Singleco
                      data={item}
                      replies={[]}
                      currstudent={currstudent}
                      activecomid={activecomid}
                      setactivecom={setactivecom}
                      deletecomment={deletecomment}
                      editcomment={editcomment}
                      type={type}
                      settype={settype}
                    />
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Singleco;
