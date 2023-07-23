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
                <span class="text-warning">Welcome to abcd efg !!</span>
              </h1>
              <p class="lead my-4 ">
                As a Client Here you can upload all kind of project which you
                want to get from our developers.
              </p>
              <p class="lead my-4 ">
                As a Client Here you can upload all kind of project which you
                want to get from our developers.
              </p>
            </div>

            <a href="https://svgshare.com/s/gH0" className="right">
              <img
                class="img-fluid  d-none d-sm-block"
                src="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
                title=""
              />
            </a>
          </div>
        </div>
      </section>
      {/* scholarship details filters */}

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
        <div className="container faq">{/* <ServiceFaqM /> */}</div>
      </section>
      {/* faq ends  */}
      <Footer />
    </>
  );
}

export default Home;
