console.log(increase())
function increase() {
    return counter++ // => trong phạm vi khối code không tìm thấy counter do đó tìm ra ngoài phạm vi và tìm được counter = 1
}

let counter = 1

