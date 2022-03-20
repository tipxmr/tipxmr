import WithdrawDialog from "~/components/wallet/WithdrawDialog";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "WithdrawDialog",
  component: WithdrawDialog,
} as ComponentMeta<typeof WithdrawDialog>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof WithdrawDialog> = (args) => (
  <WithdrawDialog {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  handleWithdraw: () => console.log(""),
  address:
    "73Ajo8zALxQdaj4UJHprYXGrxurbMtxnZiJnLaXhFQ7GKyGNgsG95LqNyRLQiaXKfMbRe5gTdnHVJV5qWJRc58x2QfyuEBz",
};
