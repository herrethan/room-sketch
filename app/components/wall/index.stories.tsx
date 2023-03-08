import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Wall from '.';
import Scene from '../scene';
import RoomContainer from '../room-container';

export default {
  title: 'Wall/Single',
  component: Wall,
} as ComponentMeta<typeof Wall>;

const Template: ComponentStory<typeof Wall> = args => (
  <RoomContainer>
    <Scene showOrigin rotateX={45} rotateZ={45}>
      <Wall {...args} />
    </Scene>
  </RoomContainer>
);

export const Default = Template.bind({});
Default.args = {
  position: [
    [0, 0],
    [0, 5],
  ],
};

export const UpperRight = Template.bind({});
UpperRight.args = {
  position: [
    [1, 1],
    [5, 1],
  ],
};

export const UpperLeft = Template.bind({});
UpperLeft.args = {
  position: [
    [-2, 2],
    [-2, 8],
  ],
};

export const LowerLeft = Template.bind({});
LowerLeft.args = {
  position: [
    [-2, -2],
    [-5, -2],
  ],
};

export const LowerRight = Template.bind({});
LowerRight.args = {
  position: [
    [2, -2],
    [5, -2],
  ],
};
