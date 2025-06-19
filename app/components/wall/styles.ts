import type { SystemStyleObject } from '@chakra-ui/react';
import isEqual from 'lodash/isEqual';
import type { WallPosition } from '~/data/walls';
import { WALL_HEIGHT, WALL_THICKNESS } from '../walls/utils';

const wallStyles: SystemStyleObject = {
  position: 'absolute',
  top: `-${WALL_THICKNESS / 2}em`,
  left: `-${WALL_THICKNESS / 2}em`,
  transformStyle: 'preserve-3d',
  transformOrigin: `${WALL_THICKNESS / 2}em ${WALL_THICKNESS / 2}em`,
  opacity: 1,
  height: `${WALL_THICKNESS}em`,
  '& .face': {
    position: 'absolute',
    transformStyle: 'preserve-3d',
    transitionProperty: 'background-color',
    transitionDuration: 'slow',
    backgroundColor: 'white',
    boxShadow: `inset 0 0 0 1px rgba(0, 0, 0, 0.4)`,
    overflow: 'hidden',
    transformOrigin: `0 0`,
    backfaceVisibility: 'hidden',
    backgroundSize: `100% 100%`,
    backgroundPosition: 'center',
  },
  '& .top, & .bottom': {
    width: '100%',
    height: '100%',
  },
  '& .top': {
    transform: `translateZ(${WALL_HEIGHT}em)`,
  },
  '& .bottom': {
    left: '100%',
    transform: `rotateY(180deg)`,
  },
  '& .left, & .right': {
    width: `${WALL_HEIGHT}em`,
    height: `${WALL_THICKNESS}em`,
  },
  '& .left': {
    transform: `rotateY(-90deg)`,
  },
  '& .right': {
    left: '100%',
    transform: `rotateY(90deg) translateX(-100%)`,
  },
  '& .front': {
    top: '100%',
    transform: `rotateX(-90deg) translateY(-100%)`,
  },
  '& .back': {
    transform: `rotateX(90deg)`,
  },
};

// ensure walls are always drawn left-to-right
const normalizePosition = (position: WallPosition): WallPosition => {
  if (isEqual(position[1], position[0])) {
    throw new Error('wall must be larger than length 0');
  }
  if (position[1][0] < position[0][0]) {
    return [position[1], position[0]];
  }
  return position;
};

const getLuminance = (rotation: number, stageRotation: number) => {
  // compute stage angle in 0-90 deg terms
  const stageModulo = Math.abs(((stageRotation - 45 + 180) % 360) - 180);
  const zeroToNinety = stageModulo > 90 ? 180 - stageModulo : stageModulo;
  // merge calculation with rotation of wall itself
  const withRotation = Math.abs(zeroToNinety - rotation);
  const face = Math.abs(withRotation > 90 ? 180 - withRotation : withRotation);
  // map range 0-90 to 95-100 (degrees to lightness %)
  return 97 + ((face - 0) / (90 - 0)) * (100 - 97);
};

export const computeWall = (
  position: WallPosition,
  stageRotation?: number
): SystemStyleObject => {
  const pos = normalizePosition(position);
  const start = {
    x: pos[0][0],
    y: pos[0][1],
  };
  const end = {
    x: pos[1][0],
    y: pos[1][1],
  };
  const length =
    Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)) +
    WALL_THICKNESS;

  const rotation =
    Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

  const luminance = stageRotation
    ? getLuminance(rotation, stageRotation)
    : null;

  return {
    ...wallStyles,
    width: `${length}em`,
    transform: `translate3D(${start.x}em, ${start.y * -1}em, 0) rotateZ(${
      rotation * -1
    }deg)`,
    '& .front, & .back': {
      width: `${length}em`,
      height: `${WALL_HEIGHT}em`,
      backgroundColor: `hsl(0 0% ${luminance}% / 1);`,
    },
  };
};
