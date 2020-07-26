import React from "react";

const Layout = (props) => {
  return (
    <div className="h-screen w-screen grid grid-cols-4 grid-rows-flow">
      {props.children}
    </div>
  );
};

export default Layout;
