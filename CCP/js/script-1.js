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

var cats = ["Hank", "Sally", "Sam", "Tom", "Woolly"];
var imgArray = ["img/hank.jpg", "img/sally.jpg", "img/sam.jpg", "img/tom.jpg", "img/woolly.jpg"]


for (var i=0; i < cats.length; i++) {
  var li = document.createElement('li');
  li.innerHTML = cats[i];
  catList.appendChild(li);
  
  var img = document.createElement('img');
  img.src = imgArray[i];
  display.appendChild(img);
  
}