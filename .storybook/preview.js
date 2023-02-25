import { ChakraProvider, layout } from '@chakra-ui/react';
import theme from '../app/theme';
import Typography from '../app/theme/typography';

export const decorators = [
  Story => (
    <ChakraProvider theme={theme}>
      <Typography />
      <Story />
    </ChakraProvider>
  ),
];

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
};
