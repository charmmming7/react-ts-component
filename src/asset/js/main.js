(function() {
  const handleToggleNav = () => {
    document.querySelectorAll(".side_nav_item > .link").forEach(element => {
      element.addEventListener("click", () => {
        element.closest(".side_nav_item").classList.toggle("is_expanded");
      });
    });

    document.querySelectorAll(".side_nav_depth2_item > .link").forEach(element => {
      element.addEventListener("click", () => {
        element.closest(".side_nav_depth2_item").classList.toggle("is_expanded");
      });
    });
  };

  const handleToggleTooltip = () => {
    document.querySelectorAll(".tooltip_area .btn_tooltip").forEach(element => {
      element.addEventListener("click", () => {
        element.closest(".tooltip_area").classList.toggle("is_show");
      });
    });

    document.addEventListener("click", (e) => {
      if(e.target.classList.contains("btn_tooltip")) return;
      document.querySelectorAll(".tooltip_area").forEach(element => {
        element.classList.remove("is_show");
      });
    });
  };

  const handleRerenderDom = () => {
    handleToggleNav();
    handleToggleTooltip();

    const targetNode = document.getElementsByTagName("body")[0];
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function(mutationsList) {
      for(const mutation of mutationsList) {
        if (mutation.type === "childList") {
          handleToggleNav();
          handleToggleTooltip();
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }

  window.addEventListener("load", function() {
    handleRerenderDom();
    handleToggleNav();
    handleToggleTooltip();
  });
})();
