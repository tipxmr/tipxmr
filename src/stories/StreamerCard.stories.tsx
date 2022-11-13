import { ComponentMeta,ComponentStory } from "@storybook/react";

import StreamerCard from "../components/StreamerCard";

export default {
  title: "StreamerCard",
  component: StreamerCard,
  argTypes: { handleClick: { action: "Clicked" } },
} as ComponentMeta<typeof StreamerCard>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof StreamerCard> = (args) => (
  <StreamerCard {...args} />
);

export const Demo = Template.bind({});
Demo.args = {
  streamer: {
    name: "AlexAnarcho",
    avatar:
      "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg",
  },
};
