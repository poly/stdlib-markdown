var resize = function() {
  var height = Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
  window.parent && window.parent.postMessage({height: height}, '*');
};

window.addEventListener('DOMContentLoaded', function() {

  resize();
  window.addEventListener('resize', resize);

});
