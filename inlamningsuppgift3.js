let itemsleft = 0;
let countTodos = 0;
//behövs denna?
const checkBoxArray = [];


const form = document.querySelector('form');
var table = document.getElementById("myTable");
const bottomTable = document.getElementById("bottomTable");
const middleRow = document.getElementsByClassName("middleRow");
const middleRowChecked = document.getElementsByClassName("middleRowChecked");
const markAll = document.getElementById('markAll');
const showAll = document.getElementById("showAll");
const showActive = document.getElementById("showActive");
const itemsLeft = document.getElementById("itemsLeft");
const showCompleted = document.getElementById('showCompleted');
const clearCompleted = document.getElementById("clearCompleted");

var position = 0;

/* function functionShowActive() {
    var x = document.getElementsById("middleRowChecked");
    x.style.display = 'none';
  }
  
function functionShowComplete() {
    var x = document.getElementsById("middleRow");
    x.style.display = "none";;
  } */
function showOrHideButtons() {
    if (countTodos > 0) {
        bottomTable.style = "display:table-row";
        markAll.style = "display:table-row";
    }
    else {
        bottomTable.style = "display:none";
        markAll.style = "display:none";
    }
}

form.onsubmit = event => {
    event.preventDefault();
    const inputTodo = form.elements.inputTodo.value.trimLeft().trimRight();


    if (inputTodo != "") {
        itemsleft++;
        countTodos++;

        bottomTable.style = "display:table-row";
        markAll.style = "display:table-row";
        /* clearCompleted.hidden=true; */
        itemsLeft.textContent = itemsleft + " items left";
        // hämtar elemntet "myTable"
        var table = document.getElementById('myTable');
        // Skapar ny rad ovanför sista raden
        var middleRow = table.insertRow(Math.floor(table.rows.length - 1));
        // lägger in atrributet "class" på raden och namnger klassen för att kunna hitta den
        middleRow.setAttribute("class", 'middleRow');
        middleRow.setAttribute("style", 'table-row');
        /* middleRow.setAttribute("hidden", false); */
        //Lägger in två celler på den nya raden
        var cell1 = middleRow.insertCell(0);
        var cell2 = middleRow.insertCell(1);


        // skapar och lägger in en checkbox intui cell 1
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = 'checkbox';
        cell1.appendChild(checkBox);
        //behöver vi ha listan?
        checkBoxArray.push(checkBox);
        /* cell1.colSpan = 1; */

        var input = document.createElement('label');
        input.id = "input";
        input.textContent = inputTodo;
        cell2.appendChild(input);
        cell2.colSpan = 6;

        // Also add a button inside the <li> that, when clicked, removes that <li>.
        const removeButton = document.createElement('button');
        removeButton.setAttribute("class", 'buttonForRemove');
        removeButton.type = 'button';
        removeButton.textContent = '❌';
        cell2.appendChild(removeButton)
        //flyttade upp den här så den är vid knappen
        // Note that each remove button gets its own event handler, and JavaScript "remembers" which <li> we are referring to for each one.
        removeButton.onclick = event => {
            event.preventDefault();
            middleRow.remove();
            countTodos--;
            if (!checkBox.checked) {
                itemsleft--;
                itemsLeft.textContent = itemsleft + " items left";
            }
            showOrHideButtons();

        };

        if (position === 2) {
            x = document.querySelectorAll(".middleRowChecked");
            for (i = 0; i < x.length; i++) {
                x[i].style = "display:none";
            }

            x = document.querySelectorAll(".middleRow");
            for (i = 0; i < x.length; i++) {
                x[i].style = "display:table-row";
            }
            showOrHideButtons();
        }

        if (position === 3) {
            var x, i;
            x = document.querySelectorAll(".middleRow");
            for (i = 0; i < x.length; i++) {
                x[i].style = "display:none";
            }

            x = document.querySelectorAll(".middleRowChecked");
            for (i = 0; i < x.length; i++) {
                x[i].style = "display:table-row";
            }
            showOrHideButtons();
        }

        form.elements.inputTodo.value = "";


        checkBox.onchange = event => {
            event.preventDefault();


            if (checkBox.checked) {

                middleRow.setAttribute("class", 'middleRowChecked');
                clearCompleted.style = "display:table-row";

                input.style.textDecorationLine = "line-through";
                input.style.opacity = "0.5";

                itemsleft--;
                itemsLeft.textContent = itemsleft + " items left";

                if (position === 2) {
                    middleRow.style = "display:none";
                }

            }
            else {
                middleRow.setAttribute("class", 'middleRow');
                input.style.textDecorationLine = "none";
                input.style.opacity = "1";
                // list.push(inputTodo);
                itemsleft++;
                itemsLeft.textContent = itemsleft + " items left";

                if (position === 3) {
                    middleRow.style = "display:none";
                }
                if (middleRowChecked.length === 0) {
                    clearCompleted.style = "none";
                }

                showOrHideButtons();

            }
            // if (middleRowChecked.length > 0) {
            //     clearCompleted.style = "display:table.row";
            // }
            // showOrHideButtons();

        }

    }
};

showAll.onclick = event => {
    event.preventDefault();
    var x, i;
    x = document.querySelectorAll(".middleRowChecked");
    for (i = 0; i < x.length; i++) {
        x[i].style = "display:table.row";
    }

    x = document.querySelectorAll(".middleRow");
    for (i = 0; i < x.length; i++) {
        x[i].style = "display:table-row";
    }
    showOrHideButtons();

    position = 1;
};

showActive.onclick = event => {
    event.preventDefault();
    var x, i;
    x = document.querySelectorAll(".middleRowChecked");
    for (i = 0; i < x.length; i++) {
        x[i].style = "display:none";
    }

    x = document.querySelectorAll(".middleRow");
    for (i = 0; i < x.length; i++) {
        x[i].style = "display:table-row";
    }

    position = 2;
};

showCompleted.onclick = event => {
    event.preventDefault();
    var x, i;
    x = document.querySelectorAll(".middleRow");
    for (i = 0; i < x.length; i++) {
        x[i].style = "display:none";
    }

    x = document.querySelectorAll(".middleRowChecked");
    for (i = 0; i < x.length; i++) {
        x[i].style = "display:table-row";
    }

    position = 3;

};
clearCompleted.onclick = event => {
    event.preventDefault();

    var x = document.querySelectorAll(".middleRowChecked");
    if (middleRowChecked.length > 0) {
        x.forEach(n => {
            n.remove()
            countTodos--;
        });
    }
    clearCompleted.style = "display:none";

    showOrHideButtons();

};
markAll.onclick = event => {
    event.preventDefault();
    if (middleRow.length > 0) {
        var x = document.querySelectorAll(".middleRow");
        x.forEach(n => {
            n.setAttribute("class", 'middleRowChecked');
            n.cells[1].style.textDecorationLine = "line-through";
            n.cells[1].style.opacity = "0.5";
            n.cells[0].firstChild.checked = true;
            itemsleft--;
        });
    }
    else {
        var x = document.querySelectorAll(".middleRowChecked");
        x.forEach(n => {
            n.setAttribute("class", 'middleRow');
            n.cells[1].style.textDecorationLine = "none";
            n.cells[1].style.opacity = "1";
            n.cells[0].firstChild.checked = false;
            itemsleft++;
        });
    }
    if (middleRowChecked.length > 0) {
        clearCompleted.style = "display:table-row";
    }
    else if (middleRow.length > 0) {
        clearCompleted.style = "display:none";

    }
    if (position === 2) {
        middleRow.style = "display:none";
    }
    itemsLeft.textContent = itemsleft + " items left";

    showOrHideButtons();
}




