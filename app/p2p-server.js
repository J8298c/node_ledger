const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectSocket(socket))

    this.connectToPeers();
    console.log(`Peer to Peer connected on port: ${P2P_PORT}`)
  }


  connectSocket(socket) {
    this.sockets.push(socket)
    console.log('Socket Connected')
  }

  connectToPeers() {
    peers.forEach(p => {
      const socket = Websocket(p)
      socket.on('open', () => this.connectSocket(socket));
    })
  }

}

module.exports = P2pServer;