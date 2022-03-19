import { WalletSettingsForm } from "~/components";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "WalletSettingsForm",
  component: WalletSettingsForm,
} as ComponentMeta<typeof WalletSettingsForm>;

const Template: ComponentStory<typeof WalletSettingsForm> = (args) => (
  <WalletSettingsForm {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  walletSettings: {
    restoreHeight: 100,
  },
  handleSubmit: () => console.log("Sumitted"),
};
