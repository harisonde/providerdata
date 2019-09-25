import web3 from './web3';

const {interface, bytecode} = require('./compile');

export default new web3.eth.Contract(JSON.parse(interface), "0x92B5E505E3d7Ec93Ea96FC4D082fA322Cb3F1aBe");
