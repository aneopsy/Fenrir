var mnid = require('mnid');
import lightwallet from 'eth-lightwallet';
import { web3 } from './ethereumService';

const walletService = {
  setWeb3Provider(keystore) {
    const web3Provider = new HookedWeb3Provider({
      host: 'https://rinkeby.infura.io/5ysRjN9mODHFf7aqQqzp',
      transaction_signer: keystore,
    });
    web3.setProvider(web3Provider);
  },

  getBalances(address) {
    return new Promise((resole, reject) => {
      web3.eth
        .getBalance(address, (error, balance) => {
          web3.eth.getTransactionCount(address),
            (error, nonces) => {
              resolve({
                balance,
                nonces,
              });
            };
        })
        .catch(
          reject(
            new Error(
              `An error has been occured when getting the balance of this address: ${address}`
            )
          )
        );
    });
  },

  setSeed(password, seedPhrase) {
    return new Promise((resolve, reject) => {
      if (password.length < 8) {
        reject(new Error("Invalid password. It' should be have more than 8 charachters"));
      }
      keystore
        .createVault(
        {
          password,
          seedPhrase,
            // random salt
          hdPathString: "m/0'/0'/0'",
        },
          (error, ks) => {
            newAddresses(password);
            setWeb3Provider(ks);
          }
        )
        .catch(reject(new Error('An error has been occured when creating the vault')));
    });
  },

  newWallet(password) {
    return new Promise((resolve, reject) => {
      if (password.length < 8) {
        reject(new Error("Invalid password. It' should be have more than 8 charachters"));
      }
      const array = new Uint32Array(32);
      const extraEntropy = window.crypto.getRandomValues(array);
      const randomSeed = lightwallet.keystore.generateRandomSeed(extraEntropy.toString());
      const infoString = `Your new wallet seed is: "${
        randomSeed
      }". Please write it down on paper or in a password manager, you will need it to access your wallet. Do not let anyone see this seed or they can take your Ether. Please enter a password to encrypt your seed while in the browser.`;
      console.log(infoString);
      lightwallet.keystore.createVault(
        {
          password,
          seedPhrase: randomSeed,
          hdPathString: "m/0'/0'/0'",
        },
        (error, ks) => {
          ks.keyFromPassword(password, (error, pwDerivedKey) => {
            ks.generateNewAddress(pwDerivedKey);
            const userEthereumAccount = ks;
            userEthereumAccount.seedPhrase = randomSeed;
            userEthereumAccount.password = password;
            userEthereumAccount.mnid = mnid.encode({
              network: '0x4',
              address: `0x${ks.addresses[0]}`,
            });
            resolve(userEthereumAccount);
          });
        }
      );
    });
  },

  functionCall() {
    const fromAddr = document.getElementById('functionCaller').value;
    const contractAddr = document.getElementById('contractAddr').value;
    const abi = JSON.parse(document.getElementById('contractAbi').value);
    const contract = web3.eth.contract(abi).at(contractAddr);
    const functionName = document.getElementById('functionName').value;
    const args = JSON.parse(`[${document.getElementById('functionArgs').value}]`);
    const valueEth = document.getElementById('sendValueAmount').value;
    const value = parseFloat(valueEth) * 1.0e18;
    const gasPrice = 50000000000;
    const gas = 4541592;
    args.push({ from: fromAddr, value, gasPrice, gas });
    const callback = (error, txhash) => {
      console.log(`error: ${error}`);
      console.log(`txhash: ${txhash}`);
    };
    args.push(callback);
    contract[functionName].apply(this, args);
  },
};

export default walletService;
