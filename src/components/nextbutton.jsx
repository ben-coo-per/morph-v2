import React from "react";

const NextButton = (props) => {
  return (
    <div className="col-span-1 row-span-1 mx-auto mb-5 p-6">
      <button className="bg-green-500 h-10 w-32" onClick={() => props.onNext()}>
        next
      </button>
    </div>
  );
};

export default NextButton;
