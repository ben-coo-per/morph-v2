import React from "react";

const DeleteButton = (props) => {
  return (
    <div className="col-span-1 row-span-1 mx-auto mb-5 p-6">
      <button
        className="bg-red-400 h-10 w-full text-xl rounded-full"
        onClick={() => props.onDelete()}
      >
        start over
      </button>
    </div>
  );
};

export default DeleteButton;
