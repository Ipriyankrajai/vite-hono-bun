import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

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

const createPostSchema = z.object({
  title: z.string(),
  amount: z.number(),
});
type TCreatePostSchema = z.infer<typeof createPostSchema>;

export const expenseRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = c.req.valid("json");
    return c.json(expense);
  });
