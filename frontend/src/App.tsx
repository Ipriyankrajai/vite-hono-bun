import { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function getTotalSpent() {
      const resp = await fetch("/api/expenses/total-spent");
      const data = await resp.json();
      setTotalSpent(data.total);
    }
    getTotalSpent();
  }, []);
  return (
    <>
      <Card className="max-w-xl m-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Total amount you have spent</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{totalSpent}</p>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
