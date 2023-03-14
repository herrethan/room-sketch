import isEqual from 'lodash/isEqual';
import type { Wall, WallPosition } from '~/data/walls';

export const WALL_THICKNESS = 0.5;
export const WALL_HEIGHT = 8;
export const GOLDEN_RATIO = 1.61803398875;
// TODO: maths homework: figure out why this just "works"!
export const MAGIC_RATIO = GOLDEN_RATIO * 3;

export const isWallSquare = (position: Wall['position']) =>
  position[0][0] === position[1][0] || position[0][1] === position[1][1];

export const areAllWallsSquare = (walls: Wall[]) =>
  walls.every(({ position }) => isWallSquare(position));

export const wallsSharingVertices = (
  position: Wall['position'],
  walls: Wall[]
) => {
  return walls.filter(
    wall =>
      !isEqual(wall.position, position) &&
      wall.position.some(
        p => isEqual(p, position[0]) || isEqual(p, position[1])
      )
  );
};

// computes angle in degrees given 3 points
export const computeTheta = (
  p1: [number, number],
  p2: [number, number], // p2 is the center point
  p3: [number, number]
) => {
  const a = Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2);
  const b = Math.pow(p2[0] - p3[0], 2) + Math.pow(p2[1] - p3[1], 2);
  const c = Math.pow(p3[0] - p1[0], 2) + Math.pow(p3[1] - p1[1], 2);
  return Math.round(
    Math.acos((a + b - c) / Math.sqrt(4 * a * b)) * (180 / Math.PI)
  );
};

// nudges pointA towards pointB
export const nudgePointTowardsPoint = (
  pointA: [number, number],
  pointB: [number, number],
  nudgeAmount: number
): [number, number] => {
  const x =
    pointA[0] === pointB[0]
      ? pointA[0]
      : pointA[0] < pointB[0]
      ? pointA[0] + nudgeAmount
      : pointA[0] - nudgeAmount;
  const y =
    pointA[1] === pointB[1]
      ? pointA[1]
      : pointA[1] < pointB[1]
      ? pointA[1] + nudgeAmount
      : pointA[1] - nudgeAmount;
  return [x, y];
};

// adjusts coordinates so that non-square angled joints don't have corners poking out
export const prettifyButts = (walls: Wall[]) => {
  const newWalls: Wall[] = [];

  walls.forEach(({ position }) => {
    // find all wall companions who share this walls coordinates
    const pals = wallsSharingVertices(position, walls);

    if (pals.length === 0) {
      return newWalls.push({ position });
    }

    const slope = Math.abs(
      (position[0][1] - position[1][1]) / (position[0][0] - position[1][0])
    );

    let newPosition: WallPosition = [position[0], position[1]];

    pals.forEach(pal => {
      const joint = position.find(
        p => isEqual(p, pal.position[0]) || isEqual(p, pal.position[1])
      );
      const p1 = position.find(p => !isEqual(p, joint));
      const p3 = pal.position.find(p => !isEqual(p, joint));

      if (joint && p1 && p3) {
        const theta = computeTheta(p1, joint, p3);

        // only adjust if we are dealing with non-square angles
        if ((theta > 0 && theta < 90) || (theta > 90 && theta < 180)) {
          const i = position.findIndex(p => isEqual(p, joint)) === 1 ? 1 : 0;
          let nudgeDistance: number;
          if (slope > 0 && slope < Infinity) {
            // no idea why this magic ratio perfectly aligns angled butts, but it does
            nudgeDistance =
              (WALL_THICKNESS / MAGIC_RATIO) *
              Math.abs(Math.sin((2 * theta * Math.PI) / 180));
          } else if (theta > 0 && theta < 90) {
            // NOTE: this only works for 45˚ joints, one day do the math to support any
            nudgeDistance = WALL_THICKNESS / Math.sqrt(2);
          } else {
            // NOTE: this only works for 135˚ joints, one day do the math to support any
            nudgeDistance = WALL_THICKNESS - WALL_THICKNESS / Math.sqrt(2);
          }
          newPosition[i] = nudgePointTowardsPoint(
            position[i],
            position[Math.abs(i - 1)],
            nudgeDistance
          );
        }
      }
    });

    newWalls.push({ position: newPosition });
  });

  return newWalls;
};
