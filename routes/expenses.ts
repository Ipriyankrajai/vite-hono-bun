import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type TExpense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: TExpense[] = [
  { id: 1, title: "Expense 1", amount: 100 },
  { id: 2, title: "Expense 2", amount: 200 },
  { id: 3, title: "Expense 3", amount: 300 },
];
export const expenseRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expense);
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");
    const expense = fakeExpenses.find((e) => e.id === Number(id));
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");
    const index = fakeExpenses.findIndex((e) => e.id === Number(id));
    if (index === -1) {
      return c.notFound();
    }
    const deleteExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deleteExpense });
  });
