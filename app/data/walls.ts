// [[left, bottom], [left, bottom]], ie: [[x, y], [x, y]]
export type WallPosition = [[number, number], [number, number]];

export interface Wall {
  position: WallPosition;
  // type?
  // windows?
  // doors?
  // opening?
}
