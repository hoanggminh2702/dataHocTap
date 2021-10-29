const BASE_URL = 'http://localhost:8080'

const LOGIN_URL = `${BASE_URL}/api/login`

if (localStorage.getItem('path') == undefined) {
  localStorage.setItem('path', './homepage.html')
}

if (localStorage.getItem('currentPage') == undefined) {
  localStorage.setItem('currentPage', 1)
}

console.log(localStorage.getItem('path'))

/* Kiểm tra nếu được quay về từ trang order thì lưu lại những sản phẩm đã mua và redirect lại trang đó để tiếp tục mua hàng */
if (localStorage.getItem('path') != './orders.html') {
  if (localStorage.getItem('user') != undefined) {
    localStorage.removeItem('user')
  }
}

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
        alert(res.data.role)
        const result = {
          username: res.data.username,
          token: res.data.token,
          items: {}
        }
        /** Nếu đang ở trang orders mà bị hết hạn token khi đăng nhập
         * Nếu tài khoản đăng nhập bị sửa đổi trong storage
         * Thì sẽ cho phép đăng nhập lại, nếu đăng nhập đúng tài khoản hết hạn lần trước thì chuyển lại sang trang order
         */
        if (
          localStorage.getItem('path') == './orders.html' &&
          result.username == JSON.parse(localStorage.getItem('user')).username
        ) {
          try {
            result.items = JSON.parse(localStorage.getItem('user')).items
            console.log(result)
            localStorage.setItem('user', JSON.stringify(result))
          } catch {
            localStorage.setItem('user', JSON.stringify(result))
          }
        } else {
          localStorage.setItem('user', JSON.stringify(result))
        }

        /** Nếu từ trang login sang nhưng đăng nhập bằng tài khoản user bình thường thì sẽ  
         * tự động được chuyển sang homepage
         */
        if (localStorage.getItem('path') == './manageproduct.html' && res.data.role != 'admin') {
          localStorage.setItem('path', './homepage.html')
          window.location.href =  './homepage.html'
        } else {
          window.location.href = localStorage.getItem('path')
        }

      })
    } catch (err) {
      document.querySelector('.alert').innerHTML = 'Đăng nhập thất bại'
      document.querySelector('.alert').style.color = 'red'
      console.log(err)
    }
  }
}
