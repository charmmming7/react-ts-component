!function(){const handleToggleNav=()=>{document.querySelectorAll(".side_nav_item > .link").forEach((element=>{element.addEventListener("click",(()=>{element.closest(".side_nav_item").classList.toggle("is_expanded")}))})),document.querySelectorAll(".side_nav_depth2_item > .link").forEach((element=>{element.addEventListener("click",(()=>{element.closest(".side_nav_depth2_item").classList.toggle("is_expanded")}))}))},handleToggleTooltip=()=>{document.querySelectorAll(".tooltip_area .btn_tooltip").forEach((element=>{element.addEventListener("click",(()=>{element.closest(".tooltip_area").classList.toggle("is_show")}))})),document.addEventListener("click",(e=>{e.target.classList.contains("btn_tooltip")||document.querySelectorAll(".tooltip_area").forEach((element=>{element.classList.remove("is_show")}))}))};window.addEventListener("load",(function(){(()=>{handleToggleNav(),handleToggleTooltip();const targetNode=document.getElementsByTagName("body")[0];new MutationObserver((function(mutationsList){for(const mutation of mutationsList)"childList"===mutation.type&&(handleToggleNav(),handleToggleTooltip())})).observe(targetNode,{attributes:!0,childList:!0,subtree:!0})})(),handleToggleNav(),handleToggleTooltip()}))}();