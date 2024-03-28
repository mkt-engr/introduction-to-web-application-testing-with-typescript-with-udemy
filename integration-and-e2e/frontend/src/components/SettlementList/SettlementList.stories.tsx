import { Settlement } from "../../type";
import SettlementList from "./SettlementList";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "SettlementList",
  component: SettlementList,
} satisfies Meta<typeof SettlementList>;

export default meta;

type Story = StoryObj<typeof SettlementList>;

const settlements: Settlement[] = [
  { from: "Alice", to: "Bob", amount: 1000 },
  { from: "Bob", to: "Alice", amount: 2000 },
];

export const Default: Story = {
  args: {
    settlements,
  },
};
