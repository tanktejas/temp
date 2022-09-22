import useId from "@mui/material/utils/useId";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatRoom from "./chat";
import "./chat.css";
import { logcont } from "../logincontext/authcontext";
import { logcontstu } from "../../Loginsignincontext/context";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db as dbdev } from "../DB/firebase";
import { db as dbnondev } from "../../Loginsignincontext/firebase";

function Mainchat() {
  const [id, setid] = useState("");
  const [tomail, settomail] = useState("");
  const [frommail, setfrommail] = useState("");
  const [toname_, setto] = useState("");
  const [fromname_, setfrom] = useState("");
  const [chat, setchat] = useState([]);
  const [allnondevuser, setnondev] = useState([]);
  const { to } = useParams();
  const { student } = useContext(logcontstu);
  const { user } = useContext(logcont);

  useEffect(() => {
    settomail(to);
    if (student != "no") {
      setfrommail(student?.email);
      const queryy = query(collection(dbnondev, "all_people"));

      onSnapshot(queryy, (qs) => {
        qs.docs.map((item) => {
          console.log(tomail);
          if (item.data().Email == to) {
            setto(item.data().Name);
          }
          if (item.data().Email == student?.email) {
            console.log(frommail);
            setfrom(item.data().Name);
          }
        });
      });
    } else if (user != "no") {
      setfrommail(user?.email);
      const queryy = query(collection(dbdev, "all_people"));

      onSnapshot(queryy, (qs) => {
        qs.docs.map((item) => {
          if (item.data().Email == to) {
            setto(item.data().Name);
          }
          if (item.data().Email == student?.email) {
            setfrom(item.data().Name);
          }
        });
      });
    }

    const queryy = query(collection(dbnondev, "chats"));
    onSnapshot(queryy, (qs) => {
      let is = 0;
      qs.docs.map((item) => {
        if (
          (item.data().p1 == to && item.data().p2 == student?.email) ||
          (item.data().p1 == student?.email && item.data().p2 == to)
        ) {
          setid(item.id);
          is = 1;
        }
      });
      if (is == 0) {
        const obj = {
          chat: [],
          p1: student?.email,
          p2: to,
        };

        addDoc(collection(dbnondev, "chats"), obj).then(() => {
          alert("created");
        });
      }
    });
  }, []);

  if (toname_ == "" || fromname_ == "" || id == "") {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section id="chatApp" class="chatApp">
        <ChatRoom
          to={toname_}
          from={fromname_}
          tomail={tomail}
          frommail={frommail}
          idofchat={id}
        />
      </section>
    </>
  );
}

export default Mainchat;
