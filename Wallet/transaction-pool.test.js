/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable one-var */
const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
  // eslint-disable-next-line one-var-declaration-per-line
  let tp, wallet, transaction;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction = Transaction.newTransaction(wallet, 'recipient', 30);
    tp.updateOrAddTransaction(transaction);
  });

  it('adds a `transaction` to the pool', () => {
    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  });

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction);

    const newTransaction = transaction.update(wallet, 'som rand', 40);

    tp.updateOrAddTransaction(newTransaction);

    // eslint-disable-next-line arrow-parens
    expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
      .not.toEqual(oldTransaction);
  });
});
