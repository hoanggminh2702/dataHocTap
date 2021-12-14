const BASE_URL = 'http://localhost:8080'

const GET_PRODUCT_URL = `${BASE_URL}/api/getProducts`

var search = ''

;(function loadPreviousPageOnload () {
  if (
    localStorage.getItem('currentPage') == undefined ||
    localStorage.getItem('currentPage') == 1
  ) {
    localStorage.setItem('currentPage', 1)
  } else {
    let loadPreviousPage = confirm('Bạn có muốn quay lại page gần nhất?')
    if (!loadPreviousPage) {
      localStorage.setItem('currentPage', 1)
    }
  }
})()

var currentPage = JSON.parse(localStorage.getItem('currentPage'))

currentPage = JSON.parse(localStorage.getItem('currentPage'))

var take = 10

var price = ''

var currentTotalProduct = ''

var user = JSON.parse(localStorage.getItem('user'))

var isUser = false

var isAdmin = false

const LOGIN_PATH = './login.html'

const ORDERS_PATH = './orders.html'

/* Change the Login Text to Username of current user and handle
  and handle when click to the username btn
*/
if (user == null || user.username == undefined) {
  user = {
    items: {}
  }
  localStorage.setItem('user', JSON.stringify(user))
} else {
  axios
    .post(
      `${BASE_URL}/api/verify`,
      {
        username: user.username
      },
      {
        headers: {
          Authorization: `Bearer 0 ${user.token}`
        }
      }
    )
    .then(function (res) {
      console.log(res)
      isUser = true
      document.querySelector('li:nth-child(3)').innerText = user.username
    })
    .catch(function (error) {
      const errMessage = error.response.data.message

      confirmRedirect(
        errMessage,
        LOGIN_PATH,
        () => localStorage.setItem('path', './homepage.html'),
        () => {
          localStorage.removeItem('user')
          window.location.reload
        }
      )
    })
}

/* Check is user admin or not */
axios
  .post(
    `${BASE_URL}/api/verifyAdmin`,
    {},
    {
      headers: {
        Authorization: `Bearer 0 ${user.token}`
      }
    }
  )
  .then(function (res) {
    isAdmin = res.data.isAdmin
    console.log(isAdmin)
    document.querySelector('li:nth-child(2)').style.display = 'block'
  })
  .catch(function (err) {
    isAdmin = err.response.data.isAdmin
    console.log(err.response.data.message)
    document.querySelector('li:nth-child(2)').style.display = 'none'
  })

document.querySelector('.nav-bar-logo img').onclick = function (e) {
  window.location.href = './homepage.html'
}

// currentCart = currentItems in localStorage
var currentCart = user.items

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

/* Back to home */
document.querySelector('.home-btn').onclick = function (e) {
  window.location.href = './homepage.html'
}

/* Handle onclick to login logout */
document.querySelector('li:nth-child(3)').onclick = function (e) {
  if (isUser) {
    confirmRedirect(`Do you want to log out?`, LOGIN_PATH, () =>
      localStorage.removeItem('user')
    )
  } else {
    window.location.href = LOGIN_PATH
  }
}

/* Handle onclick to manage product */
document.querySelector('li:nth-child(2)').onclick = function (e) {
  if (isAdmin) {
    window.location.href = './manageproduct.html'
  } else {
    confirmRedirect(
      `Bạn không phải admin để sử dụng chức năng này`,
      LOGIN_PATH,
      () => localStorage.removeItem('user')
    )
  }
}

/* Handle price filter product */
document.querySelector('select').onchange = function (e) {
  price = e.currentTarget.value
  renderProducts(1)
}

