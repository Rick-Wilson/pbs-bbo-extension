// Runs in the MAIN page world at document_start.
// Overrides navigator properties so Ionic/BBO detect a desktop browser.
(function () {
	var desktopUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
	try {
		Object.defineProperty(navigator, 'userAgent', {
			get: function () { return desktopUA; },
			configurable: true
		});
		Object.defineProperty(navigator, 'platform', {
			get: function () { return 'MacIntel'; },
			configurable: true
		});
		Object.defineProperty(navigator, 'maxTouchPoints', {
			get: function () { return 0; },
			configurable: true
		});
	} catch (e) {}
})();
