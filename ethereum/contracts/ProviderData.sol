pragma solidity ^0.4.25;
contract ProviderData {

 string fName;
 uint age;

 function setInstructor(string _fName, uint  _age) public {
   fName = _fName;
   age = _age;
 }

 function getInstructor() public view returns (string, uint) {
   return (fName, age);
 }

}
