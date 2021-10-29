if (JSON.parse(localStorage.getItem('user')) == null) {
  localStorage.setItem(
    'user',
    JSON.stringify({
      token: ''
    })
  )
}

let search = ''

const BASE_URL = 'http://localhost:8080'

const GET_PRODUCT_URL = `${BASE_URL}/api/getProducts`

const user = JSON.parse(localStorage.getItem('user'))

var currentTotalProduct = ''

var take = 10

/* Kiểm tra xem có phải là admin không */
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
    /* Render Name Of User */ {
      document.querySelector('.user-btn').innerHTML = res.data.username
    }
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

/* check if have not been login yet, show popup to confirm redirect to loginpage */
function confirmRedirect (message, path, callBack, cancelCallback) {
  let isConfirmed = confirm(message)
  if (isConfirmed) {
    if (typeof callBack == 'function') {
      callBack()
    }
    window.location.href = path
  } else {
    if (typeof cancelCallback == 'function') {
      cancelCallback()
    }
  }
}

document.querySelector('ul li:nth-child(2)').onclick = function (e) {
  confirmRedirect('Do you want to log out?', './login.html')
}
/* Render pagination bar */
function renderPaginationBar (page) {
  const currentTotalPage = Math.ceil(currentTotalProduct / take)
  let paginationHTML = ''
  for (let i = 1; i <= currentTotalPage; i++) {
    let style = ''
    if (i == page) {
      style = 'style="background-color: red"'
    }
    paginationHTML += `
    <div id="page-${i}" class="page" ${style}>
        ${i}
    </div>`
  }
  document.querySelector('.pagination-bar').innerHTML = paginationHTML
}

/* Choose page by clicking to the page btn */
document.querySelector('.pagination-bar').onmouseenter = function (e) {
  let allPageBtn = e.currentTarget.children
  for (let i = 0; i < allPageBtn.length; i++) {
    allPageBtn[i].onclick = function (e) {
      renderProducts(e.currentTarget.innerText)
    }
  }
}

/* Render Product */
async function renderProducts (page) {
  localStorage.setItem('currentPage', page)
  let productHTML = ''
  try {
    const products = await axios.get(
      `${GET_PRODUCT_URL}?search=${search}&take=${take}&page=${page}`
    )
    currentTotalProduct = products.data.countDocuments
    products.data.items.forEach(function (product) {
      const style = `style = 'background-image: url(${product.img})'`
      const convertPrice = product.price.toLocaleString()

      // const quantity =
      //   user.items[product['_id']] != undefined
      //     ? user.items[product['_id']].quantity
      //     : ''
      productHTML += `
              <div id="${product['_id']}" class="product-group">
              <div class="product-info" style="text-align: center">Số lượng: ${product.quantity}</div>
              <div class="product-info" style="text-align: center">Đã bán: ${product.bought}</div>
                  <div class="product" ${style}></div>
                  <div class="product-info"><p>${product.name}</p></div>
                  <div class="product-info"><p>${product.desc}</p></div>
                  <div class="product-info"><p>Price: ${convertPrice} vnđ</p></div>
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn">Delete</button>
              </div>`
    })
    document.querySelector('.product-container').innerHTML = productHTML
    renderPaginationBar(page)
  } catch (error) {
    console.log(error)
  }
}
renderProducts(1)

/* Search */
document.querySelector('.search-bar button').onclick = function (e) {
  e.stopPropagation()
  search = document.querySelector('.search-bar input').value.trim()
  renderProducts(1)
}

/* Clear search bar will clear filter with search */
document.querySelector('.search-bar input').oninput = function (e) {
  e.stopPropagation()
  if (e.currentTarget.value == '') {
    search = ''
    renderProducts(1)
  }
}

/* Back to home */
document.querySelector('.home-btn').onclick = function (e) {
  window.location.href = './homepage.html'
}

function switchDisplay (form, displayType) {
  document.querySelector('.background-form').style.display = `${displayType}`
  document.querySelector(
    `.background-form .${form}`
  ).style.display = `${displayType}`
}

/* Display Create Form */
document.querySelector('button.create-btn').onclick = function (e) {
  switchDisplay('create-form', 'block')
}

/* undisplay form edit and create */
for (let i = 0; i < document.forms.length; i++) {
  document.forms[i].cancelBtn.onclick = function (e) {
    e.stopPropagation()
    switchDisplay('create-form', 'none')
    switchDisplay('edit-form', 'none')
  }
}

/* Display edit form and delete product */
document.querySelector('.product-container').onmouseenter = function (e) {
  let allProduct = document.querySelectorAll('.product-group')
  for (let i = 0; i < allProduct.length; i++) {
    allProduct[i].querySelector('button.edit-btn').onclick = function (e) {
      switchDisplay('edit-form', 'block')
    }
    allProduct[i].querySelector('button.delete-btn').onclick = function (e) {}
  }
}
