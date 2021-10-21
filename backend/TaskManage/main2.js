var searchByName = ''
var filterByDate = ''
var filterByDate2 = ''
var sort = 'name'
const nameSortState = ['name', '-name', '']
const timeSortState = ['time', '-time', '']

// URL
const BASE_URL = 'http://localhost:8080'
const GET_LIST_TASK_URL = `${BASE_URL}/api/getTaskList`
const EDIT_TASK_URL = `${BASE_URL}/api/editTask`
const CREATE_TASK_URL = `${BASE_URL}/api/createTask`
const DELETE_TASK_URL = `${BASE_URL}/api/deleteTask`

/* Add 0 to number < 10 */
function addZeros (number) {
  if (number < 10) return '0' + number.toString()
  else return number
}

/* Gen right format date */
// if input is empty => use today is default date
function genRightFormatDate (input) {
  if (input == '' || arguments.length == 0) {
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
function switchDisplayForm (code) {
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
function alertEmptyInput (name, des) {
  if (name == '') {
    alert('Hãy nhập tên task')
  }
  if (des == '') {
    alert('Hãy nhập description')
  }
}

/* ----Render---- */

// currentTotalRecord để tính ra được currentPage khi thêm 1 task vào cuối
var currentTotalRecord = 0
// currentPage để khi create hay delete có thể render được page hiện tại
var currentPage = 1
var take = 10

/* Render Page Bar */
function renderPaginationBar (totalRecord, choosenPage = 1) {
  // Tính ra tổng số page hiện tại
  const totalPage = Math.ceil(totalRecord / take)

  let renderPageBarHTML = ''
  for (let i = 1; i <= totalPage; i++) {
    let div = `div id="${i}" class="page"`
    if (choosenPage == i) {
      div += `style="background-color: red"`
    }
    renderPageBarHTML += `
        <${div}>
        <p>${i}</p>
        </div>`
  }

  return renderPageBarHTML
}

/* Render Table */
// Nhận vào 1 tham số là số page, tương ứng với page được hiển thị
async function renderTable (choosenPage = 1) {
  let renderTableHTML = ''
  try {
    const response = await axios.get(
      `${GET_LIST_TASK_URL}?page=${choosenPage}&sort=${sort}&date=${filterByDate}&date2=${filterByDate2}&name=${searchByName}&limit=${take}`
    )
    const listTask = response.data.items
    currentTotalRecord = response.data.totalCount
    // Nếu không tìm thấy record nào thì hiển thị div no record found
    if (currentTotalRecord > 0) {
      listTask.forEach(function (task) {
        renderTableHTML += `
                <tr id="${task['_id']}">
                <td name="time">${task.time}</td>
                <td name="name">${task.name}</td>
                <td name="description">${task.description}</td>
                <td name="edit">Edit</td>
                <td name="delete">Delete</td>
                </tr>`
      })
      document.querySelector('.no-record').style.display = 'none'
    } else if (currentTotalRecord == 0) {
      renderTableHTML = ''
      document.querySelector('.no-record').style.display = 'block'
    }
    document.querySelector('tbody').innerHTML = renderTableHTML
    // Render page bar sau khi render table
    document.querySelector('.page-container').innerHTML = renderPaginationBar(
      currentTotalRecord,
      choosenPage
    )
  } catch (error) {
    console.log(error)
  }
}

/* Render Table By Clicking Page Button */
document.querySelector('.page-container').onmouseenter = function (e) {
  let pageButtons = e.currentTarget.children
  for (let i = 0; i < pageButtons.length; i++) {
    pageButtons[i].onclick = async function (e) {
      e.stopPropagation()
      // Mỗi page button được gán với id tương ứng với page đó
      // => page được chọn gán bằng với id và render ra table với page tương ứng
      let choosenPage = Number(e.currentTarget.id)
      currentPage = choosenPage
      await renderTable(currentPage)
    }
  }
}

/* First Load */
document.querySelector('body').onload = async function (e) {
  await renderTable()
}

/* ----Action---- */

/* Appear the modal */

function appear (typeForm) {
  // Tương tự Disappear, xem ở phần disappear
  document.querySelector('.modal-container').style.display = 'block'
  document.querySelector(`.modal-container .${typeForm}`).style.display = 'flex'
  document.querySelector(`.modal-container .${typeForm}`).style.top = '15px'
  document.querySelector('.modal-container .background').style.opacity = 0.6
  document.querySelector('.modal-container .background').style.animation =
    'backgroundAppear 0.2s ease-in'
  document.querySelector(`.modal-container .${typeForm}`).style.animation =
    'modalAppear 0.2s ease-in'
}

/* Disappear the modal */

function disappear (typeForm) {
  document.querySelector('.modal-container .background').style.animation =
    'backgroundDisappear 0.3s ease-out'
  document.querySelector(`.modal-container .${typeForm}`).style.animation =
    'modalDisappear 0.2s ease-out'
  setTimeout(function () {
    // Chỉnh opacity về 0 để hiện lại màu nền
    document.querySelector('.modal-container .background').style.opacity = 0
    // Chỉnh vị trí của modal
    document.querySelector(`.modal-container .${typeForm}`).style.top = '-10px'
    // Ẩn modal container
    document.querySelector('.modal-container').style.display = 'none'
    // Ẩn modal
    document.querySelector(`.modal-container .${typeForm}`).style.display =
      'none'
  }, 150) // Chỉnh time biến mất về dưới thời gian kết thúc hiệu ứng để tránh giật
}

function notificationMessage (form, textColor, message) {
  document.forms[0].querySelector('p').style.color = textColor
  document.forms[0].querySelector('p').innerHTML = message

  setTimeout(function () {
    document.forms[0].querySelector('p').innerHTML = ''
  }, 3000)
}

// Bấm esc để thoát chế độ edit
document.onkeyup = function (e) {
  if (e.keyCode == 27) {
    disappear('create-form')
  }
}

/* Create Task */

/* Appear the create task modal */
document.querySelector("button[name='create-active']").onclick = function () {
  appear('create-form')
}

document.forms[0].submitBtn.onclick = async function (e) {
  e.stopPropagation()
  let name = document.forms[0].name.value.trim()
  let description = document.forms[0].description.value.trim()
  // Validate if the input is empty, same action with edit
  if (name == '' || description == '') {
    alertEmptyInput(name, description)
  } else {
    let newTask = {
      name: name,
      description: description,
      time: genRightFormatDate(document.forms[0].datetime.value)
    }

    try {
      let response = await axios.post(CREATE_TASK_URL, newTask)
      notificationMessage(0, 'green', 'Create Successful')
      console.log('Successfull Create Task', response)
      // Có 2 cách
      //Cách 1:
      /* if (document.querySelector('tbody').querySelectorAll('tr').length == take) {
                currentPage += 1
            }
            */
      //Cách 2:
      // Đoạn render này gặp khó khăn
      // Do quên làm tròn (currentTotalRecord + 1)/take
      // Nhớ Gán currenPage vào
      currentPage = Math.ceil((currentTotalRecord + 1) / take)

      /* change sort to default */
      sort = ''
      document.querySelector("thead th[name='time']").innerText = 'Time'
      document.querySelector("thead th[name='name']").innerText = 'Name Task'

      await renderTable(currentPage)
    } catch (error) {
      notificationMessage(0, 'red', 'Create Fail')
      console.log(error)
    }
  }
}

/* Disappear the create task modal */
document.forms[0].cancelBtn.onclick = function (e) {
  disappear('create-form')
}

/* Edit And Delete Task */
// Lắng nghe sự kiện move chuột vào bảng
document.querySelector('tbody').onmouseenter = function (e) {
  /* Edit Task */
  // Get tất cả các btn edit ra và gán lắng nghe sự kiện cho từng cái
  let editBtns = e.currentTarget.querySelectorAll("tr > td[name='edit']")
  for (let i = 0; i < editBtns.length; i++) {
    editBtns[i].onclick = function (e) {
      e.stopPropagation()
      appear('edit-form')
      let task = e.currentTarget.parentElement
      let editedTask = {
        editedId: task.id,
        editedTime: task.querySelector("td[name='time']").innerText,
        editedName: task.querySelector("td[name='name']").innerText,
        editedDescription: task.querySelector("td[name='description']")
          .innerText
      }
      let editForm = document.forms[1]
      editForm.id.value = editedTask.editedId
      editForm.name.value = editedTask.editedName
      editForm.description.value = editedTask.editedDescription
      editForm.datetime.value = genRightFormatDate(editedTask.editedTime)
    }
  }

  /* Submit the edit */
  document.forms[1].submitBtn.onclick = async function (e) {
    let time = document.forms[1].datetime.value
      ? document.forms[1].datetime.value
      : genRightFormatDate()
    let name = document.forms[1].name.value.trim()
    let description = document.forms[1].description.value.trim()
    if (name == '' || description == '') {
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
        notificationMessage(1, 'green', 'Edit Successful')
        console.log('Edit Successful', response)
      } catch (error) {
        notificationMessage(1, 'red', 'Edit Fail')
        console.log(error)
      }
      renderTable(currentPage)
    }
  }

  /* Disappear the edit task modal */
  document.forms[1].cancelBtn.onclick = function () {
    disappear('edit-form')
  }

  /* Delete Task */
  let deleteBtns = e.currentTarget.querySelectorAll("tr > td[name='delete']")
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].onclick = async function (e) {
      e.stopPropagation()
      let task = e.currentTarget.parentElement
      let deletedTask = {
        id: task.id,
        name: task.querySelector("td[name='name']").innerText,
        description: task.querySelector("td[name='description']").innerText,
        time: task.querySelector("td[name='time']").innerText
      }

      try {
        let reponseDelete = await axios.post(DELETE_TASK_URL, deletedTask)
        console.log('Delete Successful', reponseDelete)
        // Kiểm tra xem trang hiện tại còn bao nhiêu record
        // Nếu bằng 1 thì sau khi xoá chuyển về trang trước
        if (task.parentElement.querySelectorAll('tr').length < 2) {
          if (
            searchByName != '' ||
            (filterByDate != '' && filterByDate2 != '')
          ) {
            searchByName = ''
            filterByDate = ''
            filterByDate2 = ''
            if (currentPage > 1) {
              currentPage -= 1
            }
          } else {
            currentPage -= 1
          }
        }
        await renderTable(currentPage)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

/* ----Sort---- */

/* Change sort state */
function changeSortState (sortStateArr, currentSortState) {
  // Lỗi do không chú ý bị nhầm giữa sortStateArr và currentSortState
  if (!sortStateArr.includes(currentSortState)) {
    return [sortStateArr[0], 'asc']
  } else {
    switch (currentSortState) {
      case sortStateArr[0]:
        return [sortStateArr[1], 'desc']
      case sortStateArr[1]:
        return [sortStateArr[2], '']
      case sortStateArr[2]:
        return [sortStateArr[0], 'asc']
      default:
        return ''
    }
  }
}

document.querySelector("thead th[name='time']").onclick = async function (e) {
  e.stopPropagation()
  document.querySelector("thead th[name='name']").innerText = 'Name Task'
  ;[sort, type] = changeSortState(timeSortState, sort)
  e.currentTarget.innerText = `Time ${type}`
  await renderTable()
}

document.querySelector("thead th[name='name']").onclick = async function (e) {
  e.stopPropagation()
  document.querySelector("thead th[name='time']").innerText = 'Time'
  ;[sort, type] = changeSortState(nameSortState, sort)
  e.currentTarget.innerText = `Name Task ${type}`
  await renderTable()
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
document.querySelector("input[name='search']").oninput = function (e) {
  e.stopPropagation()
  searchByName = e.currentTarget.value.trim()
  renderTable()
}

/* filter by date */
document
  .querySelector('.datetime-group')
  .querySelector("input[name='datetime-filter-start']").onchange = function (
  e
) {
  filterByDate = e.currentTarget.value
}

document
  .querySelector('.datetime-group')
  .querySelector("input[name='datetime-filter-end']").onchange = function (e) {
  filterByDate2 = e.currentTarget.value
}
document.querySelector("button[name='date-filter-submit']").onclick = function (
  e
) {
  /* Cách 1
    // Nếu cả 2 ô đều không rỗng thì mới bấm nút filter được
    if (filterByDate != "" && filterByDate2 == "") {
        // Nếu chỉ chọn from thì filter từ from đến hôm nay
        filterByDate2 = genRightFormatDate()
    }
    else if (filterByDate2 != "" && filterByDate == "") {
        // Nếu chỉ chọn to thì filter theo to
        filterByDate = filterByDate2
    }
    */
  // parse sang cùng 1 kiểu để xem ngày nào lớn hơn
  let date1 = Date.parse(filterByDate)
  let date2 = Date.parse(filterByDate2)

  // Nếu only to thì sort desc không thì sort asc
  if (isNaN(date1) && !isNaN(date2)) {
    sort = '-time'
  } else {
    sort = 'time'
  }

  // Xem xét sử dụng lại chỗ này
  // if (date1 <= date2) {
  //     renderTable()
  // } else {
  //     alert('Vui lòng chọn ngày bắt đầu nhỏ hơn ngày kết thúc')
  // }
  document.querySelector("th[name='name']").innerHTML = 'Name Task'
  if (sort == 'time') {
    document.querySelector("th[name='time']").innerHTML = 'Time asc'
  } else {
    document.querySelector("th[name='time']").innerHTML = 'Time desc'
  }

  renderTable()
}

/* Clear filter */
document.querySelector("button[name='clear-filter']").onclick = function (e) {
  document.querySelector("input[name='search']").value = null
  // set value cho input không làm cho các sự kiện được kích hoạt => phải gán lại searchByName và filterByDate để render lại table
  searchByName = ''
  document.querySelector("input[name='datetime-filter-start']").value = null
  filterByDate = ''
  document.querySelector("input[name='datetime-filter-end']").value = null
  filterByDate2 = ''
  renderTable()
}

document.querySelector("button[name='clear-search']").onclick = function () {
  document.querySelector("input[name='search']").value = null
  // set value cho input không làm cho các sự kiện được kích hoạt => phải gán lại searchByName và filterByDate để render lại table
  searchByName = ''
  renderTable()
}
