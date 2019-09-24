const assert = require('assert');
const Web3 = require('web3');

const {interface, bytecode} = require('../ethereum/compile');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let accounts;
let providerDataContract;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  console.log('acounts values are', accounts[0]);

  providerDataContract = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data:bytecode, arguments:[]})
  .send({from: accounts[0], gas:1000000});

  console.log('address is', providerDataContract.options.address);
});

describe('Verify FarmersInsurance contract', () => {
  it('deploy contract', () =>{

    assert.ok(providerDataContract.options.address);
  });

  it('set provider data', async () =>{

  await providerDataContract.methods.setInstructor("Harikrishna S K", 32).send({from: accounts[0]});

    console.log('responce is ', await providerDataContract.methods.getInstructor().call());

  });

  it('create contract object and retrieve data', async () =>{

    const obj = new web3.eth.Contract(JSON.parse(interface), "0x9D7a66368fBD9515337069986dbA2285cC8D96E9");

    console.log('returned object is  ', obj.options.address);

    console.log('Retrieved response from 0x9D7a66368fBD9515337069986dbA2285cC8D96E9 is ', await obj.methods.getInstructor().call());
  });

});
