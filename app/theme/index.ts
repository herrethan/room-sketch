import type { Theme, ThemeOverride} from '@chakra-ui/react';
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import styles from './styles';
import colors from './foundations/colors';
import fonts from './foundations/fonts';

// some ideas for themes

// base peach: #FFB387;

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

const fontWeights: ThemeOverride['fontWeights'] = {
  book: 200,
  medium: 400,
  bold: 600,
  black: 800,
};

// component style overrides
// import Button from './components/button'

const overrides = {
  styles,
  colors,
  fonts,
  fontWeights,
  // other foundational style overrides go here
  components: {
    // Button,
    // other components go here
  },
}

export default extendTheme(overrides, withDefaultColorScheme({ colorScheme: 'brand' })) as Theme;
