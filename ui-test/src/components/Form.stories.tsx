import type { Meta, StoryObj } from "@storybook/react";
import Form from "./Form";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest"; //この行を追加しないと通常のJestを使うことになりエラーになる

const meta: Meta<typeof Form> = {
  title: "Form",
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {};

export const Testing: Story = {
  play: async ({ canvasElement }) => {
    //Formコンポーネントのレンダリング
    const canvas = within(canvasElement);

    //初期表示時には入力欄が空であることを確認
    const input = canvas.getByRole("textbox");
    await expect(input).toHaveTextContent("");

    //入力欄に文字列を入力し、入力された文字列が表示されていることを確認
    await userEvent.type(input, "play function");
    await expect(canvas.getByDisplayValue("play function")).toBeInTheDocument();
  },
};
