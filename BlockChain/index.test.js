const BlockChain = require('./index');
const Block = require('./block')

describe('BlockChain', () => {
  let bc, bc2;

  beforeEach(() => {
    bc = new BlockChain()
    bc2 = new BlockChain()
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

  it('should validate a valid chain', () => {
    bc2.addBlock('foo')

    expect(bc.isValidChain(bc2.chain)).toBe(true)
  })

  it('should invalidate a chain with corrupt genesis block', () => {
    bc2.chain[0].data = 'bad data'

    expect(bc.isValidChain(bc2.chain)).toBe(false)
  })

  it('invalidates a corrupt chain', () => {
    bc2.addBlock('foo')
    bc2.chain[1].data = 'fake foo'
    expect(bc.isValidChain(bc2.chain)).toBe(false)
  })

  it('should add a new chain when a valid chain is passed in', () => {
    bc2.addBlock('goober')
    bc.replaceChain(bc2.chain)
    expect(bc.chain).toEqual(bc2.chain);
  })

  it('does not replace the chain when value is <= length', () => {
    bc.addBlock('goober')
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain)
  })
})
