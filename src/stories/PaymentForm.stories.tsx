import { ComponentMeta,ComponentStory } from "@storybook/react";

import PaymentForm from "~/components/invoice/PaymentForm";

export default {
  title: "PaymentForm",
  component: PaymentForm,
} as ComponentMeta<typeof PaymentForm>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof PaymentForm> = (args) => (
  <PaymentForm {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
