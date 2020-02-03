const ChainUtil = require('../chain.utils')

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this();

    if(senderWallet.balance < amount) {
      console.log(`Amount ${amount} exceeds balance`)
      return
    }

    transaction.outputs.push(...[
      { amount: senderWallet - balance, address: senderWallet.publicKey },
      { amount, address: recipient }
    ])

    return transaction
  }
}

module.exports = Transaction;