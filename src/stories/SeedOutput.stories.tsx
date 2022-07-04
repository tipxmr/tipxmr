import SeedOutput from "~/components/SeedOutput";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "SeedOutput",
  component: SeedOutput,
} as ComponentMeta<typeof SeedOutput>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof SeedOutput> = (args) => (
  <SeedOutput {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  seedPhrase:
    "meeting affair energy eavesdrop uneven brunt hurried sighting rash chlorine absorb gown square eating coffee entrance upstairs goat stellar jittery bogeys foolish alkaline anecdote eavesdrop",
};
