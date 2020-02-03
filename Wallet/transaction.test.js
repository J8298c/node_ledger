const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Trasnsaction', () => {
  let transaction, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet;
    amount = 50;
    recipient = 'recipient1'

    transaction = Transaction.newTransaction(wallet, recipient, amount);
  })

  it('outputs the `amount` sub from wallet balance', () => {
    expect(
      transaction.outputs.find(output => output.address === wallet.publicKey).amount
      ).toEqual(wallet.balance - amount)
  })

  it('outputs the `amount` added to the recipient', () => {
    expect(
      transaction.outputs.find(output => output.address === recipient).amount
      ).toEqual(amount)
  })


})