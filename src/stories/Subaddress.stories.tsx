import Subaddress from "~/components/Subaddress";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Subaddress",
  component: Subaddress,
} as ComponentMeta<typeof Subaddress>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof Subaddress> = (args) => (
  <Subaddress {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  address:
    "73Ajo8zALxQdaj4UJHprYXGrxurbMtxnZiJnLaXhFQ7GKyGNgsG95LqNyRLQiaXKfMbRe5gTdnHVJV5qWJRc58x2QfyuEBz",
};
