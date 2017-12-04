import Web3 from 'web3';
// var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
// const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8546'));

const identities = [];
let subscription = null;
const shh = web3.shh;

Promise.all([
  shh.newSymKey().then((id) => {
    identities.push(id);
  }),
  shh.newKeyPair().then((id) => {
    identities.push(id);
  }),
])
  .then(() => {
    console.log(identities);
    // will receive also its own message send, below
    subscription = shh
      .subscribe('messages', {
        symKeyID: identities[0],
        topics: ['0xffaadd11'],
      })
      .on('data', receivedMessage);
  })
  .then(() =>
    shh.post({
      symKeyID: identities[0], // encrypts using the sym key ID
      sig: identities[1], // signs the message using the keyPair ID
      ttl: 10,
      topic: '0xffaadd11',
      // payload: '0xffffffdddddd1122',
      payload: encodeHex("Salut l'ami"),
      powTime: 3,
      powTarget: 0.5,
    })
  )
  .then(() =>
    shh.post({
      symKeyID: identities[0], // encrypts using the sym key ID
      sig: identities[1], // signs the message using the keyPair ID
      ttl: 10,
      topic: '0xffaadd11',
      // payload: '0xffffffdddddd1122',
      payload: encodeHex('Hi there'),
      powTime: 3,
      powTarget: 0.5,
    })
  );

function encodeHex(dataString) {
  return `0x${Buffer.from(dataString, 'utf8').toString('hex')}`;
}

function decodeHex(dataHex) {
  return Buffer.from(dataHex.substring(2), 'hex').toString('utf8');
}

function receivedMessage({ payload }) {
  // console.log("Message", pl);
  console.log('Decrypted', decodeHex(payload));
}
