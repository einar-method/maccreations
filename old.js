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

// export function setupCounter(element) {
//   let counter = 0
//   const setCounter = (count) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }