import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type { WallsProps } from '.';
import Walls from '.';
import Scene from '../scene';
import RoomContainer from '../room-container';

export default {
  title: 'Walls/Multiple',
  component: Walls,
} as ComponentMeta<typeof Walls>;

// for the love of prettier,
// find a better solution to prevent these
// arrays from breaking into a million lines
// prettier-ignore
const sampleRoomWalls: WallsProps['walls'] = [
  { position: [[-10, -5], [-10, 10]] },
  { position: [[-10, 10], [5, 10]] },
  { position: [[5, 10], [9, 6]] },
  { position: [[9, 6], [12, 6]] },
  { position: [[12, 6], [12, -5]] },
  { position: [[12, -5], [-10, -5]] },
];

const Template: ComponentStory<typeof Scene> = args => (
  <RoomContainer>
    <Scene {...args}>
      <Walls walls={sampleRoomWalls} />
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

// prettier-ignore
const sampleCornerWalls: WallsProps['walls'] = [
  { position: [[-10, -5], [-10, 10]] },
  { position: [[-10, 10], [-5, 5]] },
  { position: [[-5, 5], [-5, 10]] },
  { position: [[-5, 10], [-3, 8]] },
  { position: [[-3, 8], [4, 8]] },
  { position: [[4, 8], [1, 5]] },
  { position: [[1, 5], [4, 2]] },
  { position: [[4, 2], [4, -3]] },
  { position: [[4, 2], [4, 4]] },
  { position: [[4, -3], [0, -3]] },
  { position: [[-4, -3], [-3, 3]] },
];

const CornersTemplate: ComponentStory<typeof Scene> = args => (
  <RoomContainer>
    <Scene {...args}>
      <Walls walls={sampleCornerWalls} />
    </Scene>
  </RoomContainer>
);

export const Corners = CornersTemplate.bind({});
Corners.args = {
  zoom: 1,
  showOrigin: true,
  rotateX: 0,
  rotateZ: 0,
};
