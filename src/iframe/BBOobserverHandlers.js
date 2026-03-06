
function onAnyMutation() {
    partnershipOptions();
    checkOptionsVulnerability();
    setOptionColors();
    hover_bboalert();
    BBOalertEvents().dispatchEvent(E_onAnyMutation);
    execUserScript('%onAnyMutation%');
}

function onBiddingBoxCreated() {
    lastDealNumber = '';
    LHOpponent = '';
    RHOpponent = '';
    activePlayer = '';
    BBOalertEvents().dispatchEvent(E_onBiddingBoxCreated);
    execUserScript('%onBiddingBoxCreated%');
}

function onBiddingBoxDisplayed() {
    BBOalertEvents().dispatchEvent(E_onBiddingBoxDisplayed);
    execUserScript('%onBiddingBoxDisplayed%');
}

function onBiddingBoxHidden() {
    BBOalertEvents().dispatchEvent(E_onBiddingBoxHidden);
    execUserScript('%onBiddingBoxHidden%');
}

function onAuctionBoxDisplayed() {
    BBOalertEvents().dispatchEvent(E_onAuctionBoxDisplayed);
    execUserScript('%onAuctionBoxDisplayed%');
    setTimeout(function () {
        if (getContext() == '') {
            BBOalertEvents().dispatchEvent(E_onAuctionBegin);
            bidSymbolMap.clear();
            alertHistoryMap.clear();
            execUserScript('%onAuctionBegin%');
        }
    }, 200);
}

function onAuctionBoxHidden() {
    activePlayer = '';
    BBOalertEvents().dispatchEvent(E_onAuctionBoxHidden);
    execUserScript('%onAuctionBoxHidden%');
    var ctx = getContext();
    if ((ctx.length >= 8) && (ctx.endsWith('------'))) {
        BBOalertEvents().dispatchEvent(E_onAuctionEnd);
        execUserScript('%onAuctionEnd%');
    }
}

function onFinalContractDisplayed() {
    BBOalertEvents().dispatchEvent(E_onFinalContractDisplayed);
    execUserScript('%onFinalContractDisplayed%');
}

function onNewAuction() {
    if (currentAuction == '') bidSymbolMap.clear();
    if (currentAuction != '')
        if (currentAuction != '??') {
            ctxArray = bidArray(stripContext(getContext()));
            BBOalertEvents().dispatchEvent(E_onNewAuction);
            execUserScript('%onNewAuction%');
            if (DEBUG) console.log("Active player " + activePlayer);
            if (activePlayer.slice(0, 1) == directionRHO()) {
                BBOalertEvents().dispatchEvent(E_onPartnerAuction);
                execUserScript('%onPartnerAuction%');
            }
            if (activePlayer.slice(0, 1) == directionLHO()) {
                if (DEBUG) console.log("My bid " + getContext().slice(-2));
                BBOalertEvents().dispatchEvent(E_onMyAuction);
                execUserScript('%onMyAuction%');
            }
            if (activePlayer.slice(0, 1) == myDirection()) {
                if (DEBUG) console.log("RHO bid " + getContext().slice(-2));
                BBOalertEvents().dispatchEvent(E_onRHOAuction);
                execUserScript('%onRHOAuction%');
            }
            if (activePlayer.slice(0, 1) == partnerDirection()) {
                if (DEBUG) console.log("LHO bid " + getContext().slice(-2));
                BBOalertEvents().dispatchEvent(E_onLHOAuction);
                execUserScript('%onLHOAuction%');
            }
        }
}

function onNewActivePlayer() {
    BBOalertEvents().dispatchEvent(E_onNewActivePlayer);
    execUserScript('%onNewActivePlayer%');
}

function onExplainCallDisplayed() {
    BBOalertEvents().dispatchEvent(E_onExplainCallDisplayed);
    execUserScript('%onExplainCallDisplayed%');
}

function onExplainCallHidden() {
    BBOalertEvents().dispatchEvent(E_onExplainCallHidden);
    execUserScript('%onExplainCallHidden%');
}

function onBiddingBoxRemoved() {
    BBOalertEvents().dispatchEvent(E_onBiddingBoxRemoved);
    execUserScript('%onBiddingBoxRemoved%');
}

