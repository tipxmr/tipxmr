import Register from "~/components/Register";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Register",
  component: Register,
} as ComponentMeta<typeof Register>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof Register> = (args) => (
  <Register {...args} />
);

export const Loaded = Template.bind({});
Loaded.args = {
  seedLang: "English",
  seedPhrase:
    "gimmick egotistic vials bypass gang vigilant atom lopped woven rotate ferry toffee licks medicate hotel amused abrasive oncoming sifting camp fugitive roped menu mixture woven",
};

export const Loading = Template.bind({});
Loading.args = {
  seedLang: "English",
  seedPhrase: "",
  handleSubmit: (e) => {
    console.log(e);
  },
};
