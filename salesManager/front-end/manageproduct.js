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

var currentPage = 1

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

document.querySelector('ul li:nth-child(2)').onclick = async function(e) {
  document.querySelector('.background-form').style.display = `block`
  document.querySelector(
    `.background-form .create-form`
  ).style.display = `none`
  document.querySelector(
    `.background-form .edit-form`
  ).style.display = `none`
  document.querySelector('.report-table').style.display = `block`

  let revenue = await axios.get(`${BASE_URL}/api/totalRevenue`, {
    headers: {
      Authorization: `Bearer 1 ${user.token}`
    }
  })
  console.log(revenue)
  document.querySelector('.report-table .total-revenue h3').innerHTML = `${(revenue.data.revenue.toLocaleString())} </br></br>`
  let bestSeller = revenue.data.bestSeller
  document.querySelector('.report-table .best-seller').innerHTML = `<h3>Sản phẩm bán chạy nhất tháng là: ${bestSeller.product}, bán được tổng cộng ${bestSeller.quantity}, tổng doanh thu là ${(bestSeller.totalRevenueOfProduct.toLocaleString())} vnđ</h3></br>`
  document.querySelector('.report-table .top10-product').innerHTML =`
  <h3>Top 10 sản phẩm của tháng là:</h3>`
  let top10 = revenue.data['top10Products']
  let i = 1
  top10.forEach(function(product) {
    document.querySelector('.report-table .top10-product').innerHTML += `
    <h4>${i}. ${product.product}: Bán được ${product.quantity} sản phẩm, tổng doanh thu là ${(product.totalRevenueOfProduct.toLocaleString())} vnđ</h4>`
    i++
  })
}

document.querySelector('.report-table button').onclick = function(e) {
  document.querySelector('.background-form').style.display = `none`
  document.querySelector('.report-table').style.display = `none`
}

