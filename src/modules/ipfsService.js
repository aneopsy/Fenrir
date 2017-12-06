import ipfs from 'browser-ipfs';

/*
 * WORKING BUT NEED INFURA.IO IPFS NODE => Go to browser node with lib like libp2p-ipfs-browser
 */

ipfs.setProvider({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', root: '/api/v0' });

const ipfsService = {
  safeInit(callback) {
    if (ipfs.localProvider.host != 'ipfs.infura.io') {
      ipfs.setProvider({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', root: '/api/v0' });
    }
  },
  store(data, callback) {
    ipfs.add(new Buffer(data), (error, hash) => {
      if (error) {
        throw error;
      } else {
        // console.log(`Successfully stored on ipfs: ${hash}`);
        return callback(error, hash);
      }
    });
  },
  fetch(hash, callback) {
    ipfs.cat(hash, (err, res) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        // console.log(`This the data stored on ipfs at: ${res}`);
        return callback(null, res, hash);
      }
    });
  },
};

export default ipfsService;

const Registry = Contract(regsitryArtifact);
Registry.setProvider(web3.currentProvider);

let registry;


Registry.deployed()
  .then((registry) => {
    registry.set(key, address, regSafeIpfs, { from: address }).then(() =>
      registry.get.call(key, address, address).then(ipfsHashHex => {
        console.log(ipfsHashHex);
        const ipfsHash = hexToBase58(`1220${ipfsHashHex.slice(2)}`);
        console.log(ipfsHash);
      })
    );
  });
