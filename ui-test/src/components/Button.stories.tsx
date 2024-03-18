import Button from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    label: {
      options: ["Primaryボタン", "Normalボタン"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Primaryボタン2",
    primary: true,
    onClick: () => console.log("Primaryボタンがクリックされました"),
  },
};

export const Normal: Story = {
  args: {
    label: "Normalボタン",
    primary: false,
  },
};
