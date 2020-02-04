const EC = require('elliptic').ec;
const SHA2565 = require('crypto-js/sha256');
const uuidV1 = require('uuid/v1')
const ec = new EC('secp256k1')


class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair()
  }

  static id() {
    return uuidV1()
  }

  static hash(data) {
    return SHA2565(JSON.stringify(data)).toString()
  }
}


module.exports = ChainUtil;