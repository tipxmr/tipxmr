import { DonationMask } from "~/components";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
    title: "DonationMask",
    component: DonationMask,
} as ComponentMeta<typeof DonationMask>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof DonationMask> = (args) => (
    <DonationMask {...args} />
);

export const AlexAnarcho = Template.bind({});
AlexAnarcho.args = {
    streamerName: "AlexAnarcho"
};
