import { ExpenseRepository } from "../repositories/expenseRepository";
import { Expense, Group } from "../type";
import { ExpenseService } from "./expenseService";
import { GroupService } from "./groupService";

describe("ExpenseService", () => {
  let mockGroupService: Partial<GroupService>;
  let mockExpenseRepository: Partial<ExpenseRepository>;
  let expenseService: ExpenseService;

  const group: Group = { name: "group1", members: ["user1", "user2"] };
  const expense: Expense = {
    groupName: "group1",
    expenseName: "food",
    amount: 2000,
    payer: "user1",
  };

  beforeEach(() => {
    mockGroupService = {
      getGroupByName: jest.fn(),
    };
    mockExpenseRepository = {
      loadExpenses: jest.fn(),
      saveExpense: jest.fn(),
    };

    expenseService = new ExpenseService(
      mockExpenseRepository as ExpenseRepository,
      mockGroupService as GroupService
    );
  });

  describe("addExpenseのテスト", () => {
    it("支出が登録されること", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(group);
      expenseService.addExpense(expense);
      expect(mockExpenseRepository.saveExpense).toHaveBeenCalledWith(expense);
    });

    it("グループが存在しない場合はエラーがスローされること", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(
        undefined
      );
      expect(() => expenseService.addExpense(expense)).toThrowError(
        "グループ： group1 が存在しません"
      );
    });
    it("支払い者がグループに存在しない場合はエラーがスローされること", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(group);

      const nonMemberExpense = { ...expense, payer: "user3" };
      expect(() => expenseService.addExpense(nonMemberExpense)).toThrowError(
        "支払い者がメンバーの中にいません"
      );
    });
  });
});
