import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Editor from '.';
import { EditorProvider } from './provider';
import type { Wall } from '~/data/walls';

export default {
  title: 'Editor/Default',
  component: Editor,
} as ComponentMeta<typeof Editor>;

// prettier-ignore
const someWalls: Wall[] = [
  { position: [[-5, -3], [-5, 3]] },
  { position: [[-5, 3], [5, 3]] },
  { position: [[5, 3], [5, -3]] },
  { position: [[5, -3], [-5, -3]] },
];

const Template: ComponentStory<typeof Editor> = args => (
  <EditorProvider defaultWalls={someWalls}>
    <Editor />
  </EditorProvider>
);

export const Default = Template.bind({});
