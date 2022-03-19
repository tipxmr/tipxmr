import { Chart } from "~/components";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Chart",
  component: Chart,
} as ComponentMeta<typeof Chart>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof Chart> = (args) => <Chart {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
