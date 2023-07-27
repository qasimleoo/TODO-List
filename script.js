localStorage.clear();

function getUpdate() {
    console.log('Updating list...');

    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;

    if (localStorage.getItem('items') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('items', JSON.stringify(itemJsonArray));
    } 
    else {
        itemJsonArrayStr = localStorage.getItem('items');
        itemJsonArray = JSON.parse(itemJsonArrayStr);

        itemJsonArray.push([tit, desc]);
        localStorage.setItem('items', JSON.stringify(itemJsonArray));
    }
    update();
}

function update() {
    if (localStorage.getItem('items') == null) {
        itemJsonArray = [];
        localStorage.setItem('items', JSON.stringify(itemJsonArray));
    } 
    else {
        itemJsonArrayStr = localStorage.getItem('items');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    str = '';
    tableBody = document.getElementById('tableBody');

    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td class="btn btn-primary btn-sm" onclick='deleted(${index})'> Delete </td>
        </tr>
        `;
        console.log(index, element[0], element[1]);
    });
    tableBody.innerHTML = str;
}

function deleted(itemIndex) {
    if (confirm(`Do you really wanna delete item at index ${itemIndex}??`)) {
        itemJsonArrayStr = localStorage.getItem('items');
        itemJsonArray = JSON.parse(itemJsonArrayStr);

        itemJsonArray.splice(itemIndex, 1);

        localStorage.setItem('items', JSON.stringify(itemJsonArray));
        update();
    }
}

function clearList() {
    if(localStorage.getItem('items') == null){
        confirm('List is already empty...');
    }
    else if (confirm("Do you really wanna clear the list?")) {
        console.log('Clearing the storage...');
        localStorage.clear();
        update();
    }
}

document.getElementById('add').addEventListener('click', callingFunctions);

document.getElementById('clear').addEventListener('click', clearList);

// Validation on boxes
function callingFunctions(){
    flag1 = !document.getElementById('title').value == false;
    flag2 = !document.getElementById('description').value == false;
    // console.log(flag1, flag2);

    if(flag1 && flag2){
        getUpdate();
    }
    else{
        confirm('Please enter values in both boxes');
    }
}