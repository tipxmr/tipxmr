import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DonationSettingsForm } from "../components";

export default {
  title: "DonationSettingsForm",
  component: DonationSettingsForm,
} as ComponentMeta<typeof DonationSettingsForm>;

const Template: ComponentStory<typeof DonationSettingsForm> = (args) => (
  <DonationSettingsForm {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  donationSettings: {
    secondPrice: 0.0001,
    charPrice: 0.00002,
    charLimit: 140,
    minAmount: 0.00043,
    gifsMinAmount: 0.002,
    goal: 100,
  },
  handleSubmit: () => console.log("Sumitted"),
};
