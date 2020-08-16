import React, { Component } from "react";
import Hero from "./hero";
import All from "./all";
import MetaTags from "react-meta-tags";
import Footer from '../footer/index';

class Index extends Component {
  componentDidMount = () => {
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
  });
  };

  render() {
    return (
      <div>
        <MetaTags>
          <title> cashback</title>
        </MetaTags>
        <Hero />
        <All />
        <Footer />

      </div>
    );
  }
}

export default Index;
