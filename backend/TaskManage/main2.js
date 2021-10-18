var searchByName = "";
var filterByDate = "";
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
        // Mai hỏi cách convert Date do chưa biết cách convert nên hard code để cắt chuỗi ngày (solved)
        // Sử dùng parse để parse chuỗi ios và dùng new date để tạo đúng format date trong js
        // Date.toISOString() => chuyển Date về chuỗi ISO => Sử dụng Date(Date.parse) để chuyển ngược lại
        let date = new Date(Date.parse(input))
        let fullYear = date.getFullYear().toString()
        let fullMonth = addZeros(date.getMonth() + 1).toString()
        // Đoạn này phải là dùng phương thức getDate chứ không phải getDay
        let fullDay = addZeros(date.getDate()).toString()
        let fullHours = addZeros(date.getHours()).toString()
        let fullMinutes = addZeros(date.getMinutes()).toString()
        let fullSecond = addZeros(date.getSeconds()).toString()
    // 2017-06-01T08:30
    return `${fullYear}-${fullMonth}-${fullDay}T${fullHours}:${fullMinutes}:${fullSecond}`
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
var currentTotalRecord = 0;
// currentPage để khi create hay delete có thể render được page hiện tại
var currentPage = 1;
var take = 10;

/* Render Page Bar */
function renderPaginationBar(totalRecord, choosenPage = 1) {
    // Tính ra tổng số page hiện tại
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
    const response = await axios.get(`${GET_LIST_TASK_URL}?page=${choosenPage}&sort=${sort}&date=${filterByDate}&name=${searchByName}&limit=${take}`);
    const listTask = response.data.items;
    currentTotalRecord = response.data.totalCount
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
        alertEmptyInput(name, description);
    } else {
        let newTask = {
            name: name,
            description: description,
            time: genRightFormatDate(document.forms[0].datetime.value)
        }
    
        try {
            let response = await axios.post(CREATE_TASK_URL, newTask);
            console.log('Successfull Create Task', response)
            // Có 2 cách
            //Cách 1:
            /* if (document.querySelector('tbody').querySelectorAll('tr').length == take) {
                currentPage += 1
            }
            */
           //Cách 2:
           currentPage = Math.ceil((currentTotalRecord+1)/take)        

            /* change sort to default */
            sort = ""
            document.querySelector("thead th[name='time']").innerText = 'Time';
            document.querySelector("thead th[name='name']").innerText = 'Name Task';
            
            await renderTable(currentPage);
    
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
            console.log(new Date(Date.parse(editedTask.editedTime)))
            editForm.datetime.value = genRightFormatDate(editedTask.editedTime);
        }
    }

    /* Delete Task */
    let deleteBtns = e.currentTarget.querySelectorAll("tr > td[name='delete']");
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].onclick = async function(e) {
            e.stopPropagation();
            let task = e.currentTarget.parentElement;
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
                    if (searchByName != "" || filterByDate != "") {
                        searchByName = "";
                        filterByDate = "";
                        if(currentPage > 1) {
                            currentPage -= 1
                        }
                    } else {
                        currentPage -= 1;
                    }
                }
                await renderTable(currentPage);

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
    let time = document.forms[1].datetime.value ? document.forms[1].datetime.value : genRightFormatDate();
    let name = document.forms[1].name.value.trim();
    let description = document.forms[1].description.value.trim();
    if ( name == ""
        || description == "") {
        alertEmptyInput(name, description);
    } else {
        let editedTask = {
            id: document.forms[1].id.value,
            name: document.forms[1].name.value.trim(),
            description: document.forms[1].description.value,
            time: time
        }
        try {
            let response = await axios.post(EDIT_TASK_URL, editedTask);
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
        return [sortStateArr[0], "asc"];
    } else {
        switch (currentSortState) {
            case sortStateArr[0]:
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

document.querySelector("thead th[name='time']").onclick = async function(e) {
    e.stopPropagation();
    document.querySelector("thead th[name='name']").innerText = 'Name Task';
    [sort, type] = changeSortState(timeSortState, sort);
    e.currentTarget.innerText = `Time ${type}`;
    await renderTable();
}

document.querySelector("thead th[name='name']").onclick = async function(e) {
    e.stopPropagation();
    document.querySelector("thead th[name='time']").innerText = 'Time';
    [sort, type] = changeSortState(nameSortState, sort);
    e.currentTarget.innerText = `Name Task ${type}`;
    await renderTable();
}

/* ----filter---- */

/* filter by keyword */

// Using Button
// document.querySelector("button[name='search-submit']").onclick = function(e) {
//     e.stopPropagation()
//     searchByName = document.querySelector("input[name='search']").value
//     renderTable()
// }

// Real Char
document.querySelector("input[name='search']").oninput = function(e) {
    e.stopPropagation();
    searchByName = e.currentTarget.value;
    renderTable();
}

/* filter by date */
document.querySelector('.datetime-group').querySelector('input').onchange = function(e) {
    filterByDate = e.currentTarget.value;
    renderTable();
}

/* Clear filter */
document.querySelector("button[name='clear-filter']").onclick = function(e) {
    document.querySelector("input[name='search']").value = ""
    // set value cho input không làm cho các sự kiện được kích hoạt => phải gán lại searchByName và filterByDate để render lại table
    searchByName = ""
    document.querySelector("input[name='datetime-filter']").value = ""
    filterByDate = ""
    renderTable()
}

