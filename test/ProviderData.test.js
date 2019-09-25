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
  .send({from: accounts[1],  gasPrice: '1000000000', gas: '2000000'});

  console.log('address is', providerDataContract.options.address);
});

describe('Verify provider contract', () => {
  it('deploy contract', () =>{

    assert.ok(providerDataContract.options.address);
  });

  it('set provider data', async () =>{

  await providerDataContract.methods
  .setProviderData(1234, 60070, "1425 South wolf rd", "Available", 1234, "Harikrishna", 8473722334, "Physician")
  .send({from: accounts[1], gasPrice: '100000000000', gas: '2000000'});

    console.log('responce is ', await providerDataContract.methods.getProviderDataById(1234, 0).call());

  });

  it('create contract object and retrieve data', async () =>{

    const obj = new web3.eth.Contract(JSON.parse(interface), "0xd6994aE566837580cD5Df992A6100634466E5a3F");

    console.log('returned object is  ', obj.options.address);

    console.log('Retrieved response from 0xd6994aE566837580cD5Df992A6100634466E5a3F is ', await obj.methods.getProviderDataById(1234, 0).call());
  });

});
