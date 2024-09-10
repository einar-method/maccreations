// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

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


// Write Data
// ---------
function addTodo(text) {
  db.transact(
    tx.todos[id()].update({
      text,
      done: false,
      createdAt: Date.now(),
    })
  );
  focusInput();
}

function deleteTodoItem(todo) {
  db.transact(tx.todos[todo.id].delete());
}

function toggleDone(todo) {
  db.transact(tx.todos[todo.id].update({ done: !todo.done }));
}

function deleteCompleted(todos) {
  const completed = todos.filter((todo) => todo.done);
  const txs = completed.map((todo) => tx.todos[todo.id].delete());
  db.transact(txs);
}

function toggleAllTodos(todos) {
  const newVal = !todos.every((todo) => todo.done);
  db.transact(todos.map((todo) => tx.todos[todo.id].update({ done: newVal })));
}

// Styles
// ---------
const styles = {
  container: `
    box-sizing: border-box;
    background-color: #fafafa;
    font-family: code, monospace;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  header: `
    letter-spacing: 2px;
    font-size: 50px;
    color: lightgray;
    margin-bottom: 10px;
  `,
  form: `
    box-sizing: inherit;
    display: flex;
    border: 1px solid lightgray;
    border-bottom-width: 0px;
    width: 350px;
  `,
  toggleAll: `
    font-size: 30px;
    cursor: pointer;
    margin-left: 11px;
    margin-top: -6px;
    width: 15px;
    margin-right: 12px;
  `,
  input: `
    background-color: transparent;
    font-family: code, monospace;
    width: 287px;
    padding: 10px;
    font-style: italic;
  `,
  todoList: `
    box-sizing: inherit;
    width: 350px;
  `,
  checkbox: `
    font-size: 30px;
    margin-left: 5px;
    margin-right: 20px;
    cursor: pointer;
  `,
  todo: `
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid lightgray;
    border-bottom-width: 0px;
  `,
  todoText: `
    flex-grow: 1;
    overflow: hidden;
  `,
  delete: `
    width: 25px;
    cursor: pointer;
    color: lightgray;
  `,
  actionBar: `
    display: flex;
    justify-content: space-between;
    width: 328px;
    padding: 10px;
    border: 1px solid lightgray;
    font-size: 10px;
  `,
  footer: `
    margin-top: 20px;
    font-size: 10px;
  `,
};

// Render
// ---------
const app = document.getElementById('app');
app.style.cssText = styles.container;

function render(data) {
  app.innerHTML = '';

  console.log(data)

  const { blog } = data;

  console.log(blog)

  const { todos } = data;

  console.log(todos);

  const containerHTML = `
    <div style="${styles.container}">
      ${blogPost(blog)}
      <div style="${styles.header}">plink blog</div>
      ${TodoForm()}
      ${TodoList(todos)}
      ${ActionBar(todos)}
      <div style="${styles.footer}">Open another tab to see todos update in realtime!</div>
    </div>
  `;

  app.innerHTML = containerHTML;

  // Attach event listeners
  document.querySelector('.toggle-all')?.addEventListener('click', () => toggleAllTodos(todos));
  document.querySelector('form')?.addEventListener('submit', submitForm);
  todos.forEach(todo => {
    document.getElementById(`toggle-${todo.id}`)?.addEventListener('change', () => toggleDone(todo));
    document.getElementById(`delete-${todo.id}`)?.addEventListener('click', () => deleteTodoItem(todo));
  });
  document.querySelector('.delete-completed')?.addEventListener('click', () => deleteCompleted(todos));
}

function renderError(errorMessage) {
  app.innerHTML = `
    <div>${errorMessage}</div>
  `;
}

function TodoForm() {
  return `
    <div style="${styles.form}">
      <div class="toggle-all" style="${styles.toggleAll}">⌄</div>
      <form>
        <input style="${styles.input}" placeholder="What needs to be done?" type="text" autofocus>
      </form>
    </div>
  `;
}

function TodoList(todos) {
  return `
    <div style="${styles.todoList}">
      ${todos.map(todo => `
        <div style="${styles.todo}">
          <input id="toggle-${todo.id}" type="checkbox" style="${styles.checkbox}" ${todo.done ? 'checked' : ''}>
          <div style="${styles.todoText}">
            ${todo.done ? `<span style="text-decoration: line-through;">${todo.text}</span>` : `<span>${todo.text}</span>`}
          </div>
          <span id="delete-${todo.id}" style="${styles.delete}">𝘟</span>
        </div>
      `).join('')}
    </div>
  `;
}

function ActionBar(todos) {
  return `
    <div style="${styles.actionBar}">
      <div>Remaining todos: ${todos.filter(todo => !todo.done).length}</div>
      <div class="delete-completed" style="cursor: pointer;">Delete Completed</div>
    </div>
  `;
}

function focusInput() {
  const input = document.querySelector('input[type="text"]');
  if (input) {
    input.focus();
  }
}

function submitForm(event) {
  event.preventDefault();
  const input = event.target.querySelector('input');
  if (input && input.value.trim()) {
    addTodo(input.value);
    input.value = '';
  }
}

function blogPost(blogPosts) {
  return `
    <section >
      <div class="toggle-all" style="${styles.toggleAll}">Stories</div>

      <article>
        ${blogPosts.map(post => `
          <h2>${post.title}</h2>
          <h3>${post.subtitle}</h3>
          <p>${truncateToWords(post.content)}</p>
          <p>Date: ${post.postDate}</p>
        `).join('')}
      </article>
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

