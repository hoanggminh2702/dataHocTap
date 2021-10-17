const BASE_URL = 'http://localhost:8080'

const skip = 2
const limit = 2

// const GET_URL = `${BASE_URL}/api/getTaskList?skip=${skip}&limit=${limit}` 
const GET_URL = `${BASE_URL}/api/getTaskList?page=2` 

async function getPosts() {
    let posts = await axios.get(GET_URL)
    let data = posts.data
    console.log(data)
    return data
}

getPosts()
