const path = require('path');
const fs = require('fs');
const solc = require('solc');
const filePath = path.resolve(__dirname, 'contracts', 'ProviderData.sol');

const sourceCode = fs.readFileSync(filePath, 'utf8');

// module.exports = solc.compile(sourceCode, 1).contracts[':FarmersInsurance'];

 module.exports = solc.compile(sourceCode, 1).contracts[':ProviderData'];
