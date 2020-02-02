const WebSocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001; 
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
class P2PServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = []
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
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new WebSocket(peer)
      socket.on('open', () => this.connectSocket(socket))
    })
  }
}

module.exports = P2PServer;