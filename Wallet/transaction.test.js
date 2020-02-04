/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable one-var */
/* eslint-disable no-undef */
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Trasnsaction', () => {
  // eslint-disable-next-line one-var-declaration-per-line
  let transaction, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = 'recipient1';

    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it('outputs the `amount` sub from wallet balance', () => {
    expect(
      transaction.outputs.find(output => output.address === wallet.publicKey).amount
    ).toEqual(wallet.balance - amount);
  });

  it('outputs the `amount` added to the recipient', () => {
    expect(
      transaction.outputs.find(output => output.address === recipient).amount
    ).toEqual(amount);
  });

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it('validates a valid transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });

  it('invalidates a corrupt transaction', () => {
    transaction.outputs[0].amount = 50000;
    expect(Transaction.verifyTransaction(transaction)).toBe(false);
  });

  describe('transacting with amount that exceeds balance', () => {
    beforeEach(() => {
      amount = 100000000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('does not create the transaction', () => {
      expect(transaction).toBeUndefined();
    });
  });
});
