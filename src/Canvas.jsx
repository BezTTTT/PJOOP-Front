import React from "react";
import "./canvasStyle.css";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hexSize: 20,
      hexOrigin: { x: 300, y: 300 },
    };
  }
  componentWillMount() {
    let Hexparameteres = this.getHexparameteres();
    this.setState({
      canvasSize: { canvasWidth: 800, canvasHeight: 600 },
      Hexparameteres: Hexparameteres,
    });
  }

  componentDidMount() {
    const { canvasWidth, canvasHeight } = this.state.canvasSize;
    this.canvasHex.width = canvasWidth;
    this.canvasHex.height = canvasHeight;
    this.drawHexes();
  }
  drawHex(canvasID, center) {
    for (let i = 0; i <= 5; i++) {
      let start = this.getHexCornerCo(center, i);
      let end = this.getHexCornerCo(center, i + 1);
      this.drawLine(
        canvasID,
        { x: start.x, y: start.y },
        { x: end.x, y: end.y }
      );
    }
  }
  drawHexes() {
    const { canvasWidth, canvasHeight } = this.state.canvasSize;
    const { hexWidth, hexHeight, vertDist, horizDist } =
      this.state.Hexparameteres;
    const hexOrigin = this.state.hexOrigin;
    let qLeftSide = Math.round(hexOrigin.x / hexWidth) * 4;
    let qRightSide = (Math.round(canvasWidth - hexOrigin.x) / hexWidth) * 2;
    let rTopside = Math.round(hexOrigin.y / (hexHeight / 2));
    let rBottomside = Math.round(canvasHeight - hexOrigin.y) / (hexHeight / 2);
    for (let r = -rTopside; r <= rBottomside; r++) {
      for (let q = -qLeftSide; q <= qRightSide; q++) {
        let center = this.hexToPixel(this.Hex(q, r));
        if (
          center.x > hexWidth / 2 &&
          center.x < canvasWidth - hexWidth / 2 &&
          center.y > hexHeight / 2 &&
          center.y < canvasHeight - hexHeight
        ) {
          this.drawHex(this.canvasHex, center);
          this.drawHexCoordinates(this.canvasHex, center, this.Hex(q, r));
        }
      }
    }
  }
  getHexparameteres() {
    let hexHeight = this.state.hexSize * 2;
    let hexWidth = (Math.sqrt(3) / 2) * hexHeight;
    let vertDist = (hexHeight * 3) / 4;
    let horizDist = hexWidth;
    return { hexWidth, hexHeight, vertDist, horizDist };
  }
  hexToPixel(h) {
    let hexOrigin = this.state.hexOrigin;
    let x = this.state.hexSize * Math.sqrt(3) * (h.q + h.r / 2) + hexOrigin.x;
    let y = ((this.state.hexSize * 3) / 2) * h.r + hexOrigin.y;
    return this.Point(x, y);
  }

  Hex(q, r) {
    return { q: q, r: r };
  }
  drawLine(canvasID, start, end) {
    const ctx = canvasID.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  }
  drawHexCoordinates(canvasID, center, h) {
    const ctx = canvasID.getContext("2d");
    ctx.fillText(h.q, center.x - 10, center.y);
    ctx.fillText(h.r, center.x + 10, center.y);
  }

  getHexCornerCo(center, i) {
    let angle_deg = 60 * i + 30;
    let angle_rad = (Math.PI / 180) * angle_deg;
    let x = center.x + this.state.hexSize * Math.cos(angle_rad);
    let y = center.y + this.state.hexSize * Math.sin(angle_rad);
    return this.Point(x, y);
  }
  Point(x, y) {
    return { x: x, y: y };
  }

  render() {
    return (
      <div>
        <canvas ref={(canvasHex) => (this.canvasHex = canvasHex)}></canvas>
      </div>
    );
  }
}
