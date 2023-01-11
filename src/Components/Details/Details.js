import React, { useState, useEffect, useContext } from "react";
import "./det.css";
import "../main.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PublicIcon from "@mui/icons-material/Public";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Footer from "../footer/footer1";
import Card from "../Card/card";
import RoomIcon from "@material-ui/icons/Room";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";

import { db } from "../../Loginsignincontext/firebase";
import { Link } from "react-router-dom";
import { color } from "@mui/system";
import { logcontstu } from "../../Loginsignincontext/context";

function Details({ data }) {
  const [scholar, setscho] = useState([]);
  const { student } = useContext(logcontstu);
  const [projectposter_email, setmail] = useState("");

  useEffect(() => {
    const q = query(collection(db, "all-project"));
    onSnapshot(q, (qS) => {
      let data = qS.docs;
      setscho(data.slice(0, 2));
    });

    const q1 = query(collection(db, "all_people"));
    onSnapshot(q1, (qS) => {
      qS.docs.map((item) => {
        if (item.data().Name == data.posted_by) {
          setmail(item.data().Email);
        }
      });
    });
  }, []);

  if (
    scholar.length == 0 ||
    scholar == [] ||
    data == [] ||
    projectposter_email == ""
  ) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <div>
      <div class=" ccc">
        <div class="  uniqq">
          <div class="siz25 itemm ">
            <AccessTimeIcon />
            <div class="fleep">
              <h4>Last Updated..</h4>
              <h6> 25 min ago.</h6>
            </div>
          </div>

          <div class="siz25 itemm">
            <CalendarMonthIcon />
            <div class="fleep">
              <h4>Posted On :</h4>
              <h6>{data.Date}</h6>
            </div>
          </div>
        </div>
      </div>

      <div class="common">
        <div
          id="scholarships"
          class="brandScholarshipDetails_box__16Tsq brandScholarshipDetails_paddingB__1zmIh undefined row"
        >
          <article
            id="applybtn"
            class=" brandScholarshipDetails_scholarships__Q4gdU"
          >
            <ul>
              <li>
                <h5>{data.Name}</h5>
                <article class="brandScholarshipDetails_content__1uj_y">
                  <article class="brandScholarshipDetails_contentBoxWrapper___GQGi">
                    <span class="brandScholarshipDetails_calendarIcon__2-5hX">
                      <CalendarMonthIcon />
                      {/* <p>Posted On : {new Date(data?.Date)}</p> */}
                    </span>
                    <article class="brandScholarshipDetails_sectionBox__yP4qi brandScholarshipDetails_firstElem__2pjgC">
                      <span class="brandScholarshipDetails_sectionTitle__2t6sl  sec-t">
                        Description
                      </span>
                      <div>
                        <ul>
                          {data.Description.map((item) => {
                            return (
                              <>
                                <div class="merge">
                                  <ChevronRightIcon />
                                  <li>{item}</li>
                                </div>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </article>
                    <article class="brandScholarshipDetails_sectionBox__yP4qi">
                      <span class="brandScholarshipDetails_sectionTitle__2t6sl sec-t">
                        Tech-Stack :
                      </span>
                      <div>
                        <ul>
                          {data.TechStack.map((item) => {
                            return (
                              <>
                                <div class="merge">
                                  <ChevronRightIcon />
                                  <li>{item}</li>
                                </div>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </article>

                    <article class="brandScholarshipDetails_sectionBox__yP4qi">
                      <span class="brandScholarshipDetails_sectionTitle__2t6sl sec-t">
                        By clicking this button you can chat with customer or
                        pick that project.
                      </span>
                    </article>
                    <article class="centerItem ">
                      <a href={data.link}>
                        <button class="button2 get-a-demo m-2">
                          Pick Project
                        </button>
                      </a>
                      <Link
                        class="button2 get-a-demo m-2"
                        to={"/chat/" + projectposter_email}
                      >
                        Chat with Owner
                      </Link>
                    </article>
                  </article>
                </article>
              </li>
            </ul>
          </article>
        </div>

        <section class=" featuredScholarshipsDefault_featuredScholarshipsDefault__25PDG">
          <h4>Featured Scholarships</h4>
          <div class="cardd brandScholarshipDetails_content__1uj_y">
            {/* //scholarship card  */}
            <div className="op">
              {scholar.map((ele) => {
                return (
                  <Card
                    Name={ele.data().Name}
                    Description={ele.data().Description}
                    Imageurl={ele.data().Imageurl}
                    Date={ele.data().Date}
                    TechStack={ele.data().TechStack}
                    id={ele.id}
                  />
                );
              })}
            </div>
            <Link className="ioo" to="/ViewAllScholarships">
              see more..
            </Link>
          </div>
        </section>
      </div>

      <div class="scholarshipDetails_box__3aJoB scholarshipDetails_paddingB__HPwi8 ">
        <span class="brandScholarshipDetails_sectionTitle__2t6sl sec-t">
          Terms and Conditions
        </span>
        <div class="scholarshipDetails_content__15zTZ">
          <ul>
            <div class="merge">
              <ChevronRightIcon />
              <li>Only shortlisted candidates will be contacted.</li>
            </div>
            <div class="merge">
              <ChevronRightIcon />
              <li>Canvassing in any form will be a disqualification.</li>
            </div>
            <div class="merge">
              <ChevronRightIcon />
              <li>No correspondence will be entertained in this regard.</li>
            </div>
            <div class="merge">
              <ChevronRightIcon />
              <li>
                The Institute reserves the right not to select anyone without
                assigning any reason.
              </li>
            </div>
            <div class="merge">
              <ChevronRightIcon />
              <li>
                The Institute reserves the right to change/apply appropriate
                shortlisting criteria in case of a large number of applications.
              </li>
            </div>
            <div class="merge">
              <ChevronRightIcon />
              <li>
                An incomplete application without proper supporting documents
                will be summarily rejected.
              </li>
            </div>
            <div class="merge">
              <ChevronRightIcon />
              <li>
                This is purely a contractual appointment for a maximum period of
                two years with an annual renewal based on the performance
                review.
              </li>
            </div>
            <div class="merge">
              <ChevronRightIcon />
              <li>
                Mere fulfilling of the qualifications and experience will not
                confer any right to the candidates for being called for the
                selection process.
              </li>
            </div>
          </ul>
        </div>
      </div>

      <div
        class="scholarshipDetails_grayBg__ee9_t roww"
        style={{ background: "rgb(142 140 140 / 20%)" }}
      >
        <div class="container">
          <div class="scholarshipDetails_box__3aJoBbb row">
            <h5>Disclaimer</h5>
            <article class="scholarshipDetails_content__15zTZ">
              <p>
                All the information provided here is for reference purpose only.
                While we strive to list all scholarships for benefit of
                students, Buddy4Study does not guarantee the accuracy of the
                data published here. For official information, please refer to
                the official website. <a href="/disclaimer">read more</a>
              </p>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;
