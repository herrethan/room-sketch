export type XY = [number, number];
// [[left, bottom], [left, bottom]], ie: [[x, y], [x, y]]
export type WallPosition = [XY, XY];

export interface Wall {
  position: WallPosition;
  // type?
  // windows?
  // doors?
  // opening?
}
