const addTodoBtn = document.getElementById("addTodoBtn")
const inputTag = document.getElementById("todoInput")
const todoListUl = document.getElementById("todoList")

let todoText; // This should be populated when the user clicks on the Add button
let todos = [];
let todosString = localStorage.getItem("todos")
// If we have todos in the localStorage, we will read it
if (todosString) {
    todos = JSON.parse(todosString)
}



const populateTodos = () => {
    let string = "";
    let i = 0
    for (const todo of todos) {
        string += `<li id="todo-${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
                </li>`
    }            i++;
    todoListUl.innerHTML = string 



    // Add the checkbox logic to populate todos
    let deleteBtns = document.querySelectorAll(".delete-btn")

deleteBtns.forEach((element) => {
    element.addEventListener("click", (e) => {
       todos = todos.filter((todo) => {
        return ("todo-" + todo.id ) !== (e.target.parentNode.id)
       })
       localStorage.setItem("todos", JSON.stringify(todos))
       populateTodos()
    })
})
    
}

addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value
    // Check if the length of todo is greater than 3
    if(todoText.trim().length<4) {
        alert("You cannot add a todo that small!")
        return
    }
    inputTag.value = ""
    let todo = {
        id: "todo-" + Date.now(),
        title: todoText,
        isCompleted: false
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
    populateTodos()
})

populateTodos()

const todoCheckboxes = document.querySelectorAll(".todo-checkbox")

todoCheckboxes.forEach((element)=> {
    element.addEventListener("click", (e) => {
        if(e.target.checked) {
            element.parentNode.classList.add("completed")
            // Grab the todo from todos array and update the todos array to set this todo's isCompleted as true
            todos = todos.map(todo => {
                if(todo.id == element.parentNode.id) {
                    return {...todo, isCompleted: false}
                }
                else {
                    return todo
                }
            })
            localStorage.setItem("todos", JSON.stringify(todos))
        }
        else {
            element.parentNode.classList.remove("completed")
        }
    })
})

