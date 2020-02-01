const BlockChain = require('./blockchain');
const Block = require('./block')
describe('BlockChain', () => {
  let bc;

  beforeEach(() => {
    bc = new BlockChain()
  })

  it('should start with one `Block` in the chain', () => {
    expect(bc.chain.length).toEqual(1)
  })

  it('first block `data` should match genesis block', () => {
    expect(bc.chain[0].data).toEqual(Block.genesis().data)
  })

  it('adds a new block', () => {
    const data = 'foo';

    bc.addBlock(data)

    expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
  })
})
