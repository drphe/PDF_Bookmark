const currentUrl = window.location.href;
var link = window.location.toString();
if (link.indexOf("%0D%0A") !== -1) {
link = link.replace("%0D%0A", " ");
window.location.href = link;
 }