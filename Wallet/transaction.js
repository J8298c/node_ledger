/* eslint-disable operator-assignment */
/* eslint-disable no-useless-return */
/* eslint-disable arrow-parens */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const ChainUtils = require('../chain.utils');
const { MINIG_REWARD } = require('../config');

class Transaction {
  constructor() {
    this.id = ChainUtils.id();
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

    if (amount > senderOutput.amount) {
      console.log(`Amount: ${amount} exceeds balance`);
      return;
    }
    senderOutput.amount = senderOutput.amount - amount;

    this.outputs.push({ amount, address: recipient });
    Transaction.signTransaction(this, senderWallet);

    return this;
  }

  static transactionWithOutputs(senderWallet, outputs) {
    const transaction = new this();
    transaction.outputs.push(...outputs);
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static newTransaction(senderWallet, recipient, amount) {
    if (amount > senderWallet.balance) {
      console.log(`Amount ${amount} exceeds current balance`);
      return;
    }

    return Transaction.transactionWithOutputs(senderWallet, [
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient },
    ]);
  }

  static rewardsTransaction(minerWallet, blockchainWallet) {
    return Transaction.transactionWithOutputs(blockchainWallet, [{
      amount: MINIG_REWARD, address: minerWallet.publicKey,
    }]);
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtils.hash(transaction.outputs)),
    };
  }

  static verifyTransaction(transaction) {
    return ChainUtils.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtils.hash(transaction.outputs),
    );
  }
}

module.exports = Transaction;
