import type { ThemeOverride } from '@chakra-ui/react';

// brand peach: #FFB387

// --peach: #f1bf98;
// --nyanza: #e1f4cb;
// --sage: #bacba9;
// --dim-gray: #717568;
// --black-olive: #3f4739;

// --bittersweet: #ed6a5a;
// --lemon-chiffon: #f4f1bb;
// --ash-gray: #9bc1bc;
// --wenge: #5d576b;
// --alabaster: #e6ebe0;

// alt brand:
// #fff8f4
// #ffe9de
// #ffd9c5
// #ffc7a9
// #ffb289
// #eaa37c
// #d1916f
// #b37d5f
// #8e624b
// #533a2c

const colors: ThemeOverride['colors'] = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#0d0d0c',
  paper: '#fcfdfc',
  brand: {
    50: '#fdeae5',
    100: '#ffd0b7',
    200: '#ffb387',
    300: '#fd9755',
    400: '#fb822b',
    500: '#f97000',
    600: '#ee6a00',
    700: '#e06200',
    800: '#d35a00',
    900: '#bb4d00',
  },
  green: {
    50: '#f3fbea',
    100: '#e1f4cb',
    200: '#ceedab',
    300: '#bae58b',
    400: '#aade70',
    500: '#9cd758',
    600: '#8cc64f',
    700: '#77b144',
    800: '#639d3b',
    900: '#407a2a',
  },
  teal: {
    50: '#e2eadc',
    100: '#bacba9',
    200: '#8ea973',
    300: '#648b3e',
    400: '#487716',
    500: '#2b6200',
    600: '#235700',
    700: '#194900',
    800: '#123900',
    900: '#082000',
  },
  gray: {
    50: '#f9faf9',
    100: '#f1f1f0',
    200: '#e7e8e5',
    300: '#d3d4d0',
    400: '#abaea6',
    500: '#7d8074',
    600: '#53564c',
    700: '#353731',
    800: '#1f201d',
    900: '#191a17',
  },
};

export default colors;
