import web3 from './web3';

const {interface, bytecode} = require('./compile');

export default new web3.eth.Contract(JSON.parse(interface), "0x9D7a66368fBD9515337069986dbA2285cC8D96E9");
