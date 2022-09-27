import React, { useContext, useState } from "react";
import { logcontstu } from "../Loginsignincontext/context";
import "./login.css";
import { db } from "../Loginsignincontext/firebase";
import { storage } from "../Loginsignincontext/firebase";

import Button from "@mui/material/Button";
import { NavLink, Route, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Alert from "@mui/material/Alert";
import { addDoc, collection } from "firebase/firestore";

function Signin() {
  const navigate = useNavigate();

  const { signin, user } = useContext(logcontstu);

  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
  const [err, seterr] = useState("");
  const [nameofuser, setnameofuser] = useState("");
  const [avatar, setavatar] = useState(null);

  function signinuser() {
    if (pass != cpass) {
      return seterr("Sign in failed");
    } else if (!email.includes(".com")) {
      return seterr("Failed to Signin.");
    }

    seterr("");
    signin(email, pass)
      .then((res) => {
        const obj = {
          Completed_project: [],
          Name: nameofuser,
          Email: email,
          Posted_project: [],
          chats: [],
        };

        const storageRef = ref(storage, `/Avatar/${email}`);

        const uploadTask = uploadBytesResumable(storageRef, avatar);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              // alert(url);
            });
          }
        );

        addDoc(collection(db, "all_people"), obj)
          .then((result) => {
            // alert(JSON.stringify(result));
            alert("you are succesfully signin");
            navigate("/");
            window.location.reload();
          })
          .catch((err) => {
            alert("some error occured try again. ");
          });
      })
      .catch((err) => {
        seterr("Failed to Signin.");
      });
  }

  return (
    <>
      <div class=" flex-r container logsign">
        <div class="flex-r login-wrapper">
          <div class="login-text">
            <div class="logo">
              <span>
                <i class="fab fa-facebook"></i>
              </span>
              <span>FreelanceHUB (Non Dev.)</span>
            </div>
            <h1>Sign In</h1>
            <p>It's not long before you embark on this journey! </p>
            {err && <Alert severity="error">{err}</Alert>}
            <form class="flex-c">
              <div class="input-box">
                <span class="label">Name</span>
                <div class=" flex-r input">
                  <input
                    type="text"
                    placeholder="john doe"
                    value={nameofuser}
                    onChange={(e) => {
                      setnameofuser(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div class="input-box">
                <span class="label">Name</span>
                <div class=" flex-r input">
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="Upload"
                    onChange={(e) => {
                      setavatar(e.target.files[0]);
                    }}
                  />
                </div>
              </div>

              <div class="input-box">
                <span class="label">E-mail</span>
                <div class=" flex-r input">
                  <input
                    type="text"
                    placeholder="name@abc.com"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <i class="fas fa-at"></i>
                </div>
              </div>

              <div class="input-box">
                <span class="label">Password</span>
                <div class="flex-r input">
                  <input
                    type="password"
                    placeholder="8+ (a, A, 1, #)"
                    value={pass}
                    onChange={(e) => {
                      setpass(e.target.value);
                    }}
                  />
                  <i class="fas fa-lock"></i>
                </div>
              </div>
              <div class="input-box">
                <span class="label">Confirm Password</span>
                <div class="flex-r input">
                  <input
                    type="password"
                    placeholder="8+ (a, A, 1, #)"
                    value={cpass}
                    onChange={(e) => {
                      setcpass(e.target.value);
                    }}
                  />
                  <i class="fas fa-lock"></i>
                </div>
              </div>
              <div class="check">
                <input type="checkbox" name="" id="" />
                <span>I've read and agree with T&C</span>
              </div>
              <Button
                variant="contained"
                className="log"
                onClick={() => {
                  signinuser();
                }}
              >
                Sign in
              </Button>
              <span class="extra-line">
                <span>Already have an account?</span>
                <a>
                  <NavLink to="/slogin"> Log In</NavLink>
                </a>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
