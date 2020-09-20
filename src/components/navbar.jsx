import React from "react";

const DeleteButton = (props) => {
  return (
    <div className="flex mb-4 py-2 border-t-4 border-orange-500 h-16">
      <img
        src="/img/logo.png"
        alt="morph"
        className="object-scale-down w-1/4"
      />

      {/* <li>
        <a className="w-1/4">studio</a>
      </li>
      <li>
        <a>home</a>
      </li> */}
    </div>
  );
};

export default DeleteButton;
