import { Hono } from "hono";

type TExpense = {
  id: number;
  title: string;
  amount: number;
};

const fakeExpenses: TExpense[] = [
  { id: 1, title: "Expense 1", amount: 100 },
  { id: 2, title: "Expense 2", amount: 200 },
  { id: 3, title: "Expense 3", amount: 300 },
];

export const expenseRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", (c) => {
    const expense = c.req.json();
    return c.json({ message: "Hello, Hono!" });
  });
