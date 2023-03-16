import round from 'lodash/round';
import type { Wall } from '~/data/walls';
import { PX_PER_EM } from '~/theme/styles';
import { isWallSquare, wallsSharingVertices } from '../walls/utils';

export const SMALLEST_ALLOWED_ANGLE = 45;

export const toNearestEM = (px: number) => round(px / PX_PER_EM);

export const toWallLength = (p: Wall['position']) =>
  Math.sqrt(Math.pow(p[1][0] - p[0][0], 2) + Math.pow(p[1][1] - p[0][1], 2));

export const isAllowedAngle = (p: Wall['position']) => {
  const degree =
    Math.atan2(p[1][1] - p[0][1], p[1][0] - p[0][0]) * (180 / Math.PI);
  return Math.abs(degree % SMALLEST_ALLOWED_ANGLE) === 0;
};

// TODO:
// export const toBestAllowedAngle = (p: Wall['position']) => {};

export const allSharedCornersAreSquare = (
  p: Wall['position'],
  walls: Wall[]
) => {
  return wallsSharingVertices(p, walls).every(({ position }) =>
    isWallSquare(position)
  );
};