function onNavDivDisplayed() {
    parent.document.querySelector(".logoutBlock button")
    setUI();
    setTabEvents();
    addBBOalertTab();
    alertData = localStorage.getItem('PBSCache');
    if (alertData == null) alertData = 'BBOalert\n';
    if (alertData == "") alertData = 'BBOalert\n';
    alertOriginal = alertData;
    openAccountTab();
    openMessageTab();
    restoreSettings();
    setOptions(!isSettingON(7));
    bboalertLog(version + "<br>Reading data<br>");
    setTimeout(() => {
        updateAlertDataAsync(alertOriginal, function () {
            alertTable = alertData.split("\n");
            saveAlertTableToClipboard();
            processTable();
            displayHeaders();
            addBBOalertLog("<br>" + alertTable.length + " records from cache");
            var elMessage = getChatInput();
            if (elMessage != null) {
                if (elMessage.onclick == null) {
                    elMessage.onclick = function () {
                        // no-op: toggleButtons removed
                    };
                }
            }
            setTabEvents();
            partnershipOptions();
            setTimeout(function () {
                setOptions(!isSettingON(7));
            }, 200);
            hideUnusedOptions();
            BBOalertEvents().dispatchEvent(E_onLogin);
            execUserScript('%onLogin%');
        });
    }, 500);
}

function onNavDivHidden() {
    localStorage.setItem('PBSCache', alertOriginal);
    setOptionsOff();
    initGlobals();
    BBOalertEvents().dispatchEvent(E_onLogoff);
    execUserScript('%onLogoff%');
}

function onAnyOpponentChange() {
    if (!biddingBoxExists) return;
    opponentChanged = '';
    if (myOpponent(true) != LHOpponent) {
        opponentChanged = 'L';
        LHOpponent = myOpponent(true);
    }
    if (myOpponent(false) != RHOpponent) {
        opponentChanged = opponentChanged + 'R';
        RHOpponent = myOpponent(false);
    }
    BBOalertEvents().dispatchEvent(E_onAnyOpponentChange);
    execUserScript('%onAnyOpponentChange%');
}

function onNewDeal() {
    activePlayer = '';
    BBOalertEvents().dispatchEvent(E_onNewDeal);
    execUserScript('%onNewDeal%');
}

function onNewCallSelected() {
    if (DEBUG) console.log(lastSelectedCall);
    if (lastSelectedCall.length == 2) {
        BBOalertEvents().dispatchEvent(E_onNewCallSelected);
        execUserScript('%onNewCallSelected%');
    }
    if (lastSelectedCall.length == 1) {
        BBOalertEvents().dispatchEvent(E_onCallLevelSelected);
        execUserScript('%onCallLevelSelected%');
    }
}

function onOKbuttonDisplayed() {
    BBOalertEvents().dispatchEvent(E_onOKbuttonDisplayed);
    execUserScript('%onOKbuttonDisplayed%');
}

function onOKbuttonHidden() {
    BBOalertEvents().dispatchEvent(E_onOKbuttonHidden);
    execUserScript('%onOKbuttonHidden%');
}

function onOKbuttonPressed() {
    OKbuttonPressed = true;
    BBOalertEvents().dispatchEvent(E_onOKbuttonPressed);
    execUserScript('%onOKbuttonPressed%');
}

function onNewLead() {
    if (myDirection() != "") {
        if (getMyHand().length == 24) {
            BBOalertEvents().dispatchEvent(E_onMyLead);
            execUserScript('%onMyLead%');
        }
    }
}

function onNewPlayedCard() {
    if (playedCards != '') {
        BBOalertEvents().dispatchEvent(E_onNewPlayedCard);
        execUserScript('%onNewPlayedCard%');
    }
}

function onCallExplanationPanelDisplayed() {
    BBOalertEvents().dispatchEvent(E_onCallExplanationPanelDisplayed);
    execUserScript('%onCallExplanationPanelDisplayed%');
}

function onMyCardsDisplayed() {
    lastUserExplanation = '';
    BBOalertEvents().dispatchEvent(E_onMyCardsDisplayed);
    execUserScript('%onMyCardsDisplayed%');
}

function onDealEndPanelDisplayed() {
    BBOalertEvents().dispatchEvent(E_onDealEnd);
    execUserScript('%onDealEnd%');
}

function onAnnouncementDisplayed() {
    BBOalertEvents().dispatchEvent(E_onAnnouncementDisplayed);
    execUserScript('%onAnnouncementDisplayed%');
}

function onNotificationDisplayed() {
    BBOalertEvents().dispatchEvent(E_onNotificationDisplayed);
    execUserScript('%onNotificationDisplayed%');
}

function onNewChatMessage() {
    BBOalertEvents().dispatchEvent(E_onNewChatMessage);
    execUserScript('%onNewChatMessage%');
}

function onTableDisplayed() {
    setTabEvents();
    BBOalertEvents().dispatchEvent(E_onTableDisplayed);
    execUserScript('%onTableDisplayed%');
}

function onTableHidden() {
    BBOalertEvents().dispatchEvent(E_onTableHidden);
    execUserScript('%onTableHidden%');
}