document.querySelector('ul li:nth-child(3)').onclick = function (e) {
  confirmRedirect('Do you want to log out?', './login.html')
}
/* Render pagination bar */
function renderPaginationBar (page) {
  const currentTotalPage = Math.ceil(currentTotalProduct / take)
  currentPage = page
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

/* switch display */
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

/* Validate and create product */
{
  function displayAlert (btn) {
    if (btn.value.trim() == '') {
      btn.parentElement.querySelector('div').style.display = 'block'
    } else {
      btn.parentElement.querySelector('div').style.display = 'none'
    }
  }

  function checkSubmit (btnArr) {
    let canCreate = true
    for (let i = 0; i < btnArr.length - 1; i++) {
      if (btnArr[i].value.trim() == '') {
        canCreate = false
        break
      }
    }

    for (let i = 0; i < btnArr.length - 1; i++) {
      displayAlert(btnArr[i])
    }

    return canCreate
  }

  var allInputCreate = document.forms[0].querySelectorAll('.input')

  /* If let the input empty and click to another place will display the validate message  */
  for (let i = 0; i < allInputCreate.length - 1; i++) {
    allInputCreate[i].oninput = () => displayAlert(allInputCreate[i])
    allInputCreate[i].onblur = () => displayAlert(allInputCreate[i])
  }

  document.forms[0].createBtn.onclick = async function (e) {
    if (checkSubmit(allInputCreate)) {
      try {
        let addProduct = await axios.post(
          `${BASE_URL}/api/createProduct`,
          {
            id: allInputCreate[0].value.trim(),
            name: allInputCreate[1].value.trim(),
            desc: allInputCreate[2].value.trim(),
            price: Number(allInputCreate[3].value.trim()),
            unit: allInputCreate[4].value.trim(),
            quantity: allInputCreate[5].value.trim(),
            img: allInputCreate[6].value.trim()
          },
          {
            headers: {
              Authorization: `Bearer 1 ${user.token}`
            }
          }
        )
        alert('Create Product Successfully', addProduct)
        renderProducts(Math.ceil((currentTotalProduct + 1) / take))
      } catch (err) {
        console.log(err)
        alert(err)
      }
    } else {
      console.log('Nhập thiếu')
    }
  }
}

/* undisplay form edit and create */
for (let i = 0; i < document.forms.length; i++) {
  document.forms[i].cancelBtn.onclick = function (e) {
    e.stopPropagation()
    switchDisplay('create-form', 'none')
    switchDisplay('edit-form', 'none')
  }
}

/* Handle the case img error */
for (let i = 0; i < 2; i++) {
  document.forms[i].querySelector('.img-container button').onclick = function (
    e
  ) {
    if (document.forms[i].querySelectorAll('.input')[6].value.trim()) {
      document.forms[i]
        .querySelector('.img-container img')
        .setAttribute(
          'src',
          document.forms[i].querySelectorAll('.input')[6].value.trim()
        )
    }
  }
}

{
  for (let i = 0; i < 2; i++) {
    document.forms[i].querySelector('.img-container img').onerror = function(e) {
      e.currentTarget.parentElement.querySelector('img').setAttribute('src', 'https://keiclubmiennam.com/wp-content/uploads/2021/06/noimageavailable.png')
    }
  }
}

/* Display edit form and delete product */
document.querySelector('.product-container').onmouseenter = function (e) {
  let allProduct = document.querySelectorAll('.product-group')
  for (let i = 0; i < allProduct.length; i++) {
    /* Edit Button event */
    // Open the edit form
    allProduct[i].querySelector('button.edit-btn').onclick = async function (
      e
    ) {
      switchDisplay('edit-form', 'block')
      // Fill edit form
      var allInputEdit = document.forms[1].querySelectorAll('.input')
      for (let i = 0; i < allInputEdit.length - 1; i++) {
        allInputEdit[i].oninput = () => displayAlert(allInputEdit[i])
        allInputEdit[i].onblur = () => displayAlert(allInputEdit[i])
      }

      const product = await axios.get(
        `${BASE_URL}/api/findById?id=${allProduct[i].id}`
      )

      document.forms[1]
        .querySelector('.img-container img')
        .setAttribute('src', product.data.img)

      allInputEdit[0].value = product.data['_id']
      allInputEdit[1].value = product.data.name
      allInputEdit[2].value = product.data.desc
      allInputEdit[3].value = product.data.price
      allInputEdit[4].value = product.data.unit
      allInputEdit[5].value = product.data.quantity
      allInputEdit[6].value = product.data.img
      
      document.forms[1].editBtn.onclick = async function (e) {
        if (checkSubmit(allInputEdit)) {
          let payloadProduct = {
            id: product.data['_id'],
              name: allInputEdit[1].value,
              desc: allInputEdit[2].value,
              price: allInputEdit[3].value,
              unit: allInputEdit[4].value,
              quantity: allInputEdit[5].value,
              img: allInputEdit[6].value
          }
          try {
            let updatedProduct = await axios.post(`${BASE_URL}/api/updateProduct`, payloadProduct, {
              headers: {
                Authorization: `Bearer 1 ${user.token}`
              }
            })
            alert(`Bạn vừa Update thành công sản phẩm ${updatedProduct.data.product.name}`)
            renderProducts(currentPage)

          } catch (err) {
            console.log(err)
          }
        }
      }
    }

    /* Delete Button event*/
    allProduct[i].querySelector('button.delete-btn').onclick = async function (
      e
    ) {
      const productId = e.currentTarget.parentElement.id
      let confirmDelete = confirm(`Bạn có chắc chắn xoá product ${productId}`)
      if (confirmDelete) {
        try {
          const deleteItem = await axios.post(
            `${BASE_URL}/api/deleteProduct/${productId}`,
            {},
            {
              headers: {
                Authorization: `Bearer 1 ${user.token}`
              }
            }
          )
          if (document.querySelectorAll('.product-container > div').length == 1)
            renderProducts(currentPage - 1)
          else renderProducts(currentPage)

          console.log('Bạn vừa xoá thành công', deleteItem.data)
        } catch (err) {
          console.log(err.response.data)
        }
      } else {
        console.log('Chưa xoá')
      }
    }
  }
}
