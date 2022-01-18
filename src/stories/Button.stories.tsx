import Button from "./Button"
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
    title: "Button",
    component: Button,
    argTypes: { handleClick: { action: "Clicked" } },
} as ComponentMeta<typeof Button>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof Button> = (args) => (
    <Button {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
    label: "Press me",
};
