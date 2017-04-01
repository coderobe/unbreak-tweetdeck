// ==UserScript==
// @name         Unbreak Tweetdeck
// @namespace    https://cloaked.systems/
// @version      0.1
// @description  fix tweetdeck
// @author       coderobe <robin@broda.me>
// @match        https://tweetdeck.twitter.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function findc(node, className, index) {
        return node.getElementsByClassName(className)[index || 0];
    }
    function findt(node, tagName, index) {
        return node.getElementsByTagName(tagName)[index || 0];
    }
    console.log("Unbreak Tweetdeck starting.");
    var ubtd_trystart = null;
    var ubtd_trytimer = null;
    // tweetdeck startup takes a bit
    ubtd_trystart = function ubtd_trystart() {
        if (findc(document, "js-column")) {
            clearInterval(ubtd_trytimer);
            console.log("Unbreak Tweetdeck started.");
            // Inject code now
            // Fix Notification streaming (thanks @pixeldesu)
            TD.controller.stats.setExperiments({config: {tweetdeck_simplified_search_flow_5499: {value: "nope"}}});
        }
    };
    ubtd_trytimer = setInterval(ubtd_trystart, 10);
    ubtd_trystart();
})();
