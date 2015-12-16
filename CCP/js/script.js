//var list = document.getElementById("cat-list");
//
//var cats = ["Hank", "Sally"];
//
//var li = document.createElement('li');
//var text = document.createTextNode(cats[0]);
//
//li.appendChild(text);
//document.getElementById("cat-list").appendChild(li);

var catList = document.getElementById("cat-list");
var display = document.getElementById("display");


var data = [
  {
    name: "Hank",
    src: "img/hank.jpg",
    counter: 0
  },
  {
    name: "Sally",
    src: "img/sally.jpg",
    counter: 0
  },
  {
    name: "Sam",
    src: "img/sam.jpg",
    counter: 0
  },
  {
    name: "Tom",
    src: "img/tom.jpg",
    counter: 0

  },
  {
    name: "Woolly",
    src: "img/woolly.jpg",
    counter: 0
  },
  {
    name: "Tulip",
    src: "img/tulip.jpg",
    counter: 0
  }
  ];

for (var i = 0; i < data.length; i++) {
  var li = document.createElement('li');
  var counter = data[i].counter;
  var name = data[i].name;
  var src = data[i].src;

  li.innerHTML = data[i].name;
  catList.appendChild(li);

  li.addEventListener('click', (function (counterCopy, nameCopy, srcCopy) {
    //    data[i].counter += 1;
    //    console.log(data[i]);
    // [i] doesn't exist at click time
    //    document.getElementById("counter").innerHTML = data[i].counter;
    return function () {
      counterCopy += 1;
      document.getElementById("counter").innerHTML = counterCopy;
      document.getElementById("name").innerHTML = nameCopy;
      console.log("The counterCopy for " + nameCopy + ": " + counterCopy);
      document.getElementById("cat-image").src = srcCopy;
     
      var reset = document.getElementById("reset");
      reset.addEventListener('click', function () {
        counterCopy = 0;
        document.getElementById("counter").innerHTML = 0;
        document.getElementById("name").innerHTML = "anything";
      });
    };

  })(counter, name, src));



}