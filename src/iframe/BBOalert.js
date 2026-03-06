

/**
 * @ignore
 */
function saveAlertTableToClipboard() {
	var txt = '';
	if (alertTable.length < 2) return;
	for (i = 1; i < alertTable.length; i++) {
		txt = txt + alertTable[i] + '\n';
	}
	localStorage.setItem('PBSCache', alertOriginal);
}

/**
 * @ignore
 */
function setScriptList() {
	scriptList = [];
	var txt = '';
	var scriptText = '';
	var scan = new BBOalertData();
	while ((txt = scan.getNextRecord()) != null) {
		var rec = txt.split(",");
		if ((rec[0].trim() == 'Script') || (rec[0].trim() == '//Script')) {
			if (scriptText != '') {
				scriptList.push(scriptText);
				scriptText = '';
				scan.trimOn = true;
			}
			if (rec.length == 2) {
				scan.trimOn = false;
				scriptText = txt + ',';
			}
			if (rec.length > 2) {
				scriptList.push(txt);
				scan.trimOn = true;
			}
		} else {
			if (scriptText != '') scriptText = scriptText + "\n" + txt;
		}
	}
}

function displayHeaders() {
	var txt = '';
	var scriptText = '';
	var scan = new BBOalertData();
	while ((txt = scan.getNextLine()) != null) {
		var rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim().toLowerCase().endsWith('bboalert')) {
				if (rec[0].trim() != '') addBBOalertLog('<br>' + rec[1].trim());
			}
		}
	}
}

/**
 * @ignore
 */
function loadJavascript() {
	var scan = new BBOalertData();
	while ((txt = scan.getNextRecord()) != null) {
		var rec = txt.split(",");
		if ((rec[0].trim() == 'Javascript') || (rec[0].trim() == '//Javascript')) {
			loadJS(rec[1].trim());
		}
	}
}

/**
 * retrieve script text by script name
 */
function getScript(scriptName) {
	var scriptText = '';
	for (var i = 0; i < scriptList.length; i++) {
		var txt = scriptList[i];
		var rec = txt.split(",");
		if (rec[1].trim() == scriptName) {
			scriptText += txt.slice(txt.indexOf(',', txt.indexOf(',') + 1) + 1);
		}

	}
	return scriptText;
}


/**
 * @ignore
 */
function setOptionsSelector() {
	clearOptionsSelector();
	alertTableCursor = 0;
	var txt = '';
	var scan = new BBOalertData();
	while ((txt = scan.getNextLine()) != null) {
		rec = txt.split(",");
		if (rec[0].trim() == 'Option') {
			if (rec.length > 2) {
				for (var j = 2; j < rec.length; j++) {
					addOptionsSelectorOption(rec[j].trim());
				}
			}
		}
	}

}

/**
 * @ignore
 */
function setShortcutButtons() {
	var txt = '';
	var scan = new BBOalertData();
	while ((txt = scan.getNextRecord()) != null) {
		rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim() == 'Button') {
				addShortcutButton(txt);
			}
		}
	}
	txt = '';
	scan = new BBOalertData();
	while ((txt = scan.getNextRecord()) != null) {
		rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim() == 'Shortcut') {
				addShortcutButton(txt + ',width=25%');
			}
		}
	}
}

/**
 * @ignore
 */
function setOptionButtons() {
	var txt = '';
	var scan = new BBOalertData();
	while ((txt = scan.getNextLine()) != null) {
		rec = txt.split(",");
		if (rec.length > 1) {
			if (rec[0].trim() == 'Option') {
				addOptionButton(txt);
			}
		}
	}
}

/**
 * @ignore
 */
function processTable() {
	clearOptionButtons();
	setOptionButtons();
	setOptionsSelector();
	initOptionDefaults();
	hideUnusedOptions();
	clearShortcutButtons();
	setShortcutButtons();
	setScriptList();
	saveAlertTableToClipboard();
	hover_bboalert();
	execUserScript('%onDataLoad%');
	// Prevent PBS Dynamic rebuildButtons() from racing with the initial setTimeout(init, 100)
	// The IIFE sets _pbsDynamicBuilding=false and schedules init; we set it true so that
	// any spurious config-change rebuild in onAnyMutation gets blocked.
	if (window._pbsDynamicBuilding === false) window._pbsDynamicBuilding = true;
	BBOalertEvents().dispatchEvent(E_onDataLoad);
	setParentBBOalertData(alertOriginal);
	bidSymbolMap.clear();
}

function setParentBBOalertData(text) {
	if (window.parent.document.getElementById("PBSOriginal") == null) {
		var d = document.createElement("data");
		d.id = "PBSOriginal";
		window.parent.document.body.appendChild(d);
	}
	d = window.parent.document.getElementById("PBSOriginal");
	d.value = text;
}

function makeAlertData() {
	setOptions(true);
	bboalertLog("Reading data");
	bboalertLog(version + "<br>Reading data<br>");
	setTimeout(() => {
		updateAlertDataAsync(alertOriginal, function () {
			if (alertData == null) alertData = 'BBOalert\n';
			alertTable = alertData.split("\n");
			saveAlertTableToClipboard();
			processTable();
			displayHeaders();
			addBBOalertLog("<br>" + alertTable.length + " records imported");
			setTimeout(function () {
				setOptions(true);
			}, 200);
		});
	}, 1000);
}

function readNewData(cbData) {
	updateText = "";
	updateCount = 0;
	alertData = cbData;
	alertOriginal = alertData;
	if (cbData.startsWith("Import,") || cbData.search(/bboalert/i) != -1 || cbData.startsWith("BBOalert")) {
		bboalertLog("Reading data");
		bboalertLog(version + "<br>Reading data<br>");
		setTimeout(() => {
			updateAlertDataAsync(alertOriginal, function () {
				if (alertData == null) alertData = 'BBOalert\n';
				alertTable = alertData.split("\n");
				saveAlertTableToClipboard();
				processTable();
				displayHeaders();
				addBBOalertLog("<br>" + alertTable.length + " records imported");
				setTimeout(function () {
					setOptions(true);
				}, 200);
			});
		}, 1000);
	}
}

var trustedBid = false;
var foundContext = '';
var foundCall = '';

/**
 * @ignore
 */
function execUserScript(txt) {
	var rec = txt.split('%');
	if (rec.length < 2) return txt;
	var txt1 = '';
	var script;
	for (var i = 0; i < rec.length; i++) {
		if (i % 2 == 0) {
			txt1 = txt1 + rec[i];
		} else {
			script = getScript(rec[i]);
			if (script != '') {
				txt1 = txt1 + userScript(script, foundContext, getContext(), foundCall, callText);
			} else {
				txt1 = txt1 + "%" + rec[i];
				if (i < rec.length - 1) txt1 = txt1 + "%";
			}
		}
	}
	return txt1;
}
