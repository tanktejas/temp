import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import "./upload.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { logcontstu } from "../../Loginsignincontext/context";
import { db, storage } from "../../Loginsignincontext/firebase";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RedoIcon from "@mui/icons-material/Redo";
import Button from "@mui/material/Button";
import Redo from "@mui/icons-material/Redo";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from "@mui/icons-material/Cancel";
import firebase from "firebase/compat/app";
import { Link } from "react-router-dom";
import FileUploader from "./uploader";
import ReactS3 from "react-s3";
import { Buffer } from "buffer";
Buffer.from("anything", "base64");
import axios from "axios";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const S3_BUCKET = "tejasabcd";
const REGION = "us-west-2";
const ACCESS_KEY = "AKIAVJ3PKNB3CYEI6E4N";
const SECRET_ACCESS_KEY = "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";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

function UploadProject() {
  const { student } = useContext(logcontstu);

  const [currusermail, setmail] = useState(student?.email);
  const [currentuser, setcurrentuser] = useState([]);
  const [userprofileurl, setuprofileurl] = useState("");
  const [curruserid, setid] = useState("");
  const [hashnamewithid, sethash] = useState({});
  const [pro_name, setproname] = useState("");
  const [pro_file, setprofile] = useState(null);
  const [curruser, setcurruser] = useState({});
  const [userdocid, setuserdocid] = useState("");
  const [uploadingstate, setuploadingstate] = useState("");

  const [proinfo, setproinfo] = useState({
    name: "",
    description: "",
    techstack: "",
  });

  useEffect(() => {
    if (currusermail != undefined) {
      const queryy = query(collection(db, "all_people"));

      onSnapshot(queryy, (qs) => {
        qs.docs.map((item) => {
          if (item.data().Email == currusermail) {
            setcurruser(item.data());
            setuserdocid(item.id);
          }
        });
      });
    }

    const queryy = query(collection(db, "all_people"));

    onSnapshot(queryy, (qs) => {
      qs.docs.map((item) => {
        let temp = hashnamewithid;
        temp[item.data().Name] = item.id;
        sethash(temp);
        if (item.data().Email == student?.email) {
          setcurrentuser(item.data());
          setid(item.id);
          if (item.data().url != undefined) setuprofileurl(item.data().url);
        }
      });
    });
  }, []);

  const add = async (e) => {
    setuploadingstate("Uploading...");
    let obj = {
      file: pro_file,
    };

    let formData = new FormData();
    formData.append("ff", pro_file);
    formData.append("email", currusermail);

    const ll = await fetch(
      "https://freelance-backend-ezki.onrender.com/upload",
      {
        method: "PUT",
        // headers: {
        //   "Content-type": "multipart/form-data",
        // },  //header will be set automatically no need to set here.
        body: formData,
      }
    );
    console.log(pro_file);
    let urloffile = `https://freelance123.s3.us-west-2.amazonaws.com/useruploadedprojects/${currusermail}/${pro_file.name}`;

    let urls = currentuser.urls != undefined ? currentuser.urls : [];
    urls.push({
      name: pro_name,
      url: urloffile,
    });

    setuploadingstate("Upload done");

    updateDoc(doc(db, "all_people", curruserid), {
      urls: urls,
    })
      .then(() => {
        console.log("done");
      })
      .catch((err) => {
        alert(err);
      });

    let temp = currentuser;
    if (temp.urls == undefined) temp.urls = [];

    temp.urls.push({
      name: pro_name,
      url: urloffile,
    });

    setcurrentuser(temp);
  };

  if (currentuser == [] || userprofileurl == undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div class="lg:flex min-h-screen">
        <aside class="grow-0 bg-white pl-7 pr-16 pb-12 sm:pl-16 sm:pr-24 sm:pb-12 lg:pb-16 relative grid">
          <div>
            <img
              src={
                userprofileurl != undefined
                  ? userprofileurl
                  : "https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt="Miranda"
              class="aside__img rounded-full w-28 h-28 md:w-32 md:h-32 object-cover shadow-lg absolute top-12"
            />
            <h2 class="mt-44 md:mt-52 font-semibold text-3xl leading-none">
              {currentuser.Name}
            </h2>
            <span class="capitalize text-gray-500 text-sm">
              {currentuser.Tag}
            </span>
            {/* <p class="mt-3 flex items-center text-sm">
                <span class="w-3 h-3 bg-green-400 block rounded-full mr-1.5"></span>
                Online
              </p> */}
          </div>
          <nav class="mt-12 md:mt-10 lg:mt-0">
            <ul class="flex flex-wrap lg:grid gap-3">
              <li class="flex items-center text-gray-600 hover:text-red-400">
                <Link
                  to="/Dashboard/uploadproject"
                  class="capitalize flex items-center text-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Upload Project
                </Link>
              </li>

              <li class="flex items-center text-gray-600 hover:text-red-400">
                <Link
                  to="/Dashboard/Uploadedproject"
                  class="capitalize flex items-center text-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Uploaded project
                </Link>
              </li>
              <li class="flex items-center text-gray-600 hover:text-red-400">
                <Link to={"/chat"} class="capitalize flex items-center text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  My Chat
                </Link>
              </li>
              <li class="flex items-center text-gray-600 hover:text-red-400">
                <Link
                  to="/Dashboard/editprofiletagname"
                  class="capitalize flex items-center text-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Edit Tag
                </Link>
              </li>
              <li class="flex items-center text-gray-600 hover:text-red-400">
                <Link
                  to="/Dashboard/editprofileimage"
                  class="capitalize flex items-center text-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Edit Profile pic
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main class="flex-grow bg-gray-100">
          <div class="container mx-auto mt-3 pb-14">
            <section class="sectobeflex grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              <div class=" flex-r container logsign">
                <div class="flex-r login-wrapper">
                  <div class="login-text">
                    <div class="logo">
                      <span>
                        <i class="fab fa-facebook"></i>
                      </span>
                      <span>FreelanceHUB </span>
                    </div>
                    <h1>Upload </h1>
                    {uploadingstate == "Uploading..." && (
                      <Stack
                        className="cccc"
                        sx={{ color: "grey.500" }}
                        spacing={2}
                        direction="row"
                      >
                        <CircularProgress color="success" />
                      </Stack>
                    )}
                    {uploadingstate == "Upload done" && (
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert severity="success">Uploading done</Alert>
                      </Stack>
                    )}
                    <p>Don't refresh the page while uploading Project. </p>

                    <form
                      class="flex-c"
                      onSubmit={(e) => {
                        add(e);
                        alert(e);
                        e.preventDefault();
                      }}
                    >
                      <div class="input-box">
                        <span class="label">Name</span>
                        <div class=" flex-r input">
                          <input
                            type="text"
                            placeholder="ABC"
                            value={pro_name}
                            onChange={(e) => {
                              setproname(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div class="input-box">
                        <span class="label">Upload Project</span>
                        <div class=" flex-r input">
                          <input
                            name="ff"
                            type="file"
                            placeholder="name@abc.com"
                            accept="zip"
                            onChange={(e) => {
                              setprofile(e.target.files[0]);
                            }}
                          />
                        </div>
                      </div>

                      <div class="check">
                        <span>-------------------</span>
                      </div>
                      <Button
                        type="submit"
                        variant="contained"
                        className="log"
                        // onSubmit={(e) => {
                        //   add(e);
                        // }}
                      >
                        Upload
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default UploadProject;
