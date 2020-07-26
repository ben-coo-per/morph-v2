import React from "react";

const DeleteButton = (props) => {
  return <button onClick={() => props.onDelete()}>delete</button>;
};

export default DeleteButton;
