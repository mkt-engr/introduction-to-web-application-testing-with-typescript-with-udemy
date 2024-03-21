import { Expense } from "../type";
import { calculateSettlements } from "./settlements";

calculateSettlements;

describe("calculateSettlements", () => {
  it("生産リストが算出されること", () => {
    const expenses: Expense[] = [
      {
        groupName: "グループ1",
        expenseName: "食費",
        amount: 300,
        payer: "user1",
      },
      {
        groupName: "グループ1",
        expenseName: "ガソリン代",
        amount: 100,
        payer: "user2",
      },
    ];

    const groupMembers = ["user1", "user2", "user3"];
    const expectedSettlements = [
      {
        from: "user2",
        to: "user1",
        amount: 34,
      },
      {
        from: "user3",
        to: "user1",
        amount: 133,
      },
    ];

    const result = calculateSettlements(expenses, groupMembers);
    expect(result).toEqual(expectedSettlements);
  });
});
