import type { SystemStyleObject } from '@chakra-ui/react';
import { WALL_THICKNESS } from '../walls/utils';

export const wallEditStyles: SystemStyleObject = {
  '& svg': {
    width: 1,
    height: 1,
    overflow: 'visible',
    '& line': {
      fill: 'none',
      stroke: 'gray.400',
      strokeWidth: `${WALL_THICKNESS / 2}em`,
      strokeLinecap: 'round',
      pointerEvents: 'none',
      '&:hover': {
        stroke: 'gray.600',
      },
      '&.selected': {
        stroke: 'gray.800',
      },
      '&.hit-area': {
        stroke: 'transparent',
        strokeWidth: '1em',
        cursor: 'pointer',
        pointerEvents: 'stroke',
        '&:hover + line': {
          stroke: 'gray.600',
        },
        '&:hover + line.selected': {
          stroke: 'gray.800',
        },
      },
    },
    '& circle': {
      fill: 'gray.800',
      stroke: 'gray.800',
      strokeWidth: `${WALL_THICKNESS / 2}em`,
      cursor: 'pointer',
      '&:hover': {
        strokeWidth: `${WALL_THICKNESS}em`,
      },
    },
  },
};
