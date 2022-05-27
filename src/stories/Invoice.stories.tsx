import Invoice from "~/components/Invoice";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Invoice",
  component: Invoice,
} as ComponentMeta<typeof Invoice>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof Invoice> = (args) => (
  <Invoice {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
