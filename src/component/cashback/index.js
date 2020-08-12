import React, { Component } from "react";
import Hero from "./hero";
import All from "./all";
import MetaTags from "react-meta-tags";

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
      </div>
    );
  }
}

export default Index;
