// Dynamically loads header.html into the element with id="header-include"
document.addEventListener("DOMContentLoaded", function () {
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-include").innerHTML = data;
      if (typeof initSearchBar === "function") {
        initSearchBar();
      }
    });
});
