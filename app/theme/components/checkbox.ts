import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, theme as defaultTheme } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  // container: {},
  // label: {},
  // control: {},
  icon: {
    // speed up the checkmark animation
    transitionDuration: 'faster',
    animationDuration: defaultTheme.transition.duration.faster,
  },
});

export const checkboxTheme = defineMultiStyleConfig({ baseStyle });
