import React, { Component } from "react";
import Layout from "./components/layout";
import NextButton from "./components/nextbutton";
import DeleteButton from "./components/deletebutton";
import Sketch1 from "./components/sketches/sketch1";
import DrawSpace from "./components/sketches/drawspace";
import RenderSpace from "./components/sketches/renderspace";

class App extends Component {
  state = {
    currentMode: "draw",
    canvasSizes: [
      {
        x: document.documentElement.clientWidth * 0.66667,
        y: document.documentElement.clientHeight * 0.97,
      },
    ],
    passClearBinary: 0,
    shapeArray: [],
    stuff_drawn_binary: 0,
  };

  render() {
    return (
      <div className="bg-red-400 h-full">
        <h1 className="bg-green-300">P5 sketch</h1>
        {/* <Sketch1 canvasSizes={this.state.canvasSizes} /> */}
        {/* <Layout> */}
        <DrawSpace
          canvasSizes={this.state.canvasSizes}
          currentMode={this.state.currentMode}
          clearBinary={this.state.passClearBinary}
          finishedClearing={this.handleFinishedClearing}
          onShapeArrayExport={this.handleShapeArrayExport}
        />
        {/* <RenderSpace
          canvasSizes={this.state.canvasSizes}
          stuff_drawn_binary={this.state.stuff_drawn_binary}
          shapeArray={this.state.shapeArray}
        /> */}
        <NextButton onNext={this.handleNextButton} />
        <DeleteButton onDelete={this.handleDeleteButton} />
        {/* </Layout> */}

        <h3>{this.state.currentMode}</h3>
      </div>
    );
  }

  handleNextButton = () => {
    if (this.state.currentMode === "draw") {
      this.setState(({ currentMode }) => ({ currentMode: "vertex" }));
    } else {
      this.setState(({ currentMode }) => ({ currentMode: "checkout" }));
    }
  };
  handleBackButton = () => {
    if (this.state.currentMode === "checkout") {
      this.setState(({ currentMode }) => ({ currentMode: "vertex" }));
    } else if (this.state.currentMode === "vertex") {
      this.setState(({ currentMode }) => ({ currentMode: "draw" }));
    }
  };

  //-----Delete Button psuedo sync-----
  handleDeleteButton = () => {
    this.setState({
      currentMode: "draw",
      passClearBinary: 1,
      stuff_drawn_binary: 1,
    });
  };

  handleFinishedClearing = () => {
    this.setState({ passClearBinary: 0 });
  };

  //----Export shape array from drawspace
  handleShapeArrayExport = (array, stuff_drawn) => {
    const shapeArray = array;
    const stuff_drawn_binary = stuff_drawn;
    this.setState({ shapeArray, stuff_drawn_binary });
    if (stuff_drawn_binary) {
      this.findCenterLine();
    }
  };

  //------Find center line of drawing to pass to render
  findCenterLine = () => {
    const bottom_y = Math.max.apply(
      Math,
      this.state.shapeArray.map(function (o) {
        return o.y;
      })
    );
    const top_y = Math.min.apply(
      Math,
      this.state.shapeArray.map(function (o) {
        return o.y;
      })
    );
    
    const total
    console.log("coord:" + top_y);
  };
}

export default App;
