const Block = require("./block");

class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);
    return block;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      console.log("genesis blocks not equal");
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i]; // block at index of 1
      const lastBlock = chain[i - 1]; // should be genesis block

      if (
        block.lasthash !== lastBlock.hash ||
        Block.blockHash(block) !== block.hash
      ) {
        console.log(`chain doesnt match current chain`)
        return false;
      }
      console.log('valid chain')
      return true;
    }
  }

  replaceChain(newChain) {
    if(newChain.length <= this.chain.length) {
      console.log('chain is not longer then current chain')
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log('new chain is not valid')
      return;
    }

    this.chain = newChain;
    console.log('replacing current chain')
  }

}

module.exports = BlockChain;
