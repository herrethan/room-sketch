import type { SystemStyleObject } from '@chakra-ui/react';
import isEqual from 'lodash/isEqual';
import type { WallPosition } from '~/data/walls';
import { WALL_HEIGHT, WALL_THICKNESS } from '../walls/utils';

const wallStyles: SystemStyleObject = {
  position: 'absolute',
  top: `-${WALL_THICKNESS / 2}em`,
  left: `-${WALL_THICKNESS / 2}em`,
  // top: 0,
  // left: 0,
  transformStyle: 'preserve-3d',
  transformOrigin: `${WALL_THICKNESS / 2}em ${WALL_THICKNESS / 2}em`,
  opacity: 1,
  // transform: `translate3D(0em, 0em, 0em) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`,
  // width: `5em`,
  height: `${WALL_THICKNESS}em`,
  '& .face': {
    position: 'absolute',
    transformStyle: 'preserve-3d',
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
  // '& .front, & .back': {
  //   width: `5em`,
  //   height: `${WALL_HEIGHT}em`,
  // },
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

export const computeWall = (position: WallPosition): SystemStyleObject => {
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

  return {
    ...wallStyles,
    width: `${length}em`,
    transform: `translate3D(${start.x}em, ${start.y * -1}em, 0) rotateZ(${
      rotation * -1
    }deg)`,
    '& .front, & .back': {
      width: `${length}em`,
      height: `${WALL_HEIGHT}em`,
    },
  };
};
