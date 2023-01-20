import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { logcontstu } from "../../Loginsignincontext/context";
import { db } from "../../Loginsignincontext/firebase";
import Popup from "./project_adding_popup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./Dashboard.css";
import RedoIcon from "@mui/icons-material/Redo";
import Button from "@mui/material/Button";
import Redo from "@mui/icons-material/Redo";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from "@mui/icons-material/Cancel";
import firebase from "firebase/compat/app";
import { Link } from "react-router-dom";

function Dashboard() {
  const { student } = useContext(logcontstu);

  const [currusermail, setmail] = useState(student?.email);
  const [currentuser, setcurrentuser] = useState([]);
  const [userprofileurl, setuprofileurl] = useState("");
  const [curruserid, setid] = useState("");
  const [hashnamewithid, sethash] = useState({});
  const [searchval, setsearch] = useState("");

  const [proinfo, setproinfo] = useState({
    name: "",
    description: "",
    techstack: "",
  });

  useEffect(() => {
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

  const funformovingprojecttocompleted = (item) => {
    const queryy1 = query(collection(db, "all_people"));

    let idofmovedoc = "";
    let idofremoveproject = "";
    let postedproject = [];
    let updatedcompletedpro = [];

    idofmovedoc = hashnamewithid[currentuser.Name];

    let updatedoc = {};

    postedproject = currentuser?.Posted_project?.filter((item2) => {
      if (item2.Name == item.Name) {
        updatedoc = item2;
      }
      return item2.Name != item.Name;
    });

    updatedcompletedpro = currentuser?.Completed_project;
    if (updatedcompletedpro == undefined) {
      updatedcompletedpro = [];
    }

    updatedcompletedpro.push(updatedoc);

    updateDoc(doc(db, "all_people", curruserid), {
      Posted_project: postedproject,
      Completed_project: updatedcompletedpro,
    })
      .then(() => {
        const q1 = query(collection(db, "all-project"));
        onSnapshot(q1, (qs) => {
          qs.docs.map((it1) => {
            if (it1.data().Name == item.Name) {
              idofremoveproject = it1.id;
            }
          });
          deleteDoc(doc(db, "all-project", idofremoveproject));
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const addproject = () => {
    const ref = doc(db, "all_people", curruserid);

    let curr = currentuser;
    const a = firebase.firestore.Timestamp.now().toDate().getDate();

    curr?.Posted_project?.push({
      Date: Date.now(),
      Name: proinfo.name,
      Tech_stack: proinfo.techstack.split(","),
    });
    updateDoc(ref, curr)
      .then(() => {})
      .catch((err) => {
        alert("some error occured, please try again");
      });

    const temp = {
      Date: Date.now(),
      Description: proinfo.description.split(","),
      Name: proinfo.name,
      TechStack: proinfo.techstack.split(","),
      posted_by: curr.Name,
    };

    addDoc(collection(db, "all-project"), temp)
      .then(() => {})
      .catch((err) => {
        alert("some error occured, please try again");
      });

    setproinfo({
      name: "",
      description: "",
      techstack: "",
    });
  };

  const deleteprojectfromcompleted = (item) => {
    let completedproj = currentuser?.Completed_project;
    completedproj = completedproj.filter((curritem) => {
      return curritem.Name != item.Name;
    });

    updateDoc(doc(db, "all_people", curruserid), {
      Completed_project: completedproj,
    })
      .then(() => {})
      .catch((err) => {
        alert(err);
      });
  };

  if (currentuser == [] || userprofileurl == undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div class="lg:flex min-h-screen">
        <aside class="grow-0 bg-white pl-7 pr-16 pb-12 sm:pl-16 sm:pr-24 sm:pb-12 lg:pb-16 relative dashnav">
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
          <header>
            <div class="py-7 container mx-auto header__grid">
              <div class="relative col-span-2 md:col-span-1 order-3 md:order-none mt-6 md:mt-0">
                <input
                  type="text"
                  placeholder="Search projects"
                  class="rounded-sm py-1.5 px-12 w-full"
                  value={searchval}
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                />
                <svg
                  class="w-5 h-5 text-gray-500 absolute top-2 left-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </header>

          <div class="container mx-auto mt-3 pb-14">
            <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              <div class="grid gap-6">
                <h3 class="text-2xl font-medium flex items-center">
                  Posted Projects
                  <Popup
                    proinfo={proinfo}
                    setproinfo={setproinfo}
                    handlesubmit={addproject}
                  />
                </h3>

                {currentuser?.Posted_project?.map((item) => {
                  const a = firebase.firestore.Timestamp.now();
                  let name = item.Name;
                  if (
                    searchval == "" ||
                    name.includes(searchval.toLowerCase())
                  ) {
                    return (
                      <>
                        <div class="card bg-white rounded-md shadow-xs px-5 py-4 cursor-pointer hover:bg-pink-200">
                          <a class="font-medium capitalize text-lg" href="#">
                            {item.Name}
                          </a>
                          <p></p>
                          <p class="text-gray-500">
                            {item?.Tech_stack?.map((item, idx) => {
                              let len = item?.Tech_stack?.length;
                              return item + (idx == len - 1 ? "." : ", ");
                            })}
                          </p>

                          <div class="flex items-center mt-1">
                            <span class="text-gray-500">
                              {new Date(item.Date).getDate().toString() +
                                "/" +
                                (
                                  new Date(item.Date).getMonth() + 1
                                ).toString() +
                                "/" +
                                new Date(item.Date).getFullYear().toString()}
                            </span>
                          </div>

                          <div>
                            {/* <Tooltip title="Move to completed"> */}
                            <Button
                              onClick={() => {
                                funformovingprojecttocompleted(item);
                              }}
                            >
                              <RedoIcon />
                            </Button>
                            {/* </Tooltip> */}
                          </div>
                        </div>
                      </>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>

              <div class="grid gap-6">
                <h3 class="text-2xl font-medium flex items-center">
                  Completed Project
                </h3>
                {currentuser?.Completed_project?.map((item) => {
                  let name = item.Name;
                  if (
                    searchval == "" ||
                    name.includes(searchval.toLowerCase())
                  ) {
                    return (
                      <>
                        <div class="card bg-white rounded-md shadow-xs px-5 py-4 cursor-pointer hover:bg-pink-200">
                          <a class="font-medium capitalize text-lg" href="#">
                            {item.Name}
                          </a>
                          <p></p>
                          <p class="text-gray-500">
                            {item?.Tech_stack?.map((item, idx) => {
                              let len = item?.Tech_stack?.length;

                              return item + (idx == len - 1 ? "." : ", ");
                            })}
                          </p>

                          <div class="flex items-center mt-1">
                            <span class="text-gray-500">
                              {new Date(item.Date).getDate().toString() +
                                "/" +
                                (
                                  new Date(item.Date).getMonth() + 1
                                ).toString() +
                                "/" +
                                new Date(item.Date).getFullYear().toString()}
                            </span>
                          </div>
                          <Button
                            onClick={() => {
                              deleteprojectfromcompleted(item);
                            }}
                          >
                            <CancelIcon />
                          </Button>
                          <div></div>
                        </div>
                      </>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
              <div class="grid gap-6">
                <h3 class="text-2xl font-medium flex items-center">
                  All Review
                  <svg
                    class="w-4 h-4 text-gray-500 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </h3>
                {currentuser?.review?.map((item) => { 
                  let color = Math.random().toString(16).substr(-6);
                  return (
                    <>
                      <div class="card bg-white rounded-md shadow-xs px-5 py-4 cursor-pointer hover:bg-blue-200">
                        <a
                          class="font-medium capitalize text-lg"
                          style={{
                            color: "#" + color,
                            "text-decoration": "none",
                          }}
                          href="#"
                        >
                          {item}
                        </a>
                      </div>
                    </>
                  );
                })}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
