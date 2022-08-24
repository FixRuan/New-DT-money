import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

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
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

const transactionsContext = createContext({} as TransactionsContextProps);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query,
      }
    })

    setTransactions(response.data);
  }


  useEffect(() => {
    fetchTransactions();
  }, []);


  return (
    <transactionsContext.Provider value={{
      transactions, fetchTransactions
    }}
    >
      {children}
    </transactionsContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(transactionsContext);
  return context;
}
