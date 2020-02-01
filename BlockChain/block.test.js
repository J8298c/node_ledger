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
})
