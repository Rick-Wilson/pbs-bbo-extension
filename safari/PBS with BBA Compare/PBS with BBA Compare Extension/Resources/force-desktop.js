// Force BBO to use desktop layout on iPad/tablet.
// Runs at document_start. Overrides Ionic platform classes on <html>.
(function () {
	var mobileClasses = [
		'plt-ipad', 'plt-ios', 'plt-tablet', 'plt-mobile',
		'plt-mobileweb', 'touchevents', 'ios'
	];
	var desktopClasses = ['plt-desktop', 'no-touchevents', 'md'];
	var applying = false;

	function forceDesktop(html) {
		if (applying) return;
		var current = html.className.split(/\s+/).filter(Boolean);
		var hasMobile = mobileClasses.some(function (c) {
			return current.indexOf(c) !== -1;
		});
		if (!hasMobile) return;

		applying = true;
		var filtered = current.filter(function (c) {
			return mobileClasses.indexOf(c) === -1;
		});
		desktopClasses.forEach(function (c) {
			if (filtered.indexOf(c) === -1) filtered.push(c);
		});
		html.className = filtered.join(' ');
		html.setAttribute('mode', 'md');
		applying = false;
	}

	var html = document.documentElement;
	if (html) forceDesktop(html);

	var observer = new MutationObserver(function () {
		forceDesktop(document.documentElement);
	});
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['class', 'mode']
	});

	setTimeout(function () { observer.disconnect(); }, 10000);
})();
