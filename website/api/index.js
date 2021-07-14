const BASE_API_URL = 'http://localhost:4000'

const localLogin = async (email, password) => {
    console.log('cvc', email, password, process.env.BASE_API_URL)
    let url = `${BASE_API_URL}/auth/local`
    let response = await fetch(url, { 
        headers: {
            'Content-Type': 'application/json'
        },
        method : 'POST',
        body: JSON.stringify({email: email, password: password})
    })
    return response
}

const localLogout = async () => {
    let url = `${BASE_API_URL}/auth/logout`
    let response = await fetch(url, { method : 'GET' })
    return response
}

const getAll = async () => {
    const url = `${BASE_API_URL}/course/get-all-guess`
    const response = await fetch(url, { method : 'GET' })
    if(response.status == 200) {
        const result = await response.json()
        return result
    }
    return null
}

const getUserHistoryTransaction = async () => {
    const uid = JSON.parse(localStorage.getItem("session")).id
    const response = await fetch(`${BASE_API_URL}/user/history/${uid}`, {method: 'GET'})
    if(response.status == 200) {
        const result = await response.json()
        return result
    }
    return null
}

const create = async (endpoint, data) => {
    let url = `${BASE_API_URL}/${endpoint}/add`
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method : 'POST',
        body: JSON.stringify(data)
    })
    return response
}

const update = async (endpoint , data) => {
    let url = `${BASE_API_URL}/${endpoint}`
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method : 'PUT',
        body: JSON.stringify(data)
    })
    return response
}

const remove = async (endpoint , id) => {
    let url = `${BASE_API_URL}/${endpoint}/delete`
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method : 'DELETE',
        body: JSON.stringify({id: id})
    })
    return response
}

const uploadMedia = async (endpoint , data) => {
    let url = `${BASE_API_URL}/${endpoint}`
    let response = await fetch(url, {
        method : 'POST',
        body: data
    })
    return response
}

const getChatRooms = async (data) => {
    const { userId } = data
    let url = `${BASE_API_URL}/chat-room/${userId}`
    try {
        let response = await fetch(url, {
            method : 'GET'
        })
        
        return response
    } catch(err) {
        console.log(err)
    }
}

const getUser = async (data) => {
    const { id } = data
    let url = `${BASE_API_URL}/user/${id}`
    let response = await fetch(url, {
        method : 'GET'
    })
    return response
}

const createTransaction = async (data) => {
    let url = `${BASE_API_URL}/trans`
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method : 'POST',
        body: JSON.stringify(data)
    })
    return response
}

export { 
    BASE_API_URL,
    localLogin, 
    localLogout, 
    getAll, 
    getUserHistoryTransaction, 
    remove, 
    update, 
    create, 
    uploadMedia,
    getChatRooms,
    getUser,
    createTransaction 
}