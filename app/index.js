const express = require('express');
const bodyParser = require('body-parser');
const BlockChain = require('../BlockChain');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json({ limit: '50mb'}))


const bc = new BlockChain();

app.get('/blocks', (req, res) => {
  res.json(bc.chain)
})


app.post('/mine', (req, res) => {
  if(!req.body.data) return res.send('no data sent')

  const block = bc.addBlock(req.body.data)
  console.log(`New Block added ${block.toString()}`)

  return res.redirect('/blocks');
})

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`)
});