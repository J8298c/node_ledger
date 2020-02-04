const ChainUtil = require('../chain.utils');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
  constructor(timestamp, lasthash, hash, data, nonce, diffculty) {
    this.timestamp = timestamp;
    this.lasthash = lasthash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.diffculty = diffculty || DIFFICULTY
  }

  toString() {
    return `Block -
    Timestamp : ${this.timestamp}
    Last Hash : ${this.lasthash.substring(0, 10)}
    Hash      : ${this.hash.substring(0, 10)}
    Nonce     : ${this.nonce}
    Difficulty: ${this.diffculty}
    Data      : ${this.data}`;
  }

  // static gives the ability to call method with creating block
  // instance
  static genesis() {
    return new this('Genesis time', '------', 'f1r57-h45h', [], 0, DIFFICULTY)
  }

  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let { diffculty } = lastBlock;
    let nonce = 0

    do{
      nonce++
      timestamp = Date.now();
      diffculty = Block.adjustDiffculty(lastBlock, timestamp)
      hash = Block.hash(timestamp, lastHash, data, nonce, diffculty);
    } while(hash.substr(0, diffculty) !== '0'.repeat(diffculty))

    return new this(timestamp, lastHash, hash, data, nonce, diffculty);
  }


  static hash(timestamp, lastHash, data, nonce, diffculty) {
    return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${diffculty}`).toString();
  }

  static blockHash(block) {
    const { timestamp, lasthash, data, nonce, diffculty } = block;

    return this.hash(timestamp, lasthash, data, nonce, diffculty)
  }

  static adjustDiffculty(lastblock, currenttime) {
    let { diffculty } = lastblock;

    return lastblock.timestamp + MINE_RATE > currenttime ? diffculty + 1 : diffculty - 1

  }

}

module.exports = Block;
