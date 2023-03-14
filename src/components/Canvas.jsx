import React from "react";
import "./canvasStyle.css";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = {
      hexSize: 20,
      hexOrigin: { x: 400, y: 300 },
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
    this.canvasCoordinate.width = canvasWidth;
    this.canvasCoordinate.height = canvasHeight;
    this.getCanvasPosition(this.canvasCoordinate);
    this.drawHexes();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.currentHexagon !== this.state.currentHex) {
      const { q, r, s, x, y } = nextState.currentHex;
      const { canvasWidth, canvasHeight } = this.state.canvasSize;
      const ctx = this.canvasCoordinate.getContext("2d");
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      this.drawHex(this.canvasCoordinate, this.Point(x, y), "lime", 2);
      return true;
    }
    return false;
  }

  //fix แนวนอน
  drawHex(canvasID, center, color, width) {
    for (let i = 0; i <= 5; i++) {
      let start = this.getHexCornerCo(center, i);
      let end = this.getHexCornerCo(center, i + 1);
      this.drawLine(
        canvasID,
        { x: start.x, y: start.y },
        { x: end.x, y: end.y, color, width }
      );
    }
  }

  drawHexes() {
    const { canvasWidth, canvasHeight } = this.state.canvasSize;
    const { hexWidth, hexHeight, vertDist, horizDist } =
      this.state.Hexparameteres;
    const hexOrigin = this.state.hexOrigin;
    let qLeftSide = Math.round(hexOrigin.x / horizDist) * 4;
    let qRightSide = Math.round(canvasWidth - hexOrigin.x) / horizDist;
    let rTopside = Math.round(hexOrigin.y / vertDist);
    let rBottomside = Math.round(canvasHeight - hexOrigin.y) / vertDist;
    console.log(qLeftSide, qRightSide, rTopside, rBottomside);

    var p = 0;
    for (let r = 0; r <= rBottomside; r++) {
      if (r % 2 == 0 && r !== 0) {
        p++;
      }
      for (let q = -qLeftSide; q <= qRightSide; q++) {
        const { x, y } = this.hexToPixel(this.Hex(q - p, r));
        if (
          x > hexWidth / 2 &&
          x < canvasWidth - hexWidth / 2 &&
          y > hexHeight / 2 &&
          y < canvasHeight - hexHeight
        ) {
          this.drawHex(this.canvasHex, this.Point(x, y));
          this.drawHexCoordinates(
            this.canvasHex,
            this.Point(x, y),
            this.Hex(q - p, r)
          );
        }
      }
    }

    var n = 0;
    for (let r = -1; r >= -rTopside; r--) {
      if (r % 2 !== 0) {
        n++;
      }
      for (let q = -qLeftSide; q <= qRightSide; q++) {
        const { x, y } = this.hexToPixel(this.Hex(q + n, r));
        if (
          x > hexWidth / 2 &&
          x < canvasWidth - hexWidth / 2 &&
          y > hexHeight / 2 &&
          y < canvasHeight - hexHeight
        ) {
          this.drawHex(this.canvasHex, this.Point(x, y));
          this.drawHexCoordinates(
            this.canvasHex,
            this.Point(x, y),
            this.Hex(q + n, r)
          );
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

  getCanvasPosition(canvasID) {
    let rect = canvasID.getBoundingClientRect();
    this.setState({
      canvasPosition: {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
      },
    });
  }

  hexToPixel(h) {
    let hexOrigin = this.state.hexOrigin;
    let x = this.state.hexSize * Math.sqrt(3) * (h.q + h.r / 2) + hexOrigin.x;
    let y = ((this.state.hexSize * 3) / 2) * h.r + hexOrigin.y;
    return this.Point(x, y);
  }

  pixelToHex(p) {
    let size = this.state.hexSize;
    let origin = this.state.hexOrigin;
    let q =
      (((p.x - origin.x) * Math.sqrt(3)) / 3 - (p.y - origin.y) / 3) / size;
    let r = ((p.y - origin.y) * 2) / 3 / size;
    return this.Hex(q, r, -q - r);
  }

  cubeRound(cube) {
    var rx = Math.round(cube.q);
    var ry = Math.round(cube.r);
    var rz = Math.round(cube.s);

    var x_diff = Math.abs(rx - cube.q);
    var y_diff = Math.abs(ry - cube.r);
    var z_diff = Math.abs(rz - cube.s);

    if (x_diff > y_diff && x_diff > z_diff) {
      rx = -ry - rz;
    } else if (y_diff > z_diff) ry = -rx - rz;
    else rz = -rx - ry;

    return this.Hex(rx, ry, rz);
  }

  Point(x, y) {
    return { x: x, y: y };
  }

  Hex(q, r, s) {
    return { q: q, r: r, s: s };
  }

  drawLine(canvasID, start, end, color, width) {
    const ctx = canvasID.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  }

  drawHexCoordinates(canvasID, center, h) {
    const ctx = canvasID.getContext("2d");
    ctx.fillText(h.q, center.x - 10, center.y);
    ctx.fillText(h.r, center.x + 10, center.y);
  }
  handle;
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

  handleMouseMove(e) {
    const { left, right, top, bottom } = this.state.canvasPosition;
    console.log(e.pageX - left, e.pageY - top);
    let offsetX = e.pageX - left;
    let offsetY = e.pageY - top;
    const { q, r, s } = this.cubeRound(
      this.pixelToHex(this.Point(offsetX, offsetY))
    );
    const { x, y } = this.hexToPixel(this.Hex(q, r, s));
    console.log(q, r, s, x, y);
    this.setState({ currentHex: { q, r, s, x, y } });
  }

  render() {
    return (
      <div>
        <canvas ref={(canvasHex) => (this.canvasHex = canvasHex)}></canvas>
        <canvas
          ref={(canvasCoordinate) => (this.canvasCoordinate = canvasCoordinate)}
          onMouseMove={this.handleMouseMove}
        ></canvas>
      </div>
    );
  }
}
