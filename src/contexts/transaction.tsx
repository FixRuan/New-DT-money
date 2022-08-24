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
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

const transactionsContext = createContext({} as TransactionsContextProps);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const url = new URL('http://localhost:3000/transactions');

    if (query) {
      url.searchParams.append('q', query);
    }

    const response = await fetch(url);
    const data = await response.json();

    setTransactions(data);
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
