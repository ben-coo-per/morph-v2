import React from "react";

const NextButton = (props) => {
  return <button onClick={() => props.onNext()}>next</button>;
};

export default NextButton;
