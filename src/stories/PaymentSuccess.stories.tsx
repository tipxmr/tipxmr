import { ComponentMeta,ComponentStory } from "@storybook/react";

import PaymentSuccess from "~/components/PaymentSuccess";

export default {
  title: "PaymentSuccess",
  component: PaymentSuccess,
} as ComponentMeta<typeof PaymentSuccess>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof PaymentSuccess> = (args) => (
  <PaymentSuccess {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  amount: 1.23112,
  address:
    "73Ajo8zALxQdaj4UJHprYXGrxurbMtxnZiJnLaXhFQ7GKyGNgsG95LqNyRLQiaXKfMbRe5gTdnHVJV5qWJRc58x2QfyuEBz",
};
