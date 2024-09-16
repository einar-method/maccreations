import * as janken from './jankenApp.js';
import * as utils from './utils.js';
import * as dice from './diceApp.js';

export function checkLowerNavBtns() {
  const toHomeBtn = document.getElementById("toHomeBtn");
  const toPortfolioBtn = document.getElementById("toPortfolioBtn");
  const toMerchBtn = document.getElementById("toMerchBtn");
  const toBlogBtn = document.getElementById("toBlogBtn");

  if (toHomeBtn) {
    document.getElementById("toHomeBtn").addEventListener("click", function() {
        document.getElementById("homeBtn").click();
      });
  };
  if (toPortfolioBtn) {
    document.getElementById("toPortfolioBtn").addEventListener("click", function() {
        document.getElementById("portfolioBtn").click();
      });
  };
  if (toMerchBtn) {
    document.getElementById("toMerchBtn").addEventListener("click", function() {
        document.getElementById("merchBtn").click();
      });
  };
  if (toBlogBtn) {
    document.getElementById("toBlogBtn").addEventListener("click", function() {
        document.getElementById("blogBtn").click();
      });
  };
};

export function handleCardClick(blogData, postId) {
  console.log("Article clicked:", postId);

  const selectedPost = blogData.find(post => ("blogID" + post.id) === postId);
  const selectedPortfolio = blogData.find(post => ("portfolioItem" + post.id) === postId);

  if (selectedPost) {
    //console.log("Selected post:", selectedPost);
    openDetails(selectedPost.content);
  } else if (selectedPortfolio) {
    //console.log("Selected portfolio:", selectedPortfolio);
    //TODO: make this more dynamic
    if (postId === "portfolioItembd5e5158-d43b-45b8-8889-7927ffbbad99") {
      openDetails(janken.renderJankenGame());
      janken.setupJankenGame();
    } else if (postId === "portfolioItem2f0a1276-b0dd-47d2-a675-23846c214d29") {
        openDetails(dice.renderDice());
        dice.setDiceListeners();
    } else if (postId === "portfolioItem-none") {
      //Place holder for game here
    }
    else {
      openDetails(selectedPortfolio.content);
    }
    // openDetails(selectedPortfolio.content);
  } else {
    console.log("Article not found!");
  }
};

function openDetails(detailsText) {

  console.table(detailsText);  // Just to inspect if needed
  
  const insertedContent = Array.isArray(detailsText) 
    ? detailsText.map(html => html).join('') 
    : detailsText;
  // Determine if detailsText is an array or string

  if (!document.getElementById('myNav')) {
    const overlayHTML = `
    <div id="myNav" class="blogPost__overlay">
        
        <div class="blogPost__overlay_content" id="postContent">
          <a href="javascript:void(0)" class="blog__closebtn_top">&times;</a>
          ${insertedContent}
        </div>
        <div class="blogPost__overlay_footer">
            <button class="like-btn">Like</button>
            <button class="scroll-top-btn">To Top</button>
            <button class="blog__closebtn_bottom">&times;</button>
        </div>
    </div>
  `;

    document.body.insertAdjacentHTML('beforeend', overlayHTML);

    document.querySelector('.blog__closebtn_top').addEventListener('click', closeDetails);
    document.querySelector('.blog__closebtn_bottom').addEventListener('click', closeDetails);
    document.querySelector('.like-btn').addEventListener('click', userAddLike);
    document.querySelector('.scroll-top-btn').addEventListener('click', overlayScrollIntoView);
  };

  document.getElementById('myNav').style.width = "100%";
}

function closeDetails() {
  // Close the overlay by removing it from the DOM
  const overlay = document.getElementById('myNav');
  if (overlay) {
    overlay.remove();
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function overlayScrollIntoView() {
  const element = document.querySelector('.blogPost__overlay_content');
  
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth', // Optional: Smooth scrolling
      block: 'start'      // Scroll so the element aligns at the top of the viewport
    });
  }
};

function userAddLike() {
  console.log("User added a like");
};