
// clear the screen for testing
document.body.innerHTML = '';
document.body.style.background = "white";

var nums = [1, 2, 3];

// Let's loop over the numbers in our array
for (var i = 0; i < nums.length; i++) {

  // This is the number we're on...
  var num = nums[i];

  // We're creating a DOM element for the number
  var elem = document.createElement('div');
  elem.textContent = num;

  // ... and when we click, alert the value of `num`
  elem.addEventListener('click', (function (numCopy) {
    return function () {
      alert(numCopy);
      
  };
  })(num));
    // an Immediately-Invoked Function Expression (IIFE), passing in num as the value for the parameter numCopy

  // finally, let's add this element to the document
  document.body.appendChild(elem);
};

