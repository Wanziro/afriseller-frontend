import React from "react";
import Footer from "../footer";
import Companies from "./companies";
import Welcome from "./welcome";

function Home() {
  return (
    <div>
      <Welcome />
      <Companies />
      <Footer />
    </div>
  );
}

export default Home;
