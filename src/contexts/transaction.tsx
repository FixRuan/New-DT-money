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

export interface CreateTransactionData {
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
}

interface TransactionsContextProps {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionData) => Promise<void>;
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
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })

    setTransactions(response.data);
  }

  async function createTransaction(data: CreateTransactionData) {
    const { description, price, category, type } = data;

    const response = await api.post('/transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date()
    });

    setTransactions(state => [...state, response.data]);
  }


  useEffect(() => {
    fetchTransactions();
  }, []);


  return (
    <transactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction
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
