import React from "react";

const NextButton = (props) => {
  return (
    <div className="col-span-1 row-span-1 bg-green-500 mx-auto mb-5 p-20">
      <button onClick={() => props.onNext()}>next</button>
    </div>
  );
};

export default NextButton;
