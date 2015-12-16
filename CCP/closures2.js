function celebrityName(firstName) {
  var nameIntro = "This celebrity is ";

  function lastName(theLastName) {
    return nameIntro + firstName + " " + theLastName;
  }
  return lastName;
}

var mjName = celebrityName("Michael");

mjName("Jackson");

//

function setFirstName (firstName) {

    var introduction = "This person is ";
    var unusedString = "This string will be garbage collected";

    function introducePerson (lastName) {
        return introduction + firstName + " " + lastName;
    }

    return introducePerson;
}

var person1 = setFirstName('Tom');

person1;
// the console shows:
// function introducePerson(lastName) {
// return introduction + firstName + " " + lastName;
// }
// executing setFirstName has meant that person1 is now a FUNCTION
// it has become the function "introducePerson"
// and it has STORED values for "firstName" and "introduction"
// and it takes one parameter "lastName"