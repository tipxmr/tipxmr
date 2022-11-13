import { ComponentMeta, ComponentStory } from "@storybook/react";

import PlanForm from "~/components/Invoice/PlanForm";

export default {
  title: "PlanForm",
  component: PlanForm,
} as ComponentMeta<typeof PlanForm>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof PlanForm> = (args) => (
  <PlanForm {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
