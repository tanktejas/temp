import React, { useEffect, useState } from "react";
import "./home.css";
import url from "../images/scholaship.png";

// importing all files
import Card from "../Card/card";
import Faq from "./faq/faq";
import Footer from "../footer/footer1";
import ServiceFaqM from "../Faq/ServiceFaqM";
import { Link } from "react-router-dom";
import urlformark from "../images/marketing.png";

import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import StyleIcon from "@mui/icons-material/Style";
import TerminalIcon from "@mui/icons-material/Terminal";
import AnimationIcon from "@mui/icons-material/Animation";

import { db } from "../../Loginsignincontext/firebase";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";

import { addDoc, Timestamp } from "firebase/firestore";

function Home() {
  const [schodata, setsch] = useState([]);
  const [search, setsearch] = useState("");
  const [status, setstatus] = useState(true);
  const [perdata, setperdata] = useState([]);
  const [ismilitry, setismil] = useState(false);
  const [isHandi, setishan] = useState(false);
  const [category, setcate] = useState("all");

  useEffect(() => {
    setstatus(false);
    const q = query(collection(db, "all-project"));
    onSnapshot(q, (qS) => {
      let data = qS.docs.slice(0, 6);
      setsch(data);
      setperdata(qS.docs);
    });
    setstatus(true);
  }, []);

  if (!status) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  const filter = () => {
    let temp = perdata;

    if (search != "") {
      temp = temp.filter((ele) => {
        return ele.data().name.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (isHandi) {
      temp = temp.filter((ele) => {
        return ele.data().isHandi;
      });
    }

    if (ismilitry) {
      temp = temp.filter((ele) => {
        return ele.data().isMilitry;
      });
    }

    if (category != "all") {
      console.log(1);
      temp = temp.filter((ele) => {
        console.log(ele.data().category.toLowerCase());
        return ele.data().category.toLowerCase() == category;
      });
    }
    let dd = temp;
    if (dd.length > 6) dd = dd.slice(0, 6);

    setsch(dd);
  };

  return (
    <>
      {/* header  */}
      <section
        class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
        id="home"
      >
        <div class="container headertop">
          <div class="d-sm-flex align-items-center justify-content-between head">
            <div className="left">
              <h1>
                <span class="text-warning">Welcome to Freelance HUB !!</span>
              </h1>
              <p class="lead my-4 ">
                As a Client Here you can upload all kind of project which you
                want to get from our developers.
              </p>
              <p class="lead my-4 ">
                As a developer here you can pick any project and add
                colloborator and work on it.
              </p>
            </div>

            <a href="https://svgshare.com/s/gH0" className="right">
              <img
                class="img-fluid  d-none d-sm-block"
                src="data:image/jpeg;base64,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"
                title=""
              />
            </a>
          </div>
        </div>
      </section>
      {/* scholarship details filters */}
      <section class="bg-primary text-light p-5">
        <div class="container">
          {/* <div class="d-md-flex justify-content-around align-items-center">
            <h3 class="mb-3 mb-md-0 cc">Search Scholarship</h3>

            <div class="input-group news-input">
              <input
                type="text"
                class="form-control"
                placeholder="Scholarship Name"
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
              <button
                class="btn btn-dark btn-lg"
                type="button"
                onClick={() => {
                  filter();
                }}
              >
                Search
              </button>
            </div>
          </div> */}
          {/* <div className="filter">
            <div>
              <h3>Filter : </h3>
            </div>
            <select
              onChange={(e) => {
                if (e.target.value === "Hendicap") {
                  setishan(true);
                } else setishan(false);
              }}
            >
              <option>Hendicap</option>
              <option selected>Non-hendicap</option>
            </select>
            <select
              onChange={(e) => {
                if (e.target.value == "For-Miletry") {
                  setismil(true);
                  console.log(ismilitry);
                } else {
                  setismil(false);
                }
              }}
            >
              <option>For-Miletry</option>
              <option selected>Normal</option>
            </select>
            <select
              onChange={(e) => {
                setcate(e.target.value.toLowerCase());
              }}
            >
              <option selected>All</option>
              <option>OBC</option>
              <option>General</option>
              <option>SC</option>
              <option>ST</option>
            </select>
            <button
              class="btn btn-dark btn-lg  applyfilt"
              type="button"
              onClick={() => {
                filter();
              }}
            >
              Apply
            </button>
          </div> */}
          <h1 className="section-title text-center services">Services</h1>
          <div className="container allcont">
            <Link to="as">
              <div className="itemofit">
                <div className="up">
                  <PublicIcon />
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><style>.cls-4{fill:none;stroke:#4d535b;stroke-miterlimit:10;stroke-width:2px}</style></defs><g style="isolation:isolate"><g id="white"><path fill="#fff" d="M18 30l2 21h-1v5h28v-5h-2l2-21H18z"/><path fill="#dee0e2" d="M47 30H18l.2 3H44l-2 19h2v4h3v-5h-2l2-21z"/></g><g id="stroke"><path class="cls-4" d="M39.5 29.7L49.7 9.8l5.4 2.8-8.9 17.1"/><path class="cls-4" d="M51 29.2l5.3-10.4-8.9-4.6m-32.5 7.7l4.5 7.8m8.4 0l-6.7-11.8m-.1.9l-5.8 3.7m8.4 7.2l-4.9-9.2m17.8 9.2l.1-12.5-3.4-7.3-3.2 7.6v12.2m6.1-11.9l-6.1.3m3.3 11.6l-.2-10.8m12.5 31.9L47.3 30H18.2l1.6 20.8m-1.4 5.4h28.7v-5H18.4v5zM11.7 8.3a14.7 14.7 0 00-.2 8.9c1.5 4.1 5.1 5 7.9 1.7a2.4 2.4 0 00.7-2.4c-1.1-3.2-4.3-2.2-8.4-8.2z"/></g><path d="M15 23l5 7h8l-6-11-7 4zM11.7 8.3a14.7 14.7 0 00-.2 8.9c1.5 4.1 5.1 5 7.9 1.7a2.4 2.4 0 00.7-2.4c-1.1-3.2-4.3-2.2-8.4-8.2zM39 30l11-20 5 3-9 17h-7zm-9 0h7l-1-12-3-8-3 8v12z" style="mix-blend-mode:darken" fill="#a1f4c0" id="flah"/></g></svg> */}
                </div>
                <div className="down">Marketing</div>
              </div>
            </Link>
            <Link to="as">
              <div className="itemofit">
                <div className="up">
                  <i class="fa fa-user-group-crown"></i>
                  <BusinessIcon />
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><style>.cls-4{fill:none;stroke:#4d535b;stroke-miterlimit:10;stroke-width:2px}</style></defs><g style="isolation:isolate"><g id="white"><path fill="#fff" d="M18 30l2 21h-1v5h28v-5h-2l2-21H18z"/><path fill="#dee0e2" d="M47 30H18l.2 3H44l-2 19h2v4h3v-5h-2l2-21z"/></g><g id="stroke"><path class="cls-4" d="M39.5 29.7L49.7 9.8l5.4 2.8-8.9 17.1"/><path class="cls-4" d="M51 29.2l5.3-10.4-8.9-4.6m-32.5 7.7l4.5 7.8m8.4 0l-6.7-11.8m-.1.9l-5.8 3.7m8.4 7.2l-4.9-9.2m17.8 9.2l.1-12.5-3.4-7.3-3.2 7.6v12.2m6.1-11.9l-6.1.3m3.3 11.6l-.2-10.8m12.5 31.9L47.3 30H18.2l1.6 20.8m-1.4 5.4h28.7v-5H18.4v5zM11.7 8.3a14.7 14.7 0 00-.2 8.9c1.5 4.1 5.1 5 7.9 1.7a2.4 2.4 0 00.7-2.4c-1.1-3.2-4.3-2.2-8.4-8.2z"/></g><path d="M15 23l5 7h8l-6-11-7 4zM11.7 8.3a14.7 14.7 0 00-.2 8.9c1.5 4.1 5.1 5 7.9 1.7a2.4 2.4 0 00.7-2.4c-1.1-3.2-4.3-2.2-8.4-8.2zM39 30l11-20 5 3-9 17h-7zm-9 0h7l-1-12-3-8-3 8v12z" style="mix-blend-mode:darken" fill="#a1f4c0" id="flah"/></g></svg> */}
                </div>
                <div className="down">Business</div>
              </div>
            </Link>
            <Link to="as">
              <div className="itemofit">
                <div className="up">
                  <StyleIcon />
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><style>.cls-4{fill:none;stroke:#4d535b;stroke-miterlimit:10;stroke-width:2px}</style></defs><g style="isolation:isolate"><g id="white"><path fill="#fff" d="M18 30l2 21h-1v5h28v-5h-2l2-21H18z"/><path fill="#dee0e2" d="M47 30H18l.2 3H44l-2 19h2v4h3v-5h-2l2-21z"/></g><g id="stroke"><path class="cls-4" d="M39.5 29.7L49.7 9.8l5.4 2.8-8.9 17.1"/><path class="cls-4" d="M51 29.2l5.3-10.4-8.9-4.6m-32.5 7.7l4.5 7.8m8.4 0l-6.7-11.8m-.1.9l-5.8 3.7m8.4 7.2l-4.9-9.2m17.8 9.2l.1-12.5-3.4-7.3-3.2 7.6v12.2m6.1-11.9l-6.1.3m3.3 11.6l-.2-10.8m12.5 31.9L47.3 30H18.2l1.6 20.8m-1.4 5.4h28.7v-5H18.4v5zM11.7 8.3a14.7 14.7 0 00-.2 8.9c1.5 4.1 5.1 5 7.9 1.7a2.4 2.4 0 00.7-2.4c-1.1-3.2-4.3-2.2-8.4-8.2z"/></g><path d="M15 23l5 7h8l-6-11-7 4zM11.7 8.3a14.7 14.7 0 00-.2 8.9c1.5 4.1 5.1 5 7.9 1.7a2.4 2.4 0 00.7-2.4c-1.1-3.2-4.3-2.2-8.4-8.2zM39 30l11-20 5 3-9 17h-7zm-9 0h7l-1-12-3-8-3 8v12z" style="mix-blend-mode:darken" fill="#a1f4c0" id="flah"/></g></svg> */}
                </div>
                <div className="down">Style</div>
              </div>
            </Link>
            <Link to="as">
              <div className="itemofit">
                <div className="up">
                  <TerminalIcon />
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><style>.cls-4{fill:none;stroke:#4d535b;stroke-miterlimit:10;stroke-width:2px}</style></defs><g style="isolation:isolate"><g id="white"><path fill="#fff" d="M18 30l2 21h-1v5h28v-5h-2l2-21H18z"/><path fill="#dee0e2" d="M47 30H18l.2 3H44l-2 19h2v4h3v-5h-2l2-21z"/></g><g id="stroke"><path class="cls-4" d="M39.5 29.7L49.7 9.8l5.4 2.8-8.9 17.1"/><path class="cls-4" d="M51 29.2l5.3-10.4-8.9-4.6m-32.5 7.7l4.5 7.8m8.4 0l-6.7-11.8m-.1.9l-5.8 3.7m8.4 7.2l-4.9-9.2m17.8 9.2l.1-12.5-3.4-7.3-3.2 7.6v12.2m6.1-11.9l-6.1.3m3.3 11.6l-.2-10.8m12.5 31.9L47.3 30H18.2l1.6 20.8m-1.4 5.4h28.7v-5H18.4v5zM11.7 8.3a14.7 14.7 0 00-.2 8.9c1.5 4.1 5.1 5 7.9 1.7a2.4 2.4 0 00.7-2.4c-1.1-3.2-4.3-2.2-8.4-8.2z"/></g><path d="M15 23l5 7h8l-6-11-7 4zM11.7 8.3a14.7 14.7 0 00-.2 8.9c1.5 4.1 5.1 5 7.9 1.7a2.4 2.4 0 00.7-2.4c-1.1-3.2-4.3-2.2-8.4-8.2zM39 30l11-20 5 3-9 17h-7zm-9 0h7l-1-12-3-8-3 8v12z" style="mix-blend-mode:darken" fill="#a1f4c0" id="flah"/></g></svg> */}
                </div>
                <div className="down">Technology </div>
              </div>
            </Link>
            <Link to="as">
              <div className="itemofit">
                <div className="up">
                  <AnimationIcon />
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><style>.cls-4{fill:none;stroke:#4d535b;stroke-miterlimit:10;stroke-width:2px}</style></defs><g style="isolation:isolate"><g id="white"><path fill="#fff" d="M18 30l2 21h-1v5h28v-5h-2l2-21H18z"/><path fill="#dee0e2" d="M47 30H18l.2 3H44l-2 19h2v4h3v-5h-2l2-21z"/></g><g id="stroke"><path class="cls-4" d="M39.5 29.7L49.7 9.8l5.4 2.8-8.9 17.1"/><path class="cls-4" d="M51 29.2l5.3-10.4-8.9-4.6m-32.5 7.7l4.5 7.8m8.4 0l-6.7-11.8m-.1.9l-5.8 3.7m8.4 7.2l-4.9-9.2m17.8 9.2l.1-12.5-3.4-7.3-3.2 7.6v12.2m6.1-11.9l-6.1.3m3.3 11.6l-.2-10.8m12.5 31.9L47.3 30H18.2l1.6 20.8m-1.4 5.4h28.7v-5H18.4v5zM11.7 8.3a14.7 14.7 0 00-.2 8.9c1.5 4.1 5.1 5 7.9 1.7a2.4 2.4 0 00.7-2.4c-1.1-3.2-4.3-2.2-8.4-8.2z"/></g><path d="M15 23l5 7h8l-6-11-7 4zM11.7 8.3a14.7 14.7 0 00-.2 8.9c1.5 4.1 5.1 5 7.9 1.7a2.4 2.4 0 00.7-2.4c-1.1-3.2-4.3-2.2-8.4-8.2zM39 30l11-20 5 3-9 17h-7zm-9 0h7l-1-12-3-8-3 8v12z" style="mix-blend-mode:darken" fill="#a1f4c0" id="flah"/></g></svg> */}
                </div>
                <div className="down">Animation</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section class="" id="services">
        <h1 class="section-title text-center">All Projects</h1>
        <div class="container">
          {schodata.map((ele) => {
            return (
              <Card
                Name={ele.data().Name}
                Description={ele.data().Description}
                Imageurl={ele.data().Imageurl}
                date={ele.data().Date}
                TechStack={ele.data().TechStack}
                id={ele.id}
              />
            );
          })}
        </div>
        <div class="container ">
          <div className=" col-md-12 ml-0 ml-lg-3 my-2 my-lg-0 text-center">
            <Link style={{ textDecoration: "none" }} to="/ViewAllScholarships">
              <a className=" button2 " href="#">
                view more
              </a>
            </Link>
          </div>
        </div>
      </section>
      {/* scholarship card end  */}

      {/* Faq starts  */}
      <section class="" id="about">
        <div className="container faq">
          <ServiceFaqM />
        </div>
      </section>
      {/* faq ends  */}
      <Footer />
    </>
  );
}

export default Home;
