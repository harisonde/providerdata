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
  .setProviderData(1234, 60070, "1425 South wolf rd, Prospect Heights", "IL", "Available", "Harikrishna", 8473722334, "Physcian")
  .send({from: accounts[1], gasPrice: '100000000000', gas: '2000000'});

  await providerDataContract.methods
  .setProviderData(1234, 60006, "275 rand road, Arlington Heights", "IL", "Available","Harikrishna", 2243722334, "Gynocologistit")
  .send({from: accounts[1], gasPrice: '100000000000', gas: '2000000'});

  await providerDataContract.methods
  .setProviderData(1234, 60070, "1521 South wolf rd, Prospect Heights", "IL", "Available", "Harikrishna", 8473722222, "Physcian")
  .send({from: accounts[1], gasPrice: '100000000000', gas: '2000000'});


  await providerDataContract.methods
  .setProviderData(6789, 60089, "781 lake cook rd, Buffalo Grove", "IL", "Available", "Bob Frank", 2267899876, "Pedeatrician")
  .send({from: accounts[1], gasPrice: '100000000000', gas: '2000000'});

  console.log('responce is ', await providerDataContract.methods.getProviderDataById(1234, 0).call());

  });

  it('create contract object and retrieve data', async () =>{

    const obj = new web3.eth.Contract(JSON.parse(interface), "0x0968ae5d6F17c0A1BAe043B032d1a6350F03E558");

    console.log('returned object is  ', obj.options.address);

    const countById = await obj.methods.getProviderDataByIdCount(1234).call();

    let dataById = [];

    for(let i=0; i<countById; i++){
      dataById.push(await obj.methods.getProviderDataById(1234, i).call())
    }

    console.log('Retrieved response based on Provider id ', dataById);

    let dataByZipCode = [];
    const countByZipCode = await obj.methods.getProviderDataByZipCodeCount(60070).call();

    for(let i=0; i<countByZipCode; i++){
      dataByZipCode.push(await obj.methods.getProviderDataByZipCode(60070, i).call())
    }

    console.log('Retrieved response based on zip code ', dataByZipCode);

    let dataByState = [];
    const countByState = await obj.methods.getProviderDataByStateCount("IL").call();

    for(let i=0; i<countByState; i++){
      dataByState.push(await obj.methods.getProviderDataByState("IL", i).call())
    }

    console.log('Retrieved response based on state ', dataByState);
  });

});
