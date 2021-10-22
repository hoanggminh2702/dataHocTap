const BASE_URL = 'http://localhost:8080'

const LOGIN_URL = `${BASE_URL}/api/login`

function validateInput (...args) {
  document.querySelector('.alert').innerHTML = ''
  let alertHTML = ''
  const fieldArr = ['username', 'password']

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
    return true
  } else {
    document.querySelector('.alert').innerHTML = alertHTML
    document.querySelector('.alert').style.color = 'red'
    return false
  }
}

document.forms[0].login.onclick = async function (e) {
  const username = document.forms[0].username.value
  const password = document.forms[0].password.value
  if (!validateInput(username, password)) {
    console.log('Đăng nhập thất bại')
  } else {
    const loginUser = {
      username: username,
      password: password
    }
    try {
      await axios.post(LOGIN_URL, loginUser).then(function (res) {
        document.querySelector('.alert').innerHTML = 'Đăng nhập thành công'
        document.querySelector('.alert').style.color = 'green'
        console.log('Login successful')
      })
    } catch (err) {
      document.querySelector('.alert').innerHTML = 'Đăng nhập thất bại'
      document.querySelector('.alert').style.color = 'red'
      console.log(err)
    }
  }
}
