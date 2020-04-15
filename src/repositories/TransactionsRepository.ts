import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private incomeSoma(): number {
    const income = this.transactions.filter(valor => valor.type === 'income');

    const total = income.reduce((result: number, quant: Transaction) => {
      return result + quant.value;
    }, 0);

    return total;
  }

  private outcomeSoma(): number {
    const outcome = this.transactions.filter(valor => valor.type === 'outcome');

    const total = outcome.reduce((result: number, quant: Transaction) => {
      return result + quant.value;
    }, 0);

    return total;
  }

  private total(): number {
    return this.incomeSoma() - this.outcomeSoma();
  }

  public getBalance(): Balance {
    return {
      income: this.incomeSoma(),
      outcome: this.outcomeSoma(),
      total: this.total(),
    };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
