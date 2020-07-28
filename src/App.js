import React, { Component } from "react";
import Layout from "./components/layout";
import NextButton from "./components/nextbutton";
import DeleteButton from "./components/deletebutton";
import Sketch1 from "./components/sketches/sketch1";
import DrawSpace from "./components/sketches/drawspace";
import RenderSpace from "./components/sketches/renderspace";
import DrawSpaceContainer from "./components/drawspacecontainer";
import RenderSpaceContainer from "./components/renderspacecontainer";

class App extends Component {
  state = {
    currentMode: "draw",
    canvasSizes: [
      {
        x: document.documentElement.clientWidth * 0.47,
        y: document.documentElement.clientHeight * 0.7,
      },
    ],
    passClearBinary: 0,
    shapeArray: [],
    stuff_drawn_binary: 0,
    bottomAvg: { x: 0, y: 0 },
    topAvg: { x: 0, y: 0 },
    renderSide: 0, // 0 = render left side || 1 = render right side
    renderArrayA: [],
    renderArrayB: [],
  };

  render() {
    return (
      <div className="bg-yellow-600 h-full">
        <Layout>
          <DrawSpaceContainer>
            <DrawSpace
              canvasSizes={this.state.canvasSizes}
              currentMode={this.state.currentMode}
              clearBinary={this.state.passClearBinary}
              topAvg={this.state.topAvg}
              bottomAvg={this.state.bottomAvg}
              finishedClearing={this.handleFinishedClearing}
              onShapeArrayExport={this.handleShapeArrayExport}
            />
          </DrawSpaceContainer>
          <RenderSpaceContainer>
            <RenderSpace
              topAvg={this.state.topAvg}
              bottomAvg={this.state.bottomAvg}
              canvasSizes={this.state.canvasSizes}
              stuff_drawn_binary={this.state.stuff_drawn_binary}
              renderArrayA={this.state.renderArrayA}
              renderArrayB={this.state.renderArrayB}
            />
          </RenderSpaceContainer>

          <NextButton onNext={this.handleNextButton} />
          <DeleteButton onDelete={this.handleDeleteButton} />
        </Layout>

        {/* <h3>{this.state.currentMode}</h3> */}
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
      this.createRenderArray();
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

    const inTopPerc = (array) =>
      array.y < Math.round(top_y + (bottom_y - top_y) * 0.3, 0);

    const inBottomPerc = (array) =>
      array.y < Math.round(bottom_y - (bottom_y - top_y) * 0.3, 0);

    function findAvg(array, TorB) {
      if (TorB) {
        const arr = array.filter(
          (arr) => arr.y < Math.round(top_y + (bottom_y - top_y) * 0.3, 0)
        )[0]
          ? array.filter(
              (arr) => arr.y < Math.round(top_y + (bottom_y - top_y) * 0.3, 0)
            )
          : [{ x: 0, y: 0 }];
      } else {
        const arr = array.filter(
          (arr) => arr.y < Math.round(bottom_y - (bottom_y - top_y) * 0.3, 0)
        )[0]
          ? array.filter(
              (arr) =>
                arr.y < Math.round(bottom_y - (bottom_y - top_y) * 0.3, 0)
            )
          : [{ x: 0, y: 0 }];
      }

      const left = array.reduce(
        (min, p) => (p.x < min ? p.x : min),
        array[0].x
      );
      const right = array.reduce(
        (max, p) => (p.x > max ? p.x : max),
        array[0].x
      );

      return (left + right) / 2;
    }

    const topAvg = {
      x: findAvg(this.state.shapeArray, 1),
      y: top_y,
    };
    const bottomAvg = {
      x: findAvg(this.state.shapeArray, 0),
      y: bottom_y,
    };
    this.setState({ topAvg, bottomAvg });
  };

  createRenderArray = () => {
    const renderArrayA = [];
    const renderArrayB = [];
    const m = () =>
      (this.state.bottomAvg.y - this.state.topAvg.y) /
      (this.state.bottomAvg.x - this.state.topAvg.x);

    const lineVal = (yVal) =>
      (yVal - this.state.bottomAvg.y) / m() + this.state.bottomAvg.x;

    const keepValA = (arr) => arr.x < lineVal(arr.y);
    const keepValB = (arr) => arr.x > lineVal(arr.y);
    const keepArrayA = this.state.shapeArray.filter(keepValA);
    const keepArrayB = this.state.shapeArray.filter(keepValB);

    for (let i = 0; i < keepArrayA.length; i++) {
      const vert = {
        rho: Math.abs(lineVal(keepArrayA[i].y) - keepArrayA[i].x),
        y: keepArrayA[i].y,
      };
      renderArrayA.push(vert);
    }

    for (let i = 0; i < keepArrayB.length; i++) {
      const vert = {
        rho: Math.abs(lineVal(keepArrayB[i].y) - keepArrayB[i].x),
        y: keepArrayB[i].y,
      };
      renderArrayB.push(vert);
    }

    // console.log("OG: " + this.state.shapeArray.length);
    // console.log("filtered: " + filteredArray.length);
    this.setState({ renderArrayA, renderArrayB });
  };
}

export default App;
