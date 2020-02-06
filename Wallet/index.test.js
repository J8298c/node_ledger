/* eslint-disable arrow-parens */
/* eslint-disable one-var-declaration-per-line */
/* eslint-disable no-undef */
/* eslint-disable one-var */
const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');

describe('Wallet', () => {
  let wallet, tp;

  beforeEach(() => {
    wallet = new Wallet();
    tp = new TransactionPool();
  });

  describe('wallet creates transaction', () => {
    let transaction, sendamount, reciepient;

    beforeEach(() => {
      sendamount = 50;
      reciepient = 'random address';
      transaction = wallet.createTransaction(reciepient, sendamount, tp);
    });

    describe('same transaction', () => {
      beforeEach(() => {
        wallet.createTransaction(reciepient, sendamount, tp);
      });

      it('doubles the sendamount subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - sendamount * 2);
      });

      it('clones the sendamount output for the recipient', () => {
        expect(transaction.outputs.filter(output => output.address === reciepient)
          .map(output => output.amount))
          .toEqual(([sendamount, sendamount]))
      })
    });
  });
});
