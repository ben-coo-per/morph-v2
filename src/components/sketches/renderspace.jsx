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
    p.vertexArray = [];

    p.setup = (array) => {
      p.threeDCanvas = p.createCanvas(
        this.props.canvasSizes[0].x * 0.9,
        this.props.canvasSizes[0].y * 0.4,
        p.WEBGL
      );
    };

    p.draw = () => {
      p.shapeArray = this.props.shapeArray;
      if (this.props.stuff_drawn_binary) {
        p.orbitControl(10, 10, 0.1);
      }
      p.clear();
      p.orbitControl(10, 10, 0.1);

      p.angleMode(p.DEGREES);

      //-------keeping incase I want to include in the future---------
      // p.rSlider = document.getElementById("rSlider");
      // p.gSlider = document.getElementById("gSlider");
      // p.bSlider = document.getElementById("bSlider");

      // p.materialColor = p.color(p.rSlider.value, p.gSlider.value, p.bSlider.value)

      // p.rotationAmount = document.getElementById("rotationSlider").value;
      // p.res = document.getElementById("resolutionSlider").value;

      p.stroke(200);
      p.strokeWeight(0.1);
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
      // for (let phi = 0; phi < 360; phi += p.res) {
      //   p.ambientMaterial(p.materialColor);
      //   for (let j = 0; j < p.temp.length - 1; j++) {
      //     p.beginShape();
      //     p.vertex(
      //       p.temp[j].rho * p.cos(phi),
      //       p.temp[j].y,
      //       p.temp[j].rho * p.sin(phi)
      //     );
      //     p.vertex(
      //       p.temp[j].rho * p.cos(phi + p.res),
      //       p.temp[j].y,
      //       p.temp[j].rho * p.sin(phi + p.res)
      //     );
      //     p.vertex(
      //       p.temp[j + 1].rho * p.cos(phi + p.res),
      //       p.temp[j + 1].y,
      //       p.temp[j + 1].rho * p.sin(phi + p.res)
      //     );
      //     p.vertex(
      //       p.temp[j + 1].rho * p.cos(phi),
      //       p.temp[j + 1].y,
      //       p.temp[j + 1].rho * p.sin(phi)
      //     );
      //     p.endShape(p.CLOSE);
      //   }
      // }

      p.yAvg = p.findYCenter();
      // p.drawSpaceWidth = this.props.canvasSizes[0].x * 0.4;

      if (this.props.stuff_drawn_binary) {
        //checks if rendering is on
        p.updateRender();
      }
    };

    p.vert = function (shape) {
      this.y = shape.y;
      this.rho = (p.drawspaceSizes.x * 0.4) / 2 - shape.x; //rho = distance from the center
    };

    p.updateRender = function () {
      for (let i = 0; i < p.shapeArray.length; i++) {
        const newVert = new p.vert(p.shapeArray[i]);
        p.vertexArray.push(newVert);
      }

      for (let phi = 0; phi < p.rotationAmount; phi += p.res) {
        p.ambientMaterial(p.materialColor);
        for (let j = 0; j < p.vertexArray.length - 1; j++) {
          p.beginShape();
          p.vertex(
            p.vertexArray[j].rho * p.cos(phi),
            p.vertexArray[j].y,
            p.vertexArray[j].rho * p.sin(phi)
          );
          p.vertex(
            p.vertexArray[j].rho * p.cos(phi + p.res),
            p.vertexArray[j].y,
            p.vertexArray[j].rho * p.sin(phi + p.res)
          );
          p.vertex(
            p.vertexArray[j + 1].rho * p.cos(phi + p.res),
            p.vertexArray[j + 1].y,
            p.vertexArray[j + 1].rho * p.sin(phi + p.res)
          );
          p.vertex(
            p.vertexArray[j + 1].rho * p.cos(phi),
            p.vertexArray[j + 1].y,
            p.vertexArray[j + 1].rho * p.sin(phi)
          );
          p.endShape(p.CLOSE);
        }
      }
      p.vertexArray = [];
    };

    //--------Find Y-Center Function---------
    p.findYCenter = function () {
      p.topCoord = p.drawspaceSizes.y * 0.28; //***height of drawSpace***
      p.bottomCoord = 0;
      //check y coordinate for each & replace topCoord & bottomCoord variables
      if (p.stuff_drawn_binary) {
        for (let i = 0; i < p.shapeArray.length; i++) {
          if (p.shapeArray[i].y < p.topCoord) {
            p.topCoord = p.shapeArray[i].y;
          }
          if (p.shapeArray[i].y > p.bottomCoord) {
            p.bottomCoord = p.shapeArray[i].y;
          }
        }
        return (p.topCoord + p.bottomCoord) / 2;
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
