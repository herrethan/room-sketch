import type { Styles } from '@chakra-ui/theme-tools';

export const PX_PER_EM = 16;

const globalStyles: Styles = {
  global: {
    html: {
      fontSize: PX_PER_EM,
    },
    body: {
      // apply: 'textStyles.body1',
      // bg: 'grey.lightest',
      // color: 'grey.darkest',
      // fontFamily: 'body',
      // overflowX: 'hidden',
      transitionDuration: 'normal',
      transitionProperty: 'background-color',
      _dark: {
        // bg: 'grey.darkest',
        color: 'white',
      },
    },
    '*::placeholder': {
      color: 'grey.base',
    },
    '*, *::before, &::after': {
      WebkitTapHighlightColor: 'transparent',
      wordWrap: 'break-word',
    },
  },
};

export default globalStyles;
