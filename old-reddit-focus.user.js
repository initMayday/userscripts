// ==UserScript==
// @name        Old Reddit Focus
// @namespace   initMayday
// @match       *://www.reddit.com/*
// @match       *://old.reddit.com/*
// @grant       none
// @version     1.1
// @author      initMayday
// @description Removes all non-essential components to reddit, ideal for just focusing on question threads, and their answers
// @run-at document-start
// @license     GPL-3.0-or-later
// @downloadURL https://raw.githubusercontent.com/initMayday/userscripts/master/old-reddit-focus.user.js
// @updateURL   https://raw.githubusercontent.com/initMayday/userscripts/master/old-reddit-focus.user.js
// ==/UserScript==

// ** NOTE: This userscript runs at document-start, before content loads ** //

// If you want to test removing more content, do this in console
// document.querySelector("ELEMENT HERE").style.display = "none";

(function() {
  "use strict";

  // If we are on modern reddit, redirect to old reddit
  if (location.hostname == "www.reddit.com") {
    if (!location.pathname.startsWith("/media")) { // Don't redirect from media, it doesn't work on old reddit
            window.location.replace("https://old.reddit.com" + window.location.pathname + window.location.search);
    }
    return; // When (or if in the case of www.reddit.com/media) we go to old reddit, the rest will run
  }


  // Hide the page whilst we are modifying it
  const style = document.createElement("style");
  style.textContent = " body { visibility: hidden !important; }";
  document.documentElement.prepend(style);

  // Element hiding function, hide elements if found
  function hide(selector) {
    const element = document.querySelector(selector); // Find the element
    if (element) {
      element.style.display = "none"; // Hide the element
    } else {
      // Enable for debugging, if yo uwant
      //console.log("Selector: " + selector + " not found!");
    }
  }

  // Content is not yet loaded, wait until it is to modify
  window.addEventListener("DOMContentLoaded", () => {

    // Hide target elements
    hide(".side");
    hide("#header");
    hide(".footer-parent");
    hide(".infobar.listingsignupbar");
    hide(".infobar.commentsignupbar");
    hide(".menuarea");
    hide(".listing-page.hot-page");

    // Remove the invisibility style we made at the start to hide the page
    style.remove();
  });
})();

