const express = require('express');
const bodyParser = require('body-parser');
const BlockChain = require('../BlockChain');
const P2PServer = require('./p2p-server');
const Wallet = require('../Wallet');
const TransactionPool = require('../Wallet/transaction-pool');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json({ limit: '50mb'}))


const bc = new BlockChain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2PServer(bc)

app.get('/blocks', (req, res) => {
  res.json(bc.chain)
})

app.get('/transactions', (req, res) => {
  res.json(tp.transactions);
})

app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body;

  const transaction = wallet.createTransaction(recipient, amount, tp);

  res.redirect('/transactions')
})


app.post('/mine', (req, res) => {
  if(!req.body.data) return res.send('no data sent')

  const block = bc.addBlock(req.body.data)
  console.log(`New Block added ${block.toString()}`)
  p2pServer.syncChain();
  return res.redirect('/blocks');
})

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`)
});

p2pServer.listen()