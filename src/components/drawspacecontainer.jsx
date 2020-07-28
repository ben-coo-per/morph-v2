import React, { Component } from "react";

class DrawSpaceContainer extends Component {
  state = {};
  render() {
    return (
      <div className="col-span-2 row-span-3 m-5 bg-blue-500">
        <ul class="flex border-b ">
          <li class="-mb-px mr-1">
            <a
              class="bg-white inline-block border-gray-400 border-opacity-100 border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
              href="#"
            >
              draw
            </a>
          </li>
          <li class="mr-1 border-gray-200 border-l border-r  rounded-t">
            <a
              class="bg-white inline-block  py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
              href="#"
            >
              adjust
            </a>
          </li>
          <li class="mr-1 border-gray-200 border-l border-r  rounded-t">
            <a
              class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
              href="#"
            >
              color
            </a>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default DrawSpaceContainer;
