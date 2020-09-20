import React from "react";
import Navbar from "./navbar";

const Layout = (props) => {
  return (
    <div className="">
      <Navbar />
      <div className="h-screen w-screen grid grid-cols-4 grid-rows-3">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
