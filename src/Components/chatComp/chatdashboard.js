import useId from "@mui/material/utils/useId";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChatRoom from "./chat";
import "./chat.css";
import { logcont } from "../logincontext/authcontext";
import { logcontstu } from "../../Loginsignincontext/context";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { db as dbdev } from "../DB/firebase";
import { db as dbnondev } from "../../Loginsignincontext/firebase";

function ChatDash() {
  const [allchatinfoofcurrentuser, setchatinfo] = useState([]);

  useEffect(() => {
    let queryy = query(collection(dbnondev, "all_people"));

    onSnapshot(queryy, (qs) => {
      let temp = [];
      qs.docs.map((item) => {
        temp.push(item.data());
      });
      setchatinfo(temp);
    });
  }, []);

  return (
    <>
      <section id="chatApp" className="chatdash">
        <div className="allchat">
          <h3>Chats</h3>
          {/* <div className="onechat">
              <img src="https://i.pravatar.cc/150?img=56"></img>
              <h4>Tejas</h4>
            </div> */}
          {allchatinfoofcurrentuser.map((item) => {
            return (  
              <>
                <Link to={"/chat" + "/" + item.Email}>
                  <div className="onechat">
                    <img src="https://i.pravatar.cc/150?img=56"></img>
                    <h4>{item.Name.substring(0, 5)}</h4>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
        <div className="chatbackground"></div>
      </section>
    </>
  );
}

export default ChatDash;
