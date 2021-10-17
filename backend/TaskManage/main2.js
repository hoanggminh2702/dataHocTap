var search = "";
var sort = "name";
const nameSortState = ["name", "-name", ""]
const timeSortState = ["time", "-time", ""]

// URL
const BASE_URL = 'http://localhost:8080';
const GET_LIST_TASK_URL = `${BASE_URL}/api/getTaskList`;
const EDIT_TASK_URL = `${BASE_URL}/api/editTask`
const CREATE_TASK_URL = `${BASE_URL}/api/createTask`
const DELETE_TASK_URL = `${BASE_URL}/api/deleteTask`

/* Add 0 to number < 10 */
function addZeros(number) {
    if (number < 10) return '0' + number.toString()
    else return number
}

/* Gen right format date */
// if input is empty => use today is default date
function genRightFormatDate(input) {
    if (input == "" || arguments.length == 0) {
        return new Date()
    } else {
        // Mai hỏi cách convert Date do chưa biết cách convert nên hard code để cắt chuỗi ngày
        return input.slice(0,16)
    }
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

/* Validate input */
function alertEmptyInput(name, des) {
    if (name == "") {
        alert('Hãy nhập tên task')
    }
    if (des == "") {
        alert('Hãy nhập description')
    }
}


/* ----Render---- */

// currentTotalRecord để tính ra được currentPage khi thêm 1 task vào cuối
var currentTotalRecord = 0
// currentPage để khi xoá hay delete vẫn render được page hiện tại
var currentPage = 1
var take = 5

/* Render Page Bar */
function renderPaginationBar(totalRecord, choosenPage = 1) {
    const totalPage = Math.ceil(totalRecord/take);
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
// Nhận vào 1 tham số là số page, tương ứng với page được hiển thị
async function renderTable(choosenPage=1) {
    let renderTableHTML = "";
    const response = await axios.get(`${GET_LIST_TASK_URL}?page=${choosenPage}&sort=${sort}`);
    currentTotalRecord = response.data.totalCount
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

    // Render page bar sau khi render table
    document.querySelector('.page-container').innerHTML = 
        renderPaginationBar(currentTotalRecord,choosenPage);
}

/* Render Table By Clicking Page Button */
document.querySelector('.page-container').onmouseenter = function(e) {
    let pageButtons = e.currentTarget.children;
    for(let i = 0; i < pageButtons.length; i++) {
        pageButtons[i].onclick = async function(e) {
            e.stopPropagation();
            // Mỗi page button được gán với id tương ứng với page đó
            // => page được chọn gán bằng với id và render ra table với page tương ứng
            let choosenPage = Number(e.currentTarget.id);
            currentPage = choosenPage;
            await renderTable(currentPage);
        }
    }
};

/* First Load */
document.querySelector('body').onload = async function(e) {
    await renderTable();
}


/* ----Action---- */

/* Create Task */
document.querySelector('.create-submit').onclick = async function(e) {
    e.stopPropagation();
    let name = document.forms[0].name.value.trim()
    let description = document.forms[0].description.value.trim()
    // Validate if the input is empty, same action with edit
    if ( name == ""
        || description == "") {
        alertEmptyInput(name, description)
    } else {
        let newTask = {
            name: name,
            description: description,
            time: genRightFormatDate(document.forms[0].datetime.value)
        }
    
        try {
            let response = await axios.post(CREATE_TASK_URL, newTask);
            console.log('Successfull Create Task', response)
            currentPage = Math.ceil((currentTotalRecord + 1)/take)
            renderTable(currentPage);
    
            // Đoạn render này gặp khó khăn
            // Do quên làm tròn currentTotalRecord + 1)/take
            // Nhớ Gán currenPage vào
        } catch (error) {
            console.log(error);
        }
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
            console.log(genRightFormatDate(editedTask.editedTime))
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
                // Kiểm tra xem trang hiện tại còn bao nhiêu record
                // Nếu bằng 1 thì sau khi xoá chuyển về trang trước
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

// Bấm esc để thoát chế độ edit
document.onkeyup = function(e) {
    if (e.keyCode == 27) {
        switchDisplayForm(1);
    }
}

/* Submit the edit */
document.querySelector('.edit-submit').onclick = async function(e) {
    let time = document.forms[1].datetime.value ? document.forms[1].datetime.value : genRightFormatDate()
    let name = document.forms[1].name.value.trim()
    let description = document.forms[1].description.value.trim()
    if ( name == ""
        || description == "") {
        alertEmptyInput(name, description)
    } else {
        let editedTask = {
            id: document.forms[1].id.value,
            name: document.forms[1].name.value.trim(),
            description: document.forms[1].description.value,
            time: time
        }
        try {
            let response = await axios.post(EDIT_TASK_URL, editedTask)
            console.log('Edit Successful', response);
        } catch(error) {
            console.log(error);
        }
        renderTable(currentPage);
    }   
}

/* ----Sort---- */

/* Change sort state */
function changeSortState(sortStateArr, currentSortState) {
    // Lỗi do không chú ý bị nhầm giữa sortStateArr và currentSortState
    if (!sortStateArr.includes(currentSortState)) {
        return [sortStateArr[0], "asc"]
    } else {
        switch (currentSortState) {
            case sortStateArr[0]:
                console.log(sort)
                return [sortStateArr[1], "desc"];
            case sortStateArr[1]:
                return [sortStateArr[2], ""];
            case sortStateArr[2]:
                return [sortStateArr[0], "asc"];
            default:
                return ""
        }
    }
}

document.querySelector("thead th[name='time']").onclick = function(e) {
    e.stopPropagation()
    document.querySelector("thead th[name='name']").innerText = 'Name Task';
    [sort, type] = changeSortState(timeSortState, sort)
    e.currentTarget.innerText = `Time ${type}`
    renderTable()
}

document.querySelector("thead th[name='name']").onclick = function(e) {
    e.stopPropagation()
    document.querySelector("thead th[name='time']").innerText = 'Time';
    [sort, type] = changeSortState(nameSortState, sort)
    e.currentTarget.innerText = `Name Task ${type}`
    renderTable()
}

