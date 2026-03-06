/**
 * Global variables — PBS with BBA Compare
 * Stripped version: removed BBOalert button SVG, blog vars, profile vars, release notes
 */

// Global variables
const CHECKED_CHAR = "✔";
const COLLAPSED_BG_COLOR = "yellow";
const COLLAPSED_TEXT_COLOR = "black";
let DEBUG = false;

let navDivDisplayed = false;
let biddingBoxExists = false;
let biddingBoxDisplayed = false;
let explainCallDisplayed = false;
let auctionBoxDisplayed = false;
let lastDealNumber = '';
let LHOpponent = '';
let RHOpponent = '';
let opponentChanged = '';
let currentAuction = '??';
let tableDisplayed = false;
let activePlayer = '';
let lastSelectedCall = '';
let OKbuttonVisible = false;
let OKbuttonPressed = false;
let cardLead = '';
let playedCards = '';
let callExplanationPanelDisplayed = false;
let myCardsDisplayed = '';
let dealEndPanelDisplayed = false;
let finalContractDisplayed = false;
let announcementText = '';
let notificationDisplayed = false;
let notificationText = '';
let lastChatMessage = '';
let lastUserExplanation = '';
let recordNewAlerts = false;
let ctxArray = [];
let eventClick = new Event('click');
let callText = "";
let updateText = "";
let updateCount = 0;
let cbData = "";
let scriptList = [];
let alertTableCursor = 0;
let clipBoard = navigator.clipboard;
let alertData = "";
let alertOriginal = "";
let alertTable = alertData.split("\n");
let version = document.title;
let logText = `${version}\n${navigator.userAgent}\n`;
let bidSymbolMap = new Map();
let alertHistoryMap = new Map();
let PWD = parent.window.document;
let blogNames = [];
let blogIds = [];
let apiKey = "";
let announcemenDisplayed = false;
let importedURL = "";

E_onAnyMutation = new Event('onAnyMutation');
E_onBiddingBoxCreated = new Event('onBiddingBoxCreated');
E_onBiddingBoxDisplayed = new Event('onBiddingBoxDisplayed');
E_onBiddingBoxHidden = new Event('onBiddingBoxHidden');
E_onAuctionBoxDisplayed = new Event('onAuctionBoxDisplayed');
E_onAuctionBegin = new Event('onAuctionBegin');
E_onAuctionBoxHidden = new Event('onAuctionBoxHidden');
E_onAuctionEnd = new Event('onAuctionEnd');
E_onFinalContractDisplayed = new Event('onFinalContractDisplayed');
E_onNewAuction = new Event('onNewAuction');
E_onMyAuction = new Event('onMyAuction');
E_onPartnerAuction = new Event('onPartnerAuction');
E_onLHOAuction = new Event('onLHOAuction');
E_onRHOAuction = new Event('onRHOAuction');
E_onNewActivePlayer = new Event('onNewActivePlayer');
E_onExplainCallDisplayed = new Event('onExplainCallDisplayed');
E_onExplainCallHidden = new Event('onExplainCallHidden');
E_onBiddingBoxRemoved = new Event('onBiddingBoxRemoved');
E_onLogin = new Event('onLogin');
E_onLogoff = new Event('onLogoff');
E_onAnyOpponentChange = new Event('onAnyOpponentChange');
E_onNewDeal = new Event('onNewDeal');
E_onNewCallSelected = new Event('onNewCallSelected');
E_onOKbuttonDisplayed = new Event('onOKbuttonDisplayed');
E_onOKbuttonHidden = new Event('onOKbuttonHidden');
E_onOKbuttonPressed = new Event('onOKbuttonPressed');
E_onCallLevelSelected = new Event('onCallLevelSelected');
E_onMyLead = new Event('onMyLead');
E_onNewPlayedCard = new Event('onNewPlayedCard');
E_onCallExplanationPanelDisplayed = new Event('onCallExplanationPanelDisplayed');
E_onMyCardsDisplayed = new Event('onMyCardsDisplayed');
E_onDealEnd = new Event('onDealEnd');
E_onAnnouncementDisplayed = new Event('onAnnouncementDisplayed');
E_onNotificationDisplayed = new Event('onNotificationDisplayed');
E_onNewChatMessage = new Event('onNewChatMessage');
E_onDataLoad = new Event('onDataLoad');
E_onTableDisplayed = new Event('onTableDisplayed');
E_onTableHidden = new Event('onTableHidden');
E_onProfileBoxDisplayed = new Event('onProfileBoxDisplayed');
E_onProfileBoxHidden = new Event('onProfileBoxHidden');

function bidArray(bids) {
    let bidarr = [];
    for (var i = 0; i < bids.length; i = i + 2) {
        bidarr.push(bids.slice(i, i + 2));
    }
    return bidarr;
}
allBids = bidArray("1C1D1H1S1N2C2D2H2S2N3C3D3H3S3N4C4D4H4S4N5C5D5H5S5N6C6D6H6S6N7C7D7H7S7N");

function initGlobals() {
    navDivDisplayed = false;
    biddingBoxExists = false;
    biddingBoxDisplayed = false;
    explainCallDisplayed = false;
    auctionBoxDisplayed = false;
    lastDealNumber = '';
    LHOpponent = '';
    RHOpponent = '';
    opponentChanged = '';
    currentAuction = '??';
    tableDisplayed = false;
    activePlayer = '';
    lastSelectedCall = '';
    OKbuttonVisible = false;
    OKbuttonPressed = false;
    cardLead = '';
    playedCards = '';
    callExplanationPanelDisplayed = false;
    myCardsDisplayed = '';
    dealEndPanelDisplayed = false;
    announcemenDisplayed = false;
    finalContractDisplayed = false;
    announcementText = '';
    notificationDisplayed = false;
    notificationText = '';
    lastChatMessage = '';
    lastUserExplanation = '';
    recordNewAlerts = false;
    ctxArray = [];
    eventClick = new Event('click');
    callText = "";
    updateText = "";
    updateCount = 0;
    cbData = "";
    scriptList = [];
    alertTableCursor = 0;
    clipBoard = navigator.clipboard;
    lastDealNumber = '';
    alertData = "";
    alertOriginal = "";
    alertTable = alertData.split("\n");
    version = document.title;
    logText = version + '\n';
    logText = logText + navigator.userAgent + '\n';
    bidSymbolMap = new Map();
    alertHistoryMap = new Map();
    PWD = parent.window.document;
}
