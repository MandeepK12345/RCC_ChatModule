import React from "react";
import "./index.css";

function Header({heading}) {
  return (
    <header>
      <h1>{heading}</h1>
    </header>
  );
}

export default Header;