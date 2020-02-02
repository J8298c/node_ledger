const SHA2565 = require('crypto-js/sha256');
const { DIFFICULTY } = require('../config');
class Block {
  constructor(timestamp, lasthash, hash, data, nonce) {
    this.timestamp = timestamp;
    this.lasthash = lasthash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  toString() {
    return `Block -
    Timestamp: ${this.timestamp}
    Last Hash: ${this.lasthash.substring(0, 10)}
    Hash     : ${this.hash.substring(0, 10)}
    Nonce    : ${this.nonce}
    Data     : ${this.data}`;
  }

  // static gives the ability to call method with creating block
  // instance
  static genesis() {
    return new this('Genesis time', '------', 'f1r57-h45h', [], 0)
  }

  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;

    let nonce = 0

    do{
      nonce++
      timestamp = Date.now();
      hash = Block.hash(timestamp, lastHash, data, nonce);
    } while(hash.substr(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY))
    
    return new this(timestamp, lastHash, hash, data, nonce);
  }

  static hash(timestamp, lastHash, data, nonce) {
    return SHA2565(`${timestamp}${lastHash}${data}${nonce}`).toString();
  }

  static blockHash(block) {
    const { timestamp, lasthash, data, nonce } = block;

    return this.hash(timestamp, lasthash, data, nonce)
  }

}

module.exports = Block;
