const SHA2565 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, lasthash, hash, data) {
    this.timestamp = timestamp;
    this.lasthash = lasthash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `Block -
    Timestamp: ${this.timestamp}
    Last Hash: ${this.lasthash.substring(0, 10)}
    Hash     : ${this.hash.substring(0, 10)}
    Data     : ${this.data}`;
  }

  // static gives the ability to call method with creating block
  // instance
  static genesis() {
    return new this('Genesis time', '------', 'f1r57-h45h', [])
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();

    const lastHash = lastBlock.hash;

    const hash = Block.hash(timestamp, lastHash, data);

    return new this(timestamp, lastHash, hash, data);
  }

  static hash(timestamp, lastHash, data) {
    return SHA2565(`${timestamp}${lastHash}${data}`).toString();
  }

  static blockHash(block) {
    const { timestamp, lasthash, data } = block;

    return this.hash(timestamp, lasthash, data)
  }

}

module.exports = Block;
