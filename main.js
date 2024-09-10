import { init, tx, id } from '@instantdb/core';

// ID for app: plink
const APP_ID = 'bcc500de-07a9-4fde-9025-c87906e63bf3';

// Initialize the database
// ---------
const db = init({ appId: APP_ID });

// Subscribe to data
// ---------
db.subscribeQuery({ todos: {}, blog: {} }, (resp) => {
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
    <main class="blog__page">
    <div class="blog__section_name">Stories</div>
      ${blogPost(blog)}
    </main>
  `;

  app.innerHTML = containerHTML;

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
          <article class="blog__post">
            <h2 class="blog__header">${post.title}</h2>
            <h3 class="blog__subheader">${post.subtitle}</h3>
            <p class="blog__paragraph">${truncateToWords(post.content)}</p>
            <p class="blog__date">Date: ${post.postDate}</p>
          </article>
        `).join('')}
    </section>
  `;
}

function truncateString(str) {
  if (str.length > 285) {
    return str.slice(0, 285) + '...';
  }
  return str;
}

function truncateToWords(str) {
  const words = str.split(' ');
  if (words.length > 20) {
    return words.slice(0, 20).join(' ') + '...';
  }
  return str;
}

