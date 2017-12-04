import bitcore from 'bitcore-lib';
delete global._bitcore;
import ECIES from 'bitcore-ecies';

const cryptoService = {
  encrypt({ privateKey, publicKey }, message) {
    const privKey = new bitcore.PrivateKey(privateKey);
    const receiver = ECIES()
      .privateKey(privKey)
      .publicKey(new bitcore.PublicKey(publicKey));
    const encrypted = receiver.encrypt(message);

    return encrypted.toString('hex');
  },
  decrypt({ privateKey }, encrypted) {
    const privKey = new bitcore.PrivateKey(privateKey);
    const alice = ECIES().privateKey(privKey);

    const decryptMe = new Buffer(encrypted, 'hex');

    const decrypted = alice.decrypt(decryptMe);
    return decrypted.toString('ascii');
  },
};

export default cryptoService;
