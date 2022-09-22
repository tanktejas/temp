import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { logcont } from "../logincontext/authcontext";
import { logcontstu } from "../../Loginsignincontext/context";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../DB/firebase";

import "../main.css";
import "./plugins.min.css";

function Header() {
  const [navicon, setnav] = useState({ display: "none" });
  const [scho, setscho] = useState({ display: "none" });
  const [cont, setcont] = useState({ display: "none" });
  const { user, logout } = useContext(logcont);
  const { student, slogout } = useContext(logcontstu);
  const [curruser, setuser] = useState(user == "no" ? null : user);
  const [keyfordash, setkeyfordash] = useState("");
  const [currstudent, setcurrstudent] = useState(
    student == "no" ? null : student
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let ele = document.getElementById("header_scroll");
      let pageyoffset = window.pageYOffset;
      if (pageyoffset <= 720) {
        ele.style.background = "rgb(11 135 25 / 81%)";
      } else {
        ele.style.background = "rgb(99 235 112 / 43%)";
      }
    });

    const curremail = user?.email;

    const query1 = query(collection(db, "users"));
    onSnapshot(query1, (qS) => {
      qS.docs.map((item) => {
        if (item.data().email == curremail) {
          setkeyfordash(item.id);
        }
      });
    });
  }, []);

  // for admin logout
  const Logout = () => {
    console.log("ok");
    logout()
      .then((ok) => {
        setuser(null);
      })
      .catch((err) => {});
  };

  //student logout
  const SLogout = () => {
    slogout()
      .then((ok) => {
        setcurrstudent(null);
      })
      .catch((err) => {});
  };

  if (student == undefined) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  console.log(student);
  const dashboardurl = "https://scholarhome-dashboard.vercel.app/" + keyfordash;

  return (
    <>
      <header className="grip-header sticky">
        <div className="container-fluid">
          <div className="row headercolor" id="header_scroll">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg navbar-light">
                <Link style={{ textDecoration: "none" }} to="/">
                  <a className="navbar-brand" href="#index.php">
                    {/* <img
            className="logo"
            src="https://www.sih.gov.in/img1/SIH2022-white-logo.png"/> */}
                    <span>
                      <i class="fab fa-facebook"></i>
                    </span>
                    <span>
                      Freelance <sub>HUB</sub>{" "}
                    </span>
                  </a>
                </Link>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navTrigger"
                  aria-controls="navTrigger"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => {
                    if (navicon.display == "none") setnav({ display: "block" });
                    else setnav({ display: "none" });
                  }}
                >
                  <span className="show fe fe-menu"></span>
                  <span className="hidden fe fe-x"></span>
                </button>

                <div
                  className="collapse navbar-collapse spec"
                  id="navTrigger"
                  style={navicon}
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item ">
                      <NavLink className="nav-link" to="/">
                        Home
                      </NavLink>
                    </li>

                    <li
                      className="nav-item dropdown"
                      onClick={() => {
                        if (scho.display == "none")
                          setscho({ display: "block" });
                        else setscho({ display: "none" });
                      }}
                    >
                      <NavLink
                        className="nav-link  dropdown-toggle"
                        to="/ViewAllScholarships"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        Scholarships
                      </NavLink>

                      <div
                        className="dropdown-menu  "
                        aria-labelledby="navbarDropdown"
                        style={scho}
                      >
                        {/* <div className="row no-gutters distinct">
                        <div className="col-lg-6"> */}
                        <NavLink
                          to="/ViewAllScholarships"
                          className=" dropdown-item"
                        >
                          National Scholarship
                        </NavLink>

                        <a href="#" className="dropdown-item">
                          Govrnment Scholarship
                        </a>

                        <a href="#" className="dropdown-item">
                          Private Scholarship
                        </a>

                        <a href="#" className="dropdown-item">
                          Compititive Exam <br /> based scolarship
                        </a>

                        <a href="#" className="dropdown-item">
                          Foreign Study <br />
                          based Scholarships
                        </a>

                        <a href="#" className="dropdown-item">
                          Indian Research <br /> Scholarship
                        </a>

                        <a href="#" className="dropdown-item">
                          Foreign Research
                          <br /> Scolarship
                        </a>
                      </div>
                    </li>

                    <li className="nav-item ">
                      <Link className="nav-link  " to="/QnA">
                        Q&A
                      </Link>
                    </li>

                    <li className="nav-item dropdown">
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/About-Scholar"
                      >
                        <a className="nav-link" href="#!">
                          About Us
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item ">
                      <NavLink className="nav-link " to="/contact">
                        Contact
                      </NavLink>
                    </li>
                    {!curruser && !currstudent && (
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                          Developer Login
                        </NavLink>
                      </li>
                    )}
                    {!currstudent && !curruser && (
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/slogin">
                          Non-Developer Login
                        </NavLink>
                      </li>
                    )}
                    {curruser && (
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/form">
                          Data Form
                        </NavLink>
                      </li>
                    )}
                    {curruser && (
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href={dashboardurl}
                          target="__tejas"
                        >
                          Dashboard
                        </a>
                      </li>
                    )}
                    {curruser && (
                      <li className="nav-item">
                        <button
                          onClick={() => {
                            Logout();
                          }}
                        >
                          logout
                        </button>
                      </li>
                    )}
                    {currstudent && (
                      <li className="nav-item">
                        <button
                          onClick={() => {
                            SLogout();
                          }}
                        >
                          logout
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
