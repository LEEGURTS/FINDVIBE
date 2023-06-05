import cursor from "../../assets/Svg/Cursor.svg";

interface RotateIcon {
  setRotation(deg: number): RotateIcon;
  getUrl(): string;
}

class RotateIcon {
  img: HTMLImageElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;

  constructor() {
    let img = new Image();
    img.src = cursor;

    this.img = img;

    let canvas = document.createElement("canvas");
    canvas.width = 45;
    canvas.height = 45;
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
  }
}

RotateIcon.prototype.setRotation = function (deg: number) {
  let angle = (deg * Math.PI) / 180,
    centerX = 45 / 2,
    centerY = 45 / 2;

  this.context?.clearRect(0, 0, 45, 45);
  this.context?.save();
  this.context?.translate(centerX, centerY);
  this.context?.rotate(angle);
  this.context?.translate(-centerX, -centerY);
  this.context?.drawImage(this.img, 0, 0);
  this.context?.restore();

  return this;
};

RotateIcon.prototype.getUrl = function () {
  return this.canvas.toDataURL("image/png");
};

export const getAngle = (
  pos1: { lat: number; lng: number },
  pos2: { lat: number; lng: number }
) => {
  const pi1 = (pos1.lat * Math.PI) / 180;
  const pi2 = (pos2.lat * Math.PI) / 180;
  const lambda1 = (pos1.lng * Math.PI) / 180;
  const lambda2 = (pos2.lng * Math.PI) / 180;

  const y = Math.sin(lambda2 - lambda1) * Math.cos(pi2);
  const x =
    Math.cos(pi1) * Math.sin(pi2) -
    Math.sin(pi1) * Math.cos(pi2) * Math.cos(lambda2 - lambda1);
  const setta = Math.atan2(y, x);
  return ((setta * 180) / Math.PI + 360) % 360;
};

export default RotateIcon;
