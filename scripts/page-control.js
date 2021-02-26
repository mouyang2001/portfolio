window.onload = function() {
  window.onscroll = function() {
    var navbar = document.getElementById("navbar");

    //returns a list because multiple elements
    var attributes = document.getElementsByClassName("a");
    var sticky = navbar.offsetTop + 60;
    if (window.pageYOffset > sticky) {
      navbar.classList.add("sticky");
      changeElementsColor(attributes, "#777777");
    } else {
      navbar.classList.remove("sticky");
      changeElementsColor(attributes, "#f4f4f4");
    }
  }
}

function changeElementsColor(elements, color) {
  for (element of elements) {
    element.style.color = color;
  }
}
