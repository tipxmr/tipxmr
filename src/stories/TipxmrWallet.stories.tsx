import { ComponentMeta,ComponentStory } from "@storybook/react";

import TipxmrWallet from "~/components/wallet/TipxmrWallet";

export default {
  title: "TipxmrWallet",
  component: TipxmrWallet,
} as ComponentMeta<typeof TipxmrWallet>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof TipxmrWallet> = (args) => (
  <TipxmrWallet {...args} />
);

export const Synced = Template.bind({});
Synced.args = {
  balance: 1000,
  isSynced: true,
};
export const NotSynced = Template.bind({});
NotSynced.args = {
  balance: 1000,
  height: 2131222,
  isSynced: false,
  percentDone: 78,
  endHeight: 2131242,
};
