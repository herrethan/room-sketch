import type { SystemStyleObject } from '@chakra-ui/react';
import { keyframes } from '@chakra-ui/react';
import theme from '~/theme';
import { WALL_THICKNESS } from '../walls/utils';

const helloDot = keyframes({
  from: { strokeWidth: 0 },
  to: { strokeWidth: `${WALL_THICKNESS / 2}em` },
});

const helloHoverDot = keyframes({
  from: { strokeWidth: `${WALL_THICKNESS / 2}em` },
  to: { strokeWidth: `${WALL_THICKNESS}em` },
});

export const wallEditStyles: SystemStyleObject = {
  '& svg': {
    width: '1px',
    height: '1px',
    overflow: 'visible',
    position: 'relative',
    top: '-0.5px',
    left: '-0.5px',
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
      cursor: 'pointer',
      animation: `${helloDot} ${theme.transition.duration.fast} forwards`,
      '&:hover': {
        animation: `${helloHoverDot} ${theme.transition.duration.fast} forwards`,
      },
      '&.ghost': {
        fill: 'blackAlpha.200',
        stroke: 'none',
        pointerEvents: 'none',
      },
      '&.ghost-dragging': {
        fill: 'green.200',
        opacity: 0.6,
        stroke: 'none',
        pointerEvents: 'none',
      },
      '&.start-vertex': {
        pointerEvents: 'none',
      },
      '&.end-vertex': {
        pointerEvents: 'none',
      },
    },
  },
};
