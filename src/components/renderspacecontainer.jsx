import React, { Component } from "react";

class RenderSpaceContainer extends Component {
  state = {};
  render() {
    return (
      <div className="col-span-2 row-span-2 m-5">{this.props.children}</div>
    );
  }
}

export default RenderSpaceContainer;
