import IsOnlineBadge from "../components/IsOnlineBadge";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
    title: "IsOnlineBadge",
    component: IsOnlineBadge,
} as ComponentMeta<typeof IsOnlineBadge>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof IsOnlineBadge> = (args) => (
    <IsOnlineBadge {...args} />
);

export const Online = Template.bind({});
Online.args = {
    isOnline: true
};

export const Offline = Template.bind({});
Offline.args = {
    isOnline: false
};
