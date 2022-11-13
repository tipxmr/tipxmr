import { ComponentMeta,ComponentStory } from "@storybook/react";

import StreamerChip from "~/components/StreamerChip";

export default {
  title: "StreamerChip",
  component: StreamerChip,
} as ComponentMeta<typeof StreamerChip>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof StreamerChip> = (args) => (
  <StreamerChip {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  name: "AlexAnarcho",
};
