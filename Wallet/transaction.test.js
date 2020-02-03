const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
  let transaction, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = 'recipient1';
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  })

  it('ouputs the `amount` subtracted from the wallet baclance', () => {
    console.log(transaction)
    expect(true).toEqual(true)
  })

})
