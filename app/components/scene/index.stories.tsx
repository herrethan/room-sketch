import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Scene from '.';
import RoomContainer from '../room-container';

export default {
  title: 'Scene/Background',
  component: Scene,
} as ComponentMeta<typeof Scene>;

const Template: ComponentStory<typeof Scene> = args => (
  <RoomContainer>
    <Scene {...args} />
  </RoomContainer>
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
