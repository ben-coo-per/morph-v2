import React, { Component } from "react";
import p5 from "p5";

class DrawSpace extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    p.shapeArray = [];
    p.windowResized = () => {
      p.resizeCanvas(this.props.canvasSizes[0].x, this.props.canvasSizes[0].y);
    };

    p.setup = () => {
      p.canvas = p.createCanvas(
        this.props.canvasSizes[0].x,
        this.props.canvasSizes[0].y,
        p.SVG
      );
    };

    p.draw = () => {
      p.mode = this.props.currentMode;
      p.background(255);
      if (this.props.clearBinary) {
        p.onDelete();
        this.props.finishedClearing();
      }

      p.numVertices = p.shapeArray.length * 0.15;
      p.cleanShapeArray();
      p.shapesToVertices();

      //display shapes
      if (p.mode === "draw") {
        for (let i = 0; i < p.shapeArray.length; i++) {
          if (p.shapeArray[i].isOver()) {
            p.shapeArray[i].showDraw(1);
          } else {
            p.shapeArray[i].showDraw();
          }
        }
      } else if (p.mode === "findCenter") {
        //Unused at the moment
      } else if (p.mode === "vertex") {
        p.background(249);
        p.stroke(1);
        for (let i = 0; i < p.vertShapeArray.length; i++) {
          if (i === 0) {
            p.lastVertX = p.vertShapeArray[i].x;
            p.lastVertY = p.vertShapeArray[i].y;
          } else {
            p.lastVertX = p.vertShapeArray[i - 1].x;
            p.lastVertY = p.vertShapeArray[i - 1].y;
          }

          p.overBool = p.vertShapeArray[i].isOver();
          if (p.overBool) {
            p.vertShapeArray[i].showVert(1, p.lastVertX, p.lastVertY);
          } else {
            p.vertShapeArray[i].showVert(0, p.lastVertX, p.lastVertY);
          }
        }
      }
      p.stroke(10);
      p.line(
        this.props.topAvg.x,
        this.props.topAvg.y,
        this.props.bottomAvg.x,
        this.props.bottomAvg.y
      );
      p.noStroke();

      p.fill(0);
      p.noStroke();

      if (p.shapeArray.length > 0) {
        this.props.onShapeArrayExport(p.vertShapeArray, 1);
      } else {
        this.props.onShapeArrayExport(p.vertShapeArray, 0);
      }
    };

    p.cleanShapeArray = function () {
      //Impliment auto sorting based on x,y positions in relation to other shapes
      p.shapeArray = p.shapeArray.filter(function (value, index, arr) {
        return value !== undefined;
      });
    };

    //-------mouse dragged functionality
    p.mouseDragged = function () {
      //this adds items to arrays and draws them on the drawSpace when mouse dragged
      if (p.mode === "draw") {
        if (
          p.mouseX > 0 &&
          p.mouseX < p.canvas.width &&
          p.mouseY > 0 &&
          p.mouseY < p.canvas.height
        ) {
          //   p.newShape = new p.shape();
          //   p.shapeArray.push(p.newShape);
          p.shapeArray.push(new p.shape());
        }
      } else if (p.mode === "vertex") {
        for (let i = 0; i < p.shapeArray.length; i++) {
          if (p.shapeArray[i].isOver()) {
            p.shapeArray[i].moveShape();
          }
        }
      }
    };

    //----------shape creation & showing--------
    //shape constructor function
    p.shape = function () {
      this.x = p.mouseX;
      this.y = p.mouseY;
      this.thickness = 16;

      this.baseColor = p.color(130);
      this.hoverColor = p.color(220, 123, 90);
    };

    //show shape in draw mode
    p.shape.prototype.showDraw = function (hoverBinary = 0) {
      //Set color based on T/F hover binary
      if (hoverBinary === 1) {
        p.fill(this.hoverColor);
      } else {
        p.fill(this.baseColor);
      }
      p.noStroke();
      p.ellipse(this.x, this.y, this.thickness);
    };

    //vertex mode show
    p.shape.prototype.showVert = function (
      hoverBinary = 0,
      lastVertX,
      lastVertY
    ) {
      //Set color based on T/F hover binary
      if (hoverBinary === 1) {
        p.fill(this.hoverColor);
      } else {
        p.fill(this.baseColor);
      }
      p.stroke(1);
      p.line(lastVertX, lastVertY, this.x, this.y);
      p.noStroke();
      p.ellipse(this.x, this.y, this.thickness);
    };

    //change hover binary if floating over
    p.shape.prototype.isOver = function () {
      this.padding = 0;
      this.d = p.dist(p.mouseX, p.mouseY, this.x, this.y);
      return this.d < this.thickness + this.padding;
    };

    p.shape.prototype.moveShape = function () {
      this.x = p.mouseX;
      this.y = p.mouseY;
    };

    p.shapesToVertices = function () {
      p.vertShapeArray = [];
      for (let i = 0; i < p.shapeArray.length; i++) {
        if (i % p.round(p.shapeArray.length / p.numVertices) === 0) {
          p.vertShapeArray.push(p.shapeArray[i]);
        }
      }
    };

    //--------Button Functions----------
    p.onDelete = function () {
      p.justCleared = p.shapeArray.splice(0, p.shapeArray.length); //just in case you want to impliment short-term memory
      p.background(p.color(249));
    };

    // p.backButton = function () {
    //   document.getElementById("order-submission-row").style.display = "none";
    //   document.getElementById("drawingAndAdjustments").style.display = "block";
    // };

    p.saveButton = function (emailString) {
      p.save(emailString + ".svg"); // give file name
    };

    // p.export = function () {
    //   const array = "hello Im an array";
    //   this.props.onShapeArrayExport(array);
    // };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return (
      <div className="grid-col-span-2">
        <div ref={this.myRef}></div>
      </div>
    );
  }
}

export default DrawSpace;
