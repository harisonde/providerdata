import web3 from './web3';

const {interface, bytecode} = require('./compile');

export default new web3.eth.Contract(JSON.parse(interface), "0xbD14d0D51743347e7736074c99e432E34264cFCd");
