import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import UIKit from './ui-kit';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Playground',
  component: UIKit,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} as ComponentMeta<typeof UIKit>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UIKit> = args => <UIKit />;

export const Playground = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Solid.args = {
//   variant: "solid",
//   children: "Button",
// };

// export const Outline = Template.bind({});
// Outline.args = {
//   variant: "outline",
//   children: "Button",
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: "lg",
//   label: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "sm",
//   label: "Button",
// };
