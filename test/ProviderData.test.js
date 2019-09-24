const assert = require('assert');
const Web3 = require('web3');
const {interface, bytecode} = require('../ethereum/compile');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let accounts;
let providerDataContract;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  providerDataContract = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data:bytecode, arguments:[]})
  .send({from: accounts[0], gas:1000000});

  console.log('address is', providerDataContract.options.address);
});

describe('Verify provider contract', () => {
  it('deploy contract', () =>{

    assert.ok(providerDataContract.options.address);
  });

  it('set provider data', async () =>{

  await providerDataContract.methods
  .setProviderData(1234, "1425 South wolf rd", "Not Available",
  "H02345", "test@yahoo.co.in",1234, "Harikrishna",
  "10/10/2020", 1111111111, 123456789, "17", "011")
  .send({from: accounts[0], gas:1000000});

    console.log('responce is ', await providerDataContract.methods.getProviderData(1234, 0).call());

  });

  it('create contract object and retrieve data', async () =>{

    const obj = new web3.eth.Contract(JSON.parse(interface), "0x89Fbd1376CD74F873CD9356970654e6f0aC53343");

    console.log('returned object is  ', obj.options.address);

    console.log('Retrieved response from 0x89Fbd1376CD74F873CD9356970654e6f0aC53343 is ', await obj.methods.getProviderData(1234, 0).call());
  });

});
