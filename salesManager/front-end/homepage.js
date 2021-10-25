const BASE_URL = 'http://localhost:8080'

const GET_PRODUCT_URL = `${BASE_URL}/api/getProducts`

console.log(GET_PRODUCT_URL)

/* Render Products */
async function renderProducts() {
    let productHTML = ""
    try {
        const products = await axios.get(GET_PRODUCT_URL)
        console.log(products)
        products.data.items.forEach(function(product) {
            productHTML += `
            <div class="product-group">
                <div class="product"><img src="https://cellphones.com.vn/media/catalog/product/s/u/surface-laptop-go-4_4.jpg"/></div>
                <div class="title">${product.name}</div>
                <div class="price">${product.price}</div>
            </div>`
            console.log(product)
        })
        document.querySelector('.product-container').innerHTML = productHTML
    } catch (error) {
        console.log(error)
    }
}

renderProducts()