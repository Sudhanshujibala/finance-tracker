"use client";
import { Button } from '@/src/app/button';
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/app/components/ui/card";
import { Input } from "@/src/app/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// If shadcn/ui not installed, run:

// npx shadcn-ui@latest add button input card

interface Transaction {
  id: number;
  amount: number;
  description: string;
  date: string;
}

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const addTransaction = () => {
    if (!amount || !description || !date) return;
    const newTransaction: Transaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      description,
      date,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDescription("");
    setDate("");
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const monthlyData = transactions.reduce((acc: any, curr) => {
    const month = new Date(curr.date).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + curr.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="p-4 grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-4">
          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button onClick={addTransaction}>Add</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet.</p>
          ) : (
            transactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between border-b py-2 text-sm"
              >
                <span>
                  {t.date} - {t.description} - ₹{t.amount}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteTransaction(t.id)}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data to show chart.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
