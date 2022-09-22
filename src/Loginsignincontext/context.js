import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  confirmPasswordReset,
  sendPasswordResetEmail,
} from "firebase/auth";

import React, { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";

const logcontstu = createContext();

export { logcontstu };

function LogCompo({ children }) {
  const [student, setuser] = useState(undefined);
  const [load, setload] = useState(false);

  function signin(email, pass) {
    return createUserWithEmailAndPassword(auth, email, pass);
  }

  function login(email, pass) {
    return signInWithEmailAndPassword(auth, email, pass);
  }

  function updatemail(email) {
    return updateEmail(student, email);
  }

  function updatepass(pass) {
    return updatePassword(student, pass);
  }

  function slogout() {
    return auth.signOut();
  }

  function passremail(email) {
    return sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/login",
    });
  }

  const value = {
    login,
    signin,
    updateEmail,
    updatepass,
    student,
    passremail,
    slogout,
  };

  useEffect(() => {
    setload(true);
    return auth.onAuthStateChanged((user) => {
      setuser(user);
      if (!user) {
        setuser("no");
      }
      setload(false);
    });
  }, []);

  return (
    <>
      <logcontstu.Provider value={value}>
        {!load && children}
      </logcontstu.Provider>
    </>
  );
}

export default LogCompo;
