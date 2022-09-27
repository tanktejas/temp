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
import { storage } from "../../Loginsignincontext/firebase";

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
  const [opponentavatar, setavatar] = useState("");
  const [userallchat, setuserallchat] = useState(undefined);
  const [docid, setdocid] = useState("");
  const [fromall, setfrommm] = useState("");
  const [toall, settooo] = useState("");
  const [ok, setok] = useState(false);
  const [opponentallchat, setopponent] = useState(undefined);
  const [docidforfrom, setdocidfrom] = useState("");
  const [upperurl, setupperurl] = useState(false);
  const [chatofuser, setchatofuser] = useState(undefined);

  useEffect(() => {
    settomail(to);
    if (student != "no") {
      setfrommail(student?.email);
      const queryy = query(collection(dbnondev, "all_people"));

      onSnapshot(queryy, (qs) => {
        qs.docs.map((item) => {
          if (item.data().Email == to) {
            setdocid(item.id);
            setok(true);
            setto(item.data().Name);
            settooo(item.data());
          }
          if (item.data().Email == student?.email) {
            console.log(frommail);
            setfrom(item.data().Name);
            setfrommm(item.data());
            setdocidfrom(item.id);
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
            settooo(item.data());
          }
          if (item.data().Email == student?.email) {
            setfrom(item.data().Name);
            setdocid(item.id);
            setfrommm(item.data());
          }
        });
      });
    }
    // let storageRef = ref(storage, "avatar/anand@gmail.com.jpg");

    // // if (storageRef) {
    // "gs://all-client-project-17622.appspot.com/avatar/anand@gmail.com.jpg"
    //   .getDownloadURL()
    //   .toPromise()
    //   .then(function (url) {
    //     alert(url);
    //   });
    // alert(storageRef);

    if (student) {
      const query11 = query(collection(dbnondev, "all_people"));

      onSnapshot(query11, (qS) => {
        qS.docs.map((item) => {
          if (item.data().Email == student?.email) {
            setuserallchat(item.data().chats);
          }
        });
      });

      const query1 = query(collection(dbnondev, "chats"));

      onSnapshot(query1, (qS) => {
        qS.docs.map((item) => {
          if (
            (item.data().p1 == to && item.data().p2 == student?.email) ||
            (item.data().p1 == student?.email && item.data().p2 == to)
          ) {
            // alert(JSON.stringify(qS.docs[0].data()));
            setchatofuser(item.data().chat);
          }
        });
      });
    }
    if (to) {
      const query11 = query(collection(dbnondev, "all_people"));

      onSnapshot(query11, (qS) => {
        qS.docs.map((item) => {
          if (item.data().Email == to) {
            setopponent(item.data().chats);
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

      if (
        is == 0 &&
        toall != "" &&
        fromall != "" &&
        ok &&
        opponentallchat != undefined &&
        docid != ""
      ) {
        //for to user

        // alert("newobj");
        let ele = opponentallchat;
        let newobj = {
          email: student?.email,
          name: fromname_,
        };

        ele.push(newobj);

        setDoc(doc(dbnondev, "all_people", docid), {
          Completed_project: toall?.Completed_project,
          Posted_project: toall?.Posted_project,
          Email: toall?.Email,
          Name: toall?.Name,
          chats: ele,
        }).then(() => {
          // alert("added");
        });

        const obj = {
          chat: [],
          p1: student?.email,
          p2: to,
        };

        addDoc(collection(dbnondev, "chats"), obj).then(() => {
          console.log("chat created..");
        });

        // for from user

        ele = userallchat;
        newobj = {
          email: to,
          name: toname_,
        };

        ele.push(newobj);

        setDoc(doc(dbnondev, "all_people", docidforfrom), {
          Completed_project: fromall?.Completed_project,
          Posted_project: fromall?.Posted_project,
          Email: fromall?.Email,
          Name: fromall?.Name,
          chats: ele,
        }).then(() => {
          // alert("created");
        });
      }
    });

    if (student) {
    }
  }, [upperurl, ok]);

  if (
    toname_ == "" ||
    fromname_ == "" ||
    id == "" ||
    userallchat == undefined ||
    ok == false ||
    chatofuser == undefined
  ) {
    return <h1>Loading...</h1>;
  }
  // alert(JSON.stringify(tomail));
  // alert(JSON.stringify(frommail));

  // alert(JSON.stringify(chatofuser));

  // alert(fromname_);
  // alert(toname_);
  return (
    <>
      <section id="chatApp" class="chatApp">
        <div className="allchat">
          <h3>Your Chats</h3>
          {/* <div className="onechat">
              <img src="https://i.pravatar.cc/150?img=56"></img>
              <h4>Tejas</h4>
            </div> */}
          {userallchat.map((item) => {
            return (
              <>
                <Link to={"/chat" + "/" + item.email}>
                  <div
                    className="onechat"
                    onClick={() => {
                      setupperurl(!upperurl);
                    }}
                  >
                    <img src="https://i.pravatar.cc/150?img=56"></img>
                    <h4>{item.name.substring(0, 5)}</h4>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
        <ChatRoom
          to={toname_}
          from={fromname_}
          tomail={tomail}
          frommail={frommail}
          idofchat={id}
          ff={chatofuser}
        />
      </section>
    </>
  );
}

export default Mainchat;
