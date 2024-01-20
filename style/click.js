document.addEventListener("click", function(event) {
  var modalContainers = document.querySelectorAll(".modal-content.box.is-medium");
  for (var i = 0; i < modalContainers.length; i++) {
    if (!modalContainers[i].classList.contains("is-paddingless")) {
      // Truy cập phần tử cha (div) và xóa nó
      //modalContainers[i].parentElement.remove();
    }
  }
});