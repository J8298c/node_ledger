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
    console.log(chain[0])
    console.log(Block.genesis())

    for(let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i-1]
      if(block.lasthash !== lastBlock.hash || block.hash !== Block.blockHash(block)) return false;
    }

    return true;
  }

  replaceChain(newChain) {
    if(JSON.stringify(newChain[0]) !== JSON.stringify(this.chain[0])) return false
    const message = 'trying to add invalid chain'
    if(newChain.length <= this.chain.length) {
      console.log(message)
      console.log('not longer')
      return;
    } else if(!this.isValidChain(newChain)) {
      console.log(message)
      console.log('reci not valid')
      return
    } else {
      this.chain = newChain
      console.log('replacing current chain')
    }

  }

}

module.exports = BlockChain;
