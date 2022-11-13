import { ComponentMeta, ComponentStory } from "@storybook/react";

import InfoCard from "~/components/InfoCard";

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
  btnText: "Sign me up, Jimmy",
  infos: {
    1: "Point 1",
    2: "Point 2",
    3: "Point 3",
  },
};

export const ForViewer = Template.bind({});
ForViewer.args = {
  title: "For Viewers",
  btnText: "Let me watch, Jimmy",
  infos: {
    1: "Point 1",
    2: "Point 2",
    3: "Point 3",
  },
};
