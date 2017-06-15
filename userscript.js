// ==UserScript==
// @name         Unbreak Tweetdeck
// @namespace    https://cloaked.systems/
// @version      0.3
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
    ubtd_trystart = function ubtd_trystart() {
        if (findc(document, "js-column")) {
            clearInterval(ubtd_trytimer);
            console.log("Unbreak Tweetdeck started.");
            // Inject code now
            // Fix Notification streaming (thanks @pixeldesu)
            TD.controller.stats.setExperiments(
                {
                    config: {
                        tweetdeck_simplified_search_flow_5499: {value: "nope"},
                        tweetdeck_notifications_streaming_5807: { value: "streaming_please" }
                    }
                }
            );
            // Revert outlined icons
            var ubtd_fixiconstimer = setInterval(function ubtd_fixicons() {
                if(findc(document, "icon-favorite")){
                    $(".icon-favorite").each(function(index, node){
                        $(node).removeClass("icon-favorite");
                        $(node).addClass("icon-heart-filled");
                    });
                }
            }, 2);
        }
    };
    // Tweetdeck startup takes a bit
    ubtd_trytimer = setInterval(ubtd_trystart, 10);
    ubtd_trystart();
})();
