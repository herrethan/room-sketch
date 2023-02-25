import type { Styles } from '@chakra-ui/theme-tools';

const globalStyles: Styles = {
  global: {
    body: {
      // apply: 'textStyles.body1',
      bg: 'grey.lightest',
      color: 'grey.darkest',
      // fontFamily: 'body',
      overflowX: 'hidden',
      transitionDuration: 'normal',
      transitionProperty: 'background-color',
      _dark: {
        bg: 'grey.darkest',
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
