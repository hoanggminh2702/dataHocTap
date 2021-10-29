if (JSON.parse(localStorage.getItem('user')) == null) {
  localStorage.setItem('user', JSON.stringify({
    token: ''
  }))
}

const user = JSON.parse(localStorage.getItem('user'))

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

async function renderProduct(page) {
  let products = await axios.get('http://localhost:8080/api/getProducts?search=&take=&page=')
  let showProductHTML = ''
  products.data.items.forEach(function(product) {
    showProductHTML += `<tr class="row" id=${product['_id']}>
    <td class="item" name="code">${product['_id']}</td>
    <td class="item" name="name">${product.name}</td>
    <td class="item" name="unit">${product.unit}</td>
    <td class="item" name="price">${product.price}</td>
    <td class="item" name="edit-btn">Edit</td>
    <td class="item" name="delete-btn">Delete</td>
    </tr>`
  })
  document.querySelector('tbody').innerHTML = showProductHTML
}

renderProduct(1)