import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { logcontstu } from "../../../Loginsignincontext/context";
import { storage } from "../../../Loginsignincontext/firebase";

import { db } from "../../../Loginsignincontext/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

import "./Edit_profile.css";

function Edittagname() {
  const { student } = useContext(logcontstu);
  const [userobject, setobjece] = useState(null);
  const [useremail, setmail] = useState(student?.email);
  const [curruser, setcurruser] = useState({});
  const [ischanged, setischangd] = useState(false);

  const [newfprofilepic, setnewprofilepic] = useState(null);
  const [newname, setnewname] = useState("");
  const [newtag, setnewtag] = useState("");
  const [userdocid, setuserdocid] = useState("");

  useEffect(() => {
    if (useremail != undefined) {
      const queryy = query(collection(db, "all_people"));

      onSnapshot(queryy, (qs) => {
        qs.docs.map((item) => {
          if (item.data().Email == useremail) {
            setcurruser(item.data());
            setuserdocid(item.id);
          }
        });
      });
    }
  }, [ischanged]);

  const updateProfile = () => {
    let temp = curruser;

    if (newtag != "") {
      temp.Tag = newtag;
      setDoc(doc(db, "all_people", "Q8eVTKeMeQLcs2bC6PUP"), temp)
        .then(() => {
          alert("Updated Succesfully");
        })
        .catch((err) => {
          alert("Some Error Occured, Try Again.");
        });
    }
  };

  return (
    <>
      <div>
        <div className="profile">
          <div className="content">
            <h1>Edit Profile</h1>
            <form action="">
              <fieldset>
                <div className="grid-35">
                  <label htmlFor="fname">New Tag: </label>
                </div>
                <div className="grid-65">
                  <input
                    className="inped"
                    type="text"
                    id="fname"
                    value={newtag}
                    onChange={(e) => {
                      setnewtag(e.target.value);
                    }}
                  />
                </div>
              </fieldset>

              <fieldset>
                <input
                  className="inped Btn cancel"
                  type="button"
                  value="Cancel"
                />
                <input
                  className="inped Btn"
                  type="Button"
                  value="Save Changes"
                  onClick={() => {
                    updateProfile();
                  }}
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edittagname;