/* Handle onclick purchase button */
document.querySelector('.purchase-btn').onclick = function (e) {
  /* Kiểm tra user hợp lệ và giỏ hàng không trống thì mới chuyển sang phần orders */
  if (isUser && Object.keys(user.items).length !== 0) {
    window.location.href = ORDERS_PATH
  } else if (Object.keys(user.items).length === 0) {
    alert('Bạn chưa mua món hàng nào')
  } else {
    const message = `
    Bạn cần đăng nhập để có thể mua hàng!
    Bạn có muốn đăng nhập không?`
    confirmRedirect(message, LOGIN_PATH)
  }
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

/* Render Products */
async function renderProducts (page) {
  localStorage.setItem('currentPage', page)
  let productHTML = ''
  try {
    const products = await axios.get(
      `${GET_PRODUCT_URL}?search=${search}&take=${take}&page=${page}&price=${price}`
    )
    currentTotalProduct = products.data.countDocuments
    products.data.items.forEach(function (product) {
      const style = `style = 'background-image: url(${product.img})'`
      const convertPrice = product.price.toLocaleString()

      const quantity =
        user.items[product['_id']] != undefined
          ? user.items[product['_id']].quantity
          : 0
      let left = product.quantity - quantity
      productHTML += `
            <div id="${product['_id']}" class="product-group">
            <div class="product-info" style="text-align: center">Còn lại: <span class="left">${left}</span></div>
            <div class="product-info" style="text-align: center">Đã mua: <span class="bought">${quantity}</span></div>
                <div class="product" ${style}></div>
                <div class="product-info"><p>${product.name}</p></div>
                <div class="product-info"><p>${product.desc}</p></div>
                <button class="buy-btn">Buy ${convertPrice}vnd</button>
                <button class="cancel-btn">Cancel</button>
            </div>`
    })
    document.querySelector('.product-container').innerHTML = productHTML
    renderPaginationBar(page)
  } catch (error) {
    console.log(error)
  }
}

renderProducts(currentPage)

/* Search */
document.querySelector('.search-bar button').onclick = function (e) {
  e.stopPropagation()
  search = document.querySelector('.search-bar input').value.trim()
  renderProducts(1)
}

/* Thực hiện gán sự kiện cho các nút buy và cancel */
document.querySelector('.product-container').onmouseenter = async function (e) {
  let allBuyBtns = e.currentTarget.querySelectorAll('.buy-btn')
  let allCancelBtns = e.currentTarget.querySelectorAll('.cancel-btn')
  /* Duyệt qua tất cả các button trong product,
  Nếu đã đăng nhập thì nếu click mua thì thực hiện tăng quantity của nó, bấm cancel thì trừ nó đi
  */
  for (let i = 0; i < allBuyBtns.length; i++) {
    // Get item clicked id
    const currentItem = allBuyBtns[i].parentElement.id
    // Gett item click in db
    const itemInfo = await axios.get(
      `${BASE_URL}/api/findById?id=${currentItem}`
    )
    //Get Item click price
    const currentItemPrice = itemInfo.data.price
    allBuyBtns[i].onclick = function (e) {
      if (isUser) {
        const currentProducts = allBuyBtns[i].parentElement.querySelector(
          '.product'
        )
        /* Nếu còn lại > 0 thì mới được quyền mua tiếp */
        if (
          Number(
            currentProducts.parentElement.querySelector('span.left').innerHTML
          ) > 0
        ) {
          if (currentCart[currentItem]) {
            currentCart[currentItem].quantity += 1
            currentCart[currentItem].totalPrice += Number(currentItemPrice)
          } else {
            currentCart[currentItem] = {
              name: itemInfo.data.name,
              price: currentItemPrice,
              quantity: 1,
              totalPrice: Number(currentItemPrice)
            }
            console.log(currentCart)
          }
          // currentProducts.innerHTML =
          //   currentCart[currentItem] != undefined
          //     ? currentCart[currentItem].quantity
          //     : ''
          let left = currentProducts.parentElement.querySelector('span.left')
            .innerHTML
          currentProducts.parentElement.querySelector('span.left').innerHTML =
            currentCart[currentItem] != undefined
              ? left - 1
              : currentProducts.parentElement.querySelector('span.bought')
                  .innerHTML == '0'
              ? Number(left)
              : Number(left) - 1

          currentProducts.parentElement.querySelector('span.bought').innerHTML =
            currentCart[currentItem] != undefined
              ? currentCart[currentItem].quantity
              : 0
          user.items = currentCart

          localStorage.setItem('user', JSON.stringify(user))
          console.log(JSON.parse(localStorage.getItem('user')).items)
        } else {
          alert('Hiện đã hết hàng')
        }
      } else {
        confirmRedirect(
          `
        Vui lòng đăng nhập trước khi mua hàng
        Bạn có muốn đăng nhập?`,
          LOGIN_PATH
        )
      }
    }

    allCancelBtns[i].onclick = function (e) {
      const currentProducts = allBuyBtns[i].parentElement.querySelector(
        '.product'
      )
      if (currentCart[currentItem]) {
        if (currentCart[currentItem].quantity < 2) {
          delete currentCart[currentItem]
        } else {
          currentCart[currentItem].quantity -= 1
          currentCart[currentItem].price -= Number(currentItemPrice)
        }
      } else {
        alert('Bạn chưa mua món hàng này')
      }
      let left = currentProducts.parentElement.querySelector('span.left')
        .innerHTML
      currentProducts.parentElement.querySelector('span.left').innerHTML =
        currentCart[currentItem] != undefined
          ? Number(left) + 1
          : currentProducts.parentElement.querySelector('span.bought')
              .innerHTML == '0'
          ? Number(left)
          : Number(left) + 1
      currentProducts.parentElement.querySelector('span.bought').innerHTML =
        currentCart[currentItem] != undefined
          ? currentCart[currentItem].quantity
          : 0
      console.log(currentProducts.innerHTML)

      user.items = currentCart

      localStorage.setItem('user', JSON.stringify(user))
      console.log(JSON.parse(localStorage.getItem('user')).items)
    }
  }
}
