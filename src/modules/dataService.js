import ipfs from 'browser-ipfs';
import bs58 from 'bs58';
import Contract from 'truffle-contract';
import registryArtifact from 'uport-registry';
import { web3 } from './ethereumService';

const base58ToHex = (b58) => {
  const hexBuf = new Buffer(bs58.decode(b58));
  return hexBuf.toString('hex');
};

const hexToBase58 = (hexStr) => {
  const buf = new Buffer(hexStr, 'hex');
  return bs58.encode(buf);
};

ipfs.setProvider({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', root: '/api/v0' });

const UportRegistryContract = new web3.eth.Contract(
  registryArtifact.abi,
  '0x2cc31912b2b0f3075a87b3640923d45a26cef3ee'
);

const dataService = {
  get(key, address) {
    return new Promise((resolve, reject) => {
      UportRegistryContract.methods
        //  .get(web3.utils.asciiToHex(key), address, address)
        .get(web3.utils.asciiToHex(key), address, address)
        .call({ from: address }, (error, ipfsHashHex) => {
          console.log(ipfsHashHex);
          if (error) {
            console.log(error);
            reject(new Error('An error is occured when calling the contract'));
          }
          if (
            ipfsHashHex === '0x' ||
            ipfsHashHex === '0x0000000000000000000000000000000000000000000000000000000000000000'
          ) {
            resolve([]);
          }
          const ipfsHash = hexToBase58(`1220${ipfsHashHex.slice(2)}`);
          ipfs.catJson(ipfsHash, (error, data) => {
            if (error !== null) {
              reject(new Error('Failed to get object from IPFS'));
              return;
            }
            resolve(data);
          });
        });
    });
  },

  // IDEA get address in function
  set(key, address, data) {
    return new Promise((resolve, reject) => {
      ipfs.addJson(data, (error, ipfsHash) => {
        if (error !== null) {
          console.log(error);
          reject(error);
        }
        const ipfsHashHex = base58ToHex(ipfsHash);
        const regSafeIpfs = `0x${ipfsHashHex.slice(4)}`;
        UportRegistryContract.set(key, address, regSafeIpfs)
          .then((txHash) => {
            console.log(txHash);
            resolve(txHash);
          })
          .catch(reject);
      });
    });
  },
};

export default dataService;
