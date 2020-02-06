class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    // place a reward for the miner
    // create block with valid transaction
    // inform p2p server to sync chains
    // clear the transaction pool for all miners & this miner with broadcast
  }
}

module.exports = Miner;