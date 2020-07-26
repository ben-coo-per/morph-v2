import p5 from "p5";
import React, { Component } from "react";

class Sketch1 extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    p.setup = () => {
      p.bgColor = p.color(255, 233, 264);
      p.createCanvas(400, 400);
    };

    p.draw = () => {
      p.background(p.bgColor);
      p.fill(130, 180, 140);
      p.ellipse(p.mouseX, p.mouseY, 100);
      p.text(this.props.canvasSizes[0].x, 30, 30);
      p.text(this.props.canvasSizes[0].y, 30, 60);
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default Sketch1;
