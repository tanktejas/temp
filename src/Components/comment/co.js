import React, { useState, useEffect, useContext } from "react";

import { db } from "../DB/firebase";
import "./general.css";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { query, orderBy, onSnapshot, doc } from "firebase/firestore";

import Coforum from "./comentforum";
import Singleco from "./singalco";

import { setDoc, Timestamp, deleteDoc } from "firebase/firestore";
import { logcontstu } from "../../Loginsignincontext/context";

const month = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "sep",
  "Oct",
  "Nov",
  "Dec",
];

function Comment() {
  const [comment, setcomment] = useState(undefined);
  const [rootcom, setroot] = useState(undefined);
  const { student } = useContext(logcontstu);
  const [currstudent, setstudent] = useState(student == "no" ? null : student);
  const [perdata, setperdata] = useState(undefined);
  const [activecomid, setactivecom] = useState(0);
  const [type, settype] = useState("");

  const addComment = async (uname, text, parentid = 0) => {
    const docData = {
      body: text,
      createdat:
        new Date().getDate() +
        " " +
        month[new Date().getMonth()] +
        " " +
        new Date().getFullYear(),
      parentid: parentid,
      username: uname,
      id: comment.length + 1,
      email: currstudent.email,
    };

    addDoc(collection(db, "FAQ"), docData)
      .then((result) => {
        setcomment([...comment, docData]);
        const q = query(collection(db, "FAQ"));
        onSnapshot(q, (qS) => {
          let data = qS.docs;
          setperdata(data);
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const editcomment = (cid, txt) => {
    let finddelid = "",
      finddelobj;

    perdata.map((item) => {
      if (item.data().id == cid) {
        finddelid = item.id;
        finddelobj = item.data();
      }
    });

    finddelobj.body = txt;

    setDoc(doc(db, "FAQ", finddelid), finddelobj)
      .then((result) => {
        setactivecom(0);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deletecomment = async (commentid) => {
    let getdelid = "";
    perdata.map((item) => {
      if (item.data().id == commentid) {
        getdelid = item.id;
      }
    });

    await deleteDoc(doc(db, "FAQ", getdelid))
      .then((ok) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    const q = query(collection(db, "FAQ"));
    onSnapshot(q, (qS) => {
      let data = qS.docs;
      let tmp = data.map((item) => {
        return item.data();
      });
      setperdata(data);
      setcomment(tmp);
      setroot(
        tmp
          .filter((ele) => {
            return ele.parentid == 0;
          })
          .sort((a, b) => {
            if (a.id < b.id) return -1;
            else return 1;
          })
      );
    });
  }, []);

  const getreply = (cid) => {
    console.log(cid);
    return comment.filter((item) => {
      return item.parentid == cid;
    });
  };

  if (comment == undefined || rootcom == undefined || student == undefined) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  // if (currstudent == undefined) {
  //   alert("First you need to do login after you can ask question.");
  //   window.location.replace("/slogin");
  // }

  return (
    <>
      <div class="" >
      <div class="container" style={{ backgroundImage: 'url("pattern-bg.jpg")' }}>
      <div class="row">
      <div class="col-md-12">
      <h2 className="wel section-title">Welcome to Scholars Discussion Form </h2>
      <h4 class="redd">Dear Student Here You can Ask Your General Query Regarding Scholarships, Fellowships and more. Our Doubt Support Team will review and give you proper Answer. As You know there are lots of student using our platform so student who know the solution please help the other student. You can put your suggestion / Instruction here.</h4></div></div></div>
      <div className="comments">
        <Coforum
          submitLabel="Write"
          handleSubmit={addComment}
          student={student}
        />
        <h2 className="allc">All Comments</h2>
        <div className="comment-container">
          {rootcom.map((item) => {
            return (
              <>
                <Singleco
                  data={item}
                  replies={getreply(item.id)}
                  currstudent={currstudent}
                  deletecomment={deletecomment}
                  activecomid={activecomid}
                  setactivecom={setactivecom}
                  handleSubmit={addComment}
                  type={type}
                  settype={settype}
                  editcomment={editcomment}
                  student={student}
                />
              </>
            );
          })}
        </div>
      </div>
      <div>
        <p className="note">
          *you can reply to upper level comment and edit and delete your
          comment.
        </p>
      </div>
      </div>
    </>

  );
}

export default Comment;
