var filterNavBar = document.getElementById("navbar");
var header = document.getElementsByClassName('header')
var headerHeight = header.clientHeight;
console.log("filterNavBar ", filterNavBar);
console.log("header", header);
console.log("headerheight: ", headerHeight);



window.onscroll = function() {
  console.log("window.pageYOffset ", window.pageYOffset);
  if( window.pageYOffset > 300 ) {
    var filterNavBar = document.getElementById("navbar");
    filterNavBar.classList.add("stickyfilter");
  } else {
    filterNavBar = document.getElementById("navbar");
    filterNavBar.classList.remove("stickyfilter");
  }
};

