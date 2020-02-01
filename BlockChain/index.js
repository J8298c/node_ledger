const Block = require('./block');


class BlockChain {
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data)

    this.chain.push(block)

    return block;
  }

  isValidChain(chain) {
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false

    for(let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i-1]

      if(block.lasthash !== lastBlock.hash || block.hash !== Block.blockHash(block)) return false;
    }

    return true;
  }

  replaceChain(newChain) {
    const message = 'trying to add invalid chain'
    if(newChain.length <= this.chain.length) {
      console.log(message)
      return;
    } else if(!this.isValidChain(newChain)) {
      console.log(message)
      return
    } else {
      this.chain = newChain
      console.log('replacing current chain')
    }

  }

}

module.exports = BlockChain;
