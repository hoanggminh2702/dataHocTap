var task = []

/* fake value */
for (let i = 0; i < 21; i++) {
    task.push({
        id: i,
        name: `abc${i+1}`,
        description: 'abc',
        date: genDefaultDate(),
    })
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

/* Add 0 to number < 10 */
function addZeros(number) {
    if (number < 10) return '0' + number.toString()
    else return number
}

/* Gen default date */
function genDefaultDate() {
    let today = new Date()
    let fullYear = today.getFullYear().toString()
    let fullMonth = addZeros(today.getMonth() + 1).toString()
    let fullDay = addZeros(today.getDay()).toString()
    let fullHours = addZeros(today.getHours()).toString()
    let fullMinutes = addZeros(today.getMinutes()).toString()
    // 2017-06-01T08:30
    return `${fullYear}-${fullMonth}-${fullDay}T${fullHours}:${fullMinutes}`
}

/* update pagination button */
function updatePaginationBtn(task) {
    let page = Math.ceil(task.length/10)
    console.log(page)
    let paginationHTMLString = ""
    for (let i = 1; i <= page; i++) {
        paginationHTMLString+=`
        <div id="page-${i}" class="page"><p>${i}</p></div>`
    }
    document.querySelector('.page-container').innerHTML = paginationHTMLString
}

/* update pagination button in the first load */
updatePaginationBtn(task)

/* Update table */
function updateTable(tasks, page = 1) {
    let tableHTMLString = ""
    for (let key in tasks) {
       if (key >= (page - 1)*10 && key < page*10) {
        tableHTMLString += `
        <tr id="${task[key].id}">
        <td>${task[key].date}</td>
        <td>${task[key].name}</td>
        <td>${task[key].description}</td>
        <td name="edit">Edit</td>
        <td name="delete">Delete</td>
        </tr>`
       }
    }
    document.querySelector('tbody').innerHTML = tableHTMLString
    document.getElementById(`page-${page}`).style.backgroundColor = "red"
}
/* update task in the first load */
updateTable(task)

/* Create Button Submit */
function createTask(e) {
    let target = e.target
    let checkDuplicated = (task.length) ? task.every(function(taskk) {
            return taskk.name != target.name.value 
        }) : true
        //check ????? d??i c???a m???ng tr??nh tr?????ng h???p for each tr??? ra undefined thay v?? boolean
    e.preventDefault();

    document.querySelector('.create-submit').onclick = function () {
        if(checkDuplicated)
        {
            task.push(
                {
                    id: task.length,
                    name: target.name.value,
                    description: target.description.value,
                    date: (target.datetime.value == "") ?genDefaultDate() : (target.datetime.value)
                }
            );
            updatePaginationBtn(task)
            updateTable(task, Math.ceil(task.length/10))
    
        }
        else {
            alert('This task name is duplicated, please change the tag name!')
        }
    }
}


    document.forms[0].onmouseenter = createTask


/* Edit button click*/

    document.querySelector('tbody').onmouseenter = function(e) {
        var tasksRow = document.querySelector('tbody').querySelectorAll('tr')

        for (let i = 0; i < tasksRow.length; i++) {
            //console.log(tasksRow[i])  T???i sao tr??? 1 l???n l???i ra 10 kqu??????? => do ??? tr??n s??? d???ng mouseover tr??n to??n document
            tasksRow[i].onmouseenter = function(e) {
                e.stopPropagation()
                // T??m task c?? t??n tr??ng v???i task ??ang ???????c ch???n
                let getTaskInfo = task.find(function(taskk) {
                    return taskk.name == e.currentTarget.querySelectorAll('td')[1].innerText
                })
                let buttonEdit = e.currentTarget.querySelector("td[name='edit']")
                buttonEdit.onclick = function(event) {
                    event.stopPropagation()
                    switchDisplayForm(0) // Hi???n edit v?? ???n create
                    let editForm = document.forms[1]
                    let editFormInputs = 
                        editForm.querySelectorAll('.edit-form .input') 
                    // Set value c???a task ???????c ch???n cho c??c ?? input
                    editFormInputs[0].value = getTaskInfo.name
                    editFormInputs[1].value = getTaskInfo.description
                    editFormInputs[2].value = getTaskInfo.date
                    document.forms[1].onsubmit = function(e2) {
                        e2.preventDefault()
                        let formTarget = e2.target
                        task.forEach(function(taskk) {
                            if (taskk.id == getTaskInfo.id) {
                                taskk.name = formTarget.name.value
                                taskk.description = formTarget.description.value
                                taskk.date = (formTarget.datetime.value == "") ? genDefaultDate() : formTarget.datetime.value
                            }
                        })
                        
                        updateTable(task,Math.ceil((getTaskInfo.id+1)/10))
                        updatePaginationBtn(task)
                    }

                    //C???n h???i: v?? sao kh??ng s??? d??ng ???????c task[i]
                    // v?? sao sau khi b???m submit m?? kh??ng d??ng document.onmouseover th?? code kh??ng ch???y
                }

                /* delete task button */
                let buttonDelete = e.currentTarget.querySelector("td[name='delete']")
                buttonDelete.onclick = function(event2) {
                    event2.stopPropagation()
                    task.splice(task.indexOf(getTaskInfo), 1)
                    updatePaginationBtn(task)
                    updateTable(task, Math.ceil(task.length/10))
                }
            }
        }
    }

    document.querySelector('.page-container').onmouseenter = function(e) {
        console.log(e.currentTarget)
        e.stopPropagation()
        let pageBtn = document.querySelectorAll('.page')
        for(var key in pageBtn) {
            if(pageBtn.hasOwnProperty(key)) {
                pageBtn[key].onclick = function(e) {
                    let page = e.currentTarget.innerText
                    console.log(page)
                    updatePaginationBtn(task)
                    updateTable(task,page)
                }
            }
        }
    }



/* Cancel Edit State */
document.onkeyup = function(e) {
    if(e.keyCode == 27) {
        switchDisplayForm(1)
    }
}




