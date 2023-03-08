import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Wall from '.';
import Scene from '../scene';
import RoomContainer from '../room-container';

export default {
  title: 'Wall/Multiple',
  component: Wall,
} as ComponentMeta<typeof Wall>;

const Template: ComponentStory<typeof Scene> = args => (
  <RoomContainer>
    <Scene {...args}>
      <Wall
        position={[
          [-10, -5],
          [-10, 10],
        ]}
      />
      <Wall
        position={[
          [-10, 10],
          [5, 10],
        ]}
      />
      <Wall
        position={[
          [5, 10],
          [9, 6],
        ]}
      />
      <Wall
        position={[
          [9, 6],
          [12, 6],
        ]}
      />
      <Wall
        position={[
          [12, 6],
          [12, -5],
        ]}
      />
      <Wall
        position={[
          [12, -5],
          [-10, -5],
        ]}
      />
    </Scene>
  </RoomContainer>
);

export const SampleRoom = Template.bind({});
SampleRoom.args = {
  zoom: 1,
  showOrigin: true,
  rotateX: 0,
  rotateZ: 0,
};
