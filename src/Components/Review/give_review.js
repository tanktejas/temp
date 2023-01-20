import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db as dbnondev } from "../../Loginsignincontext/firebase";

import {
  doc,
  addDoc,
  collection,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

function Givereview() {
  const { nameofrevi } = useParams();
  const [id, setid] = useState("");
  const [review, setreview] = useState("");
  const [currreply, setcurr] = useState([]);

  useEffect(() => {
    let queryy = query(collection(dbnondev, "all_people"));

    onSnapshot(queryy, (qs) => {
      let temp = [];
      qs.docs.map((item) => {
        if (item.data().Name == nameofrevi) {
          setid(item.id);
          setcurr(item.data().review);
        }
      });
    });
  }, []);

  const addreply = () => {
    let temp = currreply;
    if (temp == undefined) {
      temp = [];
    }

    temp.push(review);

    updateDoc(doc(dbnondev, "all_people", id), {
      review: temp,
    })
      .then(() => {
        alert("Updated Succesfully");
      })
      .catch((err) => {
        alert("Some Error Ocuured, Try Again.");
      });
  };

  if (id == "") return <h1>Loading...</h1>;

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
                    value={review}
                    onChange={(e) => {
                      setreview(e.target.value);
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
                  value="Submit"
                  onClick={() => {
                    addreply();
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

export default Givereview;
