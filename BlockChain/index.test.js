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

  it('validates a vaid chain', () => {
    bc2.addBlock('foo');
    expect(bc.isValidChain(bc2.chain)).toBe(true)
  })

  it('invalidates chain with corrupt gensis block', () => {
    bc2.chain[0].data = 'wrng Data'
    expect(bc.isValidChain(bc2.chain)).toBe(false)
  })

  it('invalidates a corrupt chain', () => {
    bc2.addBlock('fooshnickes')
    bc2.chain[1].data = 'not fooshnickes'
    expect(bc.isValidChain(bc2.chain)).toBe(false)
  })

  it('should replace the current chain', () => {
    bc2.addBlock('foo shincks')
    bc.replaceChain(bc2.chain)
    expect(bc.chain).toEqual(bc2.chain)
  })

  it('should not replace chain if not longer than current chain', () => {
    bc.addBlock('first')
    bc.replaceChain(bc2.chain)
    expect(bc.chain).not.toEqual(bc2.chain)
  })
})
