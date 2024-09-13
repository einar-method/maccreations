import { init, tx, id } from '@instantdb/core';

// ID for app: plink
const APP_ID = 'bcc500de-07a9-4fde-9025-c87906e63bf3';

// Initialize the database
// ---------
const db = init({ appId: APP_ID });

// Subscribe to data
// ---------
db.subscribeQuery({ blog: {} }, (resp) => {
  if (resp.error) {
    renderError(resp.error.message); // Pro-tip: Check you have the right appId!
    return;
  }
  if (resp.data) {
    render(resp.data);
    console.log(resp.data)
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


// Render
// ---------
const app = document.getElementById('app');
//app.style.cssText = styles.container;

function render(data) {
  document.getElementById("navHeader").innerHTML = renderNavHeader();

  window.navButtons = new NavButtons();
  window.navButtons.applyAllStyles();

  document.querySelectorAll('.nav__header_btns').forEach(button => {
    button.addEventListener('click', function() {
      const buttonId = this.getAttribute('id');
      navBtnClicked(buttonId, data);
    });
  });

  app.innerHTML = '';

  console.log(data)

  const { blog } = data;

  console.log(blog)

  // const { todos } = data;

  // console.log(todos);

  // const containerHTML = `
  //   <main class="blog__page">
  //     ${makeBlogSections()}
  //     ${blogPost(blog)}
  //   </main>
  // `;

  //let containerHTML = checkNavBtn(blog);
  checkNavBtn(blog);

  //app.innerHTML = containerHTML;

  //app.innerHTML = makeBlogPage(blog);

  // document.querySelectorAll('.blog__post').forEach(article => {
  //   article.addEventListener('click', function() {
  //     const postId = this.getAttribute('id');
  //     handleArticleClick(blog, postId);
  //   });
  // });

  // Attach event listeners
  // document.querySelector('.toggle-all')?.addEventListener('click', () => toggleAllTodos(todos));
  // document.querySelector('form')?.addEventListener('submit', submitForm);
  // todos.forEach(todo => {
  //   document.getElementById(`toggle-${todo.id}`)?.addEventListener('change', () => toggleDone(todo));
  //   document.getElementById(`delete-${todo.id}`)?.addEventListener('click', () => deleteTodoItem(todo));
  // });
  // document.querySelector('.delete-completed')?.addEventListener('click', () => deleteCompleted(todos));
}

function renderError(errorMessage) {
  app.innerHTML = `
    <div>${errorMessage}</div>
  `;
}

function makeHomePage(blank) {
  return `
    <dialog id="tip"><strong></strong> <span id="tip-txt"></span></dialog>
    <main class="home__page">
      <section class="welcome__text">
        <figure>
          <img class="cover__image" src="Assests/em-anime.webp" alt="An AI generated paitning of the CJ, aka EM, in a fantasy setting." />
          </figure>
        <!-- <h1>Æinär's Library</h1> -->
        <p class="about-blurb">
          Aspiring game developer; WIP web developer; RPG hobbyist. 
        </p>
      </section>

      <section>
        <br />
        <!-- Add font awesome icons -->
        <div class="outer">
          <div class="icons">
            <a
              href="https://aka-em.itch.io/"
              target="_blank"
              class="fa-brands fa-itch-io"
            ></a>
          </div>
    
          <div class="icons">
            <a
              href="https://github.com/einar-method"
              target="_blank"
              class="fa fa-github"
            ></a>
          </div>
          <div class="icons">
            <a
              href="https://travelingbardgames.substack.com/"
              target="_blank"
              class="fa fa-rss"
            ></a>
          </div>
          <!-- <div class="icons">
            <a
              href="https://www.youtube.com/channel/UCTVQYIFLY7d5E9m57tGRKXw"
              target="_blank"
              class="fa fa-youtube"
              id="yt"
            ></a>
          </div> -->
          <div class="icons">
            <a
              href="https://open.spotify.com/track/1GGLQhjZSB6h0Qkfu2OvAf?si=4cafaec035cb4ed6"
              class="fa-brands fa-spotify"
              target="_blank"
            ></a>
          </div>
          <div class="icons">
            <a
              href="https://ordes.netlify.app/"
              class="fa-solid fa-globe"
              target="_blank"
            ></a>
          </div>
          <div class="icons">
            <a
              href="https://buymeacoffee.com/em.bmc"
              class="fa-solid fa-mug-hot"
              target="_blank"
            ></a>
          </div>
        </div>
        <br />
      </section>

      <section class="janken__section">
        <p class="green__text">Let's play janken!</p>
        <div class="mini-game">
          <div class="game-btns">
            <button class="janken__buttons" id="rock">rock</button>
            <button class="janken__buttons" id="paper">paper</button>
            <button class="janken__buttons" id="scissors">scissors</button>
          </div>
        </div>
      </section>
    </main>
  `;
};

function makePortfolioPage(dataIn) {
  return `
    <main class="blog__page">
      <p>This is the portfolio page.</p>
    </main>
  `;
};

function makeMerchPage(dataIn) {
  return `
    <main class="blog__page">
      <p>This is the merch page.</p>
    </main>
  `;
}

function makeBlogPage(blogIn) {
  return `
    <main class="blog__page">
      ${makeBlogSections()}
      ${blogPost(blogIn)}
    </main>
  `;
};

function setUpBlogInteraction(dataIn) {
  document.querySelectorAll('.blog__post').forEach(article => {
    article.addEventListener('click', function() {
      const postId = this.getAttribute('id');
      handleArticleClick(dataIn.blog, postId);
    });
  });
}

function blogPost(dataIn) {
  //console.log(dataIn.blog)
  return `
    <section class="blog__section">
        ${dataIn.blog.map(post => `
          <article class="blog__post" id="blogID${post.id}">
            <h2 class="blog__header">${post.title}</h2>
            <h3 class="blog__subheader">${post.subtitle}</h3>
            <p class="blog__paragraph">${truncateToWords(post.content)}</p>
            <p class="blog__date">Date: ${post.postDate}</p>
          </article>
        `).join('')}
    </section>
  `;
}

//class="blog__section_name
function makeBlogSections() {
  return `
    <div class="card">
      <div id="tab" class="inner-box">
        <fieldset 
            id="tab-toggle" 
            class="tab-options" 
        >

        <p class="form-para">
            <input 
            type="radio" 
            name="tool-toggle" 
            id="pc-tools" 
            value="pc-tools"
            class="tool-toggle"
            checked>
            <label for="pc-tools">stories</label>
        </p>

        <p class="form-para">
            <input 
            type="radio" 
            name="tool-toggle" 
            id="rr-tools" 
            value="rr-tools"
            class="tool-toggle">
            <label for="rr-tools">musings</label>
        </p>
        <p class="form-para">
            <input 
            type="radio" 
            name="tool-toggle" 
            id="dice-tools" 
            value="dice-tools"
            class="tool-toggle">
            <label for="dice-tools">games</label>
        </p>
        </fieldset>
      </div>
    </div>
  `
}

function renderHeader() {
  return `
    <header id="header">
        <button class="nav__header_btns" id="homeBtn">home</button>
        <button class="nav__header_btns" id="portfolioBtn">portfolio</button>
        <button class="nav__header_btns" id="merchBtn">merch</button>
        <button class="nav__header_btns" id="blogBtn">blog</button>
    </header>
  `
}
function renderNavHeader() {
  return `
    <button class="nav__header_btns" id="homeBtn">home</button>
    <button class="nav__header_btns" id="portfolioBtn">portfolio</button>
    <button class="nav__header_btns" id="merchBtn">merch</button>
    <button class="nav__header_btns" id="blogBtn">blog</button>
  `
}

function truncateToWords(str) {
  // const words = str.split(' ');
  // if (words.length > 20) {
  //   return words.slice(0, 20).join(' ') + '...';
  // }
  // return str;

  // Parse the JSON string into an array
  //const jsonArray = JSON.parse(str);

  // Get the second entry
  //const secondEntry = jsonArray[1];
  const secondEntry = str[1];

  // Create a temporary DOM element to use the browser's HTML parser to strip tags
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = secondEntry;

  // Extract the text content from the temporary element
  const extractedText = tempDiv.textContent || tempDiv.innerText || '';

  const words = extractedText.split(' ');
  if (words.length > 20) {
    return words.slice(0, 20).join(' ') + '...';
  }
  return extractedText;

  //return "place holder"
}

// function createPostPopupp(blogPosts) {
//   const post = blogPosts[0];
//   const popup = document.createElement('div');
//   popup.classList.add('popup');
//   popup.innerHTML = `
//     <div class="popup-content">
//       <h2>${post.title}</h2>
//       <p>${post.content}</p>
//       <button class="close-popup">Close</button>
//     </div>
//   `;
//   document.body.appendChild(popup);
//   const closeButton = popup.querySelector('.close-popup');
//   closeButton.addEventListener('click', () => {
//     popup.remove();
//   });
// }

// function handleArticleClick(blogData, postId) {
//   console.log("Article clicked:", postId);
//   // Add logic here for what should happen when an article is clicked
// }

function handleArticleClick(blogData, postId) {
  console.log("Article clicked:", postId);

  // Find the blog post that matches the postId
  const selectedPost = blogData.find(post => ("blogID" + post.id) === postId);

  // Check if the post was found and handle it
  if (selectedPost) {
    console.log("Selected post:", selectedPost);
    // Add logic here for what should happen when an article is clicked, e.g., open details
    openDetails(selectedPost.content);
  } else {
    console.log("Post not found!");
  }
}



function openDetails(detailsText) {
  // Check if the overlay already exists
  if (!document.getElementById('myNav')) {
    // Create a new div element for the overlay
    const overlayHTML = `
    <div id="myNav" class="blogPost__overlay">
        
        <div class="blogPost__overlay_content" id="postContent">
          <a href="javascript:void(0)" class="blog__closebtn_top">&times;</a>
          ${detailsText.map(html => html).join('')}
        </div>
        <div class="blogPost__overlay_footer">
            <button class="like-btn">Like</button>
            <button class="scroll-top-btn">To Top</button>
            <button class="blog__closebtn_bottom">&times;</button>
        </div>
    </div>
  `;

    // Insert the HTML into the body
    document.body.insertAdjacentHTML('beforeend', overlayHTML);

    // Add event listener for the close button
    document.querySelector('.blog__closebtn_top').addEventListener('click', closeDetails);
    document.querySelector('.blog__closebtn_bottom').addEventListener('click', closeDetails);
    document.querySelector('.like-btn').addEventListener('click', userAddLike);
    document.querySelector('.scroll-top-btn').addEventListener('click', overlayScrollIntoView);
  }

  // Display the overlay
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
}

function userAddLike() {
  // const likeCount = document.querySelector('.like-btn');
  // let count = parseInt(likeCount.textContent);
  // count++;
  // likeCount.textContent = count;
  console.log("User added a like");
}

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
});

class NavButtons {
  constructor() {
    this.buttons = [
      { name: "home", id: "homeBtn", isActive: true },
      { name: "portfolio", id: "portfolioBtn", isActive: false },
      { name: "merch", id: "merchBtn", isActive: false },
      { name: "blog", id: "blogBtn", isActive: false }
    ];

    this.defaultStyle = `
      color: var(--white-color);
      background-color: var(--primary-color);
      border: 0.1px solid var(--white-color);
      border-radius: 0px;
      padding: 5px 5px;
      display: inline-block;
      font-size: 18px;
      letter-spacing: 1px;
      cursor: pointer;
      box-shadow: inset 0 0 0 0 var(--white-color);
      -webkit-transition: ease-out 0.4s;
      -moz-transition: ease-out 0.4s;
      transition: ease-out 0.4s;
      flex-grow: 1;
    `;

    this.activeStyle = `
      color: var(--tirtary-color);
      background-color: var(--primary-color);
      border: 0.1px solid var(--white-color);
      border-radius: 0px;
      padding: 5px 5px;
      display: inline-block;
      font-size: 18px;
      letter-spacing: 1px;
      cursor: default;
      box-shadow: inset 0 0 0 25px var(--secondary-color);
      -webkit-transition: ease-out 0.4s;
      -moz-transition: ease-out 0.4s;
      transition: ease-out 0.4s;
      flex-grow: 1;
    `;

    this.hoverStyle = `
      color: var(--secondary-color);
      background-color: var(--primary-color);
      border: 0.1px solid var(--white-color);
      border-radius: 0px;
      padding: 5px 5px;
      display: inline-block;
      font-size: 18px;
      letter-spacing: 1px;
      cursor: pointer;
      box-shadow: inset 0 0 0 25px var(--white-color);
      -webkit-transition: ease-out 0.4s;
      -moz-transition: ease-out 0.4s;
      transition: ease-out 0.4s;
      flex-grow: 1;
    `
  }

  // Method to apply styles based on isActive
  applyStyles(button) {
    //console.error(button);
    //console.log(button.isActive);
    //console.log(button.id);
    //console.log(document.getElementById(button.id));
    const buttonElement = document.getElementById(button.id);
    buttonElement.style = button.isActive ? this.activeStyle : this.defaultStyle;
    
    //buttonElement.setAttribute('style', button.isActive ? this.activeStyle : this.defaultStyle);
    //buttonElement.setAttribute("setHover", "0");
    //console.log(document.getElementById(button.id));

    buttonElement.addEventListener('mouseover', () => {
      if (!button.isActive) {
        buttonElement.style = this.hoverStyle;
      }
    });
    buttonElement.addEventListener('mouseout', () => {
      buttonElement.style = button.isActive ? this.activeStyle : this.defaultStyle;
    });

    //document.styleSheets[0].insertRule(`#${button.id}:hover { background-color: red; }`, 1);
  }

  // Apply styles to all buttons
  applyAllStyles() {
    document.styleSheets[0].insertRule("#homeBtn:hover { background-color: red; }", 1);
    this.buttons.forEach(button => this.applyStyles(button));
  }
}

function navBtnClicked(buttonId, dataIn) {
  //console.log(buttonId);
  // Reset all buttons to default style
  // window.navButtons.buttons.forEach(button => {
  //   button.isActive = false;
  //   window.navButtons.applyStyles(button);
  // });
  window.navButtons.buttons.forEach(button => {
    if (button.id === buttonId) {
      button.isActive = true;
      //window.navButtons.applyStyles(button);
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
      app.innerHTML = makeHomePage();
      setupJankenGame();
    } else if (activeButton.id === "portfolioBtn") {
      console.log("Portfolio button is active");
      app.innerHTML = makePortfolioPage();
    } else if (activeButton.id === "merchBtn") {
      console.log("Merch button is active");
      app.innerHTML = makeMerchPage();
    } else if (activeButton.id === "blogBtn") {
      console.log("Blog button is active");
      app.innerHTML = makeBlogPage(dataIn);
      setUpBlogInteraction(dataIn);
    } else {
      console.log("No active button found");
    }
  } else {
    console.log('No active button found.');
  }
};


// JANKEN GAME
function setupJankenGame() {
  const possibleChoices = document.querySelectorAll('button.janken__buttons');

  possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
      const userChoice = e.target.id;
      const computerChoice = generateComputerChoice();
      const result = getResult(computerChoice, userChoice);
      const msg = `You picked ${userChoice}, CJ picked ${computerChoice}.<br>${result}`
      callTip(msg)
  }))
};

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    return randomNumber === 0 ? 'rock' : randomNumber === 1 ? 'scissors' : 'paper';
};

function getResult(computer, player) {
    let result
    if (computer === player) {
        result = "It's a draw..."
    }
    if (computer === 'rock' && player === 'paper') {
        result = "You win!"
    }
    if (computer === 'rock' && player === 'scissors') {
        result = "Sorry, you lost :("
    }
    if (computer === 'paper' && player === 'scissors') {
        result = "You win!"
    }
    if (computer === 'paper' && player === 'rock') {
        result = "Sorry, you lost :("
    }
    if (computer === 'scissors' && player === 'paper') {
        result = "Sorry, you lost :("
    }
    if (computer === 'scissors' && player === 'rock') {
        result = "You win!"
    }
    return result
}

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