import { Box, Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import BestSellers from "../components/home/BestSellers";
import CategoryCard from "../components/home/CategoryCard";
import NewArrivals from "../components/home/NewArrivals";
import Background from "../components/images/background.png";
import Footer from "../components/nav/Footer";
import Banner from "./Banner";
const Home = () => {
  const [category, setCategory] = useState();
  return (
    <>
      <Box style={{width: "100%", margin: "auto"}}>
      <Box style={{width: "100%" , margin: "auto", zIndex: 1}}>
        <img style={{width: "100%", height: 700}} src={Background}/>
        <Box style={{position: "absolute", zIndex: 100, marginTop: -550, marginLeft: 400}}>
          <Typography style={{color: "#FFFFFF", fontSize: 50}}>Shopping And Department Store</Typography>
          <Button style={{height: 50, borderRadius: 40, width: 140, color: "#FFFFFF", background: "#0088FF"}} onClick={() => {window.location.href = "/shop"}}>Learn More</Button>
          </Box>
      </Box>
      <div className="jumbotron text-danger h1 font-weight-bold text-center" style={{zIndex: 100}}>
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>
      </Box>

      {/* <div class1="home-wrapper-1 container-xxl py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src={defaultIMG}
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src={defaultIMG}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sake</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src={defaultIMG}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src={defaultIMG}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src={defaultIMG}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <Banner handleCategory={(category) => {setCategory(category)}}/>
      <CategoryCard handleCategory={(category) => {setCategory(category)}} />
      <NewArrivals category={category}/>

      <BestSellers />

      {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList /> */}

      {/* <SubList /> */}

      <Footer/>
    </>
  );
};

export default Home;
