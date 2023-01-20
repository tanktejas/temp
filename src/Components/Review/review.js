import React, { useState, useEffect } from "react";
import RecipeReviewCard from "./card";
import { db as dbnondev } from "../../Loginsignincontext/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";

function Review() {
  const [alluserdata, setdata] = useState([]);
  useEffect(() => {
    const queryy = query(collection(dbnondev, "all_people"));

    onSnapshot(queryy, (qs) => {
      setdata(qs.docs);
    });
  }, []);
  if (alluserdata == []) return <h1>Loading...</h1>;
  return (
    <>
      <div className="outerreview">
        {alluserdata.map((item) => {
          return (
            <div>
              <RecipeReviewCard data={item.data()} />{" "}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Review;
