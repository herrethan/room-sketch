import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Scene from '.';
import { Box } from '@chakra-ui/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Scene/Background',
  component: Scene,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   rotateX: { control: "" },
  // },
} as ComponentMeta<typeof Scene>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Scene> = args => (
  <Box height="100vh">
    <Scene {...args} />
  </Box>
);

export const Rotated = Template.bind({});
Rotated.args = {
  rotateX: 45,
  rotateY: 0,
  rotateZ: 45,
};

export const Origin = Template.bind({});
Origin.args = {
  zoom: 1,
  showOrigin: true,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
};
