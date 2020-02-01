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

  it('should have `block` defined', () => {
    expect(block.data).toBeDefined()
  })

  it('should have `data` defined', () => {
    expect(data).toEqual('bar')
  })

  it('should have lastBlock defined', () => {
    expect(block.lasthash).toEqual(lastBlock.hash)
  })

  it('block should have lastblock hash', () => {
    expect(block.data).toEqual(data)
  })
})
