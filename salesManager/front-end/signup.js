const BASE_URL = 'http://localhost:8080'

const CREATE_USER_URL = `${BASE_URL}/api/createUser`

document.forms[0].backToLogin.onclick = function (e) {
  window.location = '/front-end/login.html'
}

function renderValidateInput (...args) {
  document.querySelector('.alert').innerHTML = ''
  let alertHTML = ''
  const fieldArr = ['username', 'fullname', 'address', 'password']

  for (var field in args) {
    if (args[field] == '') {
      alertHTML += `Hãy điền ${fieldArr[field]}. `
    }
  }

  if (
    args.every(function (field) {
      return field != ''
    })
  ) {
    document.querySelector('.alert').innerHTML = 'Đăng ký thành công'
    document.querySelector('.alert').style.color = 'green'
    return true
  } else {
    document.querySelector('.alert').innerHTML = alertHTML
    document.querySelector('.alert').style.color = 'red'
    return false
  }
}

document.forms[0].signup.onclick = async function (e) {
  const username = document.forms[0].username.value.trim()
  const fullname = document.forms[0].fullname.value.trim()
  const address = document.forms[0].address.value.trim()
  const password = document.forms[0].password.value.trim()
  if (!renderValidateInput(username, fullname, address, password)) {
    console.log('Không được để trống')
  } else {
    const newUser = {
      username: document.forms[0].username.value.trim(),
      fullname: document.forms[0].fullname.value.trim(),
      address: document.forms[0].address.value.trim(),
      password: document.forms[0].password.value.trim()
    }

    try {
      await axios.post(CREATE_USER_URL, newUser).then(function (res) {
        console.log(`Create Successfull`, res)
      })
    } catch (err) {
      console.log(err)
    }
  }
}
