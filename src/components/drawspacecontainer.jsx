import React, { Component } from "react";

class DrawSpaceContainer extends Component {
  state = {};

  render() {
    return (
      <div className="col-span-2 row-span-3 m-5 ml-10">
        <ul className="flex border-b ">
          <li
            className={
              this.props.currentMode === "draw"
                ? "-mb-px mr-1"
                : "mr-1 border-gray-200 border-l border-r rounded-t"
            }
          >
            <button
              className={
                this.props.currentMode === "draw"
                  ? "bg-white inline-block border-gray-400 border-opacity-100 border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                  : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
              }
              onClick={() => this.props.onDraw()}
            >
              draw
            </button>
          </li>
          <li
            className={
              this.props.currentMode === "vertex"
                ? "-mb-px mr-1"
                : "mr-1 border-gray-200 border-l border-r rounded-t"
            }
          >
            <button
              className={
                this.props.currentMode === "vertex"
                  ? "bg-white inline-block border-gray-400 border-opacity-100 border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                  : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
              }
              onClick={() => this.props.onAdjust()}
            >
              adjust
            </button>
          </li>

          {/* <li className="mr-1 border-gray-200 border-l border-r  rounded-t">
            <a
              className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
              onClick={() => this.props.onColor()}
            >
              color
            </a>
          </li> */}
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default DrawSpaceContainer;
