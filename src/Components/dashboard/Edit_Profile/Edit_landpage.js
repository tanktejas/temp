import { collection, onSnapshot, query, updateDoc } from "firebase/firestore";
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

function Editlandpage() {
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

    if (newfprofilepic != null) {
      const storageRef = ref(storage, `/Avatar/${useremail}`);

      const uploadTask = uploadBytesResumable(storageRef, newfprofilepic);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (newname != "") {
            temp.Name = newname;
          }
          if (newtag != "") {
            temp.Tag = newtag;
          }
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          alert(percent);
        },
        (err) => {
          alert("Some Error occured.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            temp.url = url;
            temp.Name = newname;
            if (newname != "") {
              temp.Name = newname;
            }
            if (newtag != "") {
              temp.Tag = newtag;
            }

            updateDoc(doc(db, "all_people"), userdocid, {
              Name: newname,
              url: url,
              Tag: newtag,
            })
              .then(() => {
                alert("Updated Succesfully");
              })
              .catch((err) => {
                alert("Some Error occured, Try Again.");
              });
          });
        }
      );
    } else {
      if (newname != "") {
        temp.Name = newname;
      }
      if (newtag != "") {
        temp.Tag = newtag;
      }
      updateDoc(doc(db, "all_people"), userdocid, temp)
        .then(() => {
          alert("Updated Succesfully");
        })
        .catch((err) => {
          alert("Some Error Ocuured, Try Again.");
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
                  <label htmlFor="avatar">Your Photo</label>
                </div>
                <div className="grid-65">
                  <span className="photo" title="Upload your Avatar!"></span>
                  <input
                    className="inped"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setnewprofilepic(e.target.files[0]);
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

export default Editlandpage;
