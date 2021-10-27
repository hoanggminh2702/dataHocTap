/* Check if user is not valid */
var user = JSON.parse(localStorage.getItem('user'))
const currentTime = new Date()
var totalAmount = 0
if (user == null || user.username == undefined) {
  alert('Bạn chưa đăng nhập để dùng chức năng này')
  window.location.href = './login.html'
} else {
  if (Object.keys(user.items).length === 0) {
    alert('Bạn chưa mua món hàng nào!')
    window.location.href = './homepage.html'
  }
}
/* Render bill table */
function renderBill (e) {
  let ordersRowHTML = ''
  let total = 0
  let i = 1
  for (let key of Object.keys(user.items)) {
    console.log(key)
    console.log(user.items[key])
    ordersRowHTML += `
    <tr id="${key}">
    <th class="item">${i}</th>
    <th class="item">${user.items[key].name}</th>
    <th class="item">${user.items[key].quantity}</th>
    <th class="item">${user.items[key].totalPrice}</th>
    <tr>`
    total += Number(user.items[key].totalPrice)
    i++
  }
  totalAmount = total
  total = total.toLocaleString()
  document.querySelector('tbody').innerHTML = ordersRowHTML
  document.querySelector('.total').innerText = `Thành tiền: ${total} vnd`
}

renderBill()

document.querySelector('.pay-btn').onclick = async function (e) {
  const order = {
    username: user.username,
    items: user.items,
    date: currentTime,
    totalAmount: totalAmount
  }

  let payConfirm = confirm('Bạn chắc chắn muốn thanh toán?')

  if (payConfirm) {
    try {
      const myOrder = await axios.post(
        'http://localhost:8080/api/createBill',
        order,
        {
          headers: {
            Authorization: `Bearer 1 ${user.token}`
          }
        }
      )
      alert(JSON.stringify(myOrder.data.item))
      user.items = {}
      localStorage.setItem('user', JSON.stringify(user))
      window.location.href = './homepage.html'
    } catch (error) {
      console.log(error)
    }
  }
}
