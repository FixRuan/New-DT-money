import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Transaction = {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextProps {
  transactions: Transaction[];
}

interface TransactionsProviderProps {
  children: ReactNode;
}

const transactionsContext = createContext({} as TransactionsContextProps);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions');
    const data = await response.json();

    setTransactions(data);
  }


  useEffect(() => {
    loadTransactions();
  }, []);


  return (
    <transactionsContext.Provider value={{ transactions }}>
      {children}
    </transactionsContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(transactionsContext);
  return context;
}
