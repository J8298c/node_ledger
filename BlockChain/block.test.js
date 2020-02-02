const Block = require('./block');
const { DIFFICULTY } = require('../config');

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
    expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY))
    console.log(block.toString())
  })
})
