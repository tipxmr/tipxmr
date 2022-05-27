import HeroUnit from "~/components/HeroUnit";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "HeroUnit",
  component: HeroUnit,
} as ComponentMeta<typeof HeroUnit>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof HeroUnit> = (args) => (
  <HeroUnit {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  title: "TipXMR",
  text: "Monetize your streams with Monero!",
};
