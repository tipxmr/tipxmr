import Footer from "../components/Footer"
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
    title: "Footer",
    component: Footer,
    argTypes: { handleClick: { action: "Clicked" } },
} as ComponentMeta<typeof Footer>;

// Passing all the arguments to the Footer
const Template: ComponentStory<typeof Footer> = (args) => (
    <Footer {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
    backgroundColor: "red",
};
