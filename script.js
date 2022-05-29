const input = document.querySelector("#input");
const box = document.querySelector(".lister");
const activeBox = document.querySelector(".activate");
const completedBox = document.querySelector(".completed");
const completedButton = document.querySelector("#completed");
const activeButton = document.getElementById("active");
const arr = JSON.parse(localStorage.getItem("todos")) || [];
let id = JSON.parse(localStorage.getItem("id")) || 0;
const allButton = document.getElementById("all");

function Status(text, status, id) {
  this.text = text;
  this.status = status;
  this.id = id;
}

function allList(){
    activeBox.style.display = "none";
    completedBox.style.display = "none";
    if(box.style.display == "none"){
        box.innerHTML = ""
        starterList()
        box.style.display = "flex";
    }
}

function activeListcheck(event) {
  arr.forEach((obj) => {
    if (
      obj.id === event.target.parentElement.querySelector(".check").value
    ) {
      if (obj.status) {
        activeList();
      }
    }
  });
}

function completedList() {
    box.style.display = "none"
    activeBox.style.display = "none"
    if(completedBox.style.display == "none") {
        if(completedBox.childElementCount > 0) {
            completedBox.style.display = "flex";
        }
        else{
    if (arr) {
        JSON.parse(localStorage.getItem("todos")).forEach((obj) => {
          if (obj.status) {
            completedBox.style.display = "flex";
            const text = document.createElement("p");
            const checkButton = document.createElement("button");
            const deleteButton = document.createElement("button");
            const div = document.createElement("div");
            completedBox.appendChild(div);
            div.appendChild(text);
            div.appendChild(checkButton);
            div.appendChild(deleteButton);
            deleteButton.classList.add("deleter");
            deleteButton.innerHTML = "Delete Task";
            deleteButton.addEventListener("click", deleteTask);
            checkButton.addEventListener("click", () => {checkingIn(event)
                activeList()});
            checkButton.classList.add("check");
            checkButton.value = obj.id
            div.classList.add("center");
            text.classList.add("text");
            text.innerHTML = obj.text;
            if (obj.status) {
              checkButton.parentElement.style.backgroundColor = "green";
              checkButton.innerHTML = "-";
            } else {
              checkButton.parentElement.style.backgroundColor = "red";
              checkButton.innerHTML = "+";
            }
          }
      });
    }
    }
  }
}

function activeList() {
    box.style.display = "none"
    completedBox.style.display = "none"
    if(activeBox.style.display == "none") {
        if(activeBox.childElementCount > 0) {
            activeBox.style.display = "flex";
        }
        else{
    if (arr) {
        JSON.parse(localStorage.getItem("todos")).forEach((obj) => {
          if (!obj.status) {
            activeBox.style.display = "flex";
            const text = document.createElement("p");
            const checkButton = document.createElement("button");
            const deleteButton = document.createElement("button");
            const div = document.createElement("div");
            activeBox.appendChild(div);
            div.appendChild(text);
            div.appendChild(checkButton);
            div.appendChild(deleteButton);
            deleteButton.classList.add("deleter");
            deleteButton.innerHTML = "Delete Task";
            deleteButton.addEventListener("click", deleteTask);
            checkButton.addEventListener("click", () => {checkingIn(event)
                activeList()});
            checkButton.classList.add("check");
            checkButton.value = obj.id
            div.classList.add("center");
            text.classList.add("text");
            text.innerHTML = obj.text;
            if (obj.status) {
              checkButton.parentElement.style.backgroundColor = "green";
              checkButton.innerHTML = "-";
            } else {
              checkButton.parentElement.style.backgroundColor = "red";
              checkButton.innerHTML = "+";
            }
          }
      });
    }
    }
  }
}	


function enterButton(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    appendChilds(event);
  }
}
function appendChilds(event) {
  if (event.target.value === "" || event.target.value === " ") {
  } else {
    const text = document.createElement("p");
    const div = document.createElement("div");
    const checkButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    box.appendChild(div);
    div.appendChild(text);
    div.appendChild(checkButton);
    div.appendChild(deleteButton);
    deleteButton.classList.add("deleter");
    deleteButton.innerHTML = "Delete Task";
    deleteButton.addEventListener("click", deleteTask);
    checkButton.classList.add("check");
    checkButton.addEventListener("click", checkingIn);
    text.classList.add("text");
    div.classList.add("center");
    text.innerHTML = event.target.value;
    const obj = new Status(event.target.value, false, id);
    checkButton.value = obj.id
    id++
    arr.push(obj);
    localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("todos", JSON.stringify(arr));
    if (obj.status) {
      checkButton.parentElement.style.backgroundColor = "green";
      checkButton.innerHTML = "-";
    } else {
      checkButton.parentElement.style.backgroundColor = "red";
      checkButton.innerHTML = "+";
    }
    event.target.value = "";
  }
}
function starterList() {
  if (arr) {
    JSON.parse(localStorage.getItem("todos")).forEach((obj) => {
      if (obj.text) {
        const text = document.createElement("p");
        const checkButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const div = document.createElement("div");
        activeBox.style.display = "none";
        completedBox.style.display = "none";
        box.appendChild(div);
        div.appendChild(text);
        div.appendChild(checkButton);
        div.appendChild(deleteButton);
        deleteButton.classList.add("deleter");
        deleteButton.innerHTML = "Delete Task";
        deleteButton.addEventListener("click", deleteTask);
        checkButton.addEventListener("click", checkingIn);
        checkButton.classList.add("check");
        checkButton.value = obj.id
        div.classList.add("center");
        text.classList.add("text");
        text.innerHTML = obj.text;
        if (obj.status) {
          checkButton.parentElement.style.backgroundColor = "green";
          checkButton.innerHTML = "-";
        } else {
          checkButton.parentElement.style.backgroundColor = "red";
          checkButton.innerHTML = "+";
        }
      }
    });
  }
}
function checkingIn(event) {
  arr.forEach((obj) => {
    if (
      event.target.value == obj.id
    ) {
      if (obj.status) {
        event.target.parentElement.style.backgroundColor = "red";
        event.target.innerText = "+";
        obj.status = false;
      } else {
        event.target.parentElement.style.backgroundColor = "green";
        event.target.innerText = "-";
        obj.status = true;
      }
    }
  });
  localStorage.setItem("todos", JSON.stringify(arr));
}
function deleteTask(event) {
        const filtered = JSON.parse(localStorage.getItem("todos")).filter((obj) => {
            if(obj.id != event.target.parentElement.querySelector(".check").value) {
                return obj;
            }
        });
        localStorage.setItem("todos", JSON.stringify(filtered));
        event.target.parentElement.remove();
}
starterList();
input.addEventListener("keypress", () => enterButton(event));
activeButton.addEventListener("click", activeList);
allButton.addEventListener("click", allList);
completedButton.addEventListener("click", completedList);
