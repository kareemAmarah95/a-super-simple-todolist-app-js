// select all elements
const todoInput = document.querySelector("#todoInput");
const submitBtn = document.querySelector("#submitBtn");
const clearBtn = document.querySelector("#clearBtn");
const demo = document.querySelector("#demo");
let myArr = [];
// when refersh the page the localStorage is cleared so we have to make a condition
getDataFromLocalStorage();
if(window.localStorage.getItem("todos")){
    myArr = JSON.parse(window.localStorage.getItem("todos"));
}

submitBtn.addEventListener("click", ()=>{
    if(todoInput.value === "" || todoInput.value === null){
        return ;
    } else {
        const todoObject = {
            id: Date.now(),
            todo: todoInput.value
        }
        // create an array to push the todoObject inside
        myArr.push(todoObject);
        todoInput.value = "";
        addTodoToPage(myArr);
        addTodoToLocalStorage(myArr)
    }
})

function addTodoToPage(myArr){
    demo.innerHTML = "";
    for(let i = 0 ; i < myArr.length; i++){
        demo.innerHTML += 
        `<li class="todo-item" id=${myArr[i].id}>
        <div>${myArr[i].todo}</div>
        <div>
        <span class="updateBtn" onclick="updateTodo(${myArr[i].id})">Update</span>
        <span class="deleteBtn" onclick="deleteTodo(${myArr[i].id})">Delete</span>
        </div>
        
        
        </li>` 
    }
}

function addTodoToLocalStorage(myArr){
    window.localStorage.setItem("todos", JSON.stringify(myArr));
}

function getDataFromLocalStorage(){
    if(window.localStorage.getItem("todos")){
       let task = JSON.parse(window.localStorage.getItem("todos"));
       addTodoToPage(task);
    }
}

clearBtn.addEventListener("click", clearAll);

function clearAll(){
    demo.innerHTML = "";
    window.localStorage.removeItem("todos");
}

function deleteTodo(id){
    let cartoona = "";
    for(let i = 0 ; i < myArr.length; i++){
        if(myArr[i].id == id){
           cartoona =  myArr.splice(i,1);
        }
    }
    demo.innerHTML = cartoona;
    addTodoToPage(myArr);
    addTodoToLocalStorage(myArr);
}

function updateTodo(id){
    for(let i = 0 ; i < myArr.length; i++){
       if(myArr[i].id == id){
        todoInput.value =  myArr[i].todo;
       }
    }
    document.querySelector(".update-div").innerHTML = "";
    document.querySelector(".update-div").innerHTML = `<button onclick = "editTodo(${id})"class="updateBtn">Update</button>`;
}

function editTodo(id){
    for (let i = 0; i < myArr.length; i++) {
      if(myArr[i].id == id){
        myArr[i].todo = todoInput.value;
      }    
    }
    addTodoToPage(myArr);
    addTodoToLocalStorage(myArr);
    todoInput.value = "";
    document.querySelector(".update-div").innerHTML = "";
    document.querySelector(".update-div").innerHTML = ` <div><button id="submitBtn">Add Todo</button></div>
    <div><button id="clearBtn">Clear All</button></div>`;
}


