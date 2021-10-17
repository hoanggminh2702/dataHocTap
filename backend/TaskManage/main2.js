const BASE_URL = 'http://localhost:8080';
var search = ""
const GET_LIST_TASK_URL = `${BASE_URL}/api/getTaskList`;
const EDIT_TASK_URL = `${BASE_URL}/api/editTask`
const CREATE_TASK_URL = `${BASE_URL}/api/createTask`
const DELETE_TASK_URL = `${BASE_URL}/api/deleteTask`

var totalPageGlobal = 1
var currentPage = 1
var take = 5

/* Add 0 to number < 10 */
function addZeros(number) {
    if (number < 10) return '0' + number.toString()
    else return number
}

/* Gen right format date */
function genRightFormatDate(input) {
    let date = new Date(input)
    if (input == "") {
        return new Date()
    }
    let fullYear = date.getFullYear().toString()
    let fullMonth = addZeros(date.getMonth() + 1).toString()
    let fullDay = addZeros(date.getDay()).toString()
    let fullHours = addZeros(date.getHours()).toString()
    let fullMinutes = addZeros(date.getMinutes()).toString()
    // 2017-06-01T08:30
    return `${fullYear}-${fullMonth}-${fullDay}T${fullHours}:${fullMinutes}`
}

/* Change form display style */
function switchDisplayForm(code) {
    switch (code) {
        case 0:
            document.forms[0].style.display = 'none'
            document.forms[1].style.display = 'flex'
            break
        case 1:
            document.forms[1].style.display = 'none'
            document.forms[0].style.display = 'flex'
    }
}

/* Render Page Bar */
function renderPaginationBar(totalRecord, choosenPage = 1) {
    const totalPage = Math.ceil(totalRecord/take);
    totalPageGlobal = totalPage + 1
    let renderPageBarHTML = ""
    for (let i = 1; i <= totalPage; i++) {
        let div = `div id="${i}" class="page"`
        if (choosenPage == i) {
            div += `style="background-color: red"`
        }
        renderPageBarHTML += `
        <${div}>
        <p>${i}</p>
        </div>`;
    }
    
    return renderPageBarHTML;
}

/* Render Table */
async function renderTable(choosenPage=1) {
    let renderTableHTML = "";
    const response = await axios.get(`${GET_LIST_TASK_URL}?page=${choosenPage}`);
    const listTask = response.data.items;
    listTask.forEach(function(task) {
        renderTableHTML += `
        <tr id="${task['_id']}">
        <td name="time">${task.time}</td>
        <td name="name">${task.name}</td>
        <td name="description">${task.description}</td>
        <td name="edit">Edit</td>
        <td name="delete">Delete</td>
        </tr>`;
    })

    document.querySelector('tbody').innerHTML = renderTableHTML;

    document.querySelector('.page-container').innerHTML = 
        renderPaginationBar(response.data.totalCount,choosenPage);
}

/* First Load */
document.querySelector('body').onload = async function(e) {
    await renderTable();
}

/* Render Table By Clicking Page Button */
document.querySelector('.page-container').onmouseenter = function(e) {
    let pageButtons = e.currentTarget.children;
    for(let i = 0; i < pageButtons.length; i++) {
        pageButtons[i].onclick = async function(e) {
            e.stopPropagation();
            let choosenPage = Number(e.currentTarget.id);
            currentPage = choosenPage;
            await renderTable(currentPage);
        }
    }
};

/* Create Task */
document.querySelector('.create-submit').onclick = async function(e) {
    e.stopPropagation();

    let newTask = {
        name: document.forms[0].name.value,
        description: document.forms[0].description.value,
        time: genRightFormatDate(document.forms[0].datetime.value)
    }

    try {
        let response = await axios.post(CREATE_TASK_URL, newTask);
        console.log('Successfull Create Task', response)
        renderTable(totalPageGlobal);
    } catch (error) {
        console.log(error);
    }
}

/* Edit And Delete Task */
document.querySelector('tbody').onmouseenter = function(e) {
    /* Edit Task */
    let editBtns = e.currentTarget.querySelectorAll("tr > td[name='edit']");
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].onclick = function(e) {
            e.stopPropagation();
            switchDisplayForm(0);
            let task = e.currentTarget.parentElement
            let editedTask = {
                editedId : task.id,
                editedTime : task.querySelector("td[name='time']").innerText,
                editedName : task.querySelector("td[name='name']").innerText,
                editedDescription : task.querySelector("td[name='description']").innerText,
            }
            let editForm = document.forms[1];
            editForm.id.value = editedTask.editedId;
            editForm.name.value = editedTask.editedName;
            editForm.description.value = editedTask.editedDescription;
            editForm.datetime.value = genRightFormatDate(editedTask.editedTime);
        }
    }

    /* Delete Task */
    let deleteBtns = e.currentTarget.querySelectorAll("tr > td[name='delete']");
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].onclick = async function(e) {
            e.stopPropagation();
            let task = e.currentTarget.parentElement
            let deletedTask = {
                id: task.id,
                name: task.querySelector("td[name='name']").innerText,
                description: task.querySelector("td[name='description']").innerText,
                time: task.querySelector("td[name='time']").innerText,
            }

            try {
                let reponseDelete = await axios.post(DELETE_TASK_URL, deletedTask);
                console.log('Delete Successful', reponseDelete)
                if (task.parentElement.querySelectorAll('tr').length < 2) {
                    currentPage -= 1
                }
                renderTable(currentPage)

            } catch (error) {
                console.log(error);
            }
        }
    }
}

document.onkeyup = function(e) {
    if (e.keyCode == 27) {
        switchDisplayForm(1);
    }
}

/* Submit the edit */
document.querySelector('.edit-submit').onclick = async function(e) {
    let editedTask = {
        id: document.forms[1].id.value,
        name: document.forms[1].name.value,
        description: document.forms[1].description.value,
        time: document.forms[1].datetime.value,
    }
    try {
        let response = await axios.post(EDIT_TASK_URL, editedTask)
        console.log('Edit Successful', response);
    } catch(error) {
        console.log(error);
    }
    renderTable(currentPage);
}