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
}

module.exports = Block;