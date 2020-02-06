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
    transaction = wallet.createTransaction('rando', 30, tp)
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

  describe('mixing valid and corrupt transaction', () => {
    let validTransaction;

    beforeEach(() => {
      validTransaction = [...tp.transactions];

      for(let i = 0; i < 6; i++) {
        wallet = new Wallet();
        transaction = wallet.createTransaction('rando', 30, tp);

        if(i % 2 === 0) {
          transaction.input.amount = 99999; // corrupt transaction
        } else {
          validTransaction.push(transaction);
        }
      }
    })

    it('shouws a diff between valid and corrupt transaction', () => {
      expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransaction));
    })

    it('grabs valid transaction', () => {
      expect(tp.vaildTransaction()).toEqual(validTransaction)
    })
  })
});
