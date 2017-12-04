import Web3 from 'web3';
import _ from 'lodash';
import bitcore from 'bitcore-lib';

// const web3 = new Web3('https://rinkeby.infura.io/5ysRjN9mODHFf7aqQqzp6');
const web3 = new Web3(
  new Web3.providers.HttpProvider('https://rinkeby.infura.io/5ysRjN9mODHFf7aqQqzp6')
);

// KantumID contract info
const contractAbi = [
  {
    constant: false,
    inputs: [],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'kill',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'username', type: 'bytes32' }, { name: 'publicKey', type: 'string' }],
    name: 'registerUser',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'userAddress', type: 'address' }, { name: 'ipfsHash', type: 'string' }],
    name: 'saveData',
    outputs: [{ name: 'result', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'administrator',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'username', type: 'bytes32' },
      { indexed: true, name: 'addr', type: 'address' },
      { indexed: false, name: 'publicKey', type: 'string' },
    ],
    name: 'BroadcastPublicKey',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'dataId', type: 'bytes32' },
      { indexed: true, name: 'userAddress', type: 'address' },
      { indexed: false, name: 'ipfsHash', type: 'string' },
    ],
    name: 'SaveData',
    type: 'event',
  },
];

const contractAddress = '0x190739a8e45bff5f3a73fd77c2b7a9b94f1dc748';
// Public functions to be exported
const ethereumService = {
  initialize(callback) {
    if (window.web3 === undefined) {
      return callback(false);
    }

    window.web3.eth.getTransaction(
      '0x8c78f67258d045cd2159b42525ebef9810059ce9c33c2a68b8fab48ba38f8672',
      (error, result) => {
        if (result == null) {
          console.log(`Web3 error: ${error}`);
          return callback(false);
        }
        window.kantumidContract = window.web3.eth.contract(contractAbi).at(contractAddress);
        callback(true);
      }
    );
  },
  // Get Ethereum address of the current user
  getOwnerEthereumAddress() {
    return web3.eth.accounts[0];
  },
  // Check if current MetaMask user has already registered an account
  checkIfUserExists(callback) {
    const broadcastPublicKeyEvent = window.kantumidContract.BroadcastPublicKey(
      { addr: web3.eth.accounts[0] },
      { fromBlock: 349731, toBlock: 'latest' }
    );

    broadcastPublicKeyEvent.get((error, events) => {
      if (!events.length) {
        return callback(null);
      }
      return callback({
        username: web3.toAscii(events[0].args.username),
        startingBlock: events[0].blockNumber,
      });
    });
  },
  // Generate key pair
  generateKeyPair(userData, callback) {
    web3.eth.sign(
      web3.eth.accounts[0],
      '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
      (error, result) => {
        const privateKey = bitcore.PrivateKey.fromString(result.slice(2, 66));
        return callback(privateKey.toString());
      }
    );
  },
  // Create new Ethereum account for the user
  registerUser(username, callback) {
    web3.eth.sign(
      web3.eth.accounts[0],
      '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
      (error, result) => {
        const privateKey = bitcore.PrivateKey.fromString(result.slice(2, 66));
        const publicKey = bitcore.PublicKey.fromPrivateKey(privateKey);

        window.kantumidContract.registerUser(username, publicKey.toString(), (error, result) => {
          if (error) {
            console.log(`Registration error: ${error}`);
            callback(error, null);
          } else {
            web3.eth.getBlockNumber((error, latestBlock) => {
              if (error) {
                return callback(error, null);
              }

              const userData = {
                username,
                privateKey: privateKey.toString(),
                startingBlock: latestBlock,
              };

              callback(null, userData);
            });
          }
        });
      }
    );
  },
  // Find public key belonging to the user with given email address
  getUserPublicKey(username, callback) {
    const broadcastPublicKeyEvent = window.kantumidContract.BroadcastPublicKey(
      { username: web3.fromAscii(username) },
      { fromBlock: 3497314, toBlock: 'latest' }
    );

    broadcastPublicKeyEvent.get((error, events) => {
      if (!events.length) {
        return callback('User not found', null);
      }
      const result = {
        address: events[0].args.addr,
        publicKey: events[0].args.publicKey,
      };

      callback(null, result);
    });
  },
  // Get data for the given folder. Limit the number of data by given batch size using given block number as the upper block limit
  getDataFolder(folder, batchSize, startingBlock, upperBlockLimit, callback) {
    web3.eth.getBlockNumber((error, latestBlock) => {
      findBatchOfData(
        folder,
        batchSize,
        startingBlock,
        latestBlock,
        128,
        {},
        (data, oldestDataBlock) => {
          const upperBlockLimit = oldestDataBlock != null ? oldestDataBlock - 1 : null;
          callback(data, upperBlockLimit, latestBlock, folder);
        }
      );
    });
  },
  // Listen for the incoming data for the given address
  watchForIncomingData(startBlock, callback) {
    const saveEvent = window.kantumidContract.SaveData(
      { userAddress: web3.eth.accounts[0] },
      { fromBlock: startBlock, toBlock: 'latest' }
    );

    console.log(`Watching from block: ${startBlock}`);

    saveEvent.watch((error, event) => {
      // console.log(`Got incoming data ${JSON.stringify(event)}`);
      callback(event);
    });

    return saveEvent;
  },
  // Emit new data contract event
  writeData(userAddress, ipfsHash, callback) {
    console.log(`Trying to call saveData with toAddress=${userAddress}, hash=${ipfsHash}`);

    window.kantumidContract.saveData(userAddress, ipfsHash, (error, result) => {
      if (error) {
        return callback(`Could not execute saveData() contract function!${error}`, null);
      }

      callback(null, result);
    });
  },
};

/* Recursive helper function that searches blockchain for either incoming or outgoing emails
 blockOffset is used to indicate how many blocks below upperBlockLimit should be searched and is doubled on each recursive call
 foundData is used to store data found during previous iterations
 */
function findBatchOfData(
  type,
  batchSize,
  startingBlock,
  upperBlockLimit,
  blockOffset,
  foundData,
  callback
) {
  const fromBlock =
    upperBlockLimit - blockOffset > startingBlock ? upperBlockLimit - blockOffset : startingBlock;

  console.log(`Finding ${type} batch from ${fromBlock} to ${upperBlockLimit}`);

  const saveEvent = window.kantumidContract.SaveData(
    { userAddress: web3.eth.accounts[0] },
    { fromBlock, toBlock: upperBlockLimit }
  );

  saveEvent.get((error, events) => {
    // We need to keep track of the oldest block which is later as the upperBlockLimit
    let oldestDataBlock = null;

    for (let i = 0; i < events.length; i++) {
      const dataId = events[i].args.dataId;

      _.assign(foundData[dataId], {
        fromAddress: events[i].args.from,
        ipfsHash: events[i].args.ipfsHash,
        transactionHash: events[i].transactionHash,
      });

      // Update oldest email block if needed
      if (oldestDataBlock == null || events[i].blockNumber < oldestDataBlock) {
        oldestDataBlock = events[i].blockNumber;
      }

      // Found enough root emails, we are done
      if (_.size(foundData) === batchSize) {
        break;
      }
    }

    // Not enough root emails found, keep looking if possible
    if (_.size(foundData) < batchSize && fromBlock > startingBlock) {
      findBatchOfData(
        type,
        batchSize,
        startingBlock,
        upperBlockLimit - blockOffset,
        blockOffset * 2,
        foundData,
        callback
      );
    } else {
      // We have reached the end of the blockchain, return emails found so far
      callback(foundData, oldestDataBlock);
    }
  });
}

export { ethereumService, web3 };
