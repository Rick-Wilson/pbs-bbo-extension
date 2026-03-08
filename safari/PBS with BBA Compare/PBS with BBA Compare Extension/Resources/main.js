navDivDisplayed = false;
DEBUG = false;

// Options for the observer (which mutations to observe)
const config = {
  attributes: true,
  attributeFilter: ['id', 'class', 'style'],
  childList: true,
  subtree: true
};

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  observer.disconnect();
  if ($("#navDiv").is(":visible") != navDivDisplayed) {
    navDivDisplayed = !navDivDisplayed;
    if (navDivDisplayed) onNavDivDisplayed();
    else onNavDivHidden();
  }
  observer.observe(targetNode, config);
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
const targetNode = document.body;
window.onload = function () {
  cleanUpPBS();
  observer.observe(targetNode, config);
};

function onNavDivDisplayed() {
  cleanUpPBS();
  initBBOalertIframe();
}


function onNavDivHidden() {
  cleanUpPBS();
  observer.disconnect();
}

function cleanUpPBS() {
  $((".verticalClass")).removeClass("covered");
  $("#pbs-panel0").remove();
  $("#pbs-tab").remove();
}
