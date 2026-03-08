var _runtime = (typeof browser !== 'undefined' && browser.runtime) || chrome.runtime;

function initBBOalertIframe() {
  var appPanel = document.getElementById("rightDiv");
  if (appPanel == null) return;
  $("#pbs-panel0").remove();
  var adPanel0 = document.createElement("div");
  adPanel0.id = 'pbs-panel0';
  adPanel0.style.position = 'absolute';
  adPanel0.style.top = '0px';
  adPanel0.style.left = '0px';
  adPanel0.style.backgroundColor = 'black';
  adPanel0.style.zIndex = "5000";
  adPanel0.style.display = 'none';
  adPanel0.style.height = '100%';
  adPanel0.style.right = '57px';
  appPanel.appendChild(adPanel0);
  $('#pbs-iframe').remove();

  // List of scripts to load into the iframe
  var libs = [
    "libs/jquery-3.6.0.min.js",
    "libs/jquery-ui-1.12.1.min.js",
    "libs/jszip-3.10.1.min.js"
  ];
  var iframeScripts = [
    "iframe/globals.js",
    "iframe/BBO_DOM.js",
    "iframe/blogspot.js",
    "iframe/functions.js",
    "iframe/BBOalertData.js",
    "iframe/BBOalertUI.js",
    "iframe/BBOalertOptions.js",
    "iframe/BBOobserver.js",
    "iframe/BBOobserverHandlers.js",
    "iframe/BBOalert.js",
    "iframe/BBOalertConfig.js",
    "iframe/custom_syntax.js",
    "iframe/webStorage.js",
    "iframe/init.js"
  ];
  var cssFile = "libs/jquery-ui-1.12.1.min.css";

  // Fetch all scripts and CSS, then build srcdoc with inlined content
  var allFiles = libs.concat(iframeScripts);
  var fetches = allFiles.map(function(f) {
    return fetch(_runtime.getURL(f)).then(function(r) { return r.text(); });
  });
  var cssFetch = fetch(_runtime.getURL(cssFile)).then(function(r) { return r.text(); });

  Promise.all([Promise.all(fetches), cssFetch]).then(function(results) {
    var scripts = results[0];
    var cssText = results[1];
    var version = _runtime.getManifest().name + ' ' + _runtime.getManifest().version;

    var scriptTags = '';
    // Libs are loaded immediately (no defer)
    for (var i = 0; i < libs.length; i++) {
      scriptTags += '<script>' + scripts[i] + '<\/script>\n';
    }
    // Iframe scripts are deferred — use DOMContentLoaded wrapper to mimic defer
    for (var j = 0; j < iframeScripts.length; j++) {
      scriptTags += '<script>' + scripts[libs.length + j] + '<\/script>\n';
    }

    var ifrm = document.createElement("iframe");
    ifrm.allow = "clipboard-read; clipboard-write";
    ifrm.sandbox = 'allow-scripts allow-same-origin allow-modals allow-popups allow-forms allow-downloads';
    ifrm.id = 'pbs-iframe';
    ifrm.name = 'pbs';
    ifrm.width = "100%";
    ifrm.height = "100%";
    ifrm.srcdoc = '<html lang="en">\n<head>\n' +
      '<meta charset="UTF-8">\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
      '<meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
      '<meta http-equiv="Content-Security-Policy" content="img-src * data: ; media-src * data: ; ' +
        'default-src *; font-src * data: \'self\' \'unsafe-inline\' \'unsafe-eval\'; ' +
        'style-src * \'self\' \'unsafe-inline\' \'unsafe-eval\'; ' +
        'script-src * \'self\' \'unsafe-inline\' \'unsafe-eval\'; ' +
        'connect-src * ws: wss: ;">\n' +
      '<style>' + cssText + '</style>\n' +
      scriptTags +
      '<title>' + version + '</title>\n' +
      '</head>\n<body>\n<!--PBS panel-->\n</body>\n</html>';
    adPanel0.appendChild(ifrm);
  });
}
