pragma solidity ^0.4.25;

contract ProviderContract {

struct Detail{
    string addr;
    uint zipCode;
    string availabilityStatus;
    uint256 id;
    string name;
    uint phoneNumber;
    string providerType;
}

mapping(uint => Detail[]) public providerDataById;

mapping(string => Detail[]) providerDataByName;

mapping(uint => Detail[]) providerDataByZip;

mapping(string => Detail[]) providerDataByCity;

function setProviderData(uint providerId, uint zipCode, string addr, string  status, uint id, string name, uint phoneNumber,string providerType) public {

    Detail memory detail = Detail({zipCode: zipCode, addr: addr, availabilityStatus: status,
   id: id, name: name, phoneNumber: phoneNumber, providerType: providerType});

    providerDataById[providerId].push(detail);
 }

 function getProviderDataById(uint providerId, uint index) public view returns (string, uint, string, uint, uint, string, string) {
     Detail[] memory detail = providerDataById[providerId];

   return ( detail[index].name,  detail[index].id, detail[index].addr,detail[index].zipCode, detail[index].phoneNumber, detail[index].availabilityStatus, detail[index].providerType);
 }

function getProviderDataByIdCount(uint providerId) public constant returns(uint){
     return providerDataById[providerId].length;
}

function getProviderDataByZipCode(uint zipCode, uint index) public view returns (string, uint, string, uint, uint, string, string) {
    Detail[] memory detail = providerDataByZip[zipCode];

  return ( detail[index].name,  detail[index].id, detail[index].addr,detail[index].zipCode, detail[index].phoneNumber, detail[index].availabilityStatus, detail[index].providerType);
}

function getProviderDataByZipCodeCount(uint zipCode) public constant returns(uint){
    return providerDataByZip[zipCode].length;
}

function getProviderDataByName(string name, uint index) public view returns (string, uint, string, uint, uint, string, string) {
    Detail[] memory detail = providerDataByName[name];

  return ( detail[index].name,  detail[index].id, detail[index].addr,detail[index].zipCode, detail[index].phoneNumber, detail[index].availabilityStatus, detail[index].providerType);
}

function getProviderDataByNameCount(string name) public constant returns(uint){
    return providerDataByName[name].length;
}

}
