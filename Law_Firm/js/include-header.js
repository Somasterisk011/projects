// Dynamically loads header.html into the element with id="header-include"
document.addEventListener("DOMContentLoaded", function() {
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-include").innerHTML = data;
      if (typeof initSearchBar === 'function') {
        initSearchBar();
      }
    });
});
