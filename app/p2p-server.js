const WebSocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001; 
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

const MESSAGE_TYPE = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION'
}
class P2PServer {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.sockets = [];
  }

  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT })
    server.on('connection', socket => this.connectSocket(socket))
    this.connectToPeers();
    console.log(`Peer to Peer listening on port: ${P2P_PORT}`)
  }

  connectSocket(socket) {
    console.log('socket connected')
    this.sockets.push(socket)
    this.messageHandler(socket);
    this.sendChain(socket)
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new WebSocket(peer)
      socket.on('open', () => this.connectSocket(socket))
    })
  }

  messageHandler(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message);
      switch(data.type) {
        case MESSAGE_TYPE.chain:
          this.blockchain.replaceChain(data.chain);
          break;
        case MESSAGE_TYPE.transaction:
            this.transactionPool.updateOrAddTransaction(data.transaction)
          break;
        default:
          return;
      }
    })
  }

  syncChain() {
    this.sockets.forEach(socket => this.sendChain(socket))
  }

  sendChain(socket) {
    socket.send(JSON.stringify({ type: MESSAGE_TYPE.chain, chain: this.blockchain.chain }))
  }

  sendTransaction(socket, transaction) {
    socket.send(JSON.stringify({ type: MESSAGE_TYPE.transaction, transaction }))
  }

  broadcastTransaction(transaction) {
    this.sockets.forEach(socket => this.sendTransaction(socket, transaction))
  }
}

module.exports = P2PServer;