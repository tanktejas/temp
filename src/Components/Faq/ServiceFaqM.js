import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";
// import "./main.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./plugins.min.css";
import Accordion from "react-bootstrap/Accordion";

function ServiceFaqM() {
  return (
    <>
      <div class="wrapper faq-wrapper pt-10">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2 class="section-title mb-40">
                <span class="text-marked">Frequently Asked</span> Questions_
              </h2>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <Accordion defaultActiveKey={["0"]} alwaysOpen flush>
                <Accordion.Item eventKey="19">
                  <Accordion.Header>
                    How can i submit my project idea to get build from best
                    developers?
                  </Accordion.Header>
                  <Accordion.Body>
                    <div class="panel-body">
                      <p>You can follow following steps:</p>
                      <p>- go to your profile dashboard.</p>{" "}
                      <p>
                        - After that click on upload project and fill require
                        details.
                      </p>
                      <p>- At the end click on submit button.</p>{" "}
                      <p>- And it is done your project is uploaded.</p>
                    </div>
                    {/* <!-- <div class="bg-soft-green rounded-lg border px-4 py-3 mt-20">You’ll be sent a confirmation email to verify you so make sure you check your email.</div> --> */}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    How to pick project as a developer ??
                  </Accordion.Header>
                  <Accordion.Body>
                    <div class="panel-body">
                      <p>
                        - First of all Look at the project section in website.
                      </p>
                      <p>- Find the project which you want to build.</p>
                      <p>
                        - click on "chat with owner" to discuss details of
                        project and he/she will give you project to construct.
                      </p>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    How to be a best in freelancing?
                  </Accordion.Header>
                  <Accordion.Body>
                    <div class="panel-body">
                      <p>
                        Complete as much as project you can and at the end you
                        will have good grip over all tech-stack and have a
                        strong profile.
                      </p>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                {/* <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    What are the steps after deciding Scholarships for me?
                  </Accordion.Header>
                  <Accordion.Body>
                    <div class="panel-body">
                      <p>
                        Hey, After deciding the best suitable scholarship for
                        you now just need to follow steps given in respective
                        scholarships on scholars portal.
                      </p>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    Can I apply for more than one scholarships?
                  </Accordion.Header>
                  <Accordion.Body>
                    <div class="panel-body">
                      <p>
                        Actually, there are some barrier to student who are
                        taking govrnment scholarships that you should take only
                        any one govrnment scheme benefits. The moto behind it of
                        govrnment to provides as much as possible student to
                        benefits in their study.
                      </p>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    will i able to changed incorrect details in my scholarships?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes. Before you click final submit you can change
                    corresponding details yourself but after final submit you
                    need to mail the support team of respective scholarships,
                    the mail id of every scholarships support team is provided
                    at{" "}
                    <a class="internal-links" href="#">
                      Scholars
                    </a>{" "}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                  <Accordion.Header>
                    What if i have query regarding any scholarships that i am
                    going to apply using scholars platform ?
                  </Accordion.Header>
                  <Accordion.Body>
                    We have chat bot feautre through which you can solve your
                    query yourself and after that you have query you can use
                    discussion form or contact us.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                  <Accordion.Header>
                    As organization i want to give scholarships to the best
                    candidate who are suitable for that. How can i do it?
                  </Accordion.Header>
                  <Accordion.Body>
                    <div class="panel-body">
                      <p>
                        There are few factors that determine the Way to do it.
                      </p>
                      <p>
                        - Goto admin portal and request for key to access the
                        admin feauter.
                      </p>
                      <p>
                        - After getting key, now you just need to sign-in and
                        provide all nssary information about your scheme.
                      </p>
                      <p>
                        - We will review and give you confirmation about it
                        ASAP;
                      </p>{" "}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                  <Accordion.Header>
                    What things we can do it as admin?
                  </Accordion.Header>
                  <Accordion.Body>
                    <div class="panel-body">
                      <p>
                        You can add scholarships, edit scholarships requirement,
                        extend deadlines, promote us after successs of your
                        program etc.
                      </p>
                    </div>
                  </Accordion.Body>
                </Accordion.Item> */}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceFaqM;
