import React, { Component } from "react";
import p5 from "p5";

class RenderSpace extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    p.rotationTracker = 0;
    p.res = 30;
    p.rotationAmount = 360;
    p.drawspaceSizes = this.props.canvasSizes[0];
    p.vertexArrayA = [];

    p.setup = (array) => {
      p.threeDCanvas = p.createCanvas(
        this.props.canvasSizes[0].x,
        this.props.canvasSizes[0].y * 0.9,
        p.WEBGL
      );
    };

    p.draw = () => {
      p.shapeArrayA = this.props.renderArrayA;
      p.shapeArrayB = this.props.renderArrayB;
      if (this.props.stuff_drawn_binary) {
        p.orbitControl(10, 10, 0.1);
      }
      p.clear();

      p.angleMode(p.DEGREES);

      //-------keeping incase I want to include in the future---------
      // p.rSlider = document.getElementById("rSlider");
      // p.gSlider = document.getElementById("gSlider");
      // p.bSlider = document.getElementById("bSlider");

      // p.materialColor = p.color(p.rSlider.value, p.gSlider.value, p.bSlider.value)

      // p.rotationAmount = document.getElementById("rotationSlider").value;
      // p.res = document.getElementById("resolutionSlider").value;

      p.ambientLight(170);

      // p.materialColor = p.color(135, 132, 179);
      p.materialColor = p.color(200);
      p.pointLight(90, 80, 100, 0, 100, 0);

      // p.temp = [
      //   { rho: 0, y: 0 },
      //   { rho: 10, y: -10 },
      //   { rho: 10, y: -30 },
      //   { rho: 12, y: -35 },
      //   { rho: 15, y: -40 },
      //   { rho: 16, y: -45 },
      // ];

      p.yAvg = (this.props.topAvg.y + this.props.bottomAvg.y) / 2;

      if (this.props.stuff_drawn_binary) {
        //checks if rendering is on
        p.updateRender();
      }
    };

    p.vert = function (shape) {
      this.y = shape.y;
      // this.rho = (p.drawspaceSizes.x * 0.4) / 2 - shape.x; //rho = distance from the center
      this.rho = shape.rho;
    };

    p.updateRender = function () {
      p.vertexArrayArray = [];
      // for (let arrayNum = 0; arrayNum < 2; arrayNum++) {
      //   p.vertexArrayArray[arrayNum] = new p.vertexArray();
      // }
      p.vertexArrayArray.push(new p.vertexArray("A", p.shapeArrayA));
      p.vertexArrayArray.push(new p.vertexArray("B", p.shapeArrayB));
      p.ambientMaterial(p.materialColor);

      for (let phi = 0; phi < 180 - p.res; phi += p.res) {
        p.vertexArrayArray[0].regularCurveRun(phi);
      }
      p.noStroke();
      p.seamRun(
        180 - p.res,
        p.vertexArrayArray[0].array,
        p.vertexArrayArray[1].array
      );
      // p.stroke(200);
      for (let phi = 180; phi < 360 - p.res; phi += p.res) {
        p.vertexArrayArray[1].regularCurveRun(phi);
      }
      p.seamRun(
        360 - p.res,
        p.vertexArrayArray[1].array,
        p.vertexArrayArray[0].array
      );
      // p.stroke(200);

      // for (
      //   let arrayIndex = 0;
      //   arrayIndex < p.vertexArrayArray.length;
      //   arrayIndex++
      // ) {
      //   var lastPhi = 0;
      //   for (let phi = 0; phi < 360 / p.vertexArrayArray.length; phi += p.res) {
      //     p.vertexArrayArray[arrayIndex].regularCurveRun(phi + lastPhi);
      //     lastPhi = phi;
      //   }
      // }

      //fix this looping-erasing nonsense
      p.vertexArrayArray = [];
    };

    p.vertexArray = function (id, shapeArray) {
      this.id = id;
      this.shapeArray = shapeArray;
      this.array = [];
      for (let i = 0; i < this.shapeArray.length; i++) {
        const newVert = new p.vert(this.shapeArray[i]);
        this.array.push(newVert);
      }
    };
    p.vertexArray.prototype.regularCurveRun = function (phi) {
      for (let j = 0; j < this.array.length - 1; j++) {
        p.beginShape();
        p.vertex(
          this.array[j].rho * p.cos(phi),
          this.array[j].y - p.yAvg,
          this.array[j].rho * p.sin(phi)
        );
        p.vertex(
          this.array[j].rho * p.cos(phi + p.res),
          this.array[j].y - p.yAvg,
          this.array[j].rho * p.sin(phi + p.res)
        );
        p.vertex(
          this.array[j + 1].rho * p.cos(phi + p.res),
          this.array[j + 1].y - p.yAvg,
          this.array[j + 1].rho * p.sin(phi + p.res)
        );
        p.vertex(
          this.array[j + 1].rho * p.cos(phi),
          this.array[j + 1].y - p.yAvg,
          this.array[j + 1].rho * p.sin(phi)
        );
        p.endShape(p.CLOSE);
      }
    };

    p.seamRun = function (phi, arrayA, arrayB) {
      p.beginShape();
      // p.vertex(
      //   arrayA[1].rho * p.cos(phi),
      //   arrayA[0].y - p.yAvg,
      //   arrayA[].rho * p.sin(phi)
      // );
      // p.vertex(
      //   arrayB[0].rho * p.cos(phi),
      //   arrayB[0].y - p.yAvg,
      //   arrayB[0].rho * p.sin(phi)
      // );
      // p.vertex(
      //   arrayA[1].rho * p.cos(phi),
      //   arrayA[1].y - p.yAvg,
      //   arrayA[1].rho * p.sin(phi)
      // );
      p.endShape(p.CLOSE);
      for (let j = 0; j < arrayA.length - 1; j++) {
        const topBound = arrayA[j].y;
        const bottomBound = arrayA[j + 1].y;
        const middleVals = (arr) => topBound < arr.y < bottomBound;
        var tempBArray = arrayB.filter(middleVals);
        p.beginShape();
        p.vertex(
          arrayA[j].rho * p.cos(phi),
          arrayA[j].y - p.yAvg,
          arrayA[j].rho * p.sin(phi)
        );

        for (let i = 0; i < tempBArray.length - 1; i++) {
          p.vertex(
            tempBArray[i].rho * p.cos(phi + p.res),
            tempBArray[i].y - p.yAvg,
            tempBArray[i].rho * p.sin(phi + p.res)
          );
        }
        p.vertex(
          arrayA[j + 1].rho * p.cos(phi),
          arrayA[j + 1].y - p.yAvg,
          arrayA[j + 1].rho * p.sin(phi)
        );
        p.endShape(p.CLOSE);
      }
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default RenderSpace;
