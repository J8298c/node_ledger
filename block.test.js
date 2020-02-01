const Block = require('./block');

describe('Block', () => {
  let data;
  let lastBlock;
  let block;

  beforeEach(() => {
    data = 'bar';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  })
  it('sets `data` to match input passed', () => {
    console.log(block)
    console.log(lastBlock)
    expect(block.data).toEqual(data);
  })

  it('sets the `lastHash` to match the hash of last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash)
  })
})