import Login from "../components/Login"
import { ComponentStory, ComponentMeta } from "@storybook/react"

export default {
    title: "Login",
    component: Login,
} as ComponentMeta<typeof Login>

const Template: ComponentStory<typeof Login> = (args) => (
    <Login {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
    handleSubmit: (e) => { console.log(e) }
}
