(function () {
  const submit = document.querySelector("#submit");
  const input = document.getElementById("input");
  const container = document.getElementById("app");
  const clear = document.getElementById("clear");
  submit.addEventListener("click", addTodo);
  clear.addEventListener("click", () => handleClearInput());
  const state = {
    todo: JSON.parse(localStorage.getItem("todo")) || [],
    EditIdx: ""
  };
  //call the render
  renderTodo(state.todo);

  // creating new todo and editing todo if already Exists in the todo item....
  function addTodo() {
    if (input.value.trim() === "") {
      alert("Please enter a valid todo item."); // Show an error message for empty input
      return;
    }

    if (state.EditIdx) {
      const updateTodo = state.todo.map((el) =>
        el.id.toString() === state.EditIdx
          ? {
              ...el,
              text: input.value
            }
          : el
      );
      state.todo = updateTodo;
      localStorage.setItem("todo", JSON.stringify(state.todo));
      state.EditIdx = "";
      submit.innerText = "Add Todo";
    } else {
      let Todoobj = {
        id: Math.ceil(Math.random() * 4000),
        text: input.value
      };
      state.todo.push(Todoobj);
      localStorage.setItem("todo", JSON.stringify(state.todo));
    }
    input.value = "";
    renderTodo(state.todo);
  }

  //looping throught the todo items
  function renderTodo(todo) {
    container.innerHTML = "";
    todo.forEach((el) => todoUI(el));
  }

  function handleClearInput() {
    console.log("e");
    if (state?.EditIdx) {
      input.value = "";
      submit.innerHTML = "Add Todo";
      state.EditIdx = "";
    }
  }
  //todo UI
  function todoUI(el) {
    const p = document.createElement("p");
    p.innerText = el.text;
    container.appendChild(p);
    const button = document.createElement("button");
    button.innerText = "Delete";
    button.classList.add("delete");
    button.dataset.id = el.id;
    p.appendChild(button);
    const Editbutton = document.createElement("button");
    Editbutton.innerText = "Edit";
    Editbutton.classList.add("edit");
    Editbutton.dataset.id = el.id;
    p.appendChild(Editbutton);
  }

  // handleing delete items
  container.addEventListener("click", (event) => deleteItem(event));
  function deleteItem(e) {
    const { id } = e.target.dataset;
    if (e.target.classList.contains("delete")) {
      const deleteietm = window.confirm("Are you Sure");
      if (deleteietm) {
        e.target.closest("p").remove();
        state.todo = state.todo.filter((el) => el.id.toString() !== id);
        localStorage.setItem("todo", JSON.stringify(state.todo));
      } else {
        return "";
      }
    }
  }

  // handleing Edit
  container.addEventListener("click", (event) => handleEdit(event));

  function handleEdit(event) {
    const { id } = event.target.dataset;
    if (event.target.classList.contains("edit")) {
      const todoValue = state.todo.find((el) => el.id.toString() === id);
      state.EditIdx = id;
      if (id) {
        submit.innerText = "Edit Todo";
      }
      if (todoValue?.text) {
        input.value = todoValue.text;
      }
    }
  }
})();
