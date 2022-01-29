import InfoCard from "../components/InfoCard";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
    title: "InfoCard",
    component: InfoCard,
} as ComponentMeta<typeof InfoCard>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof InfoCard> = (args) => (
    <InfoCard {...args} />
);

export const ForStreamer = Template.bind({});
ForStreamer.args = {
    title: "For Streamers",
    chipText: "Welcome",
    chipRef: "https://duckduckgo.com",
    linkText: "Sign me up, Jimmy",
    heading: "Here is a heading",
    linkRef: "https://duckduckgo.com",
    text: "Lorem ipsum text here ",
};

export const ForViewer = Template.bind({});
ForViewer.args = {
    title: "For Streamers",
    chipText: "Blog",
    chipRef: "https://duckduckgo.com",
    linkText: "Sign me up, Jimmy",
    heading: "Here is a heading",
    linkRef: "https://duckduckgo.com",
    text: "Lorem ipsum text here ",
};
