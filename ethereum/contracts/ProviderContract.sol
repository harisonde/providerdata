pragma solidity ^0.4.25;

contract ProviderContract {

struct Address{
    string addressLine1;
}

struct Detail{
    Address addr;
    string availabilityStatus;
    string dsplPCP;
    string email;
    uint256 id;
    string name;
    string ntwkTermEffDate;
    uint phoneNumber;
    uint premierId;
    string providerType;
    string speciailityCode;
}

mapping(uint => Detail[]) providerDetails;

 function setProviderData(uint providerId, string addr, string  status, string dsplPCP, string email, uint id, string name,
 string ntwkTermEffDate, uint phoneNumber, uint premierId, string providerType, string speciailityCode) public {
    Address memory addrObj = Address(addr);
   providerDetails[providerId].push(Detail({addr: addrObj, availabilityStatus: status, dsplPCP: dsplPCP,
   email: email, id: id, name: name, ntwkTermEffDate: ntwkTermEffDate, phoneNumber: phoneNumber,
   premierId: premierId, providerType: providerType, speciailityCode: speciailityCode}));
 }

 function getProviderData(uint providerId, uint index) public view returns (string, string) {
     Detail[] memory detail = providerDetails[providerId];

     Address memory addr = detail[index].addr;
   return (addr.addressLine1, detail[index].availabilityStatus);
 }

function getProviderDetailsCount(uint providerId) public constant returns(uint){
     return providerDetails[providerId].length;
}

}
