import { ComponentMeta, ComponentStory } from "@storybook/react";

import NumberInput from "~/components/NumberInput";

export default {
  title: "NumberInput",
  component: NumberInput,
} as ComponentMeta<typeof NumberInput>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof NumberInput> = (args) => (
  <NumberInput {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
