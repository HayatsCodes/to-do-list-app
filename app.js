const addItem = document.getElementById('add-item');
const itemsWrapper = document.querySelector('ul');
const textInput = document.getElementById('text-input');
const clearItems = document.getElementById('clear-items');

let isChecked = false;
let listsInItemsWrapper = 0;

function iconsEventListener() {
    const checkIcons = document.querySelectorAll('.fa-check');
    checkIcons.forEach(checkIcon => {
        checkIcon.addEventListener('click', markItemAsChecked);
    });

    const penIcons = document.querySelectorAll('.fa-pen');
    penIcons.forEach(penIcon => {
        penIcon.addEventListener('click', editItem);
    });

    const trashIcons = document.querySelectorAll('.fa-trash');
    trashIcons.forEach(trashIcon => {
        trashIcon.addEventListener('click', deleteItem);
    });
}


function addItemsToList() {
    if (textInput.value) {
        if (listsInItemsWrapper < 8) {
            itemsWrapper.innerHTML += ` <li class="items-list">
        <span contenteditable="false">${textInput.value}</span>
        <span> <i class="fas fa-check"></i>
            <i class="fas fa-pen"></i>
            <i class="fas fa-trash"></i>
        </span>
    </li>`;
            listsInItemsWrapper++;
            textInput.value = '';
            iconsEventListener();
            localStorage.setItem('toDoItems', JSON.stringify((itemsWrapper.innerHTML)));
            localStorage.setItem('listsInItemsWrapper', JSON.stringify((listsInItemsWrapper)));
        } else if (listsInItemsWrapper === 8) {
            let checkPEl = itemsWrapper.querySelector('p');
            if (!checkPEl) {
                p = document.createElement("p");
                p.innerText = "Items Limit Reached!";
                itemsWrapper.append(p);
            }
        }

    }
}

function setItemToStorage() {
    if (localStorage.getItem("toDoItems")) {
        localStorage.setItem('toDoItems', JSON.stringify((itemsWrapper.innerHTML)));
    }
}


function markItemAsChecked(e) {
    const textSpan = e.target.parentNode.previousElementSibling;
    if (!isChecked) {
        textSpan.style.textDecoration = 'line-through red 2px';
        isChecked = true;
    } else {
        textSpan.style.textDecoration = 'none';
        isChecked = false;
    }
}

function editItem(e) {
    const textSpan = e.target.parentNode.previousElementSibling;
    textSpan.style.textDecoration = 'none';
    textSpan.setAttribute("onkeypress", "return (this.innerText.length <= 35)");
    textSpan.setAttribute("contenteditable", "true");
    textSpan.focus();
    textSpan.style.outline = " 0px solid black";
    textSpan.addEventListener('blur', (event) => {
        if (textSpan.innerText.length < 1) {
            event.preventDefault();
            textSpan.focus();
            textSpan.style.caretColor = 'red';
        } else {
            textSpan.setAttribute("contenteditable", "false");
            textSpan.style.caretColor = 'black';
            setItemToStorage();
        }
    });
}

function deleteItem(e) {
    const li = e.target.parentNode.parentNode;
    li.remove();
    listsInItemsWrapper--;
    setItemToStorage();
    localStorage.setItem('listsInItemsWrapper', JSON.stringify((listsInItemsWrapper)));
    retrieveFromStorage();
    let p = itemsWrapper.querySelector('p');
    if (p) {
        p.remove();
    }
}

function clearAllItems() {
    itemsWrapper.innerHTML = "";
    listsInItemsWrapper = 0;
    localStorage.clear();
}


// Add Events Listener
addItem.addEventListener('click', addItemsToList);
clearItems.addEventListener('click', clearAllItems);

function retrieveFromStorage() {
    let toDoItems = JSON.parse(localStorage.getItem("toDoItems"));
    if (toDoItems) {
        itemsWrapper.innerHTML = toDoItems;
        listsInItemsWrapper = JSON.parse(localStorage.getItem("listsInItemsWrapper"));
        iconsEventListener();
    }
}

// On Load
retrieveFromStorage();

