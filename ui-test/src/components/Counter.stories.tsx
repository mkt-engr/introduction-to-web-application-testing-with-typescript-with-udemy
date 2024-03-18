import { Meta, StoryObj } from "@storybook/react";
import Counter from "./Counter";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest"; //この行を追加しないと通常のJestを使うことになりエラーになる

const meta: Meta<typeof Counter> = {
  title: "Counter",
  component: Counter,
} satisfies Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof Counter>;

export const Default: Story = {};

export const Testing: Story = {
  args: {
    initialCount: 50,
  },
  play: async ({ canvasElement }) => {
    //Counterコンポーネントのレンダリング
    const canvas = within(canvasElement);

    //初期表示時にはカウントが50であることを確認
    const h2 = canvas.getByRole("heading");
    await expect(h2).toHaveTextContent("50");

    //「＋」ボタンを押し、カウントが51になることを確認
    const incrementButton = canvas.getByRole("button", { name: "＋" });
    await userEvent.click(incrementButton);
    await expect(h2).toHaveTextContent("51");

    //「ー」ボタンを押し、カウントが50になることを確認
    const decrementButton = canvas.getByRole("button", { name: "ー" });
    await userEvent.click(decrementButton);
    await userEvent.click(decrementButton);
    await expect(h2).toHaveTextContent("49");
  },
};
