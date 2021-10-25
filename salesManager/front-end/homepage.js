const BASE_URL = 'http://localhost:8080'

const GET_PRODUCT_URL = `${BASE_URL}/api/getProducts`

var search = ''

var take = 5

var currentTotalProduct = ''

var currentCart = {}

/* Redirect */
document.querySelector('.login-btn').onclick = function (e) {
  window.location.href = './login.html'
}

document.querySelector('.home-btn').onclick = function (e) {
  window.location.href = './homepage.html'
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
  let productHTML = ''
  try {
    const products = await axios.get(
      `${GET_PRODUCT_URL}?search=${search}&take=${take}&page=${page}`
    )
    currentTotalProduct = products.data.countDocuments
    products.data.items.forEach(function (product) {
      const style = `style = 'background-image: url(${product.img})'`
      const convertPrice = product.price.toLocaleString()
      productHTML += `
            <div id="${product['_id']}" class="product-group">
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

renderProducts(1)

document.querySelector('.search-bar button').onclick = function (e) {
  e.stopPropagation()
  search = document.querySelector('.search-bar input').value.trim()
  renderProducts(1)
}

document.querySelector('.product-container').onmouseenter = function (e) {
  let allBuyBtns = e.currentTarget.querySelectorAll('.buy-btn')
  let allCancelBtns = e.currentTarget.querySelectorAll('.cancel-btn')
  for (let i = 0; i < allBuyBtns.length; i++) {
    allBuyBtns[i].onclick = function (e) {
      const currentItem = e.currentTarget.parentElement.id
      const currentProducts = allBuyBtns[i].parentElement.querySelector(
        '.product'
      )
      if (currentCart[currentItem]) {
        currentCart[currentItem] += 1
      } else {
        currentCart[currentItem] = 1
      }
      currentProducts.innerHTML =
        currentCart[currentItem] != undefined ? currentCart[currentItem] : ''
      console.log(currentProducts.innerHTML)

      localStorage.setItem('item', JSON.stringify(currentCart))
      console.log(localStorage.getItem('item'))
    }

    allCancelBtns[i].onclick = function (e) {
      const currentItem = e.currentTarget.parentElement.id
      const currentProducts = allBuyBtns[i].parentElement.querySelector(
        '.product'
      )
      if (currentCart[currentItem]) {
        if (currentCart[currentItem] < 2) {
          delete currentCart[currentItem]
        } else {
          currentCart[currentItem] -= 1
        }
      } else {
        alert('Bạn chưa mua món hàng này')
      }

      currentProducts.innerHTML =
        currentCart[currentItem] != undefined ? currentCart[currentItem] : ''
      console.log(currentProducts.innerHTML)
      localStorage.setItem('item', JSON.stringify(currentCart))
      console.log(localStorage.getItem('item'))
    }
  }
}
