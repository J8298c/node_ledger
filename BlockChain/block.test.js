const Block = require('./block');


describe('Block', () => {
  let data;
  let lastBlock;
  let block;

  beforeEach(() => {
    lastBlock = Block.genesis();
    data = 'bar'
    block = Block.mineBlock(lastBlock, data)
  })

  it('should have lastBlock defined', () => {
    expect(block.lasthash).toEqual(lastBlock.hash)
  })

  it('block should have lastblock hash', () => {
    expect(block.data).toEqual(data)
  })

  it('generates a `hash` that matches difficulty', () => {
    expect(block.hash.substring(0, block.diffculty)).toEqual('0'.repeat(block.diffculty))
  })

  it('should lower the diffculty', () => {
    expect(Block.adjustDiffculty(block, block.timestamp + 36000000)).toEqual(block.diffculty - 1)
  })

  it('should raise difficulty', () => {
      expect(Block.adjustDiffculty(block, block.timestamp + 1)).toEqual(block.diffculty + 1)
  })
  
})
