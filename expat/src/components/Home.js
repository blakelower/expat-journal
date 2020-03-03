import React from "react";
import "./styles/tachyons.css";
import { Link } from "react-router-dom";
import Thailand from "./styles/Phuket-Thailand.jpg";

function Home() {
  return (
    <header className="sans-serif">
      <div
        className="cover bg-left bg-center-l"
        style={{ backgroundImage: `url(${Thailand})` }}
      >
        <div className="bg-black-80 pb5 pb6-m pb7-l">
          {/* <nav className="dt w-100 mw8 center">
            <div className="dtc w2 v-mid pa3">
            </div>
            <div className="dtc v-mid tr pa3">
              <Link
                className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3"
                to="/works"
              >
                How it Works
              </Link>
              <Link
                className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3"
                to="/pricing"
              >
                Pricing
              </Link>
              <Link
                className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3"
                to="/about"
              >
                About
              </Link>
              <Link
                to="/login"
                className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba"
              >
                Register
              </Link>
            </div>
          </nav> */}
          <div className="tc-l mt4 mt5-m mt6-l ph3">
            <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">EXPAT JOURNAL</h1>
            <h2 className="fw1 f3 white-80 mt3 mb4">
              CREATE AN ACCOUNT AND WATCH THE LIVES OF OTHERS
            </h2>
          </div>
        </div>
      </div>
      <div className="tc ph4">
        <h1 class="f3 f2-m f1-l fw2 black-90 mv3">
          Interested in Renting Today?
        </h1>
        <h2 class="f5 f4-m f3-l fw2 black-50 mt0 lh-copy">
          See if there is anything you are interested in
        </h2>
      </div>
      <div className="set">
      </div>
    </header>
  );
}
export default Home;
