import React, { useEffect, useState, useContext } from "react";
import Footer from "../footer/footer1";
import "./dataform.css";
import { db } from "../DB/firebase";


import { collection, getFirestore, addDoc } from "firebase/firestore";
import { orderBy, onSnapshot, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";

import { query } from "firebase/firestore";
import { logcont } from "../logincontext/authcontext"; 
import { setDoc } from "firebase/firestore";

function Dataform() {
  const par = useParams();
  const adminid = par.adminid;

  const { user, logout } = useContext(logcont);

  const [userall, setuserall] = useState([]); //for all user
  const [stat, setsta] = useState(false); // for status
  const [curruser, setcurr] = useState([]); // curr user

  // console.log(user.e);

  useEffect(() => {
    setsta(true);
    const query1 = query(collection(db, "users"));
    onSnapshot(query1, (qS) => {
      console.log(qS.docs[0].data());
      qS.docs.map((item) => {
        // alert(JSON.stringify(item.data().email));
        if (item.data().email == user.email) {
          setcurr(item);
          setsta(false);
        }
      });
    });
  }, []);

  const [email, setEmail] = useState("");
  const [orgname, setOrgname] = useState("");
  const [user1, setUser] = useState("");
  const [schoname, setSchoname] = useState("");
  const [about, setAbout] = useState("");
  const [mob, setMob] = useState("");
  const [address, setAddress] = useState("");
  const [eli, setEli] = useState("");
  const [bene, setBene] = useState("");
  const [spbf, setSpbf] = useState("");
  const [proce, setProce] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [document, setdoc] = useState("");
  const [cat, setcat] = useState("All");
  const [link, setlink] = useState("");

  const submit = () => {
    let benefit = bene.split(".");
    let docc = document.split(".");
    let eloign = eli.split(".");
    let process1 = proce.split(".");

    let namespace = curruser.data().namespace;
    let key = curruser.data().key;

    const scholarship = {
      name: schoname,
      about: about,
      benefit: benefit,
      category: cat.toLowerCase(),
      closeingDate: date.toString(),
      document: docc,
      eligiblity: eloign,
      isHandi: false,
      isMilitry: false,
      link: link,
      logo: "logo",
      process: process1,
      region: "India",
      state: "All",
      tag: orgname,
      namespace: namespace,
      key: key,
      status: "active",
    };

    let obj = curruser.data();

    const ff = new Date();

    const needtoadd = {
      date: ff,
      name: schoname,
      status: "active",
    };

    obj.sc_posted.push(needtoadd);

    setDoc(doc(db, "users", curruser.id), obj);

    addDoc(collection(db, "Scholarships"), scholarship)
      .then((result) => {
        alert("scholarship added");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (stat) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div class="container bg-purple m-auto my-4">
        <div className="row">
          <div className="col-md-12 text-center ">
            <div className="yel">
              <h2>Short &amp; Sweet</h2>
            </div>
            <div className="subb">
              <p>
                After Receiving your data form response we will shortly
                connected through Contact provided by you so make sure you
                entered correct contact details.
              </p>
              <p>
                We would like to hear more on your Program to understand
                complety and our legal advisor team give us indication then we
                will go ahead as to provide 100% correct data to our user.
              </p>
              <p>Hope You understand @Scholar privacy@policy.</p>
            </div>{" "}
          </div>
        </div>
      </div>

      <div class="memberformcontainer">
        <div class="form">
          <h1 id="form-title">Data-Form For Organization</h1>
          <h3 class="form-below">
            Fields marked with an <span class="redd">*</span> are required
          </h3>
          <form>
            <div class="box">
              <label for="Oname" class="form-below labell">
                Organization Name <span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                value={orgname}
                onChange={(e) => setOrgname(e.target.value)}
                name="Oname"
                class="form-input"
                placeholder="Enter Your Organization Name"
                required
              />
            </div>

            <div class="box">
              <label for="Oname" class="form-below labell">
                Link of Scholarship <span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                value={link}
                onChange={(e) => setlink(e.target.value)}
                name="Oname"
                class="form-input"
                placeholder="Enter Your Organization Website Link."
                required
              />
            </div>

            <div class="box">
              <label for="lname" class="form-below labell">
                Your Name <span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                value={user1}
                onChange={(e) => setUser(e.target.value)}
                name="lname"
                class="form-input"
                placeholder="Enter Your Data provider Name"
                required
              />
            </div>

            <div class="box">
              <label for="State" class="form-below labell">
                Head office Location <span class="redd">*</span>{" "}
              </label>
              <br />
              <select name="State" id="State" class="form-input" required>
                <option value="Select State">Select State</option>
                <option value="Ahmedabad">Gujarat</option>
                <option value="Anand">Mumbai</option>
                <option value="Gandhinagar">Rajsthan</option>
                <option value="Surat">MadhyaPradesh</option>
                <option value="Bharuch">Delhi</option>
                <option value="vadodara">Kolkata</option>
                <option value="Valsad">Ahmedabad</option>
                <option value="Rajkot">Banglore</option>
                <option value="Rajkot">Surat</option>
                <option value="Rajkot">UttarPradesh</option>
                <option value="Rajkot">Pune</option>
                <option value="Rajkot">Noida</option>
              </select>
            </div>

            <div class="box">
              <label for="con-email" class="form-below labell">
                Confirm Email <span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                name="con-email"
                class="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Confirm Your Organization Email ID"
                required
              />
            </div>

            <div class="box">
              <label for="sname" class="form-below labell">
                Your Scholarship/Program Name <span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                value={schoname}
                onChange={(e) => setSchoname(e.target.value)}
                name="sname"
                class="form-input"
                placeholder="Enter Your Scholarship/Program Name"
                required
              />
            </div>

            <div class="box">
              <label for="abt" class="form-below labell">
                About Your Scholarship <span class="redd">*</span>
              </label>
              <br />
              <textarea
                name="abt"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                id="f-textarea"
                cols="30"
                rows="10"
                required
              ></textarea>
            </div>

            <div class="box">
              <label for="bef" class="form-below labell">
                Is your scholarship program is directly beneficial to anyone?{" "}
                <span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                value={spbf}
                onChange={(e) => setSpbf(e.target.value)}
                name="bef"
                class="form-input"
                placeholder="Like For Ex-militiry's Childern / To Handicept etc"
                required
              />
            </div>

            <div class="box">
              <label for="eli" class="form-below labell">
                Your Scholarship/Program Eligibility <span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                value={eli}
                onChange={(e) => setEli(e.target.value)}
                name="eli"
                class="form-input"
                placeholder="Enter Your Scholarship/Program Eligibility"
                required
              />
            </div>

            <div class="box">
              <label for="bene" class="form-below labell">
                Your Scholarship/Program Benefits <span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                value={bene}
                onChange={(e) => setBene(e.target.value)}
                name="bene"
                class="form-input"
                placeholder="Enter Your Scholarship/Program Benefits"
                required
              />
            </div>

            <div class="box">
              <label for="proc" class="form-below labell">
                Processor of Your Program <span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                value={proce}
                onChange={(e) => setProce(e.target.value)}
                name="proc"
                class="form-input"
                placeholder="Expaline how to apply for your program?"
                required
              />
            </div>

            <div class="box">
              <label for="proc" class="form-below labell">
                Document for Scholarship <span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                value={document}
                onChange={(e) => setdoc(e.target.value)}
                name="proc"
                class="form-input"
                placeholder="List Out All document."
                required
              />
            </div>

            <div class="box">
              <label for="joiningDate" class="form-below labell">
                Deadline Of Your Scholarship <span class="redd">*</span>
              </label>
              <br />
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                name="date"
                class="form-input"
                required
              />
            </div>

            <div class="box">
              <label for="mobileno" class="form-below labell">
                Enter Your Mobile number <span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                value={mob}
                onChange={(e) => setMob(e.target.value)}
                name="mobileno"
                class="form-input"
                placeholder="Enter Your mobile number"
                required
              />
            </div>

            <div class="box">
              <label for="skill" class="form-below labell">
                Do you had use this platform before for providing scholarship?{" "}
                <span class="redd">*</span>
              </label>
              <br />
              <input type="radio" value="yes" name="skills" class="f-radio" />
              <label for="yes" class="form-below labell" id="con">
                YES
              </label>
              <br />
              <input type="radio" value="no" name="skills" class="f-radio" />
              <label for="yes" class="form-below labell" id="con">
                NO
              </label>
            </div>

            <div class="box">
              <label for="address" class="form-below labell">
                Enter Your Organization Address<span class="redd">*</span>
              </label>
              <br />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name="address"
                class="form-input"
                placeholder="Enter Your Organization Address"
                required
              />
            </div>

            <div class="box">
              <label for="time" class="form-below labell">
                {" "}
                For which category student you would like to provide
                scholarships ? <span class="redd">*</span>{" "}
              </label>
              <br />
              <select
                name="time"
                id="stime"
                class="form-input"
                value={cat}
                onChange={(e) => {
                  setcat(e.target.value);
                }}
                required
              >
                <option value="Select time">Select category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="ALL">ALL</option>
                <option value="ST">SC</option>
                <option value="SC">SC</option>
              </select>
            </div>

            <div class="box">
              <label for="comment" class="form-below labell">
                Do you have any comments or questions?{" "}
                <span class="redd">*</span>
              </label>
              <br />
              <textarea
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id="f-textarea"
                cols="30"
                rows="10"
                required
              ></textarea>
            </div>

            <div class="box">
              <input
                value="Submit"
                type="Button"
                class="  button2 ml-3"
                onClick={() => {
                  submit();
                }}
              />
            </div>
          </form>
          <h3 class="form-below">
            {" "}
            <span class="redd">
              {" "}
              Please correct errors before submitting this form.
            </span>
          </h3>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dataform;
