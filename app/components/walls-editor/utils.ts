import { range } from 'lodash';
import round from 'lodash/round';
import type { Wall, XY } from '~/data/walls';
import { PX_PER_EM } from '~/theme/styles';
import { isWallSquare, wallsSharingVertices } from '../walls/utils';

export const SMALLEST_ALLOWED_ANGLE = 45;
export const SMALLEST_ALLOWED_RADIAN = SMALLEST_ALLOWED_ANGLE / (180 / Math.PI);
// divides circle into radial sectors, so as to conform drawing lines to SMALLEST_ALLOWED_ANGLE
// conforms targets to radians -PI <-> PI so its easier to compute from Math.atan2 range
const sectors = range((Math.PI * 2) / SMALLEST_ALLOWED_RADIAN).map(i => {
  const target = SMALLEST_ALLOWED_RADIAN * i - Math.PI;
  return {
    min: target - SMALLEST_ALLOWED_RADIAN / 2,
    target,
    max: target + SMALLEST_ALLOWED_RADIAN / 2,
  };
});

export const toNearestEM = (px: number) => round(px / PX_PER_EM);

export const toWallLength = (p: Wall['position']) =>
  Math.sqrt(Math.pow(p[1][0] - p[0][0], 2) + Math.pow(p[1][1] - p[0][1], 2));

export const isAllowedAngle = (p: Wall['position']) => {
  const degree =
    Math.atan2(p[1][1] - p[0][1], p[1][0] - p[0][0]) * (180 / Math.PI);
  return Math.abs(degree % SMALLEST_ALLOWED_ANGLE) === 0;
};

export const toBestAllowedAngle = (p1: XY, p2: XY): Wall['position'] => {
  // if line is square, ok to return line and just skip the math computations
  if (p1[0] === p2[0] || p1[1] === p2[1]) {
    return [p1, p2];
  }
  const rad = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
  const sector =
    sectors.find(area => rad < area.max && rad >= area.min) || sectors[0];
  const length = toWallLength([p1, p2]);
  const deltax = Math.round(length * Math.cos(sector.target));
  const deltay = Math.round(length * Math.sin(sector.target));
  return [p1, [p1[0] + deltax, p1[1] + deltay]];
};

export const allSharedCornersAreSquare = (
  p: Wall['position'],
  walls: Wall[]
) => {
  return wallsSharingVertices(p, walls).every(({ position }) =>
    isWallSquare(position)
  );
};
