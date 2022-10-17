import React from "react";
import Nav from "../Nav";
import Footer from "../Footer";

const About = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Nav />

        <div className="container">
          <img className="Aboutpic" src="../img/jesse.png" />
        </div>

        <div className="container3">
          <h1 className="Abouttitle"> The Whisk It Shoppe Story </h1>

          <div className="container">
            <div className="aboutInfo">
              <p>
                Hi! My name is Jessie and I am the owner of The Whisk It Shoppe!
                I am currently the only baker and decorator in the shop, but I
                have family that occasionally comes to help. I’ve previously
                worked at Winthrop University and have a Master’s Degree in
                Social Work. I am also a graphic designer and designed the
                current logo for the bakery.
                <br></br>
                Before purchasing the bakery, I ran a civic engagement
                organization, and before that, a homeless shelter. I enjoyed
                decorating cakes on the side with my partner who baked, but
                never thought about pursuing it as a career option.
                <br></br>
                In 2019, my mom drove past a beloved bakery that had been around
                for more than 25 years. It was shutting down, and after my mom
                told me, I had purchased it by the next morning. Currently, The
                Whisk It Shoppe is the only brick and mortar bakery in Rock
                Hill. I love working with our customers to make their ideas come
                to life and make their events memorable.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
