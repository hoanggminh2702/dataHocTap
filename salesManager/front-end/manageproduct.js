const user = JSON.parse(localStorage.getItem('user'))
console.log(user)
axios
  .post(
    'http://localhost:8080/api/verifyAdmin',
    {},
    {
      headers: {
        Authorization: `Bearer 0 ${user.token}`
      }
    }
  )
  .then(function (res) {
    console.log(res.data)
  })
  .catch(function (err) {
    let backToLogin = confirm(`
    Bạn không phải là admin để có thể sử dụng chức năng này. Ok để đăng nhập và trở lại trang admin, Cancel để đăng nhập và trở lại trang home?`)
    if (backToLogin) {
      window.location.href = './login.html'
      localStorage.setItem('path', './manageproduct.html')
    } else {
      window.location.href = './homepage.html'
      localStorage.setItem('path', './homepage.html')
    }
  })
