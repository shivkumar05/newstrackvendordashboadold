import React, { useState } from "react";
import "../CSS/ViewNews.scss";
import Navbar from "./Navbar";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";


const TemplateSelection = () => {
  const navigate = useNavigate();

  //   const item = newsData?.state.item;
  // console.log(item);

  const [style, setStyle] = useState("main-menu");

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === 'main-menu') {
        setStyle('main-menu-1')
      } else setStyle('main-menu')
    });
  };

  return (
    <>
      <nav className={style}>
        <Navbar />
      </nav>
      <div className="parentContainer">
        <h1 className="bg-red">
          <div className="dashwithfav">
            <span style={{fontFamily:'Rooboto'}} onClick={() => navigate(-1)} className="pointer rightShift">
              <HiOutlineArrowSmallLeft className="rightShift" />

              Template Selection</span>
            <div className="onclick" onClick={changeStyle}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
        </h1>
        <h5 className="px-3" style={{fontFamily:'Rooboto'}}>
          To use any of the available Template in your website , just simply
          update the record in your domain DNS configuration with the url
          provided in the Template below.
        </h5>
        <div className="container">
          <div className="row">
            <div className="d-flex px-3 col">
              <div className="card " style={{ width: "27.5rem" }}>
                <img
                  className="card-img-top"
                  src={require("../Images/template_website_1.png")}
                  alt="Card image cap"
                  width={"100%"}
                  height={"200px"}
                />
                <div className="card-body">
                  <h5  style={{fontFamily:'Rooboto'}}className="card-title d-flex justify-content-center font-weight-bold">
                    Template 1
                  </h5>
                  <a className="card-text d-flex justify-content-center">
                    {`http://174.138.101.222:7000/${localStorage.getItem(
                      "newspaperAgencyAdminId"
                    )}`}
                  </a>
                </div>
              </div>
            </div>
            <div className="d-flex px-3 col">
              <div className="card " style={{ width: "27.5rem" }}>
                <img
                  className="card-img-top"
                  src={require("../Images/template_website_2.PNG")}
                  alt="Card image cap"
                  width={"100%"}
                  height={"200px"}
                />
                <div className="card-body">
                  <h5 style={{fontFamily:'Rooboto'}} className="card-title d-flex justify-content-center font-weight-bold">
                    Template 2
                  </h5>
                  <a className="card-text d-flex justify-content-center">
                    {`http://174.138.101.222:1000/${localStorage.getItem(
                      "newspaperAgencyAdminId"
                    )}`}
                  </a>
                </div>
              </div>
            </div>
          </div>


          <div className="pb-3 row"  >
            <div className="d-flex px-3 col">
              <div className="card " style={{ width: "27.5rem" }}>
                <img
                  className="card-img-top"
                  src={require("../Images/template_website_3.png")}
                  alt="Card image cap"
                  width={"100%"}
                  height={"200px"}
                />
                <div className="card-body">
                  <h5 style={{fontFamily:'Rooboto'}} className="card-title d-flex justify-content-center font-weight-bold">
                    Template 3
                  </h5>
                  <a className="card-text d-flex justify-content-center">
                    {`http://174.138.101.222:2000/${localStorage.getItem(
                      "newspaperAgencyAdminId"
                    )}`}
                  </a>
                </div>
              </div>
            </div>
            <div className="d-flex px-3 col">
              <div className="card " style={{ width: "27.5rem" }}>
                <img
                  className="card-img-top"
                  src={require("../Images/template_website_4.PNG")}
                  alt="Card image cap"
                  width={"100%"}
                  height={"200px"}
                />
                <div className="card-body">
                  <h5  style={{fontFamily:'Rooboto'}}className="card-title d-flex justify-content-center font-weight-bold">
                    Template 4
                  </h5>
                  <a className="card-text d-flex justify-content-center ">
                    {`http://174.138.101.222:8000/${localStorage.getItem(
                      "newspaperAgencyAdminId"
                    )}`}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-3 row">
            <div className="d-flex px-3 col">
              <div className="card " style={{ width: "27.5rem" }}>
                <img
                  className="card-img-top"
                  src={require("../Images/template_website_5.png")}
                  alt="Card image cap"
                  width={"100%"}
                  height={"200px"}
                />
                <div className="card-body">
                  <h5 style={{fontFamily:'Rooboto'}} className="card-title d-flex justify-content-center font-weight-bold">
                    Template 5
                  </h5>
                  <a className="card-text d-flex justify-content-center">
                    {`http://174.138.101.222:9000/${localStorage.getItem(
                      "newspaperAgencyAdminId"
                    )}`}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateSelection;
