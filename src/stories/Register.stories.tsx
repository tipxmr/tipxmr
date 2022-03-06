import Register from "../components/Register"
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
    title: "Register",
    component: Register,
} as ComponentMeta<typeof Register>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof Register> = (args) => (
    <Register {...args} />
);

export const Basic = Template.bind({});
Basic.args = {}
