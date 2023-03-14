import type { Theme, ThemeOverride } from '@chakra-ui/react';
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import styles from './styles';
import colors from './foundations/colors';
import fonts from './foundations/fonts';
import { checkboxTheme } from './components/checkbox';
import textTheme from './components/text';

const fontWeights: ThemeOverride['fontWeights'] = {
  book: 200,
  medium: 400,
  bold: 600,
  black: 800,
};

const overrides = {
  styles,
  colors,
  fonts,
  fontWeights,
  // other foundational style overrides go here
  components: {
    Checkbox: checkboxTheme,
    Text: textTheme,
    // other components go here
  },
};

export default extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: 'brand' })
) as Theme;
