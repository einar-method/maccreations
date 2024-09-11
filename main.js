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
  app.innerHTML = '';

  console.log(data)

  const { blog } = data;

  console.log(blog)

  const { todos } = data;

  console.log(todos);

  const containerHTML = `
    ${renderHeader()}
    <main class="blog__page">
      ${makeBlogSections()}
      ${blogPost(blog)}
    </main>
  `;

  app.innerHTML = containerHTML;

  document.querySelectorAll('.blog__post').forEach(article => {
    article.addEventListener('click', function() {
      const postId = this.getAttribute('id');
      handleArticleClick(blog, postId);
    });
  });

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

function blogPost(blogPosts) {
  return `
    <section class="blog__section">
        ${blogPosts.map(post => `
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
        <button class="h-btns" id="home" onclick="window.location.href='#';">home</button>
        <button class="h-btns" id="ezd6" onclick="window.location.href='EZD6/ez-index.html';">portfolio</button>
        <button class="h-btns" id="itch" onclick="window.location.href='itch.html';">store</button>
        <button class="h-btns" id="substack" onclick="window.location.href='substack.html';">blog</button>
    </header>
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
  // Call your function here after the DOM content is loaded
  removeElementWithStyles();
});  
