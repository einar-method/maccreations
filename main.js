import { init, tx, id } from '@instantdb/core';
import * as dice from './diceApp.js';
//import { renderScripts } from './renderScripts.js';
import * as janken from './jankenApp.js';
import * as utils from './utils.js';
import * as domHandler from './domHandlers.js';
import * as renderElms from './renderFunctions.js';
import { NavButtons } from './navButtons.js';

// ID for app: plink
const APP_ID = 'bcc500de-07a9-4fde-9025-c87906e63bf3';

// Initialize the database
// ---------
const db = init({ appId: APP_ID });

// Subscribe to data
// ---------
db.subscribeQuery({ blog: {}, merch: {}, portfolio: {} }, (resp) => {
  if (resp.error) {
    renderError(resp.error.message); // Pro-tip: Check you have the right appId!
    return;
  }
  if (resp.data) {
    render(resp.data);
    console.log("A preview of all data:", resp.data)
  }
});

// const query = {
//   blog: {
//     $: {
//       limit: 2,
//     },
//   },
// };
// const { isLoading, error, data } = db.useQuery(query)


// Render the data and all main content
const app = document.getElementById("app");
//app.style.cssText = styles.container;

function render(data) {
  //console.log(data) //if we ever need to see id data has been passed
  
  document.getElementById("navHeader").innerHTML = renderElms.makeNavHeader();

  window.navButtons = new NavButtons();
  window.navButtons.applyAllStyles();

  document.querySelectorAll(".nav__header_btns").forEach(button => {
    button.addEventListener('click', function() {
      const buttonId = this.getAttribute('id');
      navBtnClicked(buttonId, data);
    });
  });

  app.innerHTML = "";
  
  const { blog } = data; //I'm not certain what this is for
  //console.log(blog)
  //checkNavBtn(blog);
  checkNavBtn(data); //this leads to creation of our main content
};

function renderError(errorMessage) {
  app.innerHTML = `
    <div>${errorMessage}</div>
  `;
};

function setUpCardInteration(dataIn) {
  document.querySelectorAll('.blog__post').forEach(article => {
    article.addEventListener('click', function() {
      const postId = this.getAttribute('id');
      domHandler.handleCardClick(dataIn, postId);
    });
  });
  loadSubstackWidget();
  //document.getElementById('subscribeButton').addEventListener('click', loadSubstackWidget);
};

function navBtnClicked(buttonId, dataIn) {
  window.navButtons.buttons.forEach(button => {
    if (button.id === buttonId) {
      button.isActive = true;
      checkNavBtn(dataIn);
    } else {
      button.isActive = false;
    }
    window.navButtons.applyStyles(button);
  });
};

function checkNavBtn(dataIn) {
  const activeButton = window.navButtons.buttons.find(button => button.isActive === true);

  if (activeButton) {
    console.log(`The active button's id is: ${activeButton.id}`);
    if (activeButton.id === "homeBtn") {
        console.log("Home button is active");
        app.innerHTML = renderElms.makeHomePage();
        //setupJankenGame();
        // dice.rollDice();
        // dice.setDiceListeners();
        domHandler.checkLowerNavBtns();
    } else if (activeButton.id === "portfolioBtn") {
        console.log("Portfolio button is active");
        app.innerHTML = renderElms.makePortfolioPage(dataIn);
        setUpCardInteration(dataIn.portfolio);
        domHandler.checkLowerNavBtns();
    } else if (activeButton.id === "merchBtn") {
        console.log("Merch button is active");
        app.innerHTML = renderElms.makeMerchPage(dataIn);
        domHandler.checkLowerNavBtns();
    } else if (activeButton.id === "blogBtn") {
        console.log("Blog button is active");
        app.innerHTML = renderElms.makeBlogPage(dataIn);
        setUpCardInteration(dataIn.blog);
        domHandler.checkLowerNavBtns();
    } else {
        console.log("No active button found");
    }
  } else {
      console.log('No active button found.');
  }
};

// DIALOG BOXES
function fadeInElements(elementIds) {
    requestAnimationFrame(function () {
        elementIds.forEach(function (elementId) {
        // Check the computed style to ensure the initial styles are applied
        window.getComputedStyle(document.getElementById(elementId)).opacity;
  
        // Set opacity to 1 after the initial styles are applied
        document.getElementById(elementId).style.opacity = 1;
      });
    });
};

function dialogFade(element, opacity) {
    element.style.opacity = opacity;
    element.style.transition = "none"; // Disable transition temporarily
    requestAnimationFrame(() => {
      element.style.transition = ""; // Re-enable transition
    });
};

function callTip(txt) {
    document.getElementById("tip-txt").innerHTML = txt;
    document.getElementById("tip").open = true;
    fadeInElements(["tip"])
    setTimeout(() => {
        document.getElementById("tip").open = false;
        dialogFade(document.getElementById("tip"), 0)
    }, 3500);
};

// This function removes the Instant logo which is auto inserted
//    as soon as the database is initialized.
function removeElementWithStyles() {
  const elements = document.querySelectorAll('*');

  elements.forEach(el => {
    const styles = window.getComputedStyle(el);

    // Check if the element matches all the required styles
    //    which were observed in the Firefox inspector.
    if (
      styles.position === 'fixed' &&
      styles.bottom === '24px' &&
      styles.left === '24px' &&
      styles.height === '32px' &&
      styles.width === '32px' &&
      styles.display === 'flex' &&
      styles.alignItems === 'center'
    ) {
      el.remove();
      console.log('Element removed:', el);
    }
  });
};
document.addEventListener('DOMContentLoaded', function() {
  removeElementWithStyles();
  //Perhaps we can just hide it so that we can show it on a credits page
});

window.CustomSubstackWidget = {
  substackUrl: "travelingbardgames.substack.com",
  placeholder: "example@mail.com",
  buttonText: "Subscribe",
  theme: "custom",
  colors: {
    primary: "#212121",
    input: "#99ca3c",
    email: "#000000",
    text: "#FFFFFF",
  },
};

function loadSubstackWidget() {
  const script = document.createElement("script");
  script.src = "https://substackapi.com/widget.js";
  script.async = true;
  document.body.appendChild(script);
};

// document.getElementById('subscribeButton').addEventListener('click', loadSubstackWidget);