import { ComponentMeta,ComponentStory } from "@storybook/react";

import LanguageSelector from "../components/LanguageSelector";

export default {
  title: "LanguageSelector",
  component: LanguageSelector,
} as ComponentMeta<typeof LanguageSelector>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof LanguageSelector> = (args) => (
  <LanguageSelector {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
