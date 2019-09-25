pragma solidity ^0.4.25;

contract ProviderContract {

struct Detail{
    uint providerId;
    string addr;
    uint zipCode;
    string state;
    string availabilityStatus;
    string name;
    uint phoneNumber;
    string providerType;
}

mapping(uint => Detail[]) public providerDataById;

mapping(string => Detail[]) providerDataByName;

mapping(uint => Detail[]) providerDataByZip;

mapping(string => Detail[]) providerDataByState;

function setProviderData(uint providerId, uint zipCode, string addr, string state, string  status, string name, uint phoneNumber,string providerType) public {

    Detail memory detail = Detail({providerId: providerId, zipCode: zipCode, addr: addr,
    state: state, availabilityStatus: status,name: name, phoneNumber: phoneNumber,
     providerType: providerType});

    providerDataById[providerId].push(detail);
    providerDataByName[name].push(detail);
    providerDataByZip[zipCode].push(detail);
    providerDataByState[state].push(detail);
 }

 function getProviderDataById(uint providerId, uint index) public view returns (string, string, uint, string, uint, string, string) {
     Detail[] memory detail = providerDataById[providerId];

   return ( detail[index].name, detail[index].addr, detail[index].zipCode,
   detail[index].state, detail[index].phoneNumber, detail[index].availabilityStatus, detail[index].providerType);
 }

 function getProviderDataByIdCount(uint providerId) public constant returns(uint){
     return providerDataById[providerId].length;
}

  function getProviderDataByZipCode(uint zipCode, uint index) public view returns (string,string, uint, string, uint, string, string) {
      Detail[] memory detail = providerDataByZip[zipCode];

      return ( detail[index].name, detail[index].addr, detail[index].zipCode,
      detail[index].state, detail[index].phoneNumber, detail[index].availabilityStatus, detail[index].providerType);
  }

 function getProviderDataByZipCodeCount(uint zipCode) public constant returns(uint){
      return providerDataByZip[zipCode].length;
 }

  function getProviderDataByState(string name, uint index) public view returns (string, string, uint, string, uint, string, string) {
      Detail[] memory detail = providerDataByName[name];

      return ( detail[index].name, detail[index].addr, detail[index].zipCode,
      detail[index].state, detail[index].phoneNumber, detail[index].availabilityStatus, detail[index].providerType);
  }

 function getProviderDataByStateCount(string name) public constant returns(uint){
      return providerDataByName[name].length;
 }

}
