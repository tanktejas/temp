import React from "react";
import { Link } from "react-router-dom";

import "../main.css";

function AboutUs() {
  return (
    <div style={{ backgroundImage: 'url("pattern-bg.jpg")' }}>
      <div class="parallax about-top-slide" id="parallax">
        <div class="container">
          <div class="row">
            <div class="top-slide-con">
              <div class="col-md-12 text-left">
                <h1 class="section-title">
                  jHksd ksdjksdj skd <br />
                  dfdsjf kdf dkfj dkfj{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container  pb-50">
        <div class="row">
          <div class="col-lg-12 col-md-12 text-left">
            <div class="about-story-con">
              <div class="soln-heading">
                <h2 class="text-left">What does our website do?</h2>
              </div>

              <p>
                L3X 5f U3O zlj MR Dlj 00 6 9mOU5 W6Hi7wDZ 1LM nlRyY 0qUK4 8HTK
                bXGOt7 5 Iz js4 xTe 7pfU y5W5 3grw a8 Pqu RZdN W14Fc HC3g 64 u
              </p>

              <p>
                L3X 5f U3O zlj MR Dlj 00 6 9mOU5 W6Hi7wDZ 1LM nlRyY 0qUK4 8HTK
                bXGOt7 5 Iz js4 xTe 7pfU y5W5 3grw a8 Pqu RZdN W14Fc HC3g 64 u
                <Link style={{ textDecoration: "none" }} to="/">
                  <a class="internal-links" href="#">
                    abcd efg
                  </a>
                </Link>{" "}
                L3X 5f U3O zlj MR Dlj 00 6 9mOU5 W6Hi7wDZ 1LM nlRyY 0qUK4 8HTK
                bXGOt7 5 Iz js4 xTe 7pfU y5W5 3grw a8 Pqu RZdN W14Fc HC3g 64 u
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="parallax solution-main pricing-main"
        id="parallax"
        data-color="#ffffff"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-7 col-md-7">
              <div class="text-left food-top-content">
                <div class="pc-homeimg-main hom-hero become2 food-new-img mobile-about-img">
                  <img
                    class=""
                    loading="lazyload"
                    data-src="img/What-is-a-Digital-Marketing-Strategy.png"
                    src="img/What-is-a-Digital-Marketing-Strategy.png"
                    alt="Food Delivery App Development"
                    title="Food Delivery App Development"
                    width="451"
                    height="500"
                  />
                </div>
                <h1 class="section-title mb-30 aos-init aos-animate">
                  Who We Are ?
                </h1>
                <p>
                L3X 5f U3O zlj MR Dlj 00 6 9mOU5 W6Hi7wDZ 1LM nlRyY 0qUK4 8HTK
                bXGOt7 5 Iz js4 xTe 7pfU y5W5 3grw a8 Pqu RZdN W14Fc HC3g 64 u
                </p>

                {/* <Link style={{ textDecoration: "none" }} to="/Team">
                  <a class=" button2 get-a-demo" href="#">
                    Meet Our Team
                  </a>
                </Link> */}
              </div>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5 food-top-img food-top-img-n desktop-about-img">
              <div class="become2">
                <img
                  class=""
                  loading="lazyload"
                  data-src="img/What-is-a-Digital-Marketing-Strategy.png"
                  src="img/What-is-a-Digital-Marketing-Strategy.png"
                  alt="Medicine Delivery App Development"
                  title="Medicine Delivery App Development"
                  width="451"
                  height="500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

       
    </div>
  );
}

export default AboutUs;
