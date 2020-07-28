import React from "react";

const DeleteButton = (props) => {
  return (
    <div className="col-span-1 row-span-1 bg-green-300 mx-auto mb-5 p-20">
      <button onClick={() => props.onDelete()}>delete</button>
    </div>
  );
};

export default DeleteButton;
