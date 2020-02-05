/* eslint-disable arrow-parens */
class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    const transactionWithId = this.transactions.find(t => t.id === transaction.id);
    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] = this.transactions;
    } else {
      this.transactions.push(transaction);
    }
  }
}

module.exports = TransactionPool;
