
export interface Transaction {
  id: string,
  amount: number,
  date: string,
  label: string,
  type: ExpenseType
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export const CHART_COLORS = [
  '#FF5733',
  '#28C744',
  '#5733FF',
  '#FF33BE',
  '#33D9FF',
  '#FFC300',
  '#EC0A0A',
  '#01CFAD',
  '#B633FF',
  '#0088EE',
];

export enum ExpenseType {
  Housing = 'Housing',
  Transportation = 'Transportation',
  Food = 'Food',
  Utilities = 'Utilities',
  Clothing = 'Clothing',
  Medical = 'Medical/Healthcare',
  Insurance = 'Insurance',
  Supplies = 'Household Items/Supplies',
  Entertainment = 'Entertainment',
  Personal = 'Personal',
}


export enum ReducerActions {
  ADD,
  DELETE,
  CHANGE,
  ADD_MULTIPLE
}

export type Action =
  | { type: ReducerActions.ADD; item: Transaction }
  | { type: ReducerActions.CHANGE; item: Transaction }
  | { type: ReducerActions.DELETE; item: Transaction }
  | { type: ReducerActions.ADD_MULTIPLE; items: Transaction[] };

export interface Aggregate {
  type: string,
  amount: number
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export const parseStringToDate = (dateString: string): Date | null => {
  const parts = dateString.split('-');

  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return null; // Invalid format
}

export const generateRandomColor = (count: number): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(CHART_COLORS[i % CHART_COLORS.length]);
  }
  return colors;
}

export const calculateTotalAmount = (data: Transaction[]): number => {
  return data.reduce((total: number, item: Transaction) => total + item.amount, 0);
}

export const calculateData = (transactions: Transaction[]): Aggregate[] => {
  // Group and aggregate data by type
  const groupedData: Aggregate[] = transactions.reduce((result: { type: ExpenseType; amount: number; }[], item: Transaction) => {
    const existingItem = result.find(group => group.type === item.type);
    if (existingItem) {
      existingItem.amount += item.amount;
    } else {
      result.push({ type: item.type, amount: item.amount });
    }
    return result;
  }, []);

  return groupedData
}